
import { MuscleGroup, Exercise, CrossFitWOD, PersonalTrainer, Product, MartialArt, Dance } from './types';

export const EXERCISES: Exercise[] = [
  {
    id: '1',
    name: 'Supino Reto',
    muscleGroup: MuscleGroup.CHEST,
    sets: '4',
    reps: '8-12',
    rest: '90s',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800',
    videoUrl: 'https://www.youtube.com/embed/v=0Xh92V6zV8A',
    description: 'Deite-se no banco, segure a barra com pegada média e desça até o peito de forma controlada.'
  },
  {
    id: '2',
    name: 'Agachamento Livre',
    muscleGroup: MuscleGroup.LEGS,
    sets: '4',
    reps: '10-12',
    rest: '120s',
    image: 'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?q=80&w=800',
    videoUrl: 'https://www.youtube.com/embed/v=SW_C1A-rejs',
    description: 'Mantenha as costas retas, desça o quadril abaixo da linha do joelho e suba com força nos calcanhares.'
  },
  {
    id: '3',
    name: 'Puxada Aberta',
    muscleGroup: MuscleGroup.BACK,
    sets: '4',
    reps: '12',
    rest: '60s',
    image: 'https://images.unsplash.com/photo-1603287611630-d64550cd1638?q=80&w=800',
    videoUrl: 'https://www.youtube.com/embed/v=CAwf7n6Luuc',
    description: 'Puxe a barra em direção ao peito, focando na contração das escápulas.'
  },
  {
    id: '4',
    name: 'Desenvolvimento Militar',
    muscleGroup: MuscleGroup.SHOULDERS,
    sets: '3',
    reps: '10',
    rest: '90s',
    image: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?q=80&w=800',
    videoUrl: 'https://www.youtube.com/embed/v=hzNHe-m60uA',
    description: 'Empurre o peso acima da cabeça mantendo o core estabilizado.'
  },
  {
    id: '5',
    name: 'Rosca Direta',
    muscleGroup: MuscleGroup.ARMS,
    sets: '3',
    reps: '12-15',
    rest: '60s',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef03a7403f?q=80&w=800',
    videoUrl: 'https://www.youtube.com/embed/v=ykJmrZ5v0_0',
    description: 'Flexione os cotovelos trazendo o peso em direção aos ombros sem balançar o corpo.'
  },
  {
    id: '6',
    name: 'Prancha Abdominal',
    muscleGroup: MuscleGroup.CORE,
    sets: '3',
    reps: '60s',
    rest: '45s',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800',
    videoUrl: 'https://www.youtube.com/embed/v=pvIjsGZ0Zmc',
    description: 'Mantenha o corpo alinhado e o abdômen contraído durante todo o tempo.'
  }
];

export const CROSSFIT_WODS: CrossFitWOD[] = [
  {
    id: 'c1',
    name: 'Fran',
    level: 'Avançado',
    description: '21-15-9 repetições de Thrusters e Pull-ups por tempo.',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800',
    duration: '10-15 min'
  },
  {
    id: 'c2',
    name: 'Murph',
    level: 'Avançado',
    description: '1 milha de corrida, 100 Pull-ups, 200 Push-ups, 300 Squats, 1 milha de corrida.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800',
    duration: '40-60 min'
  },
  {
    id: 'c3',
    name: 'Cindy',
    level: 'Intermediário',
    description: 'AMRAP 20 min: 5 Pull-ups, 10 Push-ups, 15 Air Squats.',
    image: 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=800',
    duration: '20 min'
  }
];

