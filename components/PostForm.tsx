
import React, { useState } from 'react';

interface PostFormProps {
    onPost: (image: string, caption: string) => void;
}

const PostForm: React.FC<PostFormProps> = ({ onPost }) => {
    const [image, setImage] = useState('');
    const [caption, setCaption] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setImage(base64String);
                setPreviewUrl(base64String);
                setIsExpanded(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (image.trim() && caption.trim()) {
            onPost(image, caption);
            setImage('');
            setCaption('');
            setPreviewUrl(null);
            setIsExpanded(false);
        }
    };

    return (
        <div className="glass-card rounded-3xl border border-zinc-800 p-6 mb-12 shadow-2xl transition-all hover:border-lime-400/20">
            {!isExpanded ? (
                <div
                    className="flex items-center gap-4"
                >
                    <label className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center cursor-pointer hover:border-lime-400 hover:text-lime-400 transition-colors">
                        <i className="fa-solid fa-camera text-xl"></i>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </label>
                    <div
                        onClick={() => setIsExpanded(true)}
                        className="flex-grow bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-3 text-zinc-500 text-sm cursor-pointer hover:border-zinc-700"
                    >
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
                        {previewUrl ? (
                            <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
                                <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                                <button
                                    type="button"
                                    onClick={() => { setPreviewUrl(null); setImage(''); }}
                                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-red-500 transition-colors"
                                >
                                    <i className="fa-solid fa-times"></i>
                                </button>
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center w-full h-32 bg-zinc-900 border-2 border-dashed border-zinc-800 rounded-2xl cursor-pointer hover:border-lime-400/50 transition-colors group">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <i className="fa-solid fa-cloud-arrow-up text-zinc-600 text-2xl mb-2 group-hover:text-lime-400"></i>
                                    <p className="text-[10px] font-black uppercase text-zinc-600 tracking-widest group-hover:text-zinc-400">Clique para enviar ou usar a câmera</p>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </label>
                        )}

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
