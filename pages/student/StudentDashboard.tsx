
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { userService, planService, paymentService } from '../../services/firestore';
import { Plan } from '../../types';
import { Timestamp } from 'firebase/firestore';
import { CreditCard, Calendar, CheckCircle, AlertCircle, ShoppingBag } from 'lucide-react';

const StudentDashboard: React.FC = () => {
    const { user } = useAuth();
    const [currentPlan, setCurrentPlan] = useState<Plan | null>(null);
    const [availablePlans, setAvailablePlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);

    // State to force refresh user data
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [userData, setUserData] = useState(user);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;
            setLoading(true);
            try {
                // Fetch fresh user data
                const freshUser = await userService.getUser(user.id);
                if (freshUser) setUserData(freshUser);

                // Fetch available plans
                const plans = await planService.getPlans();
                setAvailablePlans(plans);

                // Find current plan details if user has one
                if (freshUser?.plano) {
                    const plan = plans.find(p => p.id === freshUser.plano || p.nome_plano === freshUser.plano);
                    if (plan) setCurrentPlan(plan);
                }
            } catch (error) {
                console.error("Error fetching student data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user, refreshTrigger]);

    const handleSelectPlan = async (plan: Plan) => {
        if (!userData || isProcessing) return;

        if (window.confirm(`Deseja contratar o plano ${plan.nome_plano} por R$ ${plan.valor}?`)) {
            try {
                setIsProcessing(true);
                // In a real app, this would redirect to stripe/mercadopago
                await userService.updateUser(userData.id, { plano: plan.nome_plano }); // Store ID ideally, but name for simplicity in display
                setRefreshTrigger(prev => prev + 1);
                alert("Plano selecionado com sucesso! Agora realize o pagamento para ativar.");
            } catch (error) {
                console.error("Error selecting plan:", error);
                alert("Erro ao selecionar plano.");
            } finally {
                setIsProcessing(false);
            }
        }
    };

    const handleSimulatePayment = async () => {
        if (!userData || !currentPlan || isProcessing) return;

        if (window.confirm(`Simular pagamento de R$ ${currentPlan.valor} via PIX?`)) {
            setIsProcessing(true);
            try {
                // 1. Create Payment Record
                const now = new Date();
                const dueDate = new Date();
                dueDate.setDate(now.getDate() + currentPlan.duracao_dias);

                await paymentService.createPayment({
                    user_id: userData.id,
                    nome_usuario: userData.name,
                    valor: currentPlan.valor,
                    metodo_pagamento: 'pix', // Simulated
                    status: 'pago',
                    data_pagamento: Timestamp.fromDate(now),
                    data_vencimento_gerada: Timestamp.fromDate(dueDate)
                });

                // 2. Update User Status & Due Date
                await userService.updateUserStatus(userData.id, 'ativo', Timestamp.fromDate(dueDate));

                setRefreshTrigger(prev => prev + 1);
                alert("Pagamento confirmado! Sua matrícula está ativa.");

            } catch (error) {
                console.error("Error processing payment:", error);
                alert("Erro ao processar pagamento.");
            } finally {
                setIsProcessing(false);
            }
        }
    };

    if (loading) return <div className="text-center p-10">Carregando informações...</div>;

    const isOverdue = userData?.status === 'vencido';
    let dueDateString = 'Não disponível';
    if (userData?.data_vencimento) {
        if (userData.data_vencimento.toDate) {
            dueDateString = userData.data_vencimento.toDate().toLocaleDateString();
        } else {
            dueDateString = new Date(userData.data_vencimento).toLocaleDateString();
        }
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Olá, {userData?.name}</h1>

            {/* Status Card */}
            <div className={`p-6 rounded-lg shadow-sm border mb-8 flex flex-col md:flex-row justify-between items-center 
                ${isOverdue ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <div className={`p-3 rounded-full ${isOverdue ? 'bg-red-200 text-red-700' : 'bg-green-200 text-green-700'}`}>
                        {isOverdue ? <AlertCircle size={32} /> : <CheckCircle size={32} />}
                    </div>
                    <div>
                        <h2 className={`text-xl font-bold ${isOverdue ? 'text-red-800' : 'text-green-800'}`}>
                            Status: {userData?.status.toUpperCase()}
                        </h2>
                        <p className={`${isOverdue ? 'text-red-600' : 'text-green-600'}`}>
                            Vencimento: {dueDateString}
                        </p>
                    </div>
                </div>

                {currentPlan && isOverdue && (
                    <button
                        onClick={handleSimulatePayment}
                        disabled={isProcessing}
                        className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition shadow-md flex items-center space-x-2 font-bold"
                    >
                        <CreditCard size={20} />
                        <span>Pagar Mensalidade (R$ {currentPlan.valor})</span>
                    </button>
                )}
                {currentPlan && !isOverdue && (
                    <div className="text-green-700 font-semibold bg-green-100 px-4 py-2 rounded-lg">
                        Mensalidade em dia!
                    </div>
                )}
            </div>

            {/* Current Plan or Selection */}
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <ShoppingBag className="mr-2" size={20} />
                {currentPlan ? 'Meu Plano' : 'Escolha um Plano'}
            </h2>

            {currentPlan ? (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 max-w-md">
                    <h3 className="text-xl font-bold text-gray-900">{currentPlan.nome_plano}</h3>
                    <div className="mt-2 text-gray-600">
                        <p>{currentPlan.descricao}</p>
                        <p className="mt-2 font-semibold">Valor: R$ {currentPlan.valor.toFixed(2)}</p>
                        <p>Duração: {currentPlan.duracao_dias} dias</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availablePlans.map(plan => (
                        <div key={plan.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between hover:border-red-300 transition">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{plan.nome_plano}</h3>
                                <p className="text-2xl font-bold text-gray-800 my-2">R$ {plan.valor.toFixed(2)}</p>
                                <p className="text-sm text-gray-600 mb-4">{plan.descricao}</p>
                            </div>
                            <button
                                onClick={() => handleSelectPlan(plan)}
                                disabled={isProcessing}
                                className="w-full bg-zinc-800 text-white py-2 rounded hover:bg-zinc-700 transition"
                            >
                                Contratar Plano
                            </button>
                        </div>
                    ))}
                    {availablePlans.length === 0 && <p className="text-gray-500">Nenhum plano disponível no momento.</p>}
                </div>
            )}
        </div>
    );
};

export default StudentDashboard;
