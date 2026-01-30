
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate login
        console.log('Login attempt:', { email, password });
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-20">
            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <Link to="/" className="inline-block mb-6">
                        <span className="text-3xl font-black tracking-tighter text-white">JE<span className="neon-accent"> ACADEMIA</span></span>
                    </Link>
                    <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Bem-vindo de volta</h2>
                    <p className="text-zinc-400 mt-2">Acesse sua conta para ver seu progresso</p>
                </div>

                <div className="glass-card p-8 rounded-2xl border border-zinc-800">
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
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2 uppercase tracking-widest">Senha</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lime-400 transition-colors"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center text-zinc-400 cursor-pointer">
                                <input type="checkbox" className="mr-2 rounded border-zinc-800 bg-zinc-900 text-lime-400 focus:ring-lime-400" />
                                Lembrar de mim
                            </label>
                            <Link to="/forgot-password" virtual:custom-link-title="Forgot Password Link" className="text-lime-400 hover:text-lime-300">Esqueceu a senha?</Link>
                        </div>
                        <button
                            type="submit"
                            className="w-full neon-bg hover:bg-lime-500 text-black font-black py-4 rounded-xl uppercase tracking-widest transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Entrar
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-zinc-400">
                        Não tem uma conta?{' '}
                        <Link to="/join" className="text-lime-400 font-bold hover:underline">
                            Garantir minha vaga
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
