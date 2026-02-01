
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { Post, Comment } from '../types';

const INITIAL_POSTS: Post[] = [];

import { auth, db } from '../firebase';
import { collection, addDoc, onSnapshot, query, orderBy, doc, updateDoc, getDoc, arrayUnion } from 'firebase/firestore';



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

                <div className="max-w-3xl mx-auto space-y-8">
                    {/* Post Form - Only for logged in users */}
                    {isLoggedIn && (
                        <PostForm onPost={handleCreatePost} />
                    )}

                    {/* Feed - Visible to everyone */}
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
            </div>
        </div>
    );
};

export default Community;
