
import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    CreditCard,
    User,
    LogOut,
    Menu,
    X,
    Dumbbell,
    Calendar,
    Activity
} from 'lucide-react';
import clsx from 'clsx';

const DashboardLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleLogout = () => {
        // TODO: Implement logout logic
        navigate('/login');
    };

    const navItems = [
        { name: 'Início', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Meu Plano', path: '/dashboard/plan', icon: Calendar },
        { name: 'Modalidades', path: '/dashboard/modalities', icon: Activity },
        { name: 'Pagamentos', path: '/dashboard/payments', icon: CreditCard },
        { name: 'Perfil', path: '/dashboard/profile', icon: User },
    ];

    return (
        <div className="min-h-screen bg-dark text-light flex">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={clsx(
                    "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-800 transform transition-transform duration-300 ease-in-out lg:transform-none flex flex-col",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                    <Link to="/dashboard" className="flex items-center gap-2 group">
                        <div className="bg-primary p-2 rounded-lg">
                            <Dumbbell className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold font-heading tracking-wider text-white">
                            JE<span className="text-primary">FIT</span>
                        </span>
                    </Link>
                    <button onClick={toggleSidebar} className="lg:hidden text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={clsx(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                    isActive
                                        ? "bg-primary text-white font-medium shadow-lg shadow-primary/20"
                                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                                )}
                            >
                                <Icon size={20} className={clsx(isActive ? "text-white" : "text-gray-500 group-hover:text-primary transition-colors")} />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-all duration-200 group"
                    >
                        <LogOut size={20} className="text-gray-500 group-hover:text-red-500 transition-colors" />
                        <span>Sair</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
                {/* Header */}
                <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4 lg:px-8">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 text-gray-400 hover:text-white lg:hidden"
                    >
                        <Menu size={24} />
                    </button>

                    <div className="flex items-center gap-4 ml-auto">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium text-white">João Silva</p>
                            <p className="text-xs text-primary">Matrícula: #12345</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden border-2 border-primary">
                            <img
                                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-dark p-4 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
