import React, { useState } from 'react';
import { Link } from 'react-router-dom';


interface HomeProps {
  isLoggedIn?: boolean;
}

const Home: React.FC<HomeProps> = ({ isLoggedIn }) => {

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070"
            className="w-full h-full object-cover opacity-40"
            alt="Gym background"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="inline-block bg-lime-400/20 text-lime-400 px-4 py-1 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6 border border-lime-400/30">
            Performance Máxima
          </span>
          <h1 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter mb-8 italic">
            SEU CORPO É <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-lime-200">SEU TEMPLO.</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            A infraestrutura que você precisa com o suporte que você merece. Venha para a JE Academia e transforme seus resultados hoje.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={isLoggedIn ? "/dashboard" : "/join"} className="w-full sm:w-auto px-10 py-4 bg-lime-400 text-black font-black uppercase rounded-full hover:bg-lime-500 transition-all transform hover:scale-105">
              {isLoggedIn ? "Ir para o Dashboard" : "Começar Agora"}
            </Link>
            {!isLoggedIn && (
              <Link to="/scheduling" className="w-full sm:w-auto px-10 py-4 border border-lime-400 text-lime-400 font-black uppercase rounded-full hover:bg-lime-400 hover:text-black transition-all">
                Agendar Experimental
              </Link>
            )}
          </div>
        </div>
      </section>



      {/* Featured Sections */}
      <section className="py-32 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 italic tracking-tighter uppercase">
              BIBLIOTECA DE <br /> <span className="neon-accent">EXERCÍCIOS</span>
            </h2>
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
              Tenha acesso a mais de 200 vídeos demonstrativos e fichas técnicas detalhadas de cada movimento. Nunca mais treine errado.
            </p>
            <Link to="/exercises" className="inline-flex items-center text-lime-400 font-bold uppercase tracking-widest group">
              Explorar biblioteca
              <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800" className="rounded-2xl transform translate-y-8" alt="Workout" />
            <img src="https://images.unsplash.com/photo-1594882645126-14020914d58d?q=80&w=800" className="rounded-2xl" alt="Running" />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase mb-4">
                PRODUTOS EM <br /> <span className="neon-accent">DESTAQUE</span>
              </h2>
              <p className="text-zinc-500 max-w-lg">
                Melhore sua performance com os suplementos mais vendidos da nossa loja oficial.
              </p>
            </div>
            <Link to="/shop" className="hidden md:block text-lime-400 font-bold uppercase tracking-widest border-b-2 border-lime-400 pb-1">
              Ver loja completa
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Whey Protein Isolate', price: 'R$ 249,90', img: 'https://images.unsplash.com/photo-1593095191071-827c672b7402?q=80&w=800' },
              { name: 'Creatina Monohidratada', price: 'R$ 119,90', img: 'https://images.unsplash.com/photo-1593095191071-827c672b7402?q=80&w=800' },
              { name: 'Pré-Treino Explosive', price: 'R$ 159,90', img: 'https://images.unsplash.com/photo-1593095191071-827c672b7402?q=80&w=800' }
            ].map((product, i) => (
              <div key={i} className="glass-card p-6 rounded-3xl border border-zinc-800 hover:border-lime-400/50 transition-all group">
                <div className="aspect-square rounded-2xl overflow-hidden mb-6 bg-zinc-900">
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{product.name}</h4>
                <div className="flex justify-between items-center">
                  <span className="text-lime-400 font-black text-lg">{product.price}</span>
                  <Link to="/shop" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white hover:bg-lime-400 hover:text-black transition-all">
                    <i className="fa-solid fa-cart-shopping"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link to="/shop" className="inline-block text-lime-400 font-bold uppercase tracking-widest border-b-2 border-lime-400 pb-1">
              Ver loja completa
            </Link>
          </div>
        </div>
      </section>




      {/* Pricing Section - Only visible for guests */}
      {!isLoggedIn && (
        <section className="py-32 bg-zinc-950 border-t border-zinc-900">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase mb-6">
                ESCOLHA SEU <span className="neon-accent">PLANO</span>
              </h2>
              <p className="text-zinc-500 max-w-2xl mx-auto text-lg">
                Temos o plano ideal para cada estágio da sua jornada fitness. Escolha o que melhor se adapta aos seus objetivos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Básico',
                  price: '89,90',
                  features: ['Acesso à musculação', 'Ficha de treino bio-impressa', 'Acesso 1 unidade'],
                  popular: false
                },
                {
                  name: 'Pro',
                  price: '129,90',
                  features: ['Acesso Musculação + Cardio', 'Consultoria mensal com Personal', 'Acesso a todas as unidades', 'App exclusivo de treino'],
                  popular: true
                },
                {
                  name: 'Elite',
                  price: '199,90',
                  features: ['Acesso Total (Musculação + CrossFit)', 'Plano Nutricional Personalizado', 'Avaliação Física mensal', 'Kit Boas-vindas exclusivo'],
                  popular: false
                }
              ].map((plan, i) => (
                <div key={i} className={`glass-card p-10 rounded-3xl border ${plan.popular ? 'border-lime-400/50 scale-105' : 'border-zinc-800'} relative flex flex-col`}>
                  {plan.popular && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-lime-400 text-black text-[10px] font-black uppercase px-4 py-1 rounded-full tracking-[0.2em]">
                      Mais Popular
                    </span>
                  )}
                  <h4 className="text-2xl font-black text-white uppercase tracking-tight mb-4 italic">{plan.name}</h4>
                  <div className="flex items-baseline mb-8">
                    <span className="text-sm font-bold text-zinc-500 mr-2">R$</span>
                    <span className="text-5xl font-black text-white italic tracking-tighter">{plan.price}</span>
                    <span className="text-zinc-500 font-bold ml-2">/mês</span>
                  </div>
                  <ul className="space-y-4 mb-10 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-zinc-400 text-sm">
                        <i className="fa-solid fa-check text-lime-400 mr-3"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/join"
                    className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-center transition-all ${plan.popular ? 'neon-bg text-black hover:bg-lime-500' : 'bg-zinc-800 text-white hover:bg-zinc-700'
                      }`}
                  >
                    Selecionar
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}


    </div>
  );
};

export default Home;
