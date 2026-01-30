
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <span className="text-xl font-black text-white">JE<span className="neon-accent"> ACADEMIA</span></span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Elevando seu potencial ao limite com tecnologia de ponta e os melhores profissionais do mercado fitness.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Acesso Rápido</h4>
            <ul className="space-y-2">
              <li><Link to="/exercises" className="text-zinc-400 hover:text-lime-400 text-sm transition-colors">Biblioteca de Exercícios</Link></li>
              <li><Link to="/crossfit" className="text-zinc-400 hover:text-lime-400 text-sm transition-colors">CrossFit WODs</Link></li>
              <li><Link to="/trainers" className="text-zinc-400 hover:text-lime-400 text-sm transition-colors">Personal Trainers</Link></li>
              <li><Link to="/shop" className="text-zinc-400 hover:text-lime-400 text-sm transition-colors">Loja de Suplementos</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Suporte</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-zinc-400 hover:text-lime-400 text-sm transition-colors">FAQ</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-lime-400 text-sm transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-lime-400 text-sm transition-colors">Privacidade</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-lime-400 text-sm transition-colors">Fale Conosco</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Siga-nos</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-lime-400 hover:text-black transition-all">
                <i className="fa-brands fa-instagram text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-lime-400 hover:text-black transition-all">
                <i className="fa-brands fa-facebook-f text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-lime-400 hover:text-black transition-all">
                <i className="fa-brands fa-youtube text-lg"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-zinc-900 text-center">
          <p className="text-zinc-500 text-xs">
            &copy; {new Date().getFullYear()} JE Academia. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
