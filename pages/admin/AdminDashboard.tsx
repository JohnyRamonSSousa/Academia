
import React, { useEffect, useState } from 'react';
import { userService, paymentService } from '../../services/firestore';
import { User, Payment } from '../../types';
import { Users, DollarSign, AlertCircle, Activity } from 'lucide-react';

interface DashboardStats {
    activeStudents: number;
    overdueStudents: number;
    monthlyRevenue: number;
    totalStudents: number;
}

const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState<DashboardStats>({
        activeStudents: 0,
        overdueStudents: 0,
        monthlyRevenue: 0,
        totalStudents: 0
    });
    const [recentPayments, setRecentPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const users = await userService.getAllUsers();
                const payments = await paymentService.getPayments();

                const students = users.filter(u => u.role === 'student');
                const active = students.filter(u => u.status === 'ativo').length;
                const overdue = students.filter(u => u.status === 'vencido').length;

                // Calculate current month revenue
                const now = new Date();
                const currentMonth = now.getMonth();
                const currentYear = now.getFullYear();

                const revenue = payments.reduce((acc, payment) => {
                    if (payment.status === 'pago') {
                        // Handle both Firestore Timestamp and Date objects
                        let paymentDate: Date;
                        if (payment.data_pagamento && typeof payment.data_pagamento.toDate === 'function') {
                            paymentDate = payment.data_pagamento.toDate();
                        } else if (payment.data_pagamento) {
                            paymentDate = new Date(payment.data_pagamento);
                        } else {
                            return acc;
                        }

                        if (paymentDate.getMonth() === currentMonth && paymentDate.getFullYear() === currentYear) {
                            return acc + Number(payment.valor);
                        }
                    }
                    return acc;
                }, 0);

                setStats({
                    activeStudents: active,
                    overdueStudents: overdue,
                    monthlyRevenue: revenue,
                    totalStudents: students.length
                });

                setRecentPayments(payments.slice(0, 5));
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="text-center p-10">Carregando dados...</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard Geral</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Active Students */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase">Alunos Ativos</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.activeStudents}</h3>
                        </div>
                        <div className="p-2 bg-green-100 rounded-lg text-green-600">
                            <Users size={20} />
                        </div>
                    </div>
                </div>

                {/* Overdue Students */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase">Vencidos</p>
                            <h3 className="text-2xl font-bold text-red-600 mt-1">{stats.overdueStudents}</h3>
                        </div>
                        <div className="p-2 bg-red-100 rounded-lg text-red-600">
                            <AlertCircle size={20} />
                        </div>
                    </div>
                </div>

                {/* Monthly Revenue */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase">Faturamento (Mês)</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">
                                {stats.monthlyRevenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </h3>
                        </div>
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                            <DollarSign size={20} />
                        </div>
                    </div>
                </div>

                {/* Total Students (Activity) */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase">Total de Alunos</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.totalStudents}</h3>
                        </div>
                        <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                            <Activity size={20} />
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="text-lg font-bold mb-4 text-gray-800">Últimos Pagamentos</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aluno</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Método</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {recentPayments.length > 0 ? (
                            recentPayments.map((payment) => {
                                let paymentDateString = 'N/A';
                                if (payment.data_pagamento && typeof payment.data_pagamento.toDate === 'function') {
                                    paymentDateString = payment.data_pagamento.toDate().toLocaleDateString();
                                } else if (payment.data_pagamento) {
                                    paymentDateString = new Date(payment.data_pagamento).toLocaleDateString();
                                }

                                return (
                                    <tr key={payment.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.nome_usuario}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {payment.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{payment.metodo_pagamento}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {paymentDateString}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${payment.status === 'pago' ? 'bg-green-100 text-green-800' :
                                                    payment.status === 'pendente' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                                {payment.status}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">Nenhum pagamento recente.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
