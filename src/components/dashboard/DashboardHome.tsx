
import React from 'react';
import { Calendar, CreditCard, Activity, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardHome: React.FC = () => {
    // Mock Data
    const student = {
        id: '#12345',
        plan: 'Intermediário',
        startDate: '10/02/2026',
        nextPayment: '10/03/2026',
        status: 'Ativo',
        modalities: ['Musculação', 'CrossFit'],
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-heading mb-2 text-white">Olá, João!</h1>
                <p className="text-gray-400">Bem-vindo ao seu painel do aluno.</p>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                    <div className="flex justify-between items-start mb-4">
                        <div className="bg-primary/20 p-3 rounded-lg text-primary">
                            <Activity size={24} />
                        </div>
                        <span className="bg-green-500/20 text-green-500 text-xs px-2 py-1 rounded-full uppercase font-bold">
                            {student.status}
                        </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-1">Plano Atual</p>
                    <h3 className="text-xl font-bold text-white">{student.plan}</h3>
                </div>

                <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                    <div className="flex justify-between items-start mb-4">
                        <div className="bg-blue-500/20 p-3 rounded-lg text-blue-500">
                            <Calendar size={24} />
                        </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-1">Próximo Vencimento</p>
                    <h3 className="text-xl font-bold text-white">{student.nextPayment}</h3>
                </div>

                <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                    <div className="flex justify-between items-start mb-4">
                        <div className="bg-purple-500/20 p-3 rounded-lg text-purple-500">
                            <CreditCard size={24} />
                        </div>
                        <span className="bg-yellow-500/20 text-yellow-500 text-xs px-2 py-1 rounded-full uppercase font-bold">
                            Pendente
                        </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-1">Status Financeiro</p>
                    <h3 className="text-xl font-bold text-white">Pagamento Pendente</h3>
                </div>

                <div className="bg-primary p-6 rounded-xl border border-primary relative overflow-hidden group cursor-pointer hover:bg-red-700 transition-colors">
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold text-white mb-2">Treino do Dia</h3>
                        <p className="text-white/80 text-sm mb-4">Confira o WOD de hoje e prepare-se!</p>
                        <div className="flex items-center gap-2 font-bold text-white">
                            Ver Treino <ArrowUpRight size={16} />
                        </div>
                    </div>
                    <Activity className="absolute -bottom-4 -right-4 w-32 h-32 text-white/10 group-hover:scale-110 transition-transform duration-300" />
                </div>
            </div>

            {/* Active Modalities */}
            <div>
                <h2 className="text-xl font-bold text-white mb-4">Suas Modalidades</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {student.modalities.map((modality) => (
                        <div key={modality} className="bg-gray-900 p-4 rounded-xl border border-gray-800 flex items-center justify-between">
                            <span className="font-medium text-white">{modality}</span>
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        </div>
                    ))}
                    <Link
                        to="/dashboard/modalities"
                        className="border-2 border-dashed border-gray-700 bg-transparent p-4 rounded-xl flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-colors gap-2"
                    >
                        <span>+ Adicionar Modalidade</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
