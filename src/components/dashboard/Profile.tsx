
import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Save, Camera } from 'lucide-react';

const ProfileView: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: 'João Silva',
        email: 'joao.silva@email.com',
        phone: '(11) 99999-9999',
        currentPassword: '',
        newPassword: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsEditing(false);
        // TODO: Implement update logic
    };

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold font-heading mb-8 text-white">Meu Perfil</h1>

            <div className="grid gap-8">
                {/* Profile Header */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                    <div className="relative group cursor-pointer">
                        <div className="w-24 h-24 rounded-full border-4 border-gray-800 overflow-hidden relative">
                            <img
                                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera size={24} className="text-white" />
                            </div>
                        </div>
                        <div className="absolute bottom-0 right-0 bg-primary rounded-full p-1.5 border-2 border-gray-900">
                            <User size={12} className="text-white" />
                        </div>
                    </div>

                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-white mb-1">{formData.name}</h2>
                        <p className="text-gray-400">Membro desde Fev/2026</p>
                        <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                            <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs font-medium">Intermediário</span>
                            <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs font-medium">ID: #12345</span>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className={`px-6 py-2 rounded-lg font-bold transition-colors ${isEditing
                                ? 'bg-gray-800 text-white hover:bg-gray-700'
                                : 'bg-primary text-white hover:bg-red-700'
                            }`}
                    >
                        {isEditing ? 'Cancelar' : 'Editar Perfil'}
                    </button>
                </div>

                {/* Personal Info Form */}
                <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-white mb-1">Informações Pessoais</h3>
                        <p className="text-sm text-gray-500">Atualize seus dados de contato.</p>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Nome Completo</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 text-gray-500" size={18} />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="w-full bg-gray-950 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Telefone</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3 text-gray-500" size={18} />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="w-full bg-gray-950 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">E-mail</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    disabled
                                    className="w-full bg-gray-950 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-gray-400 cursor-not-allowed"
                                />
                            </div>
                            <p className="text-xs text-gray-500">O e-mail não pode ser alterado.</p>
                        </div>

                        {isEditing && (
                            <div className="pt-6 border-t border-gray-800 animate-in fade-in slide-in-from-top-4 duration-300">
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-white mb-1">Alterar Senha</h3>
                                    <p className="text-sm text-gray-500">Deixe em branco para manter a atual.</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Senha Atual</label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
                                            <input
                                                type="password"
                                                name="currentPassword"
                                                value={formData.currentPassword}
                                                onChange={handleInputChange}
                                                className="w-full bg-gray-950 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-primary transition-colors"
                                                placeholder="••••••"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Nova Senha</label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
                                            <input
                                                type="password"
                                                name="newPassword"
                                                value={formData.newPassword}
                                                onChange={handleInputChange}
                                                className="w-full bg-gray-950 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-primary transition-colors"
                                                placeholder="••••••"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {isEditing && (
                            <div className="flex justify-end pt-4">
                                <button
                                    type="submit"
                                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-transform active:scale-95 shadow-lg shadow-green-900/20"
                                >
                                    <Save size={20} />
                                    Salvar Alterações
                                </button>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileView;
