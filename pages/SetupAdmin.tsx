
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { userService } from '../services/firestore';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

const SetupAdmin: React.FC = () => {
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        console.log("SetupAdmin mounted. User:", user, "AuthLoading:", authLoading);
    }, [user, authLoading]);

    const handleMakeAdmin = async () => {
        if (!user) return;
        setLoading(true);
        try {
            console.log("Promoting user:", user.id);
            // Update the user's role to 'admin' in Firestore
            await userService.updateUser(user.id, { role: 'admin' });
            setMsg('Sucesso! Você agora é um Administrador. Recarregue a página ou faça login novamente.');

            // Wait a bit and redirect
            setTimeout(() => {
                navigate('/admin');
                window.location.reload(); // Force reload to update context
            }, 2000);
        } catch (error) {
            console.error("Error promoting user:", error);
            setMsg('Erro ao atualizar permissão: ' + (error as any).message);
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-gray-600">Carregando autenticação...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
                    <p className="mb-4">Por favor, faça login primeiro para usar esta ferramenta.</p>
                    <button
                        onClick={() => navigate('/login')}
                        className="bg-red-600 text-white px-6 py-2 rounded font-bold hover:bg-red-700 transition"
                    >
                        Ir para Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
                <div className="flex justify-center mb-4">
                    <ShieldAlert className="w-16 h-16 text-red-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Configuração de Admin</h1>
                <p className="text-gray-600 mb-6">
                    Esta ferramenta serve para promover seu usuário atual (<b>{user.email}</b>) para Administrador, permitindo acesso ao CRM.
                </p>

                {msg && (
                    <div className={`p-3 rounded mb-4 ${msg.includes('Erro') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {msg}
                    </div>
                )}

                <p className="text-sm text-gray-500 mb-4 bg-gray-50 p-2 rounded">
                    Cargo Atual: <span className="font-bold uppercase text-gray-800">{user.role}</span>
                </p>

                {user.role !== 'admin' ? (
                    <button
                        onClick={handleMakeAdmin}
                        disabled={loading}
                        className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-bold disabled:opacity-50"
                    >
                        {loading ? 'Processando...' : 'Tornar-me Admin'}
                    </button>
                ) : (
                    <button
                        onClick={() => navigate('/admin')}
                        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-bold"
                    >
                        Acessar Painel Admin
                    </button>
                )}
            </div>
            <p className="mt-8 text-gray-500 text-xs">Nota: Em produção, remova esta rota de acesso fácil.</p>
        </div>
    );
};

export default SetupAdmin;
