
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { Post, Comment } from '../types';

const INITIAL_POSTS: Post[] = [];

import { auth, db } from '../firebase';
import { collection, addDoc, onSnapshot, query, orderBy, doc, updateDoc, getDoc, arrayUnion } from 'firebase/firestore';

const RANKING_DATA = [
    { id: 'r1', name: 'Ana Paula', score: 1250, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=80', rank: 1 },
    { id: 'r2', name: 'Carlos Silva', score: 980, avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=80', rank: 2 },
    { id: 'r3', name: 'Mariana Oliveira', score: 850, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=80', rank: 3 },
];

const STORIES_DATA = [
    { id: 's1', name: 'Seu Story', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150', isUser: true },
    { id: 's2', name: 'Ana Paula', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150' },
    { id: 's3', name: 'Carlos Silva', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=150' },
    { id: 's4', name: 'Mariana', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150' },
    { id: 's5', name: 'Ricardo', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150' },
    { id: 's6', name: 'Juliana', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150' },
    { id: 's7', name: 'Marcos', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150' },
];

interface CommunityProps {
    isLoggedIn: boolean;
}

const Community: React.FC<CommunityProps> = ({ isLoggedIn }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userProfile, setUserProfile] = useState({
        name: 'TITÃ',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=80'
    });

    useEffect(() => {
        // 1. Fetch User Profile
        const fetchUserProfile = async () => {
            const user = auth.currentUser;
            if (user) {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setUserProfile({
                        name: data.name || 'TITÃ',
                        avatar: data.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=80'
                    });
                }
            }
        };

        if (isLoggedIn) fetchUserProfile();

        // 2. Real-time Posts Listener
        const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const user = auth.currentUser;
            const fetchedPosts = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    isLiked: data.likedBy?.includes(user?.uid)
                } as Post;
            });
            setPosts(fetchedPosts);
            setIsLoading(false);
        }, (error) => {
            console.error("Error fetching posts:", error);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [isLoggedIn]);

    const handleCreatePost = async (image: string, caption: string) => {
        const user = auth.currentUser;
        if (!isLoggedIn || !user) return;

        try {
            await addDoc(collection(db, 'posts'), {
                userName: userProfile.name,
                userAvatar: userProfile.avatar,
                userId: user.uid,
                image,
                caption,
                likesCount: 0,
                likedBy: [],
                comments: [],
                createdAt: new Date().toISOString()
            });
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    const dispatchNotification = (type: 'like' | 'comment', fromUser: string, avatar: string, content: string) => {
        const event = new CustomEvent('je-notification', {
            detail: {
                id: Date.now().toString(),
                type,
                content,
                fromUser,
                fromAvatar: avatar,
                createdAt: 'Agora',
                isRead: false
            }
        });
        window.dispatchEvent(event);
    };

    const handleLike = async (postId: string) => {
        const user = auth.currentUser;
        if (!isLoggedIn || !user) {
            alert('Você precisa estar logado para curtir as postagens!');
            return;
        }

        try {
            const postRef = doc(db, 'posts', postId);
            const postSnap = await getDoc(postRef);
            if (postSnap.exists()) {
                const postData = postSnap.data();
                const likedBy = postData.likedBy || [];
                const isLiked = likedBy.includes(user.uid);

                await updateDoc(postRef, {
                    likedBy: isLiked ? likedBy.filter((uid: string) => uid !== user.uid) : [...likedBy, user.uid],
                    likesCount: isLiked ? (postData.likesCount || 1) - 1 : (postData.likesCount || 0) + 1
                });

                if (!isLiked) {
                    dispatchNotification('like', 'Um Aluno JE', 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=80', 'curtiu sua publicação');
                }
            }
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    const handleComment = async (postId: string, content: string) => {
        const user = auth.currentUser;
        if (!isLoggedIn || !user) {
            alert('Você precisa estar logado para comentar!');
            return;
        }

        try {
            const postRef = doc(db, 'posts', postId);
            const newComment: Comment = {
                id: Date.now().toString(),
                userName: userProfile.name,
                userAvatar: userProfile.avatar,
                content,
                createdAt: 'Agora mesmo'
            };

            await updateDoc(postRef, {
                comments: arrayUnion(newComment)
            });

            dispatchNotification('comment', 'Um Aluno JE', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=80', 'respondeu ao seu post: "' + content.substring(0, 20) + '..."');

        } catch (error) {
            console.error("Error commenting:", error);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 pt-24 pb-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase mb-4">
                        COMUNIDADE <span className="neon-accent">JE</span>
                    </h1>
                    <p className="text-zinc-500 text-sm tracking-widest uppercase">
                        Compartilhe sua jornada com outros alunos
                    </p>
                </div>

                {isLoggedIn ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Main Feed */}
                        <div className="lg:col-span-8 space-y-6">
                            {/* Stories Section */}
                            <div className="bg-zinc-950/50 border border-zinc-900 rounded-3xl p-4 overflow-x-auto no-scrollbar scroll-smooth flex gap-4 mb-2">
                                {STORIES_DATA.map((story) => (
                                    <div key={story.id} className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer group">
                                        <div className={`w-16 h-16 rounded-full p-[2.5px] ${story.isUser ? 'border border-zinc-700' : 'bg-gradient-to-tr from-lime-400 to-emerald-500'} group-active:scale-95 transition-transform`}>
                                            <div className="w-full h-full rounded-full border-2 border-zinc-950 overflow-hidden relative">
                                                <img src={story.avatar} className="w-full h-full object-cover" alt={story.name} />
                                                {story.isUser && (
                                                    <div className="absolute bottom-0 right-0 w-5 h-5 bg-blue-500 rounded-full border-2 border-zinc-950 flex items-center justify-center translate-x-1 translate-y-1 scale-75">
                                                        <i className="fa-solid fa-plus text-white text-[10px]"></i>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-medium text-zinc-400 truncate w-16 text-center">{story.name}</span>
                                    </div>
                                ))}
                            </div>

                            <PostForm onPost={handleCreatePost} />

                            {/* Feed */}
                            <div className="space-y-6">
                                {posts.map(post => (
                                    <PostCard
                                        key={post.id}
                                        post={post}
                                        onLike={handleLike}
                                        onComment={handleComment}
                                        isLoggedIn={isLoggedIn}
                                    />
                                ))}
                                {posts.length === 0 && (
                                    <div className="text-center py-20 bg-zinc-900/30 rounded-3xl border border-zinc-800 border-dashed">
                                        <i className="fa-solid fa-comments text-zinc-800 text-4xl mb-4"></i>
                                        <p className="text-zinc-500 uppercase text-xs font-bold tracking-widest">Nenhuma postagem ainda. Seja o primeiro!</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sidebar - Ranking */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 sticky top-28">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">TOP ALUNOS</h3>
                                    <div className="w-8 h-8 bg-lime-400/10 rounded-full flex items-center justify-center">
                                        <i className="fa-solid fa-crown text-lime-400 text-sm"></i>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {RANKING_DATA.map((user, idx) => (
                                        <div key={user.id} className="flex items-center gap-4 group">
                                            <div className="relative">
                                                <img src={user.avatar} className="w-12 h-12 rounded-full object-cover border-2 border-zinc-800 group-hover:border-lime-400 transition-colors" alt={user.name} />
                                                <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${idx === 0 ? 'bg-yellow-500 text-black' : idx === 1 ? 'bg-zinc-300 text-black' : 'bg-orange-600 text-white'
                                                    }`}>
                                                    {user.rank}
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-white font-bold text-sm truncate uppercase tracking-tight">{user.name}</h4>
                                                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">{user.score} Pontos</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lime-400 text-xs font-black italic">XP</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-10 pt-8 border-t border-zinc-800 text-center">
                                    <p className="text-zinc-500 text-xs mb-6 uppercase font-bold tracking-widest">Quer subir no ranking? <br /> Interaja na comunidade!</p>
                                    <button className="w-full py-4 bg-zinc-800 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-zinc-700 transition-colors">
                                        Ver Meus Pontos
                                    </button>
                                </div>
                            </div>

                            {/* Community Stats */}
                            <div className="glass-card p-8 rounded-3xl border-zinc-800">
                                <h4 className="text-white font-black uppercase italic text-sm mb-6">Status da Comunidade</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center p-4 bg-white/5 rounded-2xl">
                                        <div className="text-white font-bold text-xl">{posts.length}</div>
                                        <div className="text-zinc-500 text-[10px] uppercase font-bold">Posts</div>
                                    </div>
                                    <div className="text-center p-4 bg-white/5 rounded-2xl">
                                        <div className="text-white font-bold text-xl">1.2k</div>
                                        <div className="text-zinc-500 text-[10px] uppercase font-bold">Titãs</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-2xl mx-auto glass-card rounded-[3rem] border border-zinc-800 p-12 text-center bg-zinc-900/50 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-lime-400/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="relative z-10">
                            <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-8 border border-zinc-700 shadow-2xl">
                                <i className="fa-solid fa-lock text-lime-400 text-4xl"></i>
                            </div>
                            <h3 className="text-3xl font-black text-white mb-4 uppercase italic tracking-tighter">CONTEÚDO EXCLUSIVO</h3>
                            <p className="text-zinc-400 text-lg mb-10 max-w-sm mx-auto leading-relaxed">
                                A nossa comunidade é o lugar onde os verdadeiros Titãs se encontram. Faça login para acessar o feed, rankings e interagir com outros alunos.
                            </p>
                            <Link
                                to="/login"
                                className="inline-block neon-bg hover:bg-lime-500 text-black px-12 py-4 rounded-2xl font-black uppercase tracking-widest transition-all transform hover:scale-105 shadow-[0_20px_40px_rgba(163,230,53,0.3)]"
                            >
                                Fazer Login Agora
                            </Link>
                            <p className="mt-8 text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em]">
                                Ainda não é aluno? <Link to="/join" className="text-lime-400 hover:text-white transition-colors">Matricule-se aqui</Link>
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Community;
