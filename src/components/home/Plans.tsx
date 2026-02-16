
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Plans: React.FC = () => {
    const plans = [
        {
            name: 'Básico',
            price: '89,90',
            features: ['Acesso à Musculação', 'Sem taxa de matrícula', 'Acesso a 1 unidade'],
            highlight: false,
        },
        {
            name: 'Intermediário',
            price: '129,90',
            features: ['Musculação + CrossFit', 'Aulas Coletivas', 'Sem taxa de matrícula', 'Acesso a todas unidades'],
            highlight: true,
        },
        {
            name: 'Premium',
            price: '169,90',
            features: ['Tudo do Intermediário', 'Lutas + Danças', 'Avaliação Física Mensal', 'Convite para amigo (2x/mês)'],
            highlight: false,
        },
    ];

    return (
        <section id="plans" className="py-20 bg-dark">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold mb-4 font-heading"
                    >
                        Escolha seu <span className="text-primary">Plano</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-gray-400 max-w-2xl mx-auto"
                    >
                        Planos flexíveis que se adaptam ao seu objetivo e orçamento. Comece hoje mesmo!
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`relative bg-gray-900 rounded-2xl p-8 border ${plan.highlight ? 'border-primary transform scale-105 shadow-2xl shadow-primary/20' : 'border-gray-800'
                                } flex flex-col`}
                        >
                            {plan.highlight && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                                    Mais Popular
                                </div>
                            )}
                            <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-sm text-gray-400">R$</span>
                                <span className="text-4xl font-bold text-white">{plan.price}</span>
                                <span className="text-sm text-gray-400">/mês</span>
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-300">
                                        <Check className="text-primary shrink-0" size={20} />
                                        <span className="text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link
                                to="/register"
                                className={`w-full py-3 rounded-xl font-bold text-center transition-colors uppercase tracking-wide ${plan.highlight
                                        ? 'bg-primary hover:bg-red-700 text-white'
                                        : 'bg-gray-800 hover:bg-gray-700 text-white'
                                    }`}
                            >
                                Escolher {plan.name}
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Plans;
