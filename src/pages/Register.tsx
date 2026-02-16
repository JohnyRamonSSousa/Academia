
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import PlanCard from '../components/enrollment/PlanCard';
import { CheckCircle, CreditCard, Lock, QrCode } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        plan: '',
        extras: [] as string[],
        paymentMethod: 'credit_card', // credit_card, pix
        cardNumber: '',
        cardName: '',
        cardExpiry: '',
        cardCvc: '',
    });

    const [loading, setLoading] = useState(false);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const plans = [
        {
            id: 'basic',
            name: 'Básico',
            price: '89,90',
            features: ['Acesso à Musculação', 'Sem taxa de matrícula', 'Acesso a 1 unidade'],
        },
        {
            id: 'intermediate',
            name: 'Intermediário',
            price: '129,90',
            features: ['Musculação + CrossFit', 'Aulas Coletivas', 'Sem taxa de matrícula'],
            recommended: true,
        },
        {
            id: 'premium',
            name: 'Premium',
            price: '169,90',
            features: ['Tudo do Intermediário', 'Lutas + Danças', 'Avaliação Física Mensal'],
        },
    ];

    const extrasOptions = [
        { id: 'lutas', name: 'Lutas (Muay Thai, Boxe)', price: 39.90 },
        { id: 'dancas', name: 'Danças (Zumba, FitDance)', price: 29.90 },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePlanSelect = (planId: string) => {
        setFormData({ ...formData, plan: planId });
    };

    const handleExtraToggle = (extraId: string) => {
        const currentExtras = formData.extras;
        if (currentExtras.includes(extraId)) {
            setFormData({ ...formData, extras: currentExtras.filter(id => id !== extraId) });
        } else {
            setFormData({ ...formData, extras: [...currentExtras, extraId] });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.plan) {
            alert('Por favor, selecione um plano.');
            return;
        }

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            console.log('Final Registration Data:', formData);
            setLoading(false);
            navigate('/dashboard');
        }, 2000);
    };

    const getPlanPrice = () => {
        const plan = plans.find(p => p.id === formData.plan);
        return plan ? parseFloat(plan.price.replace(',', '.')) : 0;
    };

    const getExtrasPrice = () => {
        return formData.extras.reduce((total, extraId) => {
            const extra = extrasOptions.find(e => e.id === extraId);
            return total + (extra ? extra.price : 0);
        }, 0);
    };

    const totalPrice = getPlanPrice() + getExtrasPrice();

    return (
        <AuthLayout
            title="Crie sua conta"
            subtitle="Comece sua jornada de transformação hoje mesmo."
        >
            <form onSubmit={handleSubmit} className="space-y-12">

                {/* 1. Dados Pessoais */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</div>
                        <h2 className="text-xl font-bold text-white">Dados Pessoais</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Nome Completo</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/30 focus:shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:border-gray-400 transition-all placeholder:text-gray-500"
                                placeholder="Seu nome"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">E-mail</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/30 focus:shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:border-gray-400 transition-all placeholder:text-gray-500"
                                placeholder="seu@email.com"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Telefone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/30 focus:shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:border-gray-400 transition-all placeholder:text-gray-500"
                                placeholder="(00) 00000-0000"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Senha</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/30 focus:shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:border-gray-400 transition-all placeholder:text-gray-500"
                                    placeholder="******"
                                    required
                                    minLength={6}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Confirmar Senha</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/30 focus:shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:border-gray-400 transition-all placeholder:text-gray-500"
                                    placeholder="******"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <hr className="border-gray-800" />

                {/* 2. Escolha seu Plano */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">2</div>
                        <h2 className="text-xl font-bold text-white">Escolha seu Plano</h2>
                    </div>

                    <div className="space-y-4">
                        {plans.map((plan) => (
                            <PlanCard
                                key={plan.id}
                                name={plan.name}
                                price={plan.price}
                                features={plan.features}
                                selected={formData.plan === plan.id}
                                onSelect={() => handlePlanSelect(plan.id)}
                                recommended={plan.recommended}
                            />
                        ))}
                    </div>

                    {formData.plan && formData.plan !== 'premium' && (
                        <div className="mt-6">
                            <h3 className="text-lg font-bold text-white mb-3">Adicionar Extras?</h3>
                            <div className="space-y-3">
                                {extrasOptions.map((extra) => (
                                    <div
                                        key={extra.id}
                                        onClick={() => handleExtraToggle(extra.id)}
                                        className={clsx(
                                            "p-4 rounded-lg border cursor-pointer flex justify-between items-center transition-colors",
                                            formData.extras.includes(extra.id)
                                                ? 'border-primary bg-primary/10'
                                                : 'border-gray-800 bg-gray-900 hover:border-gray-700'
                                        )}
                                    >
                                        <div>
                                            <p className="font-medium text-white">{extra.name}</p>
                                            <p className="text-sm text-gray-400">+ R$ {extra.price.toFixed(2).replace('.', ',')}</p>
                                        </div>
                                        <div className={clsx(
                                            "w-5 h-5 rounded border flex items-center justify-center",
                                            formData.extras.includes(extra.id) ? 'bg-primary border-primary' : 'border-gray-600'
                                        )}>
                                            {formData.extras.includes(extra.id) && <CheckCircle size={14} className="text-white" />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </section>

                <hr className="border-gray-800" />

                {/* 3. Pagamento */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">3</div>
                        <h2 className="text-xl font-bold text-white">Pagamento</h2>
                    </div>

                    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 space-y-6">
                        {/* Select Method */}
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, paymentMethod: 'credit_card' })}
                                className={clsx(
                                    "p-4 rounded-xl border flex flex-col items-center gap-2 transition-all",
                                    formData.paymentMethod === 'credit_card'
                                        ? "border-primary bg-primary/10 text-primary"
                                        : "border-gray-700 bg-gray-800 text-gray-400 hover:bg-gray-750"
                                )}
                            >
                                <CreditCard size={24} />
                                <span className="font-bold text-sm">Cartão de Crédito</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, paymentMethod: 'pix' })}
                                className={clsx(
                                    "p-4 rounded-xl border flex flex-col items-center gap-2 transition-all",
                                    formData.paymentMethod === 'pix'
                                        ? "border-primary bg-primary/10 text-primary"
                                        : "border-gray-700 bg-gray-800 text-gray-400 hover:bg-gray-750"
                                )}
                            >
                                <QrCode size={24} />
                                <span className="font-bold text-sm">Pix</span>
                            </button>
                        </div>

                        {/* Credit Card Form */}
                        {formData.paymentMethod === 'credit_card' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="space-y-4 pt-2"
                            >
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white">Número do Cartão</label>
                                    <div className="relative">
                                        <CreditCard className="absolute left-3 top-3 text-gray-500" size={20} />
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            value={formData.cardNumber}
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                            placeholder="0000 0000 0000 0000"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white">Nome no Cartão</label>
                                    <input
                                        type="text"
                                        name="cardName"
                                        value={formData.cardName}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                        placeholder="Como está impresso no cartão"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-white">Validade</label>
                                        <input
                                            type="text"
                                            name="cardExpiry"
                                            value={formData.cardExpiry}
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                            placeholder="MM/AA"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-white">CVV</label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
                                            <input
                                                type="text"
                                                name="cardCvc"
                                                value={formData.cardCvc}
                                                onChange={handleInputChange}
                                                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                                placeholder="123"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Pix Info */}
                        {formData.paymentMethod === 'pix' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="text-center p-4 bg-gray-800 rounded-lg"
                            >
                                <p className="text-gray-300 text-sm mb-4">
                                    Ao finalizar, um QR Code será gerado para o pagamento.
                                    A liberação do acesso é imediata após a confirmação.
                                </p>
                                <div className="flex justify-center">
                                    <QrCode size={64} className="text-white opacity-50" />
                                </div>
                            </motion.div>
                        )}
                    </div>
                </section>

                <hr className="border-gray-800" />

                {/* 4. Resumo */}
                <section className="bg-gray-900 rounded-xl p-6 border border-gray-800 sticky bottom-4 z-40 shadow-2xl">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <p className="text-gray-400 text-sm">Total Mensal</p>
                            <h3 className="text-3xl font-bold text-white">
                                R$ {totalPrice.toFixed(2).replace('.', ',')}
                            </h3>
                        </div>
                        <div className="text-right hidden md:block">
                            <p className="text-gray-400 text-sm">Plano Selecionado</p>
                            <p className="font-bold text-primary">{plans.find(p => p.id === formData.plan)?.name || 'Nenhum'}</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <input type="checkbox" required id="terms" className="rounded bg-gray-800 border-gray-700 text-primary focus:ring-primary" />
                            <label htmlFor="terms">Li e aceito os <a href="#" className="text-primary hover:underline">termos de uso</a> e contrato.</label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={clsx(
                                "w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg uppercase tracking-wide transition-all shadow-lg shadow-green-900/20 flex items-center justify-center gap-2",
                                loading && "opacity-70 cursor-wait"
                            )}
                        >
                            {loading ? (
                                <>Processing...</>
                            ) : (
                                <>Finalizar Matrícula <CheckCircle size={20} /></>
                            )}
                        </button>
                    </div>
                </section>
            </form>
        </AuthLayout>
    );
};

export default Register;
