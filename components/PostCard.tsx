
import React, { useState } from 'react';
import { Post, Comment } from '../types';

interface PostCardProps {
    post: Post;
    onLike: (postId: string) => void;
    onComment: (postId: string, comment: string) => void;
    isLoggedIn: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike, onComment, isLoggedIn }) => {
    const [commentText, setCommentText] = useState('');
    const [showComments, setShowComments] = useState(false);

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (commentText.trim()) {
            onComment(post.id, commentText);
            setCommentText('');
        }
    };

    return (
        <div className="glass-card rounded-3xl border border-zinc-800 overflow-hidden mb-8 transition-all hover:border-zinc-700">
            {/* Header */}
            <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img src={post.userAvatar} alt={post.userName} className="w-10 h-10 rounded-full object-cover border border-lime-400/30" />
                    <div>
                        <h4 className="text-white font-bold text-sm">{post.userName}</h4>
                        <p className="text-zinc-500 text-xs">{post.createdAt}</p>
                    </div>
                </div>
                <button className="text-zinc-500 hover:text-white transition-colors">
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                </button>
            </div>

            {/* Image */}
            <div className="aspect-square w-full bg-zinc-900 border-y border-zinc-800 overflow-hidden">
                <img src={post.image} alt="Post content" className="w-full h-full object-cover" />
            </div>

            {/* Actions */}
            <div className="p-4">
                <div className="flex items-center gap-6 mb-4">
                    <button
                        onClick={() => onLike(post.id)}
                        className={`flex items-center gap-2 transition-colors ${post.isLiked ? 'text-lime-400' : 'text-zinc-400 hover:text-white'}`}
                    >
                        <i className={`fa-${post.isLiked ? 'solid' : 'regular'} fa-heart text-xl`}></i>
                        <span className="text-sm font-bold">{post.likes}</span>
                    </button>
                    <button
                        onClick={() => setShowComments(!showComments)}
                        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                    >
                        <i className="fa-regular fa-comment text-xl"></i>
                        <span className="text-sm font-bold">{post.comments.length}</span>
                    </button>
                    <button className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
                        <i className="fa-regular fa-paper-plane text-xl"></i>
                    </button>
                </div>

                {/* Caption */}
                <div className="mb-4">
                    <p className="text-white text-sm">
                        <span className="font-bold mr-2">{post.userName}</span>
                        {post.caption}
                    </p>
                </div>

                {/* Comments Preview / List */}
                {showComments && (
                    <div className="space-y-4 pt-4 border-t border-zinc-800">
                        {post.comments.map((comment) => (
                            <div key={comment.id} className="flex gap-3">
                                <img src={comment.userAvatar} alt={comment.userName} className="w-6 h-6 rounded-full object-cover" />
                                <div className="flex-grow">
                                    <p className="text-zinc-200 text-xs leading-relaxed">
                                        <span className="font-bold text-white mr-1">{comment.userName}</span>
                                        {comment.content}
                                    </p>
                                    <p className="text-zinc-600 text-[10px] mt-1">{comment.createdAt}</p>
                                </div>
                            </div>
                        ))}

                        <form onSubmit={handleCommentSubmit} className="flex gap-2 mt-4">
                            <input
                                type="text"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Adicionar um comentário..."
                                className="flex-grow bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-lime-400 transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={!commentText.trim()}
                                className="text-lime-400 font-bold text-xs disabled:text-zinc-600 transition-colors px-2"
                            >
                                Postar
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostCard;
