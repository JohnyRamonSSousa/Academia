
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Dumbbell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Sobre', path: '#about' },
        { name: 'Modalidades', path: '#modalities' },
        { name: 'Planos', path: '#plans' },
    ];

    return (
        <nav
            className={clsx(
                'fixed w-full z-50 transition-all duration-300',
                scrolled ? 'bg-black/90 backdrop-blur-sm py-4 shadow-lg' : 'bg-transparent py-6'
            )}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo - Hidden on mobile */}
                <Link to="/" className="hidden md:flex items-center gap-2 group">
                    <div className="bg-primary p-2 rounded-lg group-hover:bg-red-600 transition-colors">
                        <Dumbbell className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-2xl font-bold font-heading text-white tracking-wider">
                        JE<span className="text-primary">ACADEMIA</span>
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.path}
                            className="text-gray-300 hover:text-primary font-medium transition-colors uppercase tracking-wide text-sm"
                        >
                            {link.name}
                        </a>
                    ))}
                    <Link
                        to="/register"
                        className="bg-primary hover:bg-red-700 text-white px-6 py-2 rounded-full font-bold transition-transform hover:scale-105 uppercase text-sm tracking-wide"
                    >
                        Matricule-se
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white hover:text-primary transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={32} /> : <Menu size={32} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="md:hidden bg-black/95 backdrop-blur-md border-b border-gray-800"
                    >
                        <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.path}
                                    className="text-2xl font-bold text-white hover:text-primary transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <Link
                                to="/register"
                                className="bg-primary hover:bg-red-700 text-white text-center py-4 rounded-lg font-bold text-xl uppercase tracking-wide"
                                onClick={() => setIsOpen(false)}
                            >
                                Matricule-se Agora
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
