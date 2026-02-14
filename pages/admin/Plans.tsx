
import React, { useEffect, useState } from 'react';
import { planService } from '../../services/firestore';
import { Plan } from '../../types';
import { Trash2, Plus } from 'lucide-react';

const Plans: React.FC = () => {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        nome_plano: '',
        valor: '',
        duracao_dias: '',
        descricao: ''
    });

    const fetchPlans = async () => {
        setLoading(true);
        try {
            const data = await planService.getPlans();
            setPlans(data);
        } catch (error) {
            console.error("Error fetching plans:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await planService.createPlan({
                nome_plano: formData.nome_plano,
                valor: Number(formData.valor),
                duracao_dias: Number(formData.duracao_dias),
                descricao: formData.descricao
            });

            // Reset form
            setFormData({
                nome_plano: '',
                valor: '',
                duracao_dias: '',
                descricao: ''
            });
            setIsCreating(false);
            fetchPlans();
        } catch (error) {
            console.error("Error creating plan:", error);
            alert("Erro ao criar plano");
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Tem certeza que deseja excluir este plano?")) {
            try {
                await planService.deletePlan(id);
                fetchPlans();
            } catch (error) {
                console.error("Error deleting plan:", error);
            }
        }
    };

    if (loading && !plans.length) {
        return <div className="text-center p-10">Carregando planos...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Gerenciar Planos</h1>
                <button
                    onClick={() => setIsCreating(!isCreating)}
                    className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                    <Plus size={20} />
                    <span>Novo Plano</span>
                </button>
            </div>

            {isCreating && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8 animate-in fade-in slide-in-from-top-4">
                    <h3 className="text-lg font-bold mb-4 text-gray-800">Novo Plano</h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Plano</label>
                            <input
                                type="text"
                                name="nome_plano"
                                required
                                value={formData.nome_plano}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
                            <input
                                type="number"
                                name="valor"
                                step="0.01"
                                required
                                value={formData.valor}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Duração (Dias)</label>
                            <input
                                type="number"
                                name="duracao_dias"
                                required
                                value={formData.duracao_dias}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                            <input
                                type="text"
                                name="descricao"
                                required
                                value={formData.descricao}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                        <div className="col-span-1 md:col-span-2 flex justify-end space-x-3 mt-2">
                            <button
                                type="button"
                                onClick={() => setIsCreating(false)}
                                className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                Salvar Plano
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.map((plan) => (
                    <div key={plan.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold text-gray-900">{plan.nome_plano}</h3>
                                <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded-full">
                                    {plan.duracao_dias} dias
                                </span>
                            </div>
                            <p className="text-3xl font-bold text-gray-800 mb-4">
                                {plan.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </p>
                            <p className="text-gray-600 text-sm mb-4">{plan.descricao}</p>
                        </div>
                        <div className="border-t pt-4 mt-2 flex justify-end">
                            <button
                                onClick={() => handleDelete(plan.id)}
                                className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors"
                                title="Excluir Plano"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                ))}

                {!plans.length && !loading && (
                    <div className="col-span-full text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                        <p className="text-gray-500">Nenhum plano cadastrado.</p>
                        <button
                            onClick={() => setIsCreating(true)}
                            className="mt-2 text-red-600 font-medium hover:underline"
                        >
                            Criar primeiro plano
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Plans;