export const TRAINERS: PersonalTrainer[] = [
  {
    id: 't1',
    name: 'Ricardo Silva',
    specialty: 'Bodybuilding & Hipertrofia',
    experience: '12 anos',
    graduation: 'Bacharel em Ed. Física',
    yearsAtGym: '5 anos',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fe?q=80&w=800',
    videoUrl: 'https://www.youtube.com/embed/v=dQw4w9WgXcQ'
  },
  {
    id: 't2',
    name: 'Juliana Costa',
    specialty: 'CrossFit & Funcional',
    experience: '8 anos',
    graduation: 'Level 2 CrossFit Trainer',
    yearsAtGym: '3 anos',
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800',
    videoUrl: 'https://www.youtube.com/embed/v=dQw4w9WgXcQ'
  },
  {
    id: 't3',
    name: 'Marcos Almeida',
    specialty: 'Powerlifting & Força',
    experience: '15 anos',
    graduation: 'Pós-graduado em Fisiologia',
    yearsAtGym: '10 anos',
    image: 'https://images.unsplash.com/photo-1491752355130-91f97cc309d7?q=80&w=800',
    videoUrl: 'https://www.youtube.com/embed/v=dQw4w9WgXcQ'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Whey Protein Isolate',
    category: 'Hipertrofia',
    price: 189.90,
    image: 'https://images.unsplash.com/photo-1593095191071-82b63decf8a1?q=80&w=800',
    recommendedFor: 'Pós-treino'
  },
  {
    id: 'p2',
    name: 'Creatina Monohidratada',
    category: 'Hipertrofia',
    price: 95.00,
    image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?q=80&w=800',
    recommendedFor: 'Diário'
  },
  {
    id: 'p3',
    name: 'Pre-Workout X-Explosion',
    category: 'Pré-treino',
    price: 145.50,
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800',
    recommendedFor: 'Antes do treino'
  },
  {
    id: 'p4',
    name: 'BCAA Recovery Plus',
    category: 'Recuperação',
    price: 82.00,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800',
    recommendedFor: 'Intra-treino'
  }
];

export const TRAINER_TIPS = [
  {
    id: 't1',
    trainerName: 'Rodrigo "Tank"',
    title: 'Hipertrofia Real',
    content: 'Para ganhar massa, não foque apenas no peso. O tempo sob tensão é o segredo. 4 segundos na descida!',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400'
  },
  {
    id: 't2',
    trainerName: 'Sarah Martins',
    title: 'Postura no Agachamento',
    content: 'Mantenha o peito aberto e o core ativado. Seus joelhos agradecem e seus glúteos trabalham o dobro.',
    image: 'https://images.unsplash.com/photo-1574680077505-ef7da61783cf?q=80&w=400'
  }
];

export const MARTIAL_ARTS: MartialArt[] = [
  {
    id: 'm1',
    slug: 'jiu-jitsu',
    name: 'Jiu-Jitsu',
    tagline: 'A Arte Suave',
    description: 'Técnica, alavanca e controle. Aprenda a arte da finalização com nossos mestres graduados.',
    longDescription: 'O Brazilian Jiu-Jitsu (BJJ) é uma arte marcial focada em combate no solo e técnicas de isolamento. Baseia-se no conceito de que um lutador menor e mais fraco pode se defender com sucesso contra um oponente maior e mais forte, usando a técnica adequada e alavancas.',
    benefits: ['Condicionamento Físico Extremo', 'Autodefesa Real', 'Alívio de Stress', 'Comunidade Unida'],
    schedule: 'Seg, Qua, Sex - 19:30',
    priceSingleClass: 45.00,
    image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=800',
    icon: 'fa-solid fa-uniform-martial-arts'
  },
  {
    id: 'm2',
    slug: 'muay-thai',
    name: 'Muay Thai',
    tagline: 'A Arte das 8 Armas',
    description: 'Utilize punhos, cotovelos, joelhos e canelas em um treino de alta intensidade e queima calórica.',
    longDescription: 'O Muay Thai é uma arte marcial tailandesa conhecida como "A Arte das 8 Armas". É um dos sistemas de combate em pé mais eficazes do mundo, combinando socos, chutes, cotoveladas e joelhadas com técnicas avançadas de clinch.',
    benefits: ['Queima Calórica Intensa', 'Força Explosiva', 'Coordenação Motora', 'Disciplina Mental'],
    schedule: 'Ter, Qui - 18:00',
    priceSingleClass: 40.00,
    image: 'https://images.unsplash.com/photo-1552072805-2a9039d00e57?q=80&w=800',
    icon: 'fa-solid fa-hand-fist'
  },
  {
    id: 'm3',
    slug: 'boxe',
    name: 'Boxe',
    tagline: 'A Nobre Arte',
    description: 'Refine sua coordenação, agilidade e potência com o treinamento clássico de pugilismo.',
    longDescription: 'O Boxe é uma arte marcial e esporte de combate focado exclusivamente no uso dos punhos. É conhecido por desenvolver agilidade incrível, reflexos rápidos e uma potência de impacto devastadora, além de um core extremamente forte.',
    benefits: ['Fortalecimento Cardiovascular', 'Velocidade de Reação', 'Agilidade nos Pés', 'Resiliência'],
    schedule: 'Seg, Qua, Sex - 17:00',
    priceSingleClass: 35.00,
    image: 'https://images.unsplash.com/photo-1509830847415-6ef34bd4feab?q=80&w=800',
    icon: 'fa-solid fa-mitten'
  },
  {
    id: 'm4',
    slug: 'judo',
    name: 'Judô',
    tagline: 'Caminho Suave',
    description: 'Disciplina, respeito e eficiência. Desenvolva corpo e mente através das quedas e imobilizações.',
    longDescription: 'O Judô é uma arte marcial japonesa que utiliza o peso e a força do adversário contra ele mesmo. Foca em projeções, quedas e técnicas de controle no solo, priorizando a máxima eficiência com o mínimo esforço.',
    benefits: ['Equilíbrio e Postura', 'Flexibilidade', 'Respeito e Etiqueta', 'Controle Emocional'],
    schedule: 'Ter, Qui - 20:00',
    priceSingleClass: 38.00,
    image: 'https://images.unsplash.com/photo-1534368420009-621bfab424a8?q=80&w=800',
    icon: 'fa-solid fa-user-ninja'
  }
];

