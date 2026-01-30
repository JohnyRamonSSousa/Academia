
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Notification } from '../types';

interface NavbarProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogin, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleNewNotif = (e: any) => {
      const newNotif = e.detail as Notification;
      setNotifications(prev => [newNotif, ...prev].slice(0, 5));
    };

    window.addEventListener('je-notification', handleNewNotif);
    return () => window.removeEventListener('je-notification', handleNewNotif);
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Exercícios', path: '/exercises' },
    { name: 'CrossFit', path: '/crossfit' },
    { name: 'Comunidade', path: '/community' },
    { name: 'Matricule-se', path: '/join' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-black tracking-tighter text-white">JE<span className="neon-accent"> ACADEMIA</span></span>
            </Link>
          </div>

          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`${isActive(link.path)
                    ? 'text-lime-400 font-bold'
                    : 'text-zinc-400 hover:text-white transition-colors'
                    } px-3 py-2 text-sm font-medium uppercase tracking-wider`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {isLoggedIn && (
              <div className="relative">
                <button
                  onClick={() => { setIsNotifOpen(!isNotifOpen); markAllAsRead(); }}
                  className="text-zinc-400 hover:text-white transition-colors relative p-2"
                >
                  <i className="fa-solid fa-bell text-xl"></i>
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {isNotifOpen && (
                  <div className="absolute right-0 mt-4 w-80 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                    <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
                      <h4 className="text-white text-xs font-black uppercase italic tracking-widest">Notificações</h4>
                      <span className="text-[10px] text-zinc-500 uppercase font-bold">{notifications.length} Recentes</span>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map(n => (
                          <div key={n.id} className="p-4 border-b border-zinc-800 hover:bg-white/5 transition-colors flex gap-4 items-start">
                            <img src={n.fromAvatar} alt="" className="w-10 h-10 rounded-full object-cover border border-zinc-700" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-zinc-300">
                                <span className="text-white font-bold">{n.fromUser}</span> {n.content}
                              </p>
                              <span className="text-[10px] text-zinc-600 font-bold uppercase">{n.createdAt}</span>
                            </div>
                            <div className={`w-2 h-2 rounded-full mt-2 ${n.type === 'like' ? 'bg-lime-400' : 'bg-blue-400'}`}></div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center">
                          <i className="fa-solid fa-moon text-zinc-800 text-3xl mb-4"></i>
                          <p className="text-zinc-500 text-xs font-bold uppercase">Tudo calmo por aqui...</p>
                        </div>
                      )}
                    </div>
                    {notifications.length > 0 && (
                      <div className="p-3 bg-zinc-800/50 text-center">
                        <button className="text-lime-400 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">
                          Ver Todas
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="hidden md:block">
              {isLoggedIn ? (
                <div className="flex items-center space-x-6">
                  <Link
                    to="/dashboard"
                    className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all"
                  >
                    Meu Painel
                  </Link>
                  <button
                    onClick={onLogout}
                    className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
                  >
                    Sair
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="neon-bg hover:bg-lime-500 text-black px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all transform hover:scale-105"
                >
                  Login
                </Link>
              )}
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-zinc-400 hover:text-white p-2"
              >
                <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-zinc-900 border-b border-zinc-800 px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={`${isActive(link.path) ? 'bg-zinc-800 text-lime-400' : 'text-zinc-300'
                } block px-3 py-2 rounded-md text-base font-medium`}
            >
              {link.name}
            </Link>
          ))}
          {!isLoggedIn ? (
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-left neon-bg text-black block px-3 py-2 rounded-md text-base font-bold"
            >
              Login
            </Link>
          ) : (
            <Link
              to="/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-white bg-zinc-800"
            >
              Minha Conta
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
