
import React from 'react';
import { Users, CreditCard, TrendingUp, AlertCircle, ArrowUpRight, DollarSign } from 'lucide-react';

const AdminDashboard: React.FC = () => {
    // Mock Data
    const stats = [
        { title: 'Total de Alunos', value: '154', icon: Users, change: '+12%', color: 'blue' },
        { title: 'Receita Mensal', value: 'R$ 15.420', icon: DollarSign, change: '+8%', color: 'green' },
        { title: 'Novas Matrículas', value: '24', icon: TrendingUp, change: '+5%', color: 'purple' },
        { title: 'Pagamentos Pendentes', value: '12', icon: AlertCircle, change: '-2%', color: 'yellow' },
    ];

    const recentActivity = [
        { id: 1, user: 'Ana Paula', action: 'realizou matrícula', time: '2 horas atrás' },
        { id: 2, user: 'Carlos Silva', action: 'renovou plano mensal', time: '4 horas atrás' },
        { id: 3, user: 'Marcos Oliveira', action: 'fez check-in na unidade', time: '5 horas atrás' },
        { id: 4, user: 'Julia Santos', action: 'atualizou perfil', time: '1 dia atrás' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-heading mb-2 text-white">Painel Administrativo</h1>
                <p className="text-gray-400">Visão geral do desempenho da academia.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-lg bg-${stat.color}-500/20 text-${stat.color}-500`}>
                                    <Icon size={24} />
                                </div>
                                <div className="flex items-center gap-1 text-green-500 text-sm font-bold bg-green-500/10 px-2 py-1 rounded-full">
                                    {stat.change} <ArrowUpRight size={14} />
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                            <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity */}
                <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
                    <h2 className="text-xl font-bold text-white mb-6">Atividade Recente</h2>
                    <div className="space-y-6">
                        {recentActivity.map((activity) => (
                            <div key={activity.id} className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center font-bold text-gray-400 border border-gray-700">
                                    {activity.user.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-white text-sm">
                                        <span className="font-bold">{activity.user}</span> {activity.action}
                                    </p>
                                    <p className="text-xs text-gray-500">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions Placeholder */}
                <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
                    <h2 className="text-xl font-bold text-white mb-6">Ações Rápidas</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="bg-primary/10 border border-primary/20 hover:bg-primary/20 text-primary p-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-colors">
                            <Users size={24} />
                            <span className="font-bold">Matricular Aluno</span>
                        </button>
                        <button className="bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 text-green-500 p-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-colors">
                            <DollarSign size={24} />
                            <span className="font-bold">Registrar Pagamento</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
