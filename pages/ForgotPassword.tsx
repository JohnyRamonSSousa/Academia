
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate password reset request
        console.log('Password reset requested for:', email);
        setIsSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-20">
            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <Link to="/" className="inline-block mb-6">
                        <span className="text-3xl font-black tracking-tighter text-white">JE<span className="neon-accent"> ACADEMIA</span></span>
                    </Link>
                    <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Recuperar Senha</h2>
                    <p className="text-zinc-400 mt-2">Enviaremos um link de recuperação para o seu e-mail</p>
                </div>

                <div className="glass-card p-8 rounded-2xl border border-zinc-800">
                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2 uppercase tracking-widest">E-mail</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lime-400 transition-colors"
                                    placeholder="seu@email.com"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full neon-bg hover:bg-lime-500 text-black font-black py-4 rounded-xl uppercase tracking-widest transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Enviar Link
                            </button>
                        </form>
                    ) : (
                        <div className="text-center py-6 animate-in fade-in zoom-in duration-300">
                            <div className="w-16 h-16 bg-lime-400/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-lime-400/30">
                                <i className="fa-solid fa-paper-plane text-lime-400 text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">E-mail Enviado!</h3>
                            <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
                                Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
                            </p>
                            <Link to="/login" className="text-lime-400 font-bold hover:underline uppercase tracking-widest text-xs">
                                Voltar para o Login
                            </Link>
                        </div>
                    )}

                    <div className="mt-8 text-center text-sm">
                        <Link to="/login" className="text-zinc-500 hover:text-white transition-colors">
                            Lembrou a senha? <span className="text-lime-400 font-bold ml-1">Fazer Login</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
