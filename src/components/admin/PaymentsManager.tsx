
import React, { useState } from 'react';
import { Search, CheckCircle, Clock, DollarSign, Filter } from 'lucide-react';
import clsx from 'clsx';

const PaymentsManager: React.FC = () => {
    const [filter, setFilter] = useState('all'); // all, paid, pending

    // Mock Data
    const payments = [
        { id: 101, student: 'João Silva', amount: '129,90', date: '10/02/2026', status: 'paid', ref: 'Fev/2026' },
        { id: 102, student: 'Maria Souza', amount: '89,90', date: '12/02/2026', status: 'pending', ref: 'Fev/2026' },
        { id: 103, student: 'Pedro Santos', amount: '169,90', date: '15/02/2026', status: 'paid', ref: 'Fev/2026' },
        { id: 104, student: 'Ana Oliveira', amount: '129,90', date: '20/02/2026', status: 'pending', ref: 'Fev/2026' },
        { id: 105, student: 'Carlos Lima', amount: '89,90', date: '05/02/2026', status: 'paid', ref: 'Jan/2026' },
    ];

    const filteredPayments = payments.filter(p => {
        if (filter === 'all') return true;
        return p.status === filter;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-heading text-white">Gerenciar Financeiro</h1>
                    <p className="text-gray-400">Controle de pagamentos e mensalidades.</p>
                </div>

                <div className="flex gap-2">
                    {['all', 'paid', 'pending'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={clsx(
                                "px-4 py-2 rounded-lg font-medium text-sm transition-colors capitalize",
                                filter === f
                                    ? "bg-primary text-white"
                                    : "bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800"
                            )}
                        >
                            {f === 'all' ? 'Todos' : f === 'paid' ? 'Pagos' : 'Pendentes'}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-800/50 text-gray-400 text-sm uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-medium">Aluno</th>
                                <th className="px-6 py-4 font-medium">Referência</th>
                                <th className="px-6 py-4 font-medium">Data Venc.</th>
                                <th className="px-6 py-4 font-medium">Valor</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {filteredPayments.map((payment) => (
                                <tr key={payment.id} className="hover:bg-gray-800/30 transition-colors">
                                    <td className="px-6 py-4 font-bold text-white">{payment.student}</td>
                                    <td className="px-6 py-4 text-gray-400">{payment.ref}</td>
                                    <td className="px-6 py-4 text-gray-400">{payment.date}</td>
                                    <td className="px-6 py-4 text-white">R$ {payment.amount}</td>
                                    <td className="px-6 py-4">
                                        <span className={clsx(
                                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide",
                                            payment.status === 'paid' ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"
                                        )}>
                                            {payment.status === 'paid' ? <CheckCircle size={12} /> : <Clock size={12} />}
                                            {payment.status === 'paid' ? 'Pago' : 'Pendente'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {payment.status === 'pending' && (
                                            <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-bold transition-colors flex items-center gap-1 ml-auto">
                                                <DollarSign size={12} /> Confirmar
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentsManager;
