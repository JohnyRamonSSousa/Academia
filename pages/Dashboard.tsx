
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EXERCISES, PRODUCTS } from '../data';
import { Post } from '../types';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc, collection, query, where, orderBy, onSnapshot, deleteDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';

interface DashboardProps {
   user: User | null;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
   const [activeTab, setActiveTab] = useState('Overview');
   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
   const [isLoadingProfile, setIsLoadingProfile] = useState(true);
   const [userProfile, setUserProfile] = useState({
      name: 'TITÃ',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150',
      plan: 'Plano Básico',
      nextPayment: '01/01/2027'
   });
   const [tempProfile, setTempProfile] = useState(userProfile);

   useEffect(() => {
      const fetchProfile = async () => {
         if (!user) return;

         try {
            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
               const data = docSnap.data();
               const profile = {
                  name: data.name || 'TITÃ',
                  avatar: data.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150',
                  plan: data.plan || 'Plano Básico',
                  nextPayment: data.nextPayment || '15 Jan 2027'
               };
               setUserProfile(profile);
               setTempProfile(profile);
            }
         } catch (error) {
            console.error("Error fetching profile:", error);
         } finally {
            setIsLoadingProfile(false);
         }
      };

      fetchProfile();
   }, [user]);

   const [userPosts, setUserPosts] = useState<Post[]>([]);

   useEffect(() => {
      if (!user) return;

      const q = query(
         collection(db, 'posts'),
         where('userId', '==', user.uid),
         orderBy('createdAt', 'desc')
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
         const fetchedPosts = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            isLiked: doc.data().likedBy?.includes(user?.uid)
         } as Post));
         setUserPosts(fetchedPosts);
      });

      return () => unsubscribe();
   }, [user]);

   const recentHistory = [
      { date: 'Hoje', time: '18:30', name: 'Treino A (Peito/Tríceps)', status: 'Concluído' },
      { date: 'Próximo', time: '19:00', name: 'Treino B (Costas/Bíceps)', status: 'Pendente' },
      { date: 'Próximo', time: '17:30', name: 'Leg Day', status: 'Pendente' },
   ];

   const scheduledExercises = EXERCISES.slice(0, 3);
   const recommendedProducts = PRODUCTS.slice(0, 2);

   const userStats = {
      plan: userProfile.plan,
      nextPayment: userProfile.nextPayment,
      workoutsCompleted: 0,
      streak: 0,
   };

   const handleDeletePost = async (postId: string) => {
      if (!window.confirm('Tem certeza que deseja excluir esta postagem?')) return;
      try {
         await deleteDoc(doc(db, 'posts', postId));
      } catch (error) {
         console.error("Error deleting post:", error);
         alert("Erro ao excluir postagem. Tente novamente.");
      }
   };

   const handleSaveProfile = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!user) return;

      try {
         const docRef = doc(db, 'users', user.uid);
         await updateDoc(docRef, {
            name: tempProfile.name,
            avatar: tempProfile.avatar
         });
         setUserProfile(tempProfile);
         setIsEditModalOpen(false);
      } catch (error) {
         console.error("Error updating profile:", error);
      }
   };

   const avatarOptions = [
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150',
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=150',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150'
   ];

   if (isLoadingProfile) {
      return (
         <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
            <div className="text-lime-400 font-black animate-pulse uppercase tracking-[0.5em]">Limpando os pesos...</div>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-zinc-950 py-12">
         <div className="max-w-7xl mx-auto px-4">
            <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
               <div className="flex items-center gap-6">
                  <div className="relative group cursor-pointer" onClick={() => { setTempProfile(userProfile); setIsEditModalOpen(true); }}>
                     <img
                        src={userProfile.avatar}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-lime-400/30 group-hover:border-lime-400 transition-colors"
                        alt="Avatar"
                     />
                     <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <i className="fa-solid fa-pen text-white text-xs"></i>
                     </div>
                  </div>
                  <div>
                     <h1 className="text-4xl font-black text-white italic uppercase flex items-center gap-3">
                        BEM-VINDO, <span className="neon-accent">{userProfile.name}!</span>
                        <button
                           onClick={() => { setTempProfile(userProfile); setIsEditModalOpen(true); }}
                           className="text-zinc-600 hover:text-white transition-colors text-sm"
                        >
                           <i className="fa-solid fa-gear"></i>
                        </button>
                     </h1>
                     <p className="text-zinc-500">Mantenha o foco, seus resultados estão logo ali.</p>
                  </div>
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
                                          <div className="text-white font-black">{ex.sets}</div>
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
                              {recentHistory.map((h, i) => (
                                 <div
                                    key={i}
                                    className="flex items-center justify-between p-4 rounded-2xl bg-zinc-950 border border-zinc-900 group hover:border-lime-400/30 transition-all animate-in slide-in-from-left duration-300"
                                    style={{ animationDelay: `${i * 100}ms` }}
                                 >
                                    <div className="flex items-center gap-4">
                                       <div className="w-12 h-12 bg-zinc-900 rounded-xl flex flex-col items-center justify-center border border-zinc-800">
                                          <span className="text-[10px] text-zinc-500 font-bold uppercase">Hoje</span>
                                          <span className="text-white font-black leading-none">--</span>
                                       </div>
                                       <div>
                                          <h5 className="text-white font-bold text-sm uppercase">{h.name}</h5>
                                          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{h.time}</p>
                                       </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                       <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${h.status === 'Concluído' ? 'bg-lime-400/10 text-lime-400' : 'bg-zinc-800 text-zinc-500'
                                          }`}>
                                          {h.status}
                                       </span>
                                       <i className="fa-solid fa-chevron-right text-zinc-800"></i>
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

         {/* Edit Profile Modal */}
         {isEditModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
               <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl animate-in zoom-in duration-300">
                  <div className="flex justify-between items-center mb-8">
                     <h3 className="text-2xl font-black text-white italic uppercase">Editar Perfil</h3>
                     <button onClick={() => setIsEditModalOpen(false)} className="text-zinc-500 hover:text-white">
                        <i className="fa-solid fa-times text-xl"></i>
                     </button>
                  </div>

                  <form onSubmit={handleSaveProfile} className="space-y-8">
                     {/* Avatar Picker */}
                     <div className="space-y-4 text-center">
                        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Escolha seu Avatar</p>
                        <div className="grid grid-cols-3 gap-4">
                           {avatarOptions.map((url, i) => (
                              <button
                                 key={i}
                                 type="button"
                                 onClick={() => setTempProfile({ ...tempProfile, avatar: url })}
                                 className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all ${tempProfile.avatar === url ? 'border-lime-400 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                                    }`}
                              >
                                 <img src={url} className="w-full h-full object-cover" alt={`Avatar option ${i + 1}`} />
                                 {tempProfile.avatar === url && (
                                    <div className="absolute inset-0 bg-lime-400/10 flex items-center justify-center">
                                       <i className="fa-solid fa-check text-lime-400"></i>
                                    </div>
                                 )}
                              </button>
                           ))}
                        </div>
                     </div>

                     {/* Name Input */}
                     <div className="space-y-2">
                        <label className="text-zinc-500 text-[10px] font-black uppercase tracking-widest px-4">Seu Nome / Nome de Guerra</label>
                        <input
                           type="text"
                           value={tempProfile.name}
                           onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value.toUpperCase() })}
                           placeholder="EX: TITÃ"
                           className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-white font-bold focus:outline-none focus:border-lime-400 transition-all uppercase"
                           required
                        />
                     </div>

                     <button
                        type="submit"
                        className="w-full neon-bg text-black font-black py-5 rounded-2xl uppercase tracking-[0.2em] shadow-lg shadow-lime-400/20 active:scale-95 transition-all"
                     >
                        Salvar Alterações
                     </button>
                  </form>
               </div>
            </div>
         )}
      </div>
   );
};

export default Dashboard;
