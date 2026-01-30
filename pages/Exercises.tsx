
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { EXERCISES } from '../data';
import { MuscleGroup } from '../types';

interface ExercisesProps {
  isLoggedIn: boolean;
}

const Exercises: React.FC<ExercisesProps> = ({ isLoggedIn }) => {
  const [activeFilter, setActiveFilter] = useState<MuscleGroup | 'Todos'>('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const filteredExercises = EXERCISES.filter(ex => {
    const matchesFilter = activeFilter === 'Todos' || ex.muscleGroup === activeFilter;
    const matchesSearch = ex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ex.muscleGroup.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-zinc-950 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-5xl font-black text-white mb-4 italic uppercase tracking-tighter">
            BIBLIOTECA DE <span className="neon-accent">EXERCÍCIOS</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl text-lg uppercase tracking-tight">
            Aprenda a execução perfeita para maximizar seus ganhos e evitar lesões.
          </p>
        </header>

        {/* Search and Filters */}
        <div className="space-y-8 mb-16">
          <div className="relative max-w-2xl">
            <i className="fa-solid fa-magnifying-glass absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500"></i>
            <input
              type="text"
              placeholder="Buscar exercício (ex: Supino, Agachamento...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-5 pl-16 pr-6 text-white placeholder:text-zinc-600 focus:outline-none focus:border-lime-400 transition-colors uppercase text-xs font-bold tracking-widest"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            {['Todos', ...Object.values(MuscleGroup)].map((group) => (
              <button
                key={group}
                onClick={() => setActiveFilter(group as any)}
                className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border ${activeFilter === group
                  ? 'neon-bg text-black border-lime-400'
                  : 'bg-zinc-900 text-zinc-500 border-zinc-800 hover:border-zinc-700 hover:text-white'
                  }`}
              >
                {group}
              </button>
            ))}
          </div>
        </div>

        {/* Exercise Grid */}
        {filteredExercises.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExercises.map((ex) => (
              <div key={ex.id} className="glass-card rounded-3xl overflow-hidden group hover:border-lime-400/50 transition-all transform hover:-translate-y-2 duration-300">
                <div className="relative h-72 overflow-hidden">
                  <div className={!isLoggedIn ? 'blur-sm grayscale' : ''}>
                    <img src={ex.image} alt={ex.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="absolute top-6 left-6">
                    <span className="bg-black/90 backdrop-blur-md text-lime-400 text-[10px] font-black uppercase px-4 py-1.5 rounded-full border border-lime-400/30 tracking-widest">
                      {ex.muscleGroup}
                    </span>
                  </div>

                  {isLoggedIn ? (
                    ex.videoUrl && (
                      <button
                        onClick={() => setSelectedVideo(ex.videoUrl!)}
                        className="absolute inset-0 m-auto w-16 h-16 bg-lime-400 rounded-full flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity transform scale-90 group-hover:scale-100 duration-300 shadow-[0_0_30px_rgba(163,230,53,0.5)]"
                      >
                        <i className="fa-solid fa-play text-xl ml-1"></i>
                      </button>
                    )
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity p-6 text-center">
                      <i className="fa-solid fa-lock text-lime-400 text-3xl mb-4"></i>
                      <Link to="/login" className="text-white text-xs font-black uppercase tracking-widest bg-zinc-900/80 px-4 py-2 rounded-lg border border-white/10 hover:bg-lime-400 hover:text-black transition-all">
                        Login para Ver Vídeo
                      </Link>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black text-white mb-2 uppercase italic">{ex.name}</h3>
                  {isLoggedIn ? (
                    <p className="text-zinc-500 text-xs mb-6 line-clamp-2 uppercase tracking-tight font-medium leading-relaxed">{ex.description}</p>
                  ) : (
                    <div className="mb-6 p-3 bg-zinc-900/50 rounded-xl border border-zinc-800">
                      <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest leading-none">
                        <i className="fa-solid fa-eye-slash mr-2"></i>
                        Informações Restritas
                      </p>
                    </div>
                  )}
                  <div className="grid grid-cols-3 gap-4 border-t border-zinc-800 pt-4">
                    <div className="text-center">
                      <div className="text-zinc-500 text-[10px] uppercase font-bold mb-1">Séries</div>
                      <div className="text-white font-black">{ex.sets}</div>
                    </div>
                    <div className="text-center border-x border-zinc-800">
                      <div className="text-zinc-500 text-[10px] uppercase font-bold mb-1">Reps</div>
                      <div className="text-white font-black">{ex.reps}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-zinc-500 text-[10px] uppercase font-bold mb-1">Descanso</div>
                      <div className="text-white font-black">{ex.rest}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-zinc-900/30 rounded-3xl border border-zinc-800 border-dashed">
            <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-6 border border-zinc-700">
              <i className="fa-solid fa-magnifying-glass text-zinc-600 text-3xl"></i>
            </div>
            <h4 className="text-white font-bold mb-2 uppercase tracking-tight">Nenhum exercício encontrado</h4>
            <p className="text-zinc-500 text-sm mb-8">Tente buscar por outro termo ou mude o filtro de grupo muscular.</p>
            <button
              onClick={() => { setSearchTerm(''); setActiveFilter('Todos'); }}
              className="text-lime-400 font-bold uppercase tracking-widest text-xs border-b border-lime-400 pb-1"
            >
              Limpar todos os filtros
            </button>
          </div>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" onClick={() => setSelectedVideo(null)}></div>
          <div className="relative w-full max-w-4xl aspect-video bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl animate-in zoom-in duration-300">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            <iframe
              src={selectedVideo}
              className="w-full h-full"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exercises;
