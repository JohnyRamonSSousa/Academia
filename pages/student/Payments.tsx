
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { paymentService } from '../../services/firestore';
import { Payment } from '../../types';

const StudentPayments: React.FC = () => {
    const { user } = useAuth();
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPayments = async () => {
            if (!user) return;
            try {
                const data = await paymentService.getStudentPayments(user.id);
                setPayments(data);
            } catch (error) {
                console.error("Error fetching payments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, [user]);

    if (loading) return <div className="text-center p-10">Carregando histórico...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Meus Pagamentos</h1>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Método</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {payments.length > 0 ? (
                            payments.map((payment) => {
                                let paymentDateString = 'N/A';
                                if (payment.data_pagamento && typeof payment.data_pagamento.toDate === 'function') {
                                    paymentDateString = payment.data_pagamento.toDate().toLocaleDateString();
                                } else if (payment.data_pagamento) {
                                    paymentDateString = new Date(payment.data_pagamento).toLocaleDateString();
                                }

                                return (
                                    <tr key={payment.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {paymentDateString}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {payment.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{payment.metodo_pagamento}</td>
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
                                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">Você ainda não realizou pagamentos.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentPayments;
