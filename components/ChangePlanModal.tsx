import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { User } from 'firebase/auth';

interface ChangePlanModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User;
    currentPlan: string;
    nextPaymentDate: string;
}

const PLANS = [
    { id: 'basic', name: 'Básico', price: 89.90, desc: 'Ideal para iniciantes' },
    { id: 'pro', name: 'Pro', price: 129.90, desc: 'Resultados acelerados' },
    { id: 'elite', name: 'Elite', price: 199.90, desc: 'Experiência completa' }
];

// Helper to parse "DD/MM/YYYY" or "DD MMM YYYY"
const parseDate = (dateStr: string): Date | null => {
    if (!dateStr) return null;
    // Handle "15 Jan 2027" format (if that's what's saved)
    // Or "31/01/2026"
    try {
        if (dateStr.includes('/')) {
            const [day, month, year] = dateStr.split('/');
            return new Date(Number(year), Number(month) - 1, Number(day));
        }
        return new Date(dateStr);
    } catch (e) {
        return null;
    }
};

const ChangePlanModal: React.FC<ChangePlanModalProps> = ({ isOpen, onClose, user, currentPlan, nextPaymentDate }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState('');

    if (!isOpen) return null;

    const paymentDate = parseDate(nextPaymentDate);
    const isLocked = paymentDate ? new Date() < paymentDate : false;

    const handleUpdatePlan = async () => {
        if (!selectedPlan) return;
        setIsLoading(true);
        try {
            const planName = PLANS.find(p => p.id === selectedPlan)?.name;
            await updateDoc(doc(db, 'users', user.uid), {
                plan: `Plano ${planName}`
            });
            alert('Plano atualizado com sucesso!');
            onClose();
        } catch (error: any) {
            console.error("Error updating plan:", error);
            alert(`Erro ao atualizar plano: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl max-w-md w-full relative z-10 animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-white text-xl font-black italic uppercase">Alterar Plano</h3>
                    <button onClick={onClose} className="text-zinc-500 hover:text-white">
                        <i className="fa-solid fa-times text-xl"></i>
                    </button>
                </div>

                {isLocked ? (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i className="fa-solid fa-lock text-zinc-500 text-2xl"></i>
                        </div>
                        <p className="text-zinc-400 text-sm mb-2">Seu plano atual ainda está ativo.</p>
                        <p className="text-white font-bold text-sm mb-6">
                            Troca disponível a partir de: <span className="text-lime-400">{nextPaymentDate}</span>
                        </p>
                        <button
                            onClick={onClose}
                            className="w-full py-4 bg-zinc-800 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-zinc-700 transition-all"
                        >
                            Entendi
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {PLANS.map(plan => (
                            <button
                                key={plan.id}
                                onClick={() => setSelectedPlan(plan.id)}
                                className={`w-full p-4 rounded-2xl border text-left transition-all ${selectedPlan === plan.id
                                    ? 'bg-lime-400 border-lime-400 text-black'
                                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                                    } ${currentPlan.toLowerCase().includes(plan.name.toLowerCase()) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={currentPlan.toLowerCase().includes(plan.name.toLowerCase())}
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-black uppercase text-sm">{plan.name}</span>
                                    <span className="font-bold text-xs">R$ {plan.price.toFixed(2)}</span>
                                </div>
                                <div className="text-[10px] opacity-70 mt-1">{plan.desc}</div>
                            </button>
                        ))}
                        <button
                            onClick={handleUpdatePlan}
                            disabled={!selectedPlan || isLoading}
                            className="w-full py-4 mt-4 neon-bg text-black rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-lime-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Atualizando...' : 'Confirmar Troca'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChangePlanModal;
