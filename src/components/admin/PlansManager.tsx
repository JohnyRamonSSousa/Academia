
import React from 'react';
import { Edit, Check, Plus } from 'lucide-react';

const PlansManager: React.FC = () => {
    const plans = [
        {
            id: 'basic',
            name: 'Básico',
            price: '89,90',
            active_users: 45,
            features: ['Acesso à Musculação', 'Sem taxa de matrícula', 'Acesso a 1 unidade'],
        },
        {
            id: 'intermediate',
            name: 'Intermediário',
            price: '129,90',
            active_users: 82,
            features: ['Musculação + CrossFit', 'Aulas Coletivas', 'Sem taxa de matrícula'],
        },
        {
            id: 'premium',
            name: 'Premium',
            price: '169,90',
            active_users: 27,
            features: ['Tudo do Intermediário', 'Lutas + Danças', 'Avaliação Física Mensal'],
        },
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-heading text-white">Gerenciar Planos</h1>
                    <p className="text-gray-400">Configure os planos e preços da academia.</p>
                </div>
                <button className="bg-primary hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors">
                    <Plus size={20} />
                    Novo Plano
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                    <div key={plan.id} className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-gray-800">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                                <button className="text-gray-400 hover:text-primary transition-colors">
                                    <Edit size={18} />
                                </button>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-gray-400">R$</span>
                                <span className="text-3xl font-bold text-white">{plan.price}</span>
                                <span className="text-gray-400">/mês</span>
                            </div>
                            <p className="text-sm text-green-500 mt-2 font-medium">{plan.active_users} alunos ativos</p>
                        </div>

                        <div className="p-6 flex-1 bg-gray-900/50">
                            <h4 className="text-sm font-bold text-gray-500 uppercase mb-4">Incluso</h4>
                            <ul className="space-y-3">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                                        <Check size={14} className="text-primary mt-1 shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlansManager;
