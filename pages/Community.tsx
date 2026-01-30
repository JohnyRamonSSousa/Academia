
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { Post, Comment } from '../types';

const INITIAL_POSTS: Post[] = [];

const RANKING_DATA = [
    { id: 'r1', name: 'Ana Paula', score: 1250, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=80', rank: 1 },
    { id: 'r2', name: 'Carlos Silva', score: 980, avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=80', rank: 2 },
    { id: 'r3', name: 'Mariana Oliveira', score: 850, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=80', rank: 3 },
];

interface CommunityProps {
    isLoggedIn: boolean;
}

const Community: React.FC<CommunityProps> = ({ isLoggedIn }) => {
    const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);

    useEffect(() => {
        localStorage.setItem('je_community_posts', JSON.stringify(posts));
    }, [posts]);

    useEffect(() => {
        localStorage.setItem('je_community_posts', JSON.stringify(posts));
    }, [posts]);

    const handleCreatePost = (image: string, caption: string) => {
        if (!isLoggedIn) return;
        const newPost: Post = {
            id: Date.now().toString(),
            userName: 'Você (Aluno JE)',
            userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=80',
            image,
            caption,
            likes: 0,
            comments: [],
            createdAt: 'Agora mesmo',
            isLiked: false
        };
        setPosts([newPost, ...posts]);
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

    const handleLike = (postId: string) => {
        if (!isLoggedIn) {
            alert('Você precisa estar logado para curtir as postagens!');
            return;
        }
        setPosts(prev => prev.map(post => {
            if (post.id === postId) {
                const isLiking = !post.isLiked;
                if (isLiking) {
                    dispatchNotification('like', 'Um Aluno JE', 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=80', 'curtiu sua publicação');
                }
                return {
                    ...post,
                    likes: post.isLiked ? post.likes - 1 : post.likes + 1,
                    isLiked: !post.isLiked
                };
            }
            return post;
        }));
    };

    const handleComment = (postId: string, content: string) => {
        if (!isLoggedIn) {
            alert('Você precisa estar logado para comentar!');
            return;
        }

        dispatchNotification('comment', 'Um Aluno JE', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=80', 'respondeu ao seu post: "' + content.substring(0, 20) + '..."');

        const newComment: Comment = {
            id: Date.now().toString(),
            userName: 'Você (Aluno JE)',
            userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=80',
            content,
            createdAt: 'Agora mesmo'
        };

        setPosts(prev => prev.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    comments: [...post.comments, newComment]
                };
            }
            return post;
        }));
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
                        <div className="lg:col-span-8 space-y-8">
                            <PostForm onPost={handleCreatePost} />

                            {/* Feed */}
                            <div className="space-y-8">
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
