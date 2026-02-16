
import React from 'react';
import { Check, Calendar } from 'lucide-react';

const MyPlan: React.FC = () => {
    const planDetails = {
        name: 'Intermediário',
        price: '129,90',
        startDate: '10/02/2026',
        renewalDate: '10/03/2026',
        features: ['Musculação + CrossFit', 'Aulas Coletivas', 'Sem taxa de matrícula', 'Acesso a todas unidades'],
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold font-heading mb-8 text-white">Meu Plano</h1>

            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary/10 w-64 h-64 rounded-bl-full -mr-16 -mt-16 pointer-events-none" />

                <div className="flex flex-col md:flex-row justify-between items-start gap-8 relative z-10">
                    <div>
                        <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide mb-4 inline-block">
                            Ativo
                        </span>
                        <h2 className="text-4xl font-bold text-white mb-2">{planDetails.name}</h2>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-gray-400">R$</span>
                            <span className="text-3xl font-bold text-white">{planDetails.price}</span>
                            <span className="text-gray-400">/mês</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-400 mb-8">
                            <Calendar size={18} className="text-primary" />
                            <span>Vencimento: <strong className="text-white">{planDetails.renewalDate}</strong></span>
                        </div>

                        <div className="flex gap-4">
                            <button className="bg-white text-dark px-6 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors">
                                Renovar Agora
                            </button>
                            <button className="bg-gray-800 text-white px-6 py-2 rounded-lg font-bold hover:bg-gray-700 transition-colors border border-gray-700">
                                Trocar Plano
                            </button>
                        </div>
                    </div>

                    <div className="bg-black/30 p-6 rounded-xl border border-gray-800 w-full md:w-auto md:min-w-[300px]">
                        <h3 className="font-bold text-white mb-4">Benefícios Inclusos</h3>
                        <ul className="space-y-3">
                            {planDetails.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-gray-300 text-sm">
                                    <div className="bg-green-500/20 p-1 rounded-full mt-0.5">
                                        <Check size={12} className="text-green-500" />
                                    </div>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPlan;
