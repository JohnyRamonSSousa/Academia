
import React from 'react';
import { Dumbbell, Instagram, Facebook, Twitter, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="bg-black text-white pt-16 pb-8 border-t border-gray-900">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="bg-primary p-2 rounded-lg">
                                <Dumbbell className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold font-heading tracking-wider">
                                JE<span className="text-primary">ACADEMIA</span>
                            </span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Transformando vidas através do movimento. A melhor estrutura para você alcançar seus objetivos.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 font-heading">Links Rápidos</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-primary transition-colors">
                                    Início
                                </Link>
                            </li>
                            <li>
                                <a href="#about" className="text-gray-400 hover:text-primary transition-colors">
                                    Sobre Nós
                                </a>
                            </li>
                            <li>
                                <a href="#modalities" className="text-gray-400 hover:text-primary transition-colors">
                                    Modalidades
                                </a>
                            </li>
                            <li>
                                <a href="#plans" className="text-gray-400 hover:text-primary transition-colors">
                                    Planos
                                </a>
                            </li>
                            <li>
                                <Link to="/register" className="text-gray-400 hover:text-primary transition-colors">
                                    Matricule-se
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 font-heading">Contato</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="text-primary shrink-0" size={20} />
                                <span className="text-gray-400 text-sm">
                                    Av. Principal, 1000 - Centro, Cidade - UF
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="text-primary shrink-0" size={20} />
                                <span className="text-gray-400 text-sm">(11) 99999-9999</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="text-primary shrink-0" size={20} />
                                <span className="text-gray-400 text-sm">contato@jeacademia.com.br</span>
                            </li>
                        </ul>
                    </div>

                    {/* Opening Hours */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 font-heading">Funcionamento</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <Clock className="text-primary shrink-0" size={20} />
                                <div className="text-sm text-gray-400">
                                    <p className="text-white font-medium">Segunda a Sexta</p>
                                    <p>06:00 - 23:00</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <Clock className="text-primary shrink-0" size={20} />
                                <div className="text-sm text-gray-400">
                                    <p className="text-white font-medium">Sábados</p>
                                    <p>08:00 - 18:00</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <Clock className="text-primary shrink-0" size={20} />
                                <div className="text-sm text-gray-400">
                                    <p className="text-white font-medium">Domingos</p>
                                    <p>09:00 - 13:00</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-900 pt-8 text-center text-gray-600 text-sm">
                    <p>&copy; {new Date().getFullYear()} JE Academia. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
