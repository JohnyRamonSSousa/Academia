
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EXERCISES, PRODUCTS } from '../data';
import { Post } from '../types';
import { auth, db, storage } from '../firebase';
import { doc, getDoc, updateDoc, collection, query, where, orderBy, onSnapshot, deleteDoc, setDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { User } from 'firebase/auth';
import { MuscleGroup, Exercise, UserWorkout, WorkoutExercise, WorkoutHistory } from '../types';
import { increment } from 'firebase/firestore';

interface DashboardProps {
   user: User | null;
   isAuthLoading: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ user, isAuthLoading }) => {
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
   const [isUploading, setIsUploading] = useState(false);
   const [workoutSource, setWorkoutSource] = useState<'custom' | 'personal'>('personal');
   const [isCreateWorkoutModalOpen, setIsCreateWorkoutModalOpen] = useState(false);
   const [userWorkouts, setUserWorkouts] = useState<UserWorkout[]>([]);
   const [isEditingWorkout, setIsEditingWorkout] = useState<UserWorkout | null>(null);
   const [workoutForm, setWorkoutForm] = useState({
      name: '',
      muscleGroup: 'Peito',
      duration: '60 min',
      exercises: [] as WorkoutExercise[]
   });
   const [isExercisePickerOpen, setIsExercisePickerOpen] = useState(false);
   const [inProgressWorkout, setInProgressWorkout] = useState<UserWorkout | null>(null);
   const [secondsElapsed, setSecondsElapsed] = useState(0);
   const [userWorkoutHistory, setUserWorkoutHistory] = useState<WorkoutHistory[]>([]);
   const [stats, setStats] = useState({ workoutsCompleted: 0, streak: 0 });
   const [completedExercises, setCompletedExercises] = useState<number[]>([]);
   const [isCancelWorkoutModalOpen, setIsCancelWorkoutModalOpen] = useState(false);
   const fileInputRef = React.useRef<HTMLInputElement>(null);
   const cameraInputRef = React.useRef<HTMLInputElement>(null);

   useEffect(() => {
      const fetchProfile = async () => {
         if (!user) {
            if (!isAuthLoading) setIsLoadingProfile(false);
            return;
         }

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
               setStats({
                  workoutsCompleted: data.workoutsCompleted || 0,
                  streak: data.streak || 0
               });
            }
         } catch (error) {
            console.error("Error fetching profile:", error);
         } finally {
            setIsLoadingProfile(false);
         }
      };

      fetchProfile();
   }, [user, isAuthLoading]);

   useEffect(() => {
      if (!user) return;

      const q = query(
         collection(db, 'userWorkouts'),
         where('userId', '==', user.uid),
         orderBy('createdAt', 'desc')
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
         const fetchedWorkouts = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
         } as UserWorkout));
         setUserWorkouts(fetchedWorkouts);
      });

      return () => unsubscribe();
   }, [user]);

   useEffect(() => {
      if (!user) return;

      const q = query(
         collection(db, 'workoutHistory'),
         where('userId', '==', user.uid),
         orderBy('completedAt', 'desc')
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
         const fetchedHistory = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
         } as WorkoutHistory));
         setUserWorkoutHistory(fetchedHistory);
      });

      return () => unsubscribe();
   }, [user]);

   useEffect(() => {
      let interval: any;
      if (inProgressWorkout) {
         interval = setInterval(() => {
            setSecondsElapsed(prev => prev + 1);
         }, 1000);
      } else {
         setSecondsElapsed(0);
      }
      return () => clearInterval(interval);
   }, [inProgressWorkout]);

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

   const recentHistory = userWorkoutHistory.map(h => {
      const dateObj = h.completedAt?.toDate ? h.completedAt.toDate() : new Date();
      return {
         day: dateObj.toLocaleDateString('pt-BR', { day: '2-digit' }),
         month: dateObj.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', ''),
         time: h.actualDuration,
         name: h.workoutName,
         status: 'Concluído'
      };
   }).slice(0, 3);

   const scheduledExercises = EXERCISES.slice(0, 3);
   const recommendedProducts = PRODUCTS.slice(0, 2);

   const userStats = {
      plan: userProfile.plan,
      nextPayment: userProfile.nextPayment,
      workoutsCompleted: stats.workoutsCompleted,
      streak: stats.streak,
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

   const handleAddOrUpdateWorkout = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!user) return;

      try {
         if (isEditingWorkout) {
            const docRef = doc(db, 'userWorkouts', isEditingWorkout.id);
            await updateDoc(docRef, {
               ...workoutForm,
            });
         } else {
            await addDoc(collection(db, 'userWorkouts'), {
               userId: user.uid,
               ...workoutForm,
               createdAt: serverTimestamp()
            });
         }
         setIsCreateWorkoutModalOpen(false);
         setIsEditingWorkout(null);
         setWorkoutForm({ name: '', muscleGroup: 'Peito', duration: '60 min', exercises: [] });
      } catch (error) {
         console.error("Error saving workout:", error);
         alert("Erro ao salvar treino.");
      }
   };

   const addExerciseToWorkout = (exercise: Exercise) => {
      const newExercise: WorkoutExercise = {
         exerciseId: exercise.id,
         name: exercise.name,
         sets: '3',
         reps: '12',
         muscleGroup: exercise.muscleGroup
      };
      setWorkoutForm(prev => ({
         ...prev,
         exercises: [...prev.exercises, newExercise]
      }));
      setIsExercisePickerOpen(false);
   };

   const removeExerciseFromWorkout = (index: number) => {
      setWorkoutForm(prev => ({
         ...prev,
         exercises: prev.exercises.filter((_, i) => i !== index)
      }));
   };

   const updateWorkoutExerciseField = (index: number, field: 'sets' | 'reps', value: string) => {
      setWorkoutForm(prev => ({
         ...prev,
         exercises: prev.exercises.map((ex, i) => i === index ? { ...ex, [field]: value } : ex)
      }));
   };
   const formatTime = (seconds: number) => {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = seconds % 60;
      if (h > 0) {
         return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
      }
      return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
   };

   const handleStartWorkout = (workout: UserWorkout) => {
      setInProgressWorkout(workout);
      setSecondsElapsed(0);
      setCompletedExercises([]);
      setIsCancelWorkoutModalOpen(false);
   };

   const handleFinishWorkout = async () => {
      if (!inProgressWorkout || !user) return;

      try {
         const durationStr = formatTime(secondsElapsed);
         await addDoc(collection(db, 'workoutHistory'), {
            userId: user.uid,
            workoutName: inProgressWorkout.name,
            muscleGroup: inProgressWorkout.muscleGroup,
            actualDuration: durationStr,
            exerciseCount: inProgressWorkout.exercises?.length || 0,
            completedAt: serverTimestamp()
         });

         // Update stats immediately in local state
         setStats(prev => ({
            ...prev,
            workoutsCompleted: prev.workoutsCompleted + 1,
            streak: prev.streak + 1
         }));

         // Update stats in Firestore
         const userRef = doc(db, 'users', user.uid);
         await updateDoc(userRef, {
            workoutsCompleted: increment(1),
            streak: increment(1)
         });

         // Important: Clear workout state completely
         setInProgressWorkout(null);
         setSecondsElapsed(0);
         setCompletedExercises([]);
         setActiveTab('Overview');
      } catch (error) {
         console.error("Error finishing workout:", error);
         alert("Erro ao salvar histórico.");
      }
   };


   const handleDeleteWorkout = async (workoutId: string) => {
      if (!window.confirm('Tem certeza que deseja excluir este treino?')) return;
      try {
         await deleteDoc(doc(db, 'userWorkouts', workoutId));
      } catch (error) {
         console.error("Error deleting workout:", error);
         alert("Erro ao excluir treino.");
      }
   };

   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !user) return;

      setIsUploading(true);
      try {
         const storageRef = ref(storage, `avatars/${user.uid}`);
         await uploadBytes(storageRef, file);
         const downloadURL = await getDownloadURL(storageRef);

         setTempProfile(prev => ({ ...prev, avatar: downloadURL }));
         // Update profile immediately
         const docRef = doc(db, 'users', user.uid);
         await updateDoc(docRef, { avatar: downloadURL });
         setUserProfile(prev => ({ ...prev, avatar: downloadURL }));
      } catch (error: any) {
         console.error("Error uploading avatar:", error);
         alert("Erro ao fazer upload da imagem. Certifique-se de que o Firebase Storage está ativo.");
      } finally {
         setIsUploading(false);
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

   const renderTabContent = () => {
      switch (activeTab) {
         case 'Comunidade':
            return (
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
            );

         case 'Treinos':
            return (
               <div className="lg:col-span-12 space-y-8">
                  <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                        <div>
                           <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">MEUS PROGRAMAS</h3>
                           <p className="text-zinc-500 text-sm uppercase font-bold tracking-widest mt-1">Gerencie sua rotina de treinamento</p>
                        </div>
                        <div className="flex gap-4">
                           <button
                              onClick={() => setWorkoutSource('custom')}
                              className={`px-6 py-3 rounded-xl text-xs font-bold uppercase transition-all ${workoutSource === 'custom' ? 'bg-lime-400 text-black shadow-lg shadow-lime-400/20' : 'bg-zinc-800 text-zinc-400'}`}
                           >
                              Criar Próprio Treino
                           </button>
                           <button
                              onClick={() => setWorkoutSource('personal')}
                              className={`px-6 py-3 rounded-xl text-xs font-bold uppercase transition-all ${workoutSource === 'personal' ? 'bg-lime-400 text-black shadow-lg shadow-lime-400/20' : 'bg-zinc-800 text-zinc-400'}`}
                           >
                              Receber do Personal
                           </button>
                        </div>
                     </div>

                     {workoutSource === 'personal' ? (
                        <div className="text-center py-20 border-2 border-dashed border-zinc-800 rounded-3xl">
                           <div className="w-20 h-20 bg-lime-400/10 rounded-full flex items-center justify-center mx-auto mb-6">
                              <i className="fa-solid fa-user-ninja text-lime-400 text-3xl"></i>
                           </div>
                           <h4 className="text-white text-xl font-bold mb-2">Aguardando seu Personal</h4>
                           <p className="text-zinc-500 max-w-sm mx-auto mb-8">O professor Ricardo Silva está preparando sua nova planilha com base nos seus últimos resultados.</p>
                           <button className="text-lime-400 font-bold uppercase tracking-widest text-xs">Notificar Personal</button>
                        </div>
                     ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                           <button
                              onClick={() => {
                                 setWorkoutForm({ name: '', muscleGroup: 'Peito', duration: '60 min', exercises: [] });
                                 setIsEditingWorkout(null);
                                 setIsCreateWorkoutModalOpen(true);
                              }}
                              className="aspect-video bg-zinc-950 border-2 border-dashed border-zinc-800 rounded-3xl flex flex-col items-center justify-center gap-4 group hover:border-lime-400 transition-all"
                           >
                              <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center group-hover:bg-lime-400 transition-colors">
                                 <i className="fa-solid fa-plus text-zinc-500 group-hover:text-black"></i>
                              </div>
                              <span className="text-xs font-black uppercase text-zinc-500 group-hover:text-white mt-2">Novo Treino Customizado</span>
                           </button>
                           {userWorkouts.map((workout) => (
                              <div key={workout.id} className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 group hover:border-zinc-700 transition-all relative">
                                 <div className="flex justify-between items-start mb-6">
                                    <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center">
                                       <i className="fa-solid fa-dumbbell text-zinc-600"></i>
                                    </div>
                                    <div className="flex gap-2">
                                       <button
                                          onClick={() => {
                                             setWorkoutForm({
                                                name: workout.name,
                                                muscleGroup: workout.muscleGroup,
                                                duration: workout.duration,
                                                exercises: workout.exercises || []
                                             });
                                             setIsEditingWorkout(workout);
                                             setIsCreateWorkoutModalOpen(true);
                                          }}
                                          className="w-8 h-8 rounded-lg bg-zinc-900 text-zinc-500 hover:text-white flex items-center justify-center transition-all"
                                       >
                                          <i className="fa-solid fa-pen text-[10px]"></i>
                                       </button>
                                       <button
                                          onClick={() => handleDeleteWorkout(workout.id)}
                                          className="w-8 h-8 rounded-lg bg-zinc-900 text-zinc-500 hover:text-red-400 flex items-center justify-center transition-all"
                                       >
                                          <i className="fa-solid fa-trash text-[10px]"></i>
                                       </button>
                                    </div>
                                 </div>
                                 <h4 className="text-white font-black italic uppercase text-lg mb-2">{workout.name}</h4>
                                 <p className="text-zinc-500 text-[10px] mb-6 uppercase font-bold tracking-widest">{workout.muscleGroup} • {workout.exercises?.length || 0} Exercícios • {workout.duration}</p>

                                 {workout.exercises && workout.exercises.length > 0 && (
                                    <div className="space-y-2 mb-6 border-t border-zinc-900 pt-4">
                                       {workout.exercises.slice(0, 3).map((ex, idx) => (
                                          <div key={idx} className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                                             <span className="truncate pr-2">{ex.name}</span>
                                             <span className="text-white italic whitespace-nowrap">{ex.sets}x{ex.reps}</span>
                                          </div>
                                       ))}
                                       {workout.exercises.length > 3 && <div className="text-[9px] text-zinc-600 text-center font-black uppercase tracking-tighter mt-1">+ {workout.exercises.length - 3} outros exercícios</div>}
                                    </div>
                                 )}

                                 <button
                                    onClick={() => handleStartWorkout(workout)}
                                    className="w-full py-3 bg-zinc-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-lime-400 hover:text-black transition-all"
                                 >
                                    Iniciar Treino
                                 </button>
                              </div>
                           ))}
                        </div>
                     )}
                  </div>
               </div>
            );

         case 'Financeiro':
            return (
               <div className="lg:col-span-12 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 h-fit">
                        <h3 className="text-sm font-black text-lime-400 uppercase tracking-widest mb-8">STATUS DA CONTA</h3>
                        <div className="flex items-center gap-4 mb-10">
                           <div className="w-16 h-16 bg-lime-400/10 rounded-2xl flex items-center justify-center text-lime-400 text-2xl">
                              <i className="fa-solid fa-shield-check"></i>
                           </div>
                           <div>
                              <div className="text-white font-black italic uppercase text-xl line-none">{userProfile.plan}</div>
                              <div className="text-lime-400 text-[10px] font-black uppercase tracking-widest">Mensalidade Ativa</div>
                           </div>
                        </div>
                        <div className="space-y-4 pt-8 border-t border-zinc-800">
                           <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                              <span className="text-zinc-500">Valor Atual</span>
                              <span className="text-white">R$ 89,90</span>
                           </div>
                           <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                              <span className="text-zinc-500">Vencimento</span>
                              <span className="text-white">{userProfile.nextPayment}</span>
                           </div>
                           <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                              <span className="text-zinc-500">Método</span>
                              <span className="text-white">Cartão •••• 4412</span>
                           </div>
                        </div>
                        <button className="w-full mt-10 py-4 bg-lime-400 text-black rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-lime-400/20 hover:scale-105 transition-all">
                           Mudar de Plano
                        </button>
                     </div>

                     <div className="md:col-span-2 bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
                        <h3 className="text-xl font-black text-white uppercase italic tracking-tighter mb-8">HISTÓRICO DE PAGAMENTOS</h3>
                        <div className="overflow-x-auto">
                           <table className="w-full text-left">
                              <thead>
                                 <tr className="border-b border-zinc-800">
                                    <th className="pb-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Identificador</th>
                                    <th className="pb-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Data</th>
                                    <th className="pb-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Valor</th>
                                    <th className="pb-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Status</th>
                                    <th className="pb-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-right">Comprovante</th>
                                 </tr>
                              </thead>
                              <tbody className="divide-y divide-zinc-800">
                                 {[
                                    { id: '#JE-1249', date: '15/12/2025', val: 'R$ 89,90', status: 'Pago' },
                                    { id: '#JE-1123', date: '15/11/2025', val: 'R$ 89,90', status: 'Pago' },
                                    { id: '#JE-1002', date: '15/10/2025', val: 'R$ 89,90', status: 'Pago' }
                                 ].map((p, i) => (
                                    <tr key={i} className="group hover:bg-white/5 transition-colors">
                                       <td className="py-5 text-white font-bold text-xs uppercase">{p.id}</td>
                                       <td className="py-5 text-zinc-500 font-bold text-xs uppercase">{p.date}</td>
                                       <td className="py-5 text-white font-black text-xs uppercase italic">{p.val}</td>
                                       <td className="py-5">
                                          <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-lime-400/10 text-lime-400 rounded-full">{p.status}</span>
                                       </td>
                                       <td className="py-5 text-right">
                                          <button className="text-zinc-600 hover:text-white transition-colors">
                                             <i className="fa-solid fa-file-invoice-dollar"></i>
                                          </button>
                                       </td>
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>
               </div>
            );

         case 'Overview':
         default:
            return (
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
                        <button
                           onClick={() => setActiveTab('Financeiro')}
                           className="w-full py-3 bg-zinc-800 text-white rounded-xl text-xs font-bold uppercase hover:bg-zinc-700 transition-colors"
                        >
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
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                           <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">MEU TREINO DE HOJE</h3>
                           <div className="flex bg-zinc-950 p-1 rounded-xl border border-zinc-800 h-fit">
                              <button
                                 onClick={() => setWorkoutSource('personal')}
                                 className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${workoutSource === 'personal' ? 'bg-zinc-800 text-white' : 'text-zinc-600'}`}
                              >
                                 Personal
                              </button>
                              <button
                                 onClick={() => setWorkoutSource('custom')}
                                 className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${workoutSource === 'custom' ? 'bg-zinc-800 text-white' : 'text-zinc-600'}`}
                              >
                                 Criar Treino
                              </button>
                           </div>
                        </div>

                        <div className="space-y-4">
                           {workoutSource === 'personal' ? (
                              scheduledExercises.map((ex, idx) => (
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
                              ))
                           ) : (
                              userWorkouts.length > 0 ? (
                                 userWorkouts.slice(0, 3).map((workout) => (
                                    <div key={workout.id} className="group flex items-center justify-between p-6 rounded-2xl bg-zinc-950 border border-zinc-900 hover:border-lime-400/30 transition-all">
                                       <div className="flex items-center gap-6">
                                          <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center text-lime-400">
                                             <i className="fa-solid fa-person-running text-xl"></i>
                                          </div>
                                          <div>
                                             <h4 className="text-white font-black uppercase italic">{workout.name}</h4>
                                             <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">{workout.muscleGroup} • {workout.exercises?.length || 0} Exercícios • {workout.duration}</p>
                                          </div>
                                       </div>
                                       <div className="flex gap-3">
                                          <button
                                             onClick={() => {
                                                setWorkoutForm({
                                                   name: workout.name,
                                                   muscleGroup: workout.muscleGroup,
                                                   duration: workout.duration,
                                                   exercises: workout.exercises || []
                                                });
                                                setIsEditingWorkout(workout);
                                                setIsCreateWorkoutModalOpen(true);
                                             }}
                                             className="w-10 h-10 rounded-xl bg-zinc-900 text-zinc-500 hover:text-white flex items-center justify-center transition-all"
                                          >
                                             <i className="fa-solid fa-pen text-xs"></i>
                                          </button>
                                          <button
                                             onClick={() => { if (window.confirm('Excluir este treino permanentemente?')) handleDeleteWorkout(workout.id); }}
                                             className="w-10 h-10 rounded-xl bg-zinc-900 text-zinc-500 hover:text-red-400 flex items-center justify-center transition-all"
                                          >
                                             <i className="fa-solid fa-trash text-xs"></i>
                                          </button>
                                          <button
                                             onClick={() => handleStartWorkout(workout)}
                                             className="neon-bg text-black font-black px-6 py-2 rounded-xl uppercase text-[10px] tracking-widest hover:scale-105 transition-all"
                                          >
                                             Iniciar
                                          </button>
                                       </div>
                                    </div>
                                 ))
                              ) : (
                                 <div className="text-center py-16 border border-zinc-800 rounded-3xl bg-white/5">
                                    <i className="fa-solid fa-pen-ruler text-zinc-700 text-3xl mb-4"></i>
                                    <p className="text-zinc-500 uppercase text-xs font-black tracking-widest mb-6">Monte seu treino personalizado hoje</p>
                                    <button
                                       onClick={() => {
                                          setWorkoutForm({ name: '', muscleGroup: 'Peito', duration: '60 min', exercises: [] });
                                          setIsEditingWorkout(null);
                                          setIsCreateWorkoutModalOpen(true);
                                       }}
                                       className="neon-bg text-black font-black px-8 py-3 rounded-xl uppercase text-[10px] tracking-widest hover:scale-105 transition-all"
                                    >
                                       Começar Montagem
                                    </button>
                                 </div>
                              )
                           )}
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
                                    <div className="w-12 h-12 bg-zinc-900 rounded-xl flex flex-col items-center justify-center border border-zinc-800 shadow-inner">
                                       <span className="text-[9px] text-lime-400 font-black uppercase leading-none mb-1">{h.month}</span>
                                       <span className="text-white font-black text-sm leading-none">{h.day}</span>
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
            );
      }
   };

   // if (isAuthLoading) {
   //    return (
   //       <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
   //          <div className="text-lime-400 font-black animate-pulse uppercase tracking-[0.5em]">Carregando seu perfil...</div>
   //       </div>
   //    );
   // }

   if (!user) {
      return (
         <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
            <div className="text-lime-400 text-6xl mb-8">
               <i className="fa-solid fa-lock"></i>
            </div>
            <h2 className="text-white text-2xl font-black uppercase italic mb-4">Acesso Restrito</h2>
            <p className="text-zinc-500 text-center mb-8 max-w-md">Para acessar seu painel de treinamento, você precisa estar logado em uma conta ativa.</p>
            <Link to="/login" className="neon-bg text-black font-black px-10 py-4 rounded-xl uppercase tracking-widest transition-all hover:scale-105">
               Fazer Login Agora
            </Link>
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
               {renderTabContent()}
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

                  <div className="space-y-8">
                     {/* Hidden Inputs */}
                     <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                     />
                     <input
                        type="file"
                        ref={cameraInputRef}
                        className="hidden"
                        accept="image/*"
                        capture="user"
                        onChange={handleFileChange}
                     />

                     {/* Custom Upload Buttons */}
                     <div className="grid grid-cols-2 gap-4">
                        <button
                           onClick={() => fileInputRef.current?.click()}
                           disabled={isUploading}
                           className="flex flex-col items-center gap-2 p-4 bg-zinc-950 border border-zinc-800 rounded-2xl hover:border-lime-400 transition-all group disabled:opacity-50"
                        >
                           <i className="fa-solid fa-cloud-arrow-up text-zinc-500 group-hover:text-lime-400 text-xl"></i>
                           <span className="text-[10px] font-black uppercase text-zinc-500 group-hover:text-white">Galeria</span>
                        </button>
                        <button
                           onClick={() => cameraInputRef.current?.click()}
                           disabled={isUploading}
                           className="flex flex-col items-center gap-2 p-4 bg-zinc-950 border border-zinc-800 rounded-2xl hover:border-lime-400 transition-all group disabled:opacity-50"
                        >
                           <i className="fa-solid fa-camera text-zinc-500 group-hover:text-lime-400 text-xl"></i>
                           <span className="text-[10px] font-black uppercase text-zinc-500 group-hover:text-white">Câmera</span>
                        </button>
                     </div>

                     {isUploading && (
                        <div className="text-center text-lime-400 text-[10px] font-black uppercase animate-pulse">
                           Fazendo upload...
                        </div>
                     )}

                     <form onSubmit={handleSaveProfile} className="space-y-8">
                        {/* Avatar Picker */}
                        <div className="space-y-4 text-center">
                           <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Ou escolha um Avatar</p>
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
            </div>
         )}
         {/* Workout Creation/Edit Modal */}
         {isCreateWorkoutModalOpen && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl text-left">
               <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] w-full max-w-lg p-8 md:p-12 shadow-2xl animate-in zoom-in duration-300">
                  <div className="flex justify-between items-center mb-10 text-left">
                     <div>
                        <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">
                           {isEditingWorkout ? 'Editar Treino' : 'Novo Treino'}
                        </h3>
                        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Dê o seu melhor hoje</p>
                     </div>
                     <button
                        onClick={() => { setIsCreateWorkoutModalOpen(false); setIsEditingWorkout(null); }}
                        className="w-12 h-12 bg-zinc-800 rounded-full text-zinc-500 hover:text-white transition-all flex items-center justify-center"
                     >
                        <i className="fa-solid fa-times text-xl"></i>
                     </button>
                  </div>

                  <form onSubmit={handleAddOrUpdateWorkout} className="space-y-8 text-left">
                     <div className="space-y-2">
                        <label className="text-zinc-500 text-[10px] font-black uppercase tracking-widest px-4">Nome do Treino</label>
                        <input
                           type="text"
                           placeholder="EX: TREINO DE PEITO PESADO"
                           className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-white font-bold focus:outline-none focus:border-lime-400 transition-all uppercase placeholder:opacity-30"
                           value={workoutForm.name}
                           onChange={(e) => setWorkoutForm({ ...workoutForm, name: e.target.value.toUpperCase() })}
                           required
                        />
                     </div>

                     <div className="grid grid-cols-2 gap-6 text-left">
                        <div className="space-y-2">
                           <label className="text-zinc-500 text-[10px] font-black uppercase tracking-widest px-4">Grupo Muscular</label>
                           <select
                              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-white font-bold focus:outline-none focus:border-lime-400 transition-all uppercase appearance-none"
                              value={workoutForm.muscleGroup}
                              onChange={(e) => setWorkoutForm({ ...workoutForm, muscleGroup: e.target.value })}
                           >
                              {Object.values(MuscleGroup).map((mg) => (
                                 <option key={mg} value={mg}>{mg}</option>
                              ))}
                           </select>
                        </div>
                        <div className="space-y-2">
                           <label className="text-zinc-500 text-[10px] font-black uppercase tracking-widest px-4">Duração Est.</label>
                           <input
                              type="text"
                              placeholder="EX: 45 MIN"
                              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-white font-bold focus:outline-none focus:border-lime-400 transition-all uppercase placeholder:opacity-30"
                              value={workoutForm.duration}
                              onChange={(e) => setWorkoutForm({ ...workoutForm, duration: e.target.value.toUpperCase() })}
                              required
                           />
                        </div>
                     </div>
                     <div className="space-y-4">
                        <div className="flex justify-between items-center px-4">
                           <label className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Exercícios ({workoutForm.exercises.length})</label>
                           <button
                              type="button"
                              onClick={() => setIsExercisePickerOpen(true)}
                              className="text-lime-400 text-[10px] font-black uppercase tracking-widest hover:underline"
                           >
                              + Adicionar
                           </button>
                        </div>

                        <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                           {workoutForm.exercises.length === 0 ? (
                              <div className="text-center py-8 bg-zinc-950 border border-zinc-900 rounded-2xl border-dashed">
                                 <p className="text-zinc-600 text-[10px] font-black uppercase">Nenhum exercício adicionado</p>
                              </div>
                           ) : (
                              workoutForm.exercises.map((ex, idx) => (
                                 <div key={idx} className="flex items-center gap-4 p-4 bg-zinc-950 border border-zinc-800 rounded-2xl">
                                    <div className="flex-1">
                                       <div className="text-white font-bold text-xs uppercase italic">{ex.name}</div>
                                       <div className="flex gap-4 mt-1">
                                          <div className="flex items-center gap-1">
                                             <span className="text-[10px] text-zinc-500 font-bold uppercase">Séries:</span>
                                             <input
                                                type="text"
                                                className="w-8 bg-transparent border-b border-zinc-700 text-white font-black text-xs text-center focus:outline-none focus:border-lime-400"
                                                value={ex.sets}
                                                onChange={(e) => updateWorkoutExerciseField(idx, 'sets', e.target.value)}
                                             />
                                          </div>
                                          <div className="flex items-center gap-1">
                                             <span className="text-[10px] text-zinc-500 font-bold uppercase">Reps:</span>
                                             <input
                                                type="text"
                                                className="w-12 bg-transparent border-b border-zinc-700 text-white font-black text-xs text-center focus:outline-none focus:border-lime-400"
                                                value={ex.reps}
                                                onChange={(e) => updateWorkoutExerciseField(idx, 'reps', e.target.value)}
                                             />
                                          </div>
                                       </div>
                                    </div>
                                    <button
                                       type="button"
                                       onClick={() => removeExerciseFromWorkout(idx)}
                                       className="text-zinc-500 hover:text-red-400 transition-colors"
                                    >
                                       <i className="fa-solid fa-trash-can text-xs"></i>
                                    </button>
                                 </div>
                              ))
                           )}
                        </div>
                     </div>

                     <button
                        type="submit"
                        className="w-full neon-bg text-black font-black py-5 rounded-2xl uppercase tracking-[0.2em] shadow-lg shadow-lime-400/20 active:scale-95 transition-all mt-6"
                     >
                        {isEditingWorkout ? 'Atualizar Treino' : 'Criar Treino'}
                     </button>
                  </form>
               </div>
            </div>
         )}

         {/* Exercise Picker Modal */}
         {isExercisePickerOpen && (
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl">
               <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] w-full max-w-2xl p-8 max-h-[80vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in duration-300">
                  <div className="flex justify-between items-center mb-8">
                     <h3 className="text-2xl font-black text-white italic uppercase">Selecionar Exercício</h3>
                     <button onClick={() => setIsExercisePickerOpen(false)} className="text-zinc-500 hover:text-white">
                        <i className="fa-solid fa-times text-xl"></i>
                     </button>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-2 pr-4 custom-scrollbar flex flex-col gap-2">
                     {EXERCISES.map((ex) => (
                        <button
                           key={ex.id}
                           type="button"
                           onClick={() => addExerciseToWorkout(ex)}
                           className="w-full flex items-center gap-4 p-4 bg-zinc-950 border border-zinc-900 rounded-2xl hover:border-lime-400 group transition-all text-left"
                        >
                           <img src={ex.image} className="w-12 h-12 rounded-lg object-cover" alt={ex.name} />
                           <div className="flex-1">
                              <div className="text-white font-bold uppercase text-sm group-hover:text-lime-400">{ex.name}</div>
                              <div className="text-zinc-500 text-[10px] font-black uppercase">{ex.muscleGroup}</div>
                           </div>
                           <i className="fa-solid fa-plus text-zinc-700 group-hover:text-lime-400"></i>
                        </button>
                     ))}
                  </div>
               </div>
            </div>
         )}

         {/* Live Workout Overlay */}
         {inProgressWorkout && (
            <div className="fixed inset-0 z-[150] bg-black flex flex-col animate-in slide-in-from-bottom duration-500">
               <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-12">
                  <div className="max-w-2xl mx-auto space-y-12 text-left">
                     <div className="flex justify-between items-start">
                        <div>
                           <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-2">{inProgressWorkout.name}</h2>
                           <p className="text-lime-400 font-black uppercase text-xs tracking-[0.2em]">{inProgressWorkout.muscleGroup} em progresso</p>
                        </div>
                        <div className="text-right tabular-nums">
                           <div className="text-white font-black text-4xl italic">{formatTime(secondsElapsed)}</div>
                           <p className="text-zinc-500 font-black uppercase text-[10px] tracking-widest mt-2">Duração Atual</p>
                        </div>
                     </div>

                     <div className="space-y-4">
                        <h3 className="text-zinc-500 font-black uppercase text-xs tracking-widest px-4">Lista de Exercícios</h3>
                        <div className="space-y-4">
                           {inProgressWorkout.exercises?.map((ex, idx) => (
                              <div key={idx} className={`flex items-center gap-6 p-6 border rounded-3xl relative overflow-hidden group transition-all ${completedExercises.includes(idx) ? 'bg-lime-400/5 border-lime-400/20' : 'bg-zinc-900/50 border-zinc-800'}`}>
                                 <div className={`text-zinc-800 font-black text-4xl italic absolute -left-2 -bottom-2 transition-colors uppercase ${completedExercises.includes(idx) ? 'text-lime-400/10' : 'group-hover:text-zinc-700'}`}>{idx + 1}</div>
                                 <div className="flex-1 relative z-10 text-left">
                                    <h4 className={`font-black uppercase text-xl italic mb-1 transition-colors ${completedExercises.includes(idx) ? 'text-zinc-500 line-through decoration-lime-400/50' : 'text-white'}`}>{ex.name}</h4>
                                    <div className="flex gap-4">
                                       <div className={`font-black uppercase text-[10px] tracking-widest px-3 py-1 rounded-full transition-colors ${completedExercises.includes(idx) ? 'bg-zinc-800 text-zinc-600' : 'text-lime-400 bg-lime-400/10'}`}>{ex.sets} Séries</div>
                                       <div className={`font-black uppercase text-[10px] tracking-widest px-3 py-1 rounded-full transition-colors ${completedExercises.includes(idx) ? 'bg-zinc-800 text-zinc-600' : 'text-zinc-400 bg-zinc-800'}`}>{ex.reps} Repetições</div>
                                    </div>
                                 </div>
                                 <button
                                    onClick={() => {
                                       setCompletedExercises(prev =>
                                          prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
                                       );
                                    }}
                                    className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all relative z-10 shadow-xl ${completedExercises.includes(idx) ? 'bg-lime-400 border-lime-400 text-black' : 'bg-zinc-900 border-zinc-700 text-zinc-500 hover:border-lime-400 hover:text-lime-400'}`}
                                 >
                                    <i className="fa-solid fa-check"></i>
                                 </button>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>

               <div className="p-8 bg-zinc-950 border-t border-zinc-900">
                  <div className="max-w-2xl mx-auto flex gap-4">
                     <button
                        onClick={() => setIsCancelWorkoutModalOpen(true)}
                        className="flex-1 py-5 rounded-2xl bg-zinc-900 text-zinc-500 font-black uppercase text-xs tracking-widest hover:text-white transition-all text-center"
                     >
                        Cancelar
                     </button>
                     <button
                        onClick={handleFinishWorkout}
                        className="flex-[2] py-5 rounded-2xl neon-bg text-black font-black uppercase text-xs tracking-[0.2em] shadow-lg shadow-lime-400/20 hover:scale-[1.02] active:scale-95 transition-all text-center"
                     >
                        Concluir Treino
                     </button>
                  </div>
               </div>

               {isCancelWorkoutModalOpen && (
                  <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                     <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsCancelWorkoutModalOpen(false)}></div>
                     <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl max-w-sm w-full relative z-10 animate-in zoom-in-95 duration-200">
                        <div className="w-16 h-16 bg-red-400/10 text-red-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                           <i className="fa-solid fa-triangle-exclamation text-2xl"></i>
                        </div>
                        <h3 className="text-white text-xl font-black italic uppercase text-center mb-2">CANCELAR TREINO?</h3>
                        <p className="text-zinc-500 text-center text-sm mb-8">Todo o seu progresso atual nesta sessão será perdido permanentemente.</p>
                        <div className="flex flex-col gap-3">
                           <button
                              onClick={() => {
                                 setInProgressWorkout(null);
                                 setSecondsElapsed(0);
                                 setCompletedExercises([]);
                                 setIsCancelWorkoutModalOpen(false);
                              }}
                              className="w-full py-4 bg-red-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-red-500/20 hover:bg-red-600 transition-all"
                           >
                              Sim, Cancelar
                           </button>
                           <button
                              onClick={() => setIsCancelWorkoutModalOpen(false)}
                              className="w-full py-4 bg-zinc-800 text-zinc-400 rounded-2xl text-xs font-black uppercase tracking-widest hover:text-white transition-all"
                           >
                              Continuar Treinando
                           </button>
                        </div>
                     </div>
                  </div>
               )}
            </div>
         )}
      </div>
   );
};

export default Dashboard;
