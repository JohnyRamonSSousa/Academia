
import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PLANS = [
    { id: 'basic', name: 'Básico', price: 89.90, desc: 'Ideal para iniciantes na musculação' },
    { id: 'pro', name: 'Pro', price: 129.90, desc: 'Resultados acelerados com suporte' },
    { id: 'elite', name: 'Elite', price: 199.90, desc: 'A experiência fitness completa' }
];

const ADDONS = [
    { id: 'luta', name: 'Lutas (Muay Thai/Boxe)', price: 40.00, icon: 'fa-hand-fist' },
    { id: 'danca', name: 'Dança (Ritmos/Zumba)', price: 30.00, icon: 'fa-music' },
    { id: 'personal', name: 'Personal Trainer Extra', price: 150.00, icon: 'fa-user-ninja' },
    { id: 'nutri', name: 'Plano Nutricional', price: 60.00, icon: 'fa-apple-whole' }
];

const JoinNow: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [selectedPlan, setSelectedPlan] = useState('pro');
    const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
    const navigate = useNavigate();

    const toggleAddon = (id: string) => {
        setSelectedAddons(prev =>
            prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
        );
    };

    const totalPrice = useMemo(() => {
        const planPrice = PLANS.find(p => p.id === selectedPlan)?.price || 0;
        const addonsPrice = selectedAddons.reduce((total, id) => {
            return total + (ADDONS.find(a => a.id === id)?.price || 0);
        }, 0);
        return planPrice + addonsPrice;
    }, [selectedPlan, selectedAddons]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Registration details:', { ...formData, selectedPlan, selectedAddons, totalPrice });

        // Pass state to payment page
        navigate('/payment', {
            state: {
                totalPrice,
                planName: PLANS.find(p => p.id === selectedPlan)?.name,
                addons: selectedAddons.map(id => ADDONS.find(a => a.id === id))
            }
        });
    };

    return (
        <div className="min-h-screen bg-zinc-950 px-4 py-20 lg:py-32">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div>
                    <h1 className="text-5xl md:text-7xl font-black text-white leading-none mb-8">
                        CONFIGURE <br />
                        <span className="neon-accent">SUA JORNADA</span>
                    </h1>
                    <p className="text-xl text-zinc-400 leading-relaxed mb-10">
                        Personalize seu plano adicionando as modalidades que você ama. Construa sua melhor versão na JE Academia.
                    </p>

                    <div className="space-y-8 bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800">
                        <h3 className="text-xl font-bold text-white uppercase tracking-widest mb-4">Resumo do Plano</h3>
                        <div className="flex justify-between items-center text-zinc-300 pb-4 border-b border-zinc-800">
                            <span>Plano {PLANS.find(p => p.id === selectedPlan)?.name}</span>
                            <span className="font-bold">R$ {PLANS.find(p => p.id === selectedPlan)?.price.toFixed(2)}</span>
                        </div>

                        {selectedAddons.length > 0 && (
                            <div className="space-y-2 pb-4 border-b border-zinc-800">
                                <span className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Serviços Adicionais</span>
                                {selectedAddons.map(id => {
                                    const addon = ADDONS.find(a => a.id === id);
                                    return (
                                        <div key={id} className="flex justify-between items-center text-sm text-zinc-400">
                                            <span>{addon?.name}</span>
                                            <span>R$ {addon?.price.toFixed(2)}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        <div className="flex justify-between items-end">
                            <div>
                                <span className="text-xs text-zinc-500 uppercase tracking-widest block mb-1">Total Mensal</span>
                                <span className="text-4xl font-black text-lime-400 italic">R$ {totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center text-zinc-500 text-xs">
                                <i className="fa-solid fa-lock mr-2"></i> Ambientes SEGURO
                            </div>
                        </div>
                    </div>
                </div>

                <div className="glass-card p-8 md:p-12 rounded-3xl border border-zinc-800">
                    <form onSubmit={handleSubmit} className="space-y-10">
                        <div className="space-y-6">
                            <h4 className="text-sm font-black text-lime-400 uppercase tracking-[0.3em]">1. Seus Dados</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-widest">Nome</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-lime-400 transition-colors"
                                        placeholder="João Silva"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-widest">WhatsApp</label>
                                    <input
                                        type="tel"
                                        required
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-lime-400 transition-colors"
                                        placeholder="(00) 00000-0000"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-sm font-black text-lime-400 uppercase tracking-[0.3em]">2. Escolha o Plano Base</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {PLANS.map(plan => (
                                    <button
                                        key={plan.id}
                                        type="button"
                                        onClick={() => setSelectedPlan(plan.id)}
                                        className={`p-4 rounded-2xl border text-left transition-all ${selectedPlan === plan.id
                                            ? 'bg-lime-400 border-lime-400 text-black'
                                            : 'bg-zinc-900 border-zinc-800 text-white hover:border-zinc-700'
                                            }`}
                                    >
                                        <div className="text-sm font-black uppercase mb-1">{plan.name}</div>
                                        <div className="text-[10px] opacity-70 leading-tight mb-2 h-8">{plan.desc}</div>
                                        <div className="font-black">R$ {plan.price.toFixed(2)}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-sm font-black text-lime-400 uppercase tracking-[0.3em]">3. Adicione Serviços Extras</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {ADDONS.map(addon => (
                                    <button
                                        key={addon.id}
                                        type="button"
                                        onClick={() => toggleAddon(addon.id)}
                                        className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${selectedAddons.includes(addon.id)
                                            ? 'bg-zinc-800 border-lime-400 text-white'
                                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                                            }`}
                                    >
                                        <div className="flex items-center">
                                            <i className={`fa-solid ${addon.icon} mr-3 w-5 text-center`}></i>
                                            <div className="text-left">
                                                <div className="text-xs font-bold uppercase">{addon.name}</div>
                                                <div className="text-[10px] opacity-70">+ R$ {addon.price.toFixed(2)}/mês</div>
                                            </div>
                                        </div>
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedAddons.includes(addon.id) ? 'bg-lime-400 border-lime-400' : 'border-zinc-700'
                                            }`}>
                                            {selectedAddons.includes(addon.id) && <i className="fa-solid fa-check text-black text-[10px]"></i>}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full neon-bg hover:bg-lime-500 text-black font-black py-5 rounded-2xl uppercase tracking-[0.2em] transition-all transform hover:scale-[1.02] shadow-lg shadow-lime-500/20 mt-8"
                        >
                            Matricular Agora
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default JoinNow;
