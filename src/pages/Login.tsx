
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import { LogIn } from 'lucide-react';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement actual login logic (Firebase)
        console.log('Login Data:', formData);
        // Simulate redirect
        navigate('/dashboard');
    };

    return (
        <AuthLayout
            title="Bem-vindo de volta"
            subtitle="Acesse sua conta para gerenciar seus treinos."
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">E-mail</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                        placeholder="seu@email.com"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-gray-300">Senha</label>
                        <Link to="#" className="text-xs text-primary hover:underline">
                            Esqueceu a senha?
                        </Link>
                    </div>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                        placeholder="******"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary hover:bg-red-700 text-white py-3 rounded-xl font-bold text-lg uppercase tracking-wide transition-all transform hover:scale-[1.02] shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                >
                    <LogIn size={20} />
                    Entrar
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-gray-400">
                    Ainda não tem uma conta?{' '}
                    <Link to="/register" className="text-primary font-bold hover:underline">
                        Matricule-se agora
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
};

export default Login;
