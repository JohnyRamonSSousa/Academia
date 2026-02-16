
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                    alt="Musculação e Treino Pesado"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-dark/40" />
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 z-10 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-extrabold uppercase tracking-tight mb-6 drop-shadow-2xl"
                >
                    Construa seu corpo,<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500 text-shadow-glow">
                        conquiste sua mente
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto"
                >
                    Supere seus limites com a melhor estrutura de CrossFit, Musculação e Lutas da região.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col md:flex-row gap-4 justify-center"
                >
                    <Link
                        to="/register"
                        className="bg-primary hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold text-lg uppercase tracking-wide transition-all transform hover:scale-105 shadow-lg shadow-primary/30"
                    >
                        Matricule-se Agora
                    </Link>
                    <a
                        href="#modalities"
                        className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-dark px-8 py-4 rounded-full font-bold text-lg uppercase tracking-wide transition-all"
                    >
                        Conheça as Modalidades
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
