
import React from 'react';
import { Download, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import clsx from 'clsx';

const PaymentsView: React.FC = () => {
    const history = [
        { id: 1, date: '10/02/2026', amount: '129,90', status: 'paid', reference: 'Fev/2026' },
        { id: 2, date: '10/01/2026', amount: '129,90', status: 'paid', reference: 'Jan/2026' },
        { id: 3, date: '10/12/2025', amount: '89,90', status: 'paid', reference: 'Dez/2025' },
        { id: 4, date: '10/03/2026', amount: '129,90', status: 'pending', reference: 'Mar/2026' },
    ];

    const pendingPayment = history.find(h => h.status === 'pending');

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold font-heading mb-8 text-white">Financeiro</h1>

            {/* Pending Payment Alert */}
            {pendingPayment && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                        <div className="bg-yellow-500/20 p-3 rounded-full text-yellow-500 mt-1">
                            <AlertCircle size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-lg">Pagamento Pendente</h3>
                            <p className="text-gray-400">Fatura referente a {pendingPayment.reference} vence em breve.</p>
                            <p className="text-2xl font-bold text-white mt-2">R$ {pendingPayment.amount}</p>
                        </div>
                    </div>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-bold transition-colors w-full md:w-auto shadow-lg shadow-yellow-500/20">
                        Pagar Agora
                    </button>
                </div>
            )}

            {/* History */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
                <div className="p-6 border-b border-gray-800">
                    <h2 className="text-xl font-bold text-white">Histórico de Pagamentos</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-800/50 text-gray-400 text-sm uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-medium">Referência</th>
                                <th className="px-6 py-4 font-medium">Data</th>
                                <th className="px-6 py-4 font-medium">Valor</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium text-right">Comprovante</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {history.sort((a, b) => b.id - a.id).map((item) => (
                                <tr key={item.id} className="hover:bg-gray-800/30 transition-colors">
                                    <td className="px-6 py-4 font-medium text-white">{item.reference}</td>
                                    <td className="px-6 py-4 text-gray-400">{item.date}</td>
                                    <td className="px-6 py-4 text-white">R$ {item.amount}</td>
                                    <td className="px-6 py-4">
                                        <span className={clsx(
                                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide",
                                            item.status === 'paid' ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"
                                        )}>
                                            {item.status === 'paid' ? <CheckCircle size={12} /> : <Clock size={12} />}
                                            {item.status === 'paid' ? 'Pago' : 'Pendente'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {item.status === 'paid' && (
                                            <button className="text-gray-400 hover:text-primary transition-colors inline-block" title="Baixar Comprovante">
                                                <Download size={20} />
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

export default PaymentsView;
