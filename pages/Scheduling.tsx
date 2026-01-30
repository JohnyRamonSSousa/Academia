
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TRAINERS } from '../data';
import { motion, AnimatePresence } from 'framer-motion';

const Scheduling: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        trainerId: '',
        date: '',
        time: '',
        type: 'experimental', // experimental | particular
    });

    const timeSlots = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
    const dates = [
        { day: 'Segunda', date: '29/01' },
        { day: 'Terça', date: '30/01' },
        { day: 'Quarta', date: '31/01' },
        { day: 'Quinta', date: '01/02' },
        { day: 'Sexta', date: '02/02' },
    ];

    const selectedTrainer = TRAINERS.find(t => t.id === formData.trainerId);

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const getPrice = () => {
        return formData.type === 'experimental' ? 'GRÁTIS' : 'R$ 120,00';
    };

    return (
        <div className="min-h-screen bg-zinc-950 py-20">
            <div className="max-w-4xl mx-auto px-4">
                <header className="text-center mb-16">
                    <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter mb-4">
                        AGENDAR <span className="neon-accent">AULA</span>
                    </h1>
                    <p className="text-zinc-500 uppercase text-xs font-bold tracking-widest">Reserve seu horário com os melhores profissionais</p>
                </header>

                {/* Progress Bar */}
                <div className="flex justify-between mb-12 relative max-w-md mx-auto">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-800 -translate-y-1/2 z-0"></div>
                    {[1, 2, 3, 4].map(s => (
                        <div
                            key={s}
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm z-10 transition-all ${step >= s ? 'neon-bg text-black' : 'bg-zinc-900 text-zinc-600 border border-zinc-800'
                                }`}
                        >
                            {s}
                        </div>
                    ))}
                </div>

                <div className="glass-card rounded-[2.5rem] p-8 md:p-12 border-zinc-800 min-h-[500px] flex flex-col">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex-1"
                            >
                                <h2 className="text-2xl font-black text-white uppercase italic mb-8">1. Escolha seu Professor</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {TRAINERS.map(trainer => (
                                        <button
                                            key={trainer.id}
                                            onClick={() => { setFormData({ ...formData, trainerId: trainer.id }); handleNext(); }}
                                            className={`group relative rounded-3xl overflow-hidden border-2 transition-all ${formData.trainerId === trainer.id ? 'border-lime-400' : 'border-transparent hover:border-zinc-700'
                                                }`}
                                        >
                                            <div className="aspect-[3/4] relative">
                                                <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                                                <div className="absolute bottom-4 left-4 text-left">
                                                    <p className="text-white font-black uppercase text-sm leading-tight">{trainer.name}</p>
                                                    <p className="text-lime-400 text-[10px] font-bold uppercase">{trainer.specialty}</p>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex-1"
                            >
                                <h2 className="text-2xl font-black text-white uppercase italic mb-8">2. Data e Horário</h2>

                                <div className="mb-8">
                                    <p className="text-zinc-500 text-[10px] font-black uppercase mb-4 tracking-widest">Selecione o Dia</p>
                                    <div className="flex flex-wrap gap-3">
                                        {dates.map(d => (
                                            <button
                                                key={d.date}
                                                onClick={() => setFormData({ ...formData, date: d.date })}
                                                className={`px-6 py-4 rounded-2xl text-xs font-black uppercase transition-all ${formData.date === d.date ? 'neon-bg text-black' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                                                    }`}
                                            >
                                                {d.day} <br /> <span className="text-[10px] opacity-60">{d.date}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-12">
                                    <p className="text-zinc-500 text-[10px] font-black uppercase mb-4 tracking-widest">Horários Disponíveis</p>
                                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                                        {timeSlots.map(t => (
                                            <button
                                                key={t}
                                                onClick={() => setFormData({ ...formData, time: t })}
                                                className={`py-4 rounded-2xl text-xs font-black transition-all ${formData.time === t ? 'neon-bg text-black' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                                                    }`}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex-1"
                            >
                                <h2 className="text-2xl font-black text-white uppercase italic mb-8">3. Tipo de Aula</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <button
                                        onClick={() => setFormData({ ...formData, type: 'experimental' })}
                                        className={`p-8 rounded-[2rem] border-2 text-left transition-all ${formData.type === 'experimental' ? 'border-lime-400 bg-lime-400/5' : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
                                            }`}
                                    >
                                        <div className="w-12 h-12 rounded-full bg-lime-400/10 flex items-center justify-center mb-6">
                                            <i className="fa-solid fa-star text-lime-400"></i>
                                        </div>
                                        <h3 className="text-xl font-black text-white uppercase mb-2">AULA EXPERIMENTAL</h3>
                                        <p className="text-zinc-500 text-sm mb-4">Para quem quer conhecer a academia. Válido apenas para novos alunos.</p>
                                        <p className="text-lime-400 font-black text-2xl uppercase italic">Grátis</p>
                                    </button>

                                    <button
                                        onClick={() => setFormData({ ...formData, type: 'particular' })}
                                        className={`p-8 rounded-[2rem] border-2 text-left transition-all ${formData.type === 'particular' ? 'border-blue-400 bg-blue-400/5' : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
                                            }`}
                                    >
                                        <div className="w-12 h-12 rounded-full bg-blue-400/10 flex items-center justify-center mb-6">
                                            <i className="fa-solid fa-user-tie text-blue-400"></i>
                                        </div>
                                        <h3 className="text-xl font-black text-white uppercase mb-2">AULA PARTICULAR</h3>
                                        <p className="text-zinc-500 text-sm mb-4">Treino exclusivo 1-on-1 focado nos seus objetivos específicos.</p>
                                        <p className="text-blue-400 font-black text-2xl uppercase italic">R$ 120,00</p>
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex-1 flex flex-col items-center justify-center text-center"
                            >
                                <div className="w-20 h-20 rounded-full bg-lime-400 text-black flex items-center justify-center text-3xl mb-8 shadow-[0_0_50px_rgba(163,230,53,0.4)]">
                                    <i className="fa-solid fa-check"></i>
                                </div>
                                <h2 className="text-4xl font-black text-white uppercase italic mb-4">CONFIRMADO!</h2>
                                <p className="text-zinc-400 max-w-sm mb-12 uppercase text-xs font-bold tracking-widest leading-relaxed">
                                    Seu treino com <span className="text-white">{selectedTrainer?.name}</span> está agendado para o dia <span className="text-white">{formData.date}</span> às <span className="text-white">{formData.time}</span>.
                                </p>

                                <div className="w-full bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 mb-12">
                                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-zinc-800">
                                        <span className="text-zinc-500 text-[10px] font-black uppercase">Modalidade</span>
                                        <span className="text-white font-bold uppercase text-xs">{formData.type === 'experimental' ? 'Experimental' : 'Particular'}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-zinc-500 text-[10px] font-black uppercase">Valor</span>
                                        <span className="text-lime-400 font-black text-xl italic">{getPrice()}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => navigate('/dashboard')}
                                    className="bg-zinc-800 hover:bg-zinc-700 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest transition-all"
                                >
                                    Ver no Meu Painel
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Footer Navigation */}
                    {step < 4 && (
                        <div className="mt-auto pt-12 flex justify-between items-center">
                            <button
                                onClick={handleBack}
                                disabled={step === 1}
                                className={`text-zinc-500 font-black uppercase text-xs tracking-widest hover:text-white transition-colors disabled:opacity-0`}
                            >
                                Voltar
                            </button>

                            {step > 1 && (
                                <button
                                    onClick={handleNext}
                                    disabled={!formData.date || !formData.time && step === 2}
                                    className="bg-lime-400 hover:bg-lime-300 text-black px-10 py-4 rounded-2xl font-black uppercase tracking-widest transition-all transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    {step === 3 ? 'Finalizar Agendamento' : 'Continuar'}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Scheduling;