export const DANCES: Dance[] = [
  {
    id: 'd1',
    slug: 'zumba',
    name: 'Zumba',
    tagline: 'Festa & Cardio',
    description: 'Misture ritmos latinos e internacionais com exercícios aeróbicos para uma queima calórica divertida.',
    longDescription: 'A Zumba é uma aula de fitness inspirada na dança latina que combina música latina e internacional com movimentos de dança. As rotinas de Zumba incorporam treinamento intervalado, alternando ritmos rápidos e lentos, para ajudar a melhorar o condicionamento cardiovascular.',
    benefits: ['Queima Calórica Alta', 'Melhora do Humor', 'Coordenação', 'Socialização'],
    schedule: 'Seg, Qua - 18:30',
    priceSingleClass: 30.00,
    image: 'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?q=80&w=800',
    icon: 'fa-solid fa-music'
  },
  {
    id: 'd2',
    slug: 'fitdance',
    name: 'FitDance',
    tagline: 'Mova sua Vida',
    description: 'Aulas dinâmicas com as coreografias mais bombadas do momento para você dançar e se exercitar.',
    longDescription: 'O FitDance é um programa de aulas de dança que utiliza coreografias de diversos estilos musicais. O foco é a diversão e o gasto calórico, permitindo que qualquer pessoa, independente do nível de dança, possa acompanhar e se exercitar.',
    benefits: ['Ritmo e Agilidade', 'Bem-estar Mental', 'Condicionamento Físico', 'Autoestima'],
    schedule: 'Ter, Qui - 19:00',
    priceSingleClass: 35.00,
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800',
    icon: 'fa-solid fa-fire'
  },
  {
    id: 'd3',
    slug: 'ballet-fitness',
    name: 'Ballet Fitness',
    tagline: 'Graciosidade & Força',
    description: 'Combine a delicadeza do ballet clássico com exercícios de fitness para tonificar o corpo todo.',
    longDescription: 'O Ballet Fitness une os passos técnicos do ballet clássico com exercícios de agachamento, abdominais e braços. É uma modalidade que trabalha a postura, a flexibilidade e o tônus muscular de forma elegante e intensa.',
    benefits: ['Postura Impecável', 'Tônus Muscular', 'Flexibilidade', 'Resistência'],
    schedule: 'Seg, Sex - 17:30',
    priceSingleClass: 40.00,
    image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=800',
    icon: 'fa-solid fa-person-rays'
  },
  {
    id: 'd4',
    slug: 'hip-hop',
    name: 'Hip Hop',
    tagline: 'Cultura & Atitute',
    description: 'Aprenda os movimentos da cultura urbana em uma aula cheia de energia, técnica e performance.',
    longDescription: 'As aulas de Hip Hop focam em movimentos rítmicos e expressivos da dança de rua. É uma ótima maneira de desenvolver coordenação, força e expressão corporal, tudo ao som das batidas mais pesadas do gênero.',
    benefits: ['Expressão Corporal', 'Força de Core', 'Ritmo Avançado', 'Confiança'],
    schedule: 'Qua, Sex - 20:30',
    priceSingleClass: 32.00,
    image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=800',
    icon: 'fa-solid fa-radio'
  }
];
