
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CROSSFIT_WODS, TRAINERS, TRAINER_TIPS, MARTIAL_ARTS, DANCES } from '../data';

interface CrossFitProps {
  isLoggedIn: boolean;
}

const CrossFit: React.FC<CrossFitProps> = ({ isLoggedIn }) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-zinc-950 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-16 text-center">
          <div className="w-16 h-1 bg-lime-400 mx-auto mb-6"></div>
          <h1 className="text-6xl font-black text-white mb-6 italic uppercase tracking-tighter">
            FORJADOS NO <span className="neon-accent">AÇO</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            WODs diários, treinos de alta intensidade e uma comunidade que te empurra além dos limites.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {CROSSFIT_WODS.map((wod) => (
            <div key={wod.id} className="relative group overflow-hidden rounded-3xl aspect-[3/4]">
              <img src={wod.image} alt={wod.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase mb-4 ${wod.level === 'Avançado' ? 'bg-red-500/20 text-red-500 border border-red-500/30' :
                  wod.level === 'Intermediário' ? 'bg-orange-500/20 text-orange-500 border border-orange-500/30' :
                    'bg-green-500/20 text-green-500 border border-green-500/30'
                  }`}>
                  {wod.level}
                </div>
                <h3 className="text-3xl font-black text-white mb-2 uppercase italic">{wod.name}</h3>
                <p className="text-zinc-300 text-sm mb-6 line-clamp-2">
                  {wod.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-lime-400 font-bold">
                    <i className="fa-regular fa-clock mr-2"></i>
                    <span>{wod.duration}</span>
                  </div>
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:bg-lime-400 transition-colors">
                    <i className="fa-solid fa-play"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Nossos Coaches Section */}
        <section className="mt-32">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-2">TIME DE <span className="neon-accent">ELITE</span></h2>
              <p className="text-zinc-500 uppercase text-xs font-bold tracking-widest">Nossos treinadores são certificados internacionalmente</p>
            </div>
            <div className="hidden md:flex gap-4">
              <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-800 text-zinc-500">
                <i className="fa-solid fa-chevron-left"></i>
              </div>
              <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-800 text-lime-400">
                <i className="fa-solid fa-chevron-right"></i>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TRAINERS.map((trainer) => (
              <div key={trainer.id} className="glass-card rounded-3xl overflow-hidden group border-zinc-800 hover:border-lime-400/30 transition-all">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                  {isLoggedIn ? (
                    trainer.videoUrl && (
                      <button
                        onClick={() => setSelectedVideo(trainer.videoUrl!)}
                        className="absolute inset-0 m-auto w-14 h-14 bg-white rounded-full flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-all transform scale-75 group-hover:scale-100"
                      >
                        <i className="fa-solid fa-play ml-1"></i>
                      </button>
                    )
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity p-6 text-center">
                      <i className="fa-solid fa-lock text-lime-400 text-2xl mb-2"></i>
                      <Link to="/login" className="text-white text-[10px] font-black uppercase tracking-widest bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-white/10 hover:bg-lime-400 hover:text-black transition-all">
                        Login para Ver
                      </Link>
                    </div>
                  )}

                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-black text-white uppercase italic mb-1">{trainer.name}</h3>
                    <p className="text-lime-400 text-[10px] font-black uppercase tracking-widest">{trainer.specialty}</p>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-zinc-900/50 p-3 rounded-2xl border border-zinc-800">
                      <span className="block text-zinc-500 text-[9px] uppercase font-bold mb-1">Experiência</span>
                      <span className="text-white text-xs font-black">{trainer.experience}</span>
                    </div>
                    <div className="bg-zinc-900/50 p-3 rounded-2xl border border-zinc-800">
                      <span className="block text-zinc-500 text-[9px] uppercase font-bold mb-1">Na Academia</span>
                      <span className="text-white text-xs font-black">{trainer.yearsAtGym}</span>
                    </div>
                  </div>
                  <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800">
                    <span className="block text-zinc-400 text-[10px] font-bold uppercase tracking-tight mb-1">{trainer.graduation}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Martial Arts Section */}
        <section className="mt-32">
          <div className="text-center mb-16">
            <span className="inline-block bg-lime-400/20 text-lime-400 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-lime-400/30">
              Combate & Disciplina
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter mb-4">
              LUTAS <span className="neon-accent">JE</span>
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto uppercase text-[10px] font-bold tracking-widest">
              Domine as técnicas das artes marciais mais eficientes do mundo
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MARTIAL_ARTS.map((art) => (
              <Link
                to={`/martial-arts/${art.slug}`}
                key={art.id}
                className="group relative rounded-[2.5rem] overflow-hidden aspect-[4/5] bg-zinc-900 border border-zinc-800 hover:border-lime-400/50 transition-all duration-500"
              >
                <img src={art.image} alt={art.name} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="w-12 h-12 bg-lime-400 rounded-2xl flex items-center justify-center text-black mb-4 transform -rotate-12 group-hover:rotate-0 transition-transform shadow-lg shadow-lime-400/20">
                    <i className={`${art.icon} text-xl`}></i>
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase italic mb-1">{art.name}</h3>
                  <p className="text-lime-400 text-[10px] font-black uppercase tracking-widest mb-4">{art.tagline}</p>
                  <p className="text-zinc-400 text-xs leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    {art.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-[10px] font-black text-white uppercase tracking-widest group/btn">
                    Ver Detalhes
                    <i className="fa-solid fa-arrow-right text-lime-400 group-hover/btn:translate-x-1 transition-transform"></i>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Danças Section */}
        <section className="mt-32 mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-lime-400 font-black uppercase tracking-[0.3em] text-xs mb-3 block">Mova-se no Ritmo</span>
              <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-none">
                DANÇAS <span className="neon-accent">JE</span>
              </h2>
            </div>
            <p className="max-w-md text-zinc-500 font-medium leading-relaxed italic">
              Queime calorias, melhore sua coordenação e divirta-se com as coreografias mais bombadas do momento.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DANCES.map((dance) => (
              <Link
                to={`/dances/${dance.slug}`}
                key={dance.id}
                className="group relative rounded-[2.5rem] overflow-hidden aspect-[4/5] bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 transition-all duration-500"
              >
                <img src={dance.image} alt={dance.name} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-black mb-4 transform rotate-12 group-hover:rotate-0 transition-transform shadow-lg shadow-emerald-500/20">
                    <i className={`${dance.icon} text-xl`}></i>
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase italic mb-1">{dance.name}</h3>
                  <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-4">{dance.tagline}</p>
                  <p className="text-zinc-400 text-xs leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    {dance.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-[10px] font-black text-white uppercase tracking-widest group/btn">
                    Ver Coreografias
                    <i className="fa-solid fa-play text-emerald-400 group-hover/btn:translate-x-1 transition-transform"></i>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Exclusive Tips Section */}
        <section className="pt-20 border-t border-zinc-900 mt-20">
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

        {/* Scheduling CTA */}
        <div className="mt-32 bg-zinc-900 rounded-[3rem] p-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-4xl font-black text-white mb-6 uppercase italic leading-none tracking-tighter">PRONTO PARA O SEU <br /> <span className="neon-accent">PRIMEIRO WOD?</span></h2>
              <p className="text-zinc-400 text-lg uppercase tracking-tight">Temos aulas exclusivas para iniciantes todos os dias. Venha descobrir por que somos a maior comunidade de CrossFit da região.</p>
            </div>
            <Link to="/scheduling" className="bg-lime-400 hover:bg-lime-300 text-black px-12 py-6 rounded-2xl font-black uppercase tracking-widest transition-all transform hover:scale-105 shadow-[0_20px_40px_rgba(163,230,53,0.3)] whitespace-nowrap">
              Agendar Aula Experimental
            </Link>
          </div>
        </div>
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

export default CrossFit;
