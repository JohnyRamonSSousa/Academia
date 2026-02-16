
import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, ArrowLeft } from 'lucide-react';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
    return (
        <div className="min-h-screen flex bg-dark text-light overflow-hidden relative">
            {/* Abstract Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[100px]" />
            </div>

            <div className="w-full flex flex-col p-4 lg:p-8 relative z-10 items-center justify-center min-h-screen">
                <div className="w-full max-w-5xl bg-gray-900 p-8 lg:p-12 rounded-3xl border border-gray-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative">
                    {/* Decorative border gradient */}
                    <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-b from-gray-700 to-transparent pointer-events-none" aria-hidden="true" />
                    <div className="mb-8 text-center">
                        <Link to="/" className="inline-flex items-center gap-2 justify-center group mb-6">
                            <div className="bg-primary p-2 rounded-lg group-hover:bg-red-600 transition-colors shadow-lg shadow-primary/20">
                                <Dumbbell className="w-8 h-8 text-white" />
                            </div>
                            <span className="text-3xl font-bold font-heading text-white tracking-wider">
                                JE<span className="text-primary">ACADEMIA</span>
                            </span>
                        </Link>

                        <div className="mb-8">
                            <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm mb-4">
                                <ArrowLeft size={16} />
                                <span>Voltar para Home</span>
                            </Link>
                            <h1 className="text-3xl font-bold font-heading mb-2">{title}</h1>
                            <p className="text-gray-400 max-w-md mx-auto">{subtitle}</p>
                        </div>
                    </div>

                    {children}

                    <div className="mt-8 text-center text-sm text-gray-500 border-t border-gray-800 pt-6">
                        &copy; {new Date().getFullYear()} JE Academia. Todos os direitos reservados.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
