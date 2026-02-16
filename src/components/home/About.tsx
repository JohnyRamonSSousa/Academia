
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Clock } from 'lucide-react';

const About: React.FC = () => {
    return (
        <section id="about" className="py-20 bg-dark relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Image Grid */}
                    <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
                        <motion.img
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                            alt="Gym Interior"
                            className="rounded-lg shadow-xl translate-y-8"
                        />
                        <motion.img
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                            alt="Weightlifting"
                            className="rounded-lg shadow-xl"
                        />
                    </div>

                    {/* Content */}
                    <div className="w-full md:w-1/2">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="text-4xl font-bold mb-6 font-heading"
                        >
                            Sobre a <span className="text-primary">JE Academia</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="text-gray-300 text-lg mb-6 leading-relaxed"
                        >
                            Fundada com o objetivo de transformar vidas através do movimento, a JE Academia oferece uma estrutura completa para quem busca saúde, performance e bem-estar. Nossa missão é proporcionar um ambiente motivador e profissional para que você alcance sua melhor versão.
                        </motion.p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                            <div className="flex items-start gap-4">
                                <div className="bg-gray-800 p-3 rounded-lg text-primary">
                                    <Award size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Equipamentos de Ponta</h3>
                                    <p className="text-gray-400 text-sm">Tecnologia avançada para seus treinos.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-gray-800 p-3 rounded-lg text-primary">
                                    <Users size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Instrutores Qualificados</h3>
                                    <p className="text-gray-400 text-sm">Profissionais prontos para te guiar.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-gray-800 p-3 rounded-lg text-primary">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Horários Flexíveis</h3>
                                    <p className="text-gray-400 text-sm">Treine no seu tempo, todos os dias.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
