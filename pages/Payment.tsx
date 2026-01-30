
import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

const Payment: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { totalPrice, planName, addons = [] } = location.state || { totalPrice: 0, planName: 'Não selecionado', addons: [] };

    const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix'>('card');
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            alert('Pagamento aprovado com sucesso! Bem-vindo(a) à JE Academia.');
            navigate('/');
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-zinc-950 py-20 px-4">
            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Side: Summary */}
                <div className="space-y-6">
                    <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-8">Resumo do <span className="neon-accent">Pedido</span></h2>

                    <div className="glass-card p-8 rounded-3xl border border-zinc-800 space-y-6">
                        <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
                            <div>
                                <h4 className="text-white font-bold uppercase text-sm tracking-widest">Plano Base</h4>
                                <p className="text-zinc-500 text-xs">Assinatura Mensal - {planName}</p>
                            </div>
                            <span className="text-white font-bold">R$ {totalPrice.toFixed(2)}</span>
                        </div>

                        {addons.length > 0 && (
                            <div className="space-y-3 pb-4 border-b border-zinc-800">
                                <h4 className="text-zinc-500 uppercase text-[10px] font-black tracking-[0.2em]">Serviços Inclusos</h4>
                                {addons.map((addon: any, i: number) => (
                                    <div key={i} className="flex justify-between items-center text-sm">
                                        <span className="text-zinc-400">{addon.name}</span>
                                        <span className="text-zinc-500">Incluso</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex justify-between items-end pt-4">
                            <div>
                                <span className="text-zinc-500 uppercase text-xs font-bold block mb-1">Total a Pagar</span>
                                <span className="text-4xl font-black text-lime-400 italic">R$ {totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-lime-400/5 p-6 rounded-2xl border border-lime-400/20">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-lime-400 rounded-full flex items-center justify-center text-black">
                                <i className="fa-solid fa-shield-halved"></i>
                            </div>
                            <div>
                                <h5 className="text-white font-bold text-sm uppercase">Pagamento 100% Seguro</h5>
                                <p className="text-zinc-500 text-xs">Seus dados são criptografados e protegidos.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Payment Methods */}
                <div className="glass-card p-8 md:p-10 rounded-3xl border border-zinc-800">
                    <h3 className="text-xl font-bold text-white uppercase tracking-widest mb-8">Método de Pagamento</h3>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <button
                            type="button"
                            onClick={() => setPaymentMethod('card')}
                            className={`p-4 rounded-xl border flex flex-col items-center justify-center transition-all ${paymentMethod === 'card' ? 'bg-zinc-800 border-lime-400 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                                }`}
                        >
                            <i className="fa-solid fa-credit-card text-2xl mb-2"></i>
                            <span className="text-xs font-bold uppercase">Cartão</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setPaymentMethod('pix')}
                            className={`p-4 rounded-xl border flex flex-col items-center justify-center transition-all ${paymentMethod === 'pix' ? 'bg-zinc-800 border-lime-400 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                                }`}
                        >
                            <i className="fa-solid fa-qrcode text-2xl mb-2"></i>
                            <span className="text-xs font-bold uppercase">PIX</span>
                        </button>
                    </div>

                    <form onSubmit={handlePayment} className="space-y-6">
                        {paymentMethod === 'card' ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-widest">Número do Cartão</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="0000 0000 0000 0000"
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-lime-400 transition-colors"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-widest">Validade</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="MM/AA"
                                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-lime-400 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-widest">CVV</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="123"
                                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-lime-400 transition-colors"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-widest">Nome Impresso</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="NOME IGUAL AO CARTÃO"
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-lime-400 transition-colors uppercase"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="text-center space-y-4 py-6">
                                <div className="w-48 h-48 bg-white p-4 rounded-2xl mx-auto">
                                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=JEACADEMIA_PIX_DEMO" alt="QR Code PIX" className="w-full h-full" />
                                </div>
                                <p className="text-sm text-zinc-400">Escaneie o código acima ou use o Copia e Cola para pagar no seu banco.</p>
                                <button type="button" className="text-lime-400 font-bold text-sm hover:underline">Copiar código PIX</button>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isProcessing}
                            className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all transform hover:scale-[1.02] shadow-lg ${isProcessing ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed' : 'neon-bg text-black hover:bg-lime-500 shadow-lime-500/20'
                                }`}
                        >
                            {isProcessing ? 'Processando...' : `Pagar R$ ${totalPrice.toFixed(2)}`}
                        </button>
                        <p className="text-center text-[10px] text-zinc-600 uppercase tracking-widest">
                            Ao clicar em pagar, você autoriza a cobrança mensal recorrente.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Payment;
