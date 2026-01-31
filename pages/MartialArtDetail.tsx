
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MARTIAL_ARTS } from '../data';
import { motion } from 'framer-motion';

const MartialArtDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const art = MARTIAL_ARTS.find((a) => a.slug === slug);
    const [showPurchaseModal, setShowPurchaseModal] = React.useState(false);

    if (!art) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center pt-24">
                <div className="text-center">
                    <h2 className="text-4xl font-black text-white mb-4 uppercase italic">ARTE NÃO ENCONTRADA</h2>
                    <Link to="/crossfit" className="text-lime-400 hover:text-white transition-colors uppercase font-black tracking-widest text-xs">
                        Voltar para CrossFit
                    </Link>
                </div>
            </div>
        );
    }

    const handleBuySingleClass = () => {
        setShowPurchaseModal(true);
    };

    const confirmPurchase = () => {
        navigate('/payment', {
            state: {
                totalPrice: art.priceSingleClass,
                basePrice: art.priceSingleClass,
                planName: `Aula Avulsa: ${art.name}`,
                isSingleClass: true
            }
        });
    };

    return (
        <div className="min-h-screen bg-zinc-950 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4">
                {/* Breadcrumb */}
                <div className="mb-12">
                    <Link to="/crossfit" className="text-zinc-500 hover:text-lime-400 transition-colors uppercase font-black tracking-widest text-[10px] flex items-center gap-2">
                        <i className="fa-solid fa-arrow-left"></i> CrossFit & Lutas
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left: Image & Visuals */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative rounded-[3rem] overflow-hidden aspect-[4/5] border border-zinc-800"
                    >
                        <img src={art.image} alt={art.name} className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>

                        <div className="absolute bottom-12 left-12 right-12">
                            <div className="w-16 h-16 bg-lime-400 rounded-2xl flex items-center justify-center text-black mb-6 shadow-2xl shadow-lime-400/20">
                                <i className={`${art.icon} text-2xl`}></i>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter mb-4 leading-none">
                                {art.name}
                            </h1>
                            <p className="text-lime-400 font-black uppercase tracking-[0.3em] text-sm">
                                {art.tagline}
                            </p>
                        </div>
                    </motion.div>

                    {/* Right: Info & Actions */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-12"
                    >
                        <div>
                            <h2 className="text-white text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-lime-400"></span> Sobre a Arte
                            </h2>
                            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                                {art.longDescription}
                            </p>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800">
                                    <span className="block text-zinc-500 text-[10px] uppercase font-bold mb-2 tracking-widest">Horário</span>
                                    <span className="text-white font-black uppercase italic">{art.schedule}</span>
                                </div>
                                <div className="bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800">
                                    <span className="block text-zinc-500 text-[10px] uppercase font-bold mb-2 tracking-widest">Aula Avulsa</span>
                                    <span className="text-lime-400 font-black text-xl italic leading-none">R$ {art.priceSingleClass.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-white text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-lime-400"></span> Benefícios do {art.name}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {art.benefits.map((benefit, i) => (
                                    <div key={i} className="flex items-center gap-4 bg-zinc-900/30 p-4 rounded-2xl border border-zinc-800/50 group hover:border-lime-400/30 transition-colors">
                                        <div className="w-2 h-2 rounded-full bg-lime-400 group-hover:scale-150 transition-transform"></div>
                                        <span className="text-zinc-300 text-xs font-bold uppercase tracking-tight">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA's */}
                        <div className="pt-8 flex flex-col sm:flex-row gap-6">
                            <button
                                onClick={handleBuySingleClass}
                                className="flex-1 bg-white hover:bg-zinc-200 text-black px-12 py-6 rounded-2xl font-black uppercase tracking-widest transition-all transform hover:scale-105"
                            >
                                Comprar Aula
                            </button>
                            <Link
                                to="/join"
                                className="flex-1 neon-bg hover:bg-lime-500 text-black px-12 py-6 rounded-2xl font-black uppercase tracking-widest transition-all transform hover:scale-105 text-center shadow-[0_20px_40px_rgba(163,230,53,0.3)]"
                            >
                                Seja um Aluno
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Purchase Confirmation Modal */}
                {showPurchaseModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-10 max-w-md w-full text-center shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-lime-400"></div>

                            <div className="w-20 h-20 bg-lime-400/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-lime-400/20">
                                <i className="fa-solid fa-cart-shopping text-lime-400 text-3xl"></i>
                            </div>

                            <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-4">CONFIRMAR COMPRA</h3>

                            <div className="bg-black/40 rounded-3xl p-6 mb-8 border border-zinc-800">
                                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Você está adquirindo:</p>
                                <p className="text-white font-black uppercase text-xl mb-4">{art.name}</p>
                                <div className="h-[1px] bg-zinc-800 w-12 mx-auto mb-4"></div>
                                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Valor do Investimento:</p>
                                <p className="text-lime-400 font-black text-3xl italic">R$ {art.priceSingleClass.toFixed(2)}</p>
                            </div>

                            <div className="flex flex-col gap-4">
                                <button
                                    onClick={confirmPurchase}
                                    className="w-full neon-bg text-black font-black py-5 rounded-2xl uppercase tracking-widest hover:bg-lime-500 transition-all transform hover:scale-105 shadow-lg shadow-lime-400/10"
                                >
                                    Confirmar e Pagar
                                </button>
                                <button
                                    onClick={() => setShowPurchaseModal(false)}
                                    className="w-full bg-zinc-800 text-zinc-400 font-black py-4 rounded-2xl uppercase tracking-widest hover:text-white transition-all"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Similar Classes / Upsell */}
                <section className="mt-32">
                    <h4 className="text-white font-black uppercase italic text-2xl mb-12">Outras Artes de Combate</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {MARTIAL_ARTS.filter(a => a.slug !== slug).slice(0, 3).map((other) => (
                            <Link key={other.id} to={`/martial-arts/${other.slug}`} className="group relative rounded-3xl overflow-hidden aspect-video bg-zinc-900 border border-zinc-800 hover:border-lime-400/30 transition-all">
                                <img src={other.image} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" alt={other.name} />
                                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                    <h5 className="text-white font-black italic uppercase text-lg">{other.name}</h5>
                                    <p className="text-lime-400 text-[9px] font-black uppercase tracking-widest">{other.tagline}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MartialArtDetail;
