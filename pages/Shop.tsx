
import React, { useState } from 'react';
import { PRODUCTS } from '../data';

const Shop: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const categories = ['Todos', 'Pré-treino', 'Pós-treino', 'Hipertrofia', 'Recuperação'];

  const filteredProducts = activeCategory === 'Todos'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-zinc-950 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h1 className="text-5xl font-black text-white mb-4 italic uppercase tracking-tighter">
              TITAN <span className="neon-accent">STORE</span>
            </h1>
            <p className="text-zinc-400 max-w-xl">
              Suplementação de alta pureza para suportar seu treino pesado e acelerar sua recuperação.
            </p>
          </div>
          
          <div className="flex overflow-x-auto pb-2 gap-4">
             {categories.map((cat) => (
               <button
                 key={cat}
                 onClick={() => setActiveCategory(cat)}
                 className={`whitespace-nowrap px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                   activeCategory === cat ? 'bg-lime-400 text-black' : 'bg-zinc-900 text-zinc-500 hover:text-white'
                 }`}
               >
                 {cat}
               </button>
             ))}
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="glass-card rounded-2xl overflow-hidden flex flex-col group">
              <div className="relative h-64 bg-white/5 flex items-center justify-center p-8">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="max-h-full max-w-full object-contain mix-blend-lighten transition-transform group-hover:scale-110" 
                />
                <div className="absolute top-4 right-4">
                   <button className="w-8 h-8 rounded-full bg-zinc-900 text-zinc-500 flex items-center justify-center hover:text-red-500 transition-colors">
                      <i className="fa-regular fa-heart"></i>
                   </button>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div className="text-[10px] text-lime-400 font-bold uppercase mb-2">{product.category}</div>
                <h3 className="text-lg font-bold text-white mb-4 leading-tight">{product.name}</h3>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-zinc-800">
                  <div className="text-xl font-black text-white italic">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </div>
                  <button className="w-10 h-10 neon-bg text-black rounded-xl flex items-center justify-center hover:bg-white transition-colors">
                    <i className="fa-solid fa-cart-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
