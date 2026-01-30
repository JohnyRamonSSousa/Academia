
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { EXERCISES, PRODUCTS } from '../data';
import { Post } from '../types';

const Dashboard: React.FC = () => {
   const [activeTab, setActiveTab] = useState('Overview');
   const [userPosts, setUserPosts] = useState<Post[]>(() => {
      const saved = localStorage.getItem('je_community_posts');
      if (saved) {
         const allPosts: Post[] = JSON.parse(saved);
         return allPosts.filter(post => post.userName === 'Você (Aluno JE)');
      }
      return [];
   });

   // Simulated data
   const userStats = {
      plan: 'Titan PRO (Anual)',
      nextPayment: '15 Out 2024',
      workoutsCompleted: 42,
      streak: 5,
   };

   const scheduledExercises = EXERCISES.slice(0, 3);
   const recommendedProducts = PRODUCTS.slice(0, 2);

   const handleDeletePost = (postId: string) => {
      const saved = localStorage.getItem('je_community_posts');
      if (saved) {
         const allPosts: Post[] = JSON.parse(saved);
         const updatedAll = allPosts.filter(p => p.id !== postId);
         localStorage.setItem('je_community_posts', JSON.stringify(updatedAll));
         setUserPosts(updatedAll.filter(p => p.userName === 'Você (Aluno JE)'));
      }
   };

   return (
      <div className="min-h-screen bg-zinc-950 py-12">
         <div className="max-w-7xl mx-auto px-4">
            <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
               <div>
                  <h1 className="text-4xl font-black text-white italic uppercase">BEM-VINDO, <span className="neon-accent">TITÃ!</span></h1>
                  <p className="text-zinc-500">Mantenha o foco, seus resultados estão logo ali.</p>
               </div>
               <div className="flex bg-zinc-900 rounded-2xl p-1.5 border border-zinc-800">
                  {['Overview', 'Treinos', 'Financeiro', 'Comunidade'].map(tab => (
                     <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase transition-all ${activeTab === tab ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-50'
                           }`}
                     >
                        {tab}
                     </button>
                  ))}
               </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
               {activeTab === 'Comunidade' ? (
                  <div className="lg:col-span-12">
                     <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
                        <div className="flex items-center justify-between mb-8">
                           <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">MINHAS POSTAGENS</h3>
                           <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
                              {userPosts.length} Publicações
                           </div>
                        </div>

                        {userPosts.length > 0 ? (
                           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {userPosts.map(post => (
                                 <div key={post.id} className="glass-card rounded-2xl border border-zinc-800 overflow-hidden group">
                                    <div className="aspect-square relative">
                                       <img src={post.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Post" />
                                       <button
                                          onClick={() => handleDeletePost(post.id)}
                                          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                       >
                                          <i className="fa-solid fa-trash-can text-xs"></i>
                                       </button>
                                    </div>
                                    <div className="p-4">
                                       <p className="text-zinc-400 text-sm line-clamp-2 mb-3">{post.caption}</p>
                                       <div className="flex items-center justify-between">
                                          <div className="flex gap-4">
                                             <span className="text-zinc-500 text-xs font-bold flex items-center gap-1">
                                                <i className="fa-solid fa-heart text-lime-400"></i> {post.likes}
                                             </span>
                                             <span className="text-zinc-500 text-xs font-bold flex items-center gap-1">
                                                <i className="fa-solid fa-comment"></i> {post.comments.length}
                                             </span>
                                          </div>
                                          <span className="text-zinc-600 text-[10px] uppercase font-bold">{post.createdAt}</span>
                                       </div>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        ) : (
                           <div className="text-center py-20">
                              <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-6 border border-zinc-700">
                                 <i className="fa-solid fa-camera text-zinc-600 text-3xl"></i>
                              </div>
                              <h4 className="text-white font-bold mb-2">Nenhuma postagem ainda</h4>
                              <p className="text-zinc-500 text-sm mb-8">Compartilhe sua evolução com a comunidade JE!</p>
                              <Link to="/community" className="inline-block text-lime-400 font-bold uppercase tracking-widest text-xs border-b border-lime-400 pb-1">
                                 Ir para a Comunidade
                              </Link>
                           </div>
                        )}
                     </div>
                  </div>
               ) : (
                  <>
                     {/* Left Column - Stats */}
                     <div className="lg:col-span-4 space-y-8">
                        <div className="glass-card p-8 rounded-3xl border-lime-400/10">
                           <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-6">Assinatura Ativa</h3>
                           <div className="text-2xl font-black text-white italic mb-2">{userStats.plan}</div>
                           <div className="text-zinc-400 text-sm mb-6 italic">Próximo vencimento: {userStats.nextPayment}</div>
                           <div className="w-full bg-zinc-800 h-2 rounded-full mb-6 overflow-hidden">
                              <div className="bg-lime-400 h-full w-[70%]"></div>
                           </div>
                           <button className="w-full py-3 bg-zinc-800 text-white rounded-xl text-xs font-bold uppercase hover:bg-zinc-700 transition-colors">
                              Gerenciar Plano
                           </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                           <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800">
                              <div className="text-3xl font-black text-white italic mb-1">{userStats.workoutsCompleted}</div>
                              <div className="text-zinc-500 text-[10px] uppercase font-bold">Treinos Realizados</div>
                           </div>
                           <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800">
                              <div className="text-3xl font-black text-lime-400 italic mb-1">{userStats.streak}</div>
                              <div className="text-zinc-500 text-[10px] uppercase font-bold">Dias Seguidos</div>
                           </div>
                        </div>

                        <div className="glass-card p-8 rounded-3xl border-blue-400/10">
                           <div className="flex items-center gap-3 mb-6">
                              <div className="w-10 h-10 bg-blue-500/20 text-blue-400 flex items-center justify-center rounded-full">
                                 <i className="fa-solid fa-brain"></i>
                              </div>
                              <h3 className="text-sm font-black text-white uppercase italic">Sugestão de Produto IA</h3>
                           </div>
                           <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                              Com base no seu volume de treinos de força desta semana, recomendamos o aumento de proteína.
                           </p>
                           {recommendedProducts.map(prod => (
                              <div key={prod.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl mb-4">
                                 <img src={prod.image} className="w-12 h-12 object-contain rounded-lg bg-white/10" alt={prod.name} />
                                 <div className="flex-1 min-w-0">
                                    <div className="text-white text-xs font-bold truncate">{prod.name}</div>
                                    <div className="text-lime-400 text-xs font-black">R$ {prod.price.toFixed(2)}</div>
                                 </div>
                                 <button className="w-8 h-8 rounded-lg bg-zinc-800 text-white flex items-center justify-center hover:bg-lime-400 hover:text-black transition-colors">
                                    <i className="fa-solid fa-chevron-right text-[10px]"></i>
                                 </button>
                              </div>
                           ))}
                        </div>
                     </div>

                     {/* Right Column - Workouts */}
                     <div className="lg:col-span-8 space-y-8">
                        <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
                           <div className="flex items-center justify-between mb-8">
                              <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">MEU TREINO DE HOJE</h3>
                              <button className="text-lime-400 text-xs font-bold uppercase tracking-widest">
                                 Ver Planilha Completa
                              </button>
                           </div>

                           <div className="space-y-4">
                              {scheduledExercises.map((ex, idx) => (
                                 <div key={ex.id} className="group flex flex-col sm:flex-row sm:items-center gap-6 p-6 rounded-2xl hover:bg-white/5 transition-all border border-transparent hover:border-zinc-800">
                                    <div className="text-zinc-600 font-black text-3xl italic">0{idx + 1}</div>
                                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-zinc-800">
                                       <img src={ex.image} className="w-full h-full object-cover" alt={ex.name} />
                                    </div>
                                    <div className="flex-1">
                                       <h4 className="text-white font-black uppercase text-lg italic mb-1">{ex.name}</h4>
                                       <div className="text-zinc-500 text-xs font-bold uppercase tracking-wider">{ex.muscleGroup}</div>
                                    </div>
                                    <div className="flex gap-8">
                                       <div className="text-center">
                                          <div className="text-zinc-600 text-[10px] font-bold uppercase mb-1">Sets</div>
                                          <div className="text-white font-black">{ex.sets}</div>
                                       </div>
                                       <div className="text-center">
                                          <div className="text-zinc-600 text-[10px] font-bold uppercase mb-1">Reps</div>
                                          <div className="text-white font-black">{ex.reps}</div>
                                       </div>
                                       <div className="text-center">
                                          <div className="text-zinc-600 text-[10px] font-bold uppercase mb-1">Rest</div>
                                          <div className="text-white font-black">{ex.rest}</div>
                                       </div>
                                    </div>
                                    <button className="w-12 h-12 rounded-full border border-zinc-700 text-zinc-400 hover:border-lime-400 hover:text-lime-400 flex items-center justify-center transition-all">
                                       <i className="fa-solid fa-check"></i>
                                    </button>
                                 </div>
                              ))}
                           </div>
                        </div>

                        <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
                           <h3 className="text-xl font-black text-white uppercase italic tracking-tighter mb-8">HISTÓRICO RECENTE</h3>
                           <div className="space-y-6">
                              {[
                                 { date: 'Hoje', time: '07:30 - 08:45', name: 'Treino A (Peito/Tríceps)', status: 'Completo' },
                                 { date: 'Ontem', time: '18:15 - 19:30', name: 'Treino B (Costas/Bíceps)', status: 'Completo' },
                                 { date: 'Segunda', time: '06:00 - 07:15', name: 'Leg Day', status: 'Incompleto' },
                              ].map((h, i) => (
                                 <div key={i} className="flex items-center justify-between py-4 border-b border-zinc-800 last:border-0">
                                    <div className="flex items-center gap-6">
                                       <div className="text-zinc-500 text-xs font-bold uppercase w-16">{h.date}</div>
                                       <div>
                                          <div className="text-white font-black text-sm uppercase">{h.name}</div>
                                          <div className="text-zinc-600 text-[10px]">{h.time}</div>
                                       </div>
                                    </div>
                                    <div className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${h.status === 'Completo' ? 'bg-lime-400/10 text-lime-400' : 'bg-red-500/10 text-red-500'
                                       }`}>
                                       {h.status}
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  </>
               )}
            </div>
         </div>
      </div>
   );
};

export default Dashboard;
