
import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

interface PaymentProps {
    onPaymentSuccess?: () => void;
}

const Payment: React.FC<PaymentProps> = ({ onPaymentSuccess }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const {
        totalPrice = 0,
        planName = 'Não selecionado',
        basePrice = 0,
        addons = [],
        isSingleClass = false
    } = location.state || {};

    const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix'>('card');
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Fallback if accessed directly
    if (totalPrice === 0) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
                <div className="text-center">
                    <h2 className="text-2xl font-black text-white italic uppercase mb-4">Sessão Expirada</h2>
                    <p className="text-zinc-500 mb-8">Não encontramos um pedido ativo. Selecione um plano para continuar.</p>
                    <Link to="/join" className="neon-bg text-black font-black px-8 py-3 rounded-xl uppercase text-xs tracking-widest hover:bg-lime-500">
                        Voltar aos Planos
                    </Link>
                </div>
            </div>
        );
    }

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            if (onPaymentSuccess) onPaymentSuccess();
            setShowSuccessModal(true);
        }, 2000);
    };

    const handleModalClose = () => {
        setShowSuccessModal(false);
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-zinc-950 py-20 px-4">
            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-in zoom-in duration-300">
                        <div className="w-20 h-20 bg-lime-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-lime-400/20">
                            <i className="fa-solid fa-check text-black text-4xl"></i>
                        </div>
                        <h3 className="text-2xl font-black text-white italic uppercase mb-2">
                            {isSingleClass ? 'AULA CONFIRMADA!' : 'PARABÉNS, TITÃ!'}
                        </h3>
                        <p className="text-zinc-400 mb-8 text-sm">
                            {isSingleClass
                                ? `Sua aula de ${planName.replace('Aula Avulsa: ', '')} foi confirmada. Nos vemos no tatame!`
                                : 'Sua matrícula foi confirmada com sucesso. Prepare-se para sua melhor versão na JE ACADEMIA.'
                            }
                        </p>
                        <button
                            onClick={handleModalClose}
                            className="w-full neon-bg text-black font-black py-4 rounded-xl uppercase tracking-widest hover:bg-lime-500 transition-all"
                        >
                            Ir para o Dashboard
                        </button>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                {/* Left Side: Summary */}
                <div className="lg:col-span-5 space-y-8">
                    <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-10 shrink-0">Resumo do <span className="neon-accent">Pedido</span></h2>

                    <div className="glass-card p-8 rounded-3xl border border-zinc-800 space-y-6">
                        <div className="flex justify-between items-start pb-4 border-b border-zinc-800">
                            <div>
                                <h4 className="text-white font-bold uppercase text-[10px] tracking-widest mb-1 text-zinc-500">
                                    {isSingleClass ? 'Item Selecionado' : 'Plano Base'}
                                </h4>
                                <p className="text-white font-black text-lg italic uppercase">
                                    {isSingleClass ? planName : planName}
                                </p>
                                {!isSingleClass && <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mt-1">Recorrência Mensal</p>}
                            </div>
                            <span className="text-white font-bold text-lg">R$ {(basePrice || totalPrice).toFixed(2)}</span>
                        </div>

                        {addons.length > 0 && (
                            <div className="space-y-4 pb-4 border-b border-zinc-800">
                                <h4 className="text-zinc-500 uppercase text-[10px] font-black tracking-[0.2em]">Serviços Inclusos</h4>
                                {addons.map((addon: any, i: number) => (
                                    <div key={i} className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-2">
                                            <i className="fa-solid fa-circle-check text-lime-400 text-xs text-opacity-50"></i>
                                            <span className="text-zinc-300 font-medium">{addon.name}</span>
                                        </div>
                                        <span className="text-zinc-500 font-bold">+ R$ {addon.price.toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex justify-between items-end pt-2">
                            <div>
                                <span className="text-zinc-500 uppercase text-[10px] font-black tracking-widest block mb-1">Valor Total</span>
                                <span className="text-5xl font-black text-lime-400 italic tracking-tighter">R$ {totalPrice.toFixed(2)}</span>
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
                <div className="lg:col-span-7 glass-card p-10 rounded-3xl border border-zinc-800 self-start">
                    <h3 className="text-xl font-bold text-white uppercase tracking-widest mb-10 flex items-center gap-3">
                        <i className="fa-solid fa-lock text-lime-400 text-sm"></i>
                        Método de Pagamento
                    </h3>

                    <div className="grid grid-cols-2 gap-6 mb-10">
                        <button
                            type="button"
                            onClick={() => setPaymentMethod('card')}
                            className={`p-6 rounded-2xl border-2 flex flex-col items-center justify-center transition-all duration-300 transform hover:scale-[1.02] ${paymentMethod === 'card'
                                ? 'bg-zinc-800 border-lime-400 text-white shadow-lg shadow-lime-400/10'
                                : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                                }`}
                        >
                            <i className="fa-solid fa-credit-card text-3xl mb-3"></i>
                            <span className="text-sm font-black uppercase tracking-widest">Cartão de Crédito</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setPaymentMethod('pix')}
                            className={`p-6 rounded-2xl border-2 flex flex-col items-center justify-center transition-all duration-300 transform hover:scale-[1.02] ${paymentMethod === 'pix'
                                ? 'bg-zinc-800 border-lime-400 text-white shadow-lg shadow-lime-400/10'
                                : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                                }`}
                        >
                            <i className="fa-solid fa-qrcode text-3xl mb-3"></i>
                            <span className="text-sm font-black uppercase tracking-widest">PIX <span className="text-[8px] block opacity-50">Confirmação Instantânea</span></span>
                        </button>
                    </div>

                    <form onSubmit={handlePayment} className="space-y-8">
                        {paymentMethod === 'card' ? (
                            <div className="space-y-6">
                                <div className="p-6 bg-zinc-950/50 rounded-2xl border border-zinc-800">
                                    <div className="flex items-center space-x-3 mb-6 opacity-70">
                                        <i className="fa-brands fa-cc-visa text-3xl"></i>
                                        <i className="fa-brands fa-cc-mastercard text-3xl"></i>
                                        <i className="fa-brands fa-cc-amex text-3xl"></i>
                                        <div className="flex-grow"></div>
                                        <i className="fa-solid fa-shield-halved text-lime-400 text-sm"></i>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-[10px] font-black text-zinc-500 mb-2 uppercase tracking-[0.2em]">Número do Cartão</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="0000 0000 0000 0000"
                                                className="w-full bg-zinc-900 border-2 border-zinc-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-lime-400/50 transition-all font-mono tracking-widest"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-[10px] font-black text-zinc-500 mb-2 uppercase tracking-[0.2em]">Validade</label>
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="MM/AA"
                                                    className="w-full bg-zinc-900 border-2 border-zinc-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-lime-400/50 transition-all text-center"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black text-zinc-500 mb-2 uppercase tracking-[0.2em]">CVV</label>
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="123"
                                                    className="w-full bg-zinc-900 border-2 border-zinc-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-lime-400/50 transition-all text-center"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-black text-zinc-500 mb-2 uppercase tracking-[0.2em]">Nome Completo (Como no cartão)</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="DIGITE SEU NOME"
                                                className="w-full bg-zinc-900 border-2 border-zinc-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-lime-400/50 transition-all uppercase font-bold"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="p-10 bg-zinc-950/50 rounded-2xl border border-zinc-800 text-center space-y-6">
                                <div className="w-56 h-56 bg-white p-6 rounded-3xl mx-auto shadow-2xl">
                                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=JEACADEMIA_PIX_DEMO" alt="QR Code PIX" className="w-full h-full" />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm text-white font-bold opacity-80">Escaneie o código acima</p>
                                    <p className="text-xs text-zinc-500 max-w-[250px] mx-auto">Vencimento em 30 minutos. Confirmação instantânea após o pagamento.</p>
                                </div>
                                <button type="button" className="flex items-center justify-center gap-2 mx-auto text-lime-400 font-black text-xs uppercase tracking-widest hover:text-white transition-colors group">
                                    <i className="fa-solid fa-copy group-hover:scale-110 transition-transform"></i>
                                    Copiar Código PIX
                                </button>
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
