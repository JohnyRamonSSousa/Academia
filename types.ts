
export enum MuscleGroup {
  CHEST = 'Peito',
  BACK = 'Costas',
  LEGS = 'Pernas',
  SHOULDERS = 'Ombros',
  ARMS = 'Braços',
  CORE = 'Core',
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  sets: string;
  reps: string;
  rest: string;
  image: string;
  videoUrl?: string;
  description?: string;
}

export interface CrossFitWOD {
  id: string;
  name: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  description: string;
  image: string;
  duration: string;
}

export interface PersonalTrainer {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  graduation: string;
  yearsAtGym: string;
  image: string;
  videoUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'Pré-treino' | 'Pós-treino' | 'Hipertrofia' | 'Recuperação';
  price: number;
  image: string;
  recommendedFor?: string;
}

export interface Comment {
  id: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: string;
}

export interface Post {
  id: string;
  userName: string;
  userAvatar: string;
  image: string;
  caption: string;
  likes: number;
  comments: Comment[];
  createdAt: string;
  isLiked?: boolean;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'system';
  content: string;
  fromUser: string;
  fromAvatar: string;
  postId?: string;
  createdAt: string;
  isRead: boolean;
}
