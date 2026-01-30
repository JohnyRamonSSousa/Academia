
import React, { useState } from 'react';

interface PostFormProps {
    onPost: (image: string, caption: string) => void;
}

const PostForm: React.FC<PostFormProps> = ({ onPost }) => {
    const [image, setImage] = useState('');
    const [caption, setCaption] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (image.trim() && caption.trim()) {
            onPost(image, caption);
            setImage('');
            caption;
            setCaption('');
            setIsExpanded(false);
        }
    };

    return (
        <div className="glass-card rounded-3xl border border-zinc-800 p-6 mb-12 shadow-2xl transition-all hover:border-lime-400/20">
            {!isExpanded ? (
                <div
                    onClick={() => setIsExpanded(true)}
                    className="flex items-center gap-4 cursor-pointer"
                >
                    <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center">
                        <i className="fa-solid fa-camera text-zinc-500 text-xl"></i>
                    </div>
                    <div className="flex-grow bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-3 text-zinc-500 text-sm">
                        Compartilhe seu progresso, {new Date().getHours() < 12 ? 'Bom dia!' : 'Boa tarde!'}...
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-white font-black uppercase text-sm tracking-widest">Nova Postagem</h3>
                        <button
                            type="button"
                            onClick={() => setIsExpanded(false)}
                            className="text-zinc-500 hover:text-white"
                        >
                            <i className="fa-solid fa-times"></i>
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">URL da Foto</label>
                            <input
                                type="url"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                placeholder="Cole o endereço de uma imagem aqui..."
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-lime-400 transition-colors"
                                required
                            />
                            <p className="text-[10px] text-zinc-600 mt-2">Dica: Use links do Unsplash ou similares para testar.</p>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Legenda</label>
                            <textarea
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                placeholder="O que está acontecendo no seu treino?"
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm min-h-[100px] focus:outline-none focus:border-lime-400 transition-colors resize-none"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            className="neon-bg text-black font-black uppercase tracking-widest px-8 py-3 rounded-xl text-xs hover:bg-lime-500 transition-all transform hover:scale-105"
                        >
                            Publicar Agora
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default PostForm;
