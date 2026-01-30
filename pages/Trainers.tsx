
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TRAINERS, TRAINER_TIPS } from '../data';


interface TrainersProps {
  isLoggedIn: boolean;
}

const Trainers: React.FC<TrainersProps> = ({ isLoggedIn }) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-zinc-950 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-24">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 italic uppercase tracking-tighter">
            ELITE DE <span className="neon-accent">TREINADORES</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl text-lg uppercase tracking-tight">
            Escolha um especialista para acelerar seus resultados com um planejamento 100% individualizado.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-40">
          {TRAINERS.map((trainer) => (
            <div key={trainer.id} className="group relative">
              <div className="relative h-[480px] overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800">
                <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>

                <div className="absolute top-6 right-6">
                  <div className="bg-zinc-950/80 backdrop-blur-md px-4 py-2 rounded-full border border-zinc-800">
                    <div className="text-lime-400 font-black italic text-xs uppercase tracking-widest">{trainer.specialty}</div>
                  </div>
                </div>

                {isLoggedIn ? (
                  trainer.videoUrl && (
                    <button
                      onClick={() => setSelectedVideo(trainer.videoUrl!)}
                      className="absolute inset-0 m-auto w-16 h-16 bg-white rounded-full flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-all transform scale-75 group-hover:scale-100 shadow-2xl"
                    >
                      <i className="fa-solid fa-play ml-1"></i>
                    </button>
                  )
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity p-6 text-center">
                    <i className="fa-solid fa-lock text-lime-400 text-4xl mb-4"></i>
                    <Link to="/login" className="text-white text-xs font-black uppercase tracking-widest bg-zinc-900/80 px-4 py-2 rounded-lg border border-white/10 hover:bg-lime-400 hover:text-black transition-all">
                      Login para Ver Vídeo
                    </Link>
                  </div>
                )}
              </div>

              <div className="absolute -bottom-20 left-6 right-6 glass-card p-6 rounded-3xl group-hover:-translate-y-4 transition-transform duration-500 shadow-2xl border-zinc-800">
                <h3 className="text-2xl font-black text-white uppercase italic mb-1">{trainer.name}</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-zinc-500 text-[10px] uppercase tracking-widest font-bold">
                    <i className="fa-solid fa-clock text-lime-400 mr-2"></i>
                    <span>{trainer.experience} de exp • {trainer.yearsAtGym} na JE</span>
                  </div>
                  <div className="text-zinc-400 text-[10px] font-bold uppercase leading-tight">
                    {trainer.graduation}
                  </div>
                </div>
                <button className="w-full py-4 bg-lime-400 text-black font-black uppercase text-xs rounded-xl hover:bg-lime-500 transition-all transform active:scale-95 shadow-xl">
                  Consultar Disponibilidade
                </button>
              </div>
            </div>
          ))}
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

        {/* Exclusive Tips Section */}
        <section className="pt-20 border-t border-zinc-900">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white italic uppercase tracking-tighter mb-4">
                DICAS DA <span className="neon-accent">ELITE</span>
              </h2>
              <p className="text-zinc-500 uppercase tracking-widest text-xs font-black">Conhecimento exclusivo dos nossos personals</p>
            </div>
            <button className="text-lime-400 text-xs font-black uppercase tracking-[0.2em] hover:text-white transition-colors">
              Ver todas as dicas <i className="fa-solid fa-chevron-right ml-2"></i>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TRAINER_TIPS.map(tip => (
              <div key={tip.id} className="bg-zinc-900/50 rounded-3xl border border-zinc-800 overflow-hidden flex flex-col sm:flex-row group hover:border-zinc-600 transition-colors">
                <div className="sm:w-1/3 h-48 sm:h-auto overflow-hidden">
                  <img src={tip.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={tip.title} />
                </div>
                <div className="p-8 sm:w-2/3 flex flex-col justify-center">
                  <div className="text-lime-400 text-[10px] font-black uppercase tracking-widest mb-2">{tip.trainerName}</div>
                  <h4 className="text-white text-xl font-bold mb-4 uppercase italic tracking-tight">{tip.title}</h4>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">{tip.content}</p>
                  <button className="text-white text-[10px] font-black uppercase tracking-widest border-b-2 border-lime-400 pb-1 w-fit hover:text-lime-400 transition-colors">
                    Ler Completo
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Trainers;
