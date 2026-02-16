
import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { modalities } from '../data/modalities';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { ArrowLeft, CheckCircle, Clock } from 'lucide-react';

const ModalityDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const modality = modalities.find((m) => m.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!modality) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="min-h-screen bg-dark text-light">
            <Navbar />

            {/* Hero Section */}
            <div className="relative h-[60vh] flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <img
                        src={modality.heroImage}
                        alt={modality.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60" />
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary font-bold text-sm mb-4 uppercase tracking-wider">
                            Modalidade
                        </span>
                        <h1 className="text-5xl md:text-6xl font-bold font-heading mb-6 text-white text-shadow">
                            {modality.name}
                        </h1>
                        <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                            {modality.description}
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-3xl font-bold font-heading mb-6 text-white">Sobre a Modalidade</h2>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                {modality.content}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold font-heading mb-6 text-white">Benefícios</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {modality.benefits.map((benefit, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="flex items-center gap-3 bg-gray-900 p-4 rounded-xl border border-gray-800"
                                    >
                                        <CheckCircle className="text-primary shrink-0" size={24} />
                                        <span className="font-medium text-gray-200">{benefit}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Schedule Card */}
                        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 sticky top-24">
                            <h3 className="text-xl font-bold font-heading mb-6 text-white flex items-center gap-2">
                                <Clock className="text-primary" />
                                Horários
                            </h3>
                            <ul className="space-y-4 mb-8">
                                {modality.schedule.map((time, index) => (
                                    <li key={index} className="flex items-start gap-3 pb-4 border-b border-gray-800 last:border-0">
                                        <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                                        <span className="text-gray-300">{time}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8 space-y-4">
                                <Link
                                    to="/register"
                                    className="w-full block bg-primary hover:bg-red-700 text-white text-center font-bold py-4 rounded-xl uppercase tracking-wider transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 transform hover:-translate-y-1"
                                >
                                    Criar Conta para Acessar
                                </Link>
                                <p className="text-gray-400 text-sm text-center">
                                    Já tem uma conta? <Link to="/login" className="text-primary hover:underline">Faça login</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 border-t border-gray-800 pt-8">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        Voltar para Home
                    </Link>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ModalityDetails;
