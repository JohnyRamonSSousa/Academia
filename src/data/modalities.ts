
export interface Modality {
    id: string;
    name: string;
    description: string;
    image: string;
    heroImage: string;
    content: string;
    benefits: string[];
    schedule: string[];
}

export const modalities: Modality[] = [
    {
        id: 'crossfit',
        name: 'CrossFit',
        description: 'Treinamento de alta intensidade que combina força e condicionamento físico.',
        image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        heroImage: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        content: 'O CrossFit é um programa de treinamento de força e condicionamento físico geral baseado em movimentos funcionais, feitos em alta intensidade e constantemente variados. Nossas aulas são projetadas para desafiar você, independentemente do seu nível de condicionamento físico.',
        benefits: [
            'Aumento da resistência cardiovascular',
            'Melhoria da força muscular',
            'Maior flexibilidade e agilidade',
            'Queima calórica elevada',
            'Comunidade motivadora'
        ],
        schedule: ['Seg-Sex: 06:00, 07:00, 18:00, 19:00', 'Sáb: 09:00, 10:00']
    },
    {
        id: 'musculacao',
        name: 'Musculação',
        description: 'Equipamentos modernos para hipertrofia, força e resistência muscular.',
        image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        heroImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        content: 'Nossa área de musculação conta com equipamentos de última geração, importados e biomecanicamente perfeitos para garantir a melhor execução dos movimentos e resultados rápidos. Contamos com instrutores qualificados em tempo integral para auxiliar no seu treino.',
        benefits: [
            'Hipertrofia muscular',
            'Aumento da densidade óssea',
            'Melhoria da postura',
            'Prevenção de lesões',
            'Aceleração do metabolismo'
        ],
        schedule: ['Seg-Sex: 05:00 - 23:00', 'Sáb: 08:00 - 18:00', 'Dom: 09:00 - 13:00']
    },
    {
        id: 'lutas',
        name: 'Lutas',
        description: 'Muay Thai, Boxe e Jiu-jitsu para defesa pessoal e condicionamento.',
        image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        heroImage: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        content: 'Aprenda técnicas de defesa pessoal enquanto melhora seu condicionamento físico. Oferecemos aulas de Muay Thai, Boxe e Jiu-Jitsu com mestres experientes. O treino de lutas é excelente para aliviar o estresse, melhorar a coordenação motora e aumentar a autoconfiança.',
        benefits: [
            'Defesa pessoal',
            'Alívio do estresse',
            'Melhoria da coordenação motora',
            'Disciplina e foco',
            'Alto gasto calórico'
        ],
        schedule: ['Seg-Qua-Sex: 19:30 (Muay Thai)', 'Ter-Qui: 19:30 (Boxe)', 'Seg-Qua-Sex: 20:30 (Jiu-Jitsu)']
    },
    {
        id: 'dancas',
        name: 'Danças',
        description: 'Zumba, FitDance e Ritmos para queimar calorias se divertindo.',
        image: 'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        heroImage: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        content: 'Divirta-se enquanto cuida do corpo! Nossas aulas de dança são energizantes e contagiantes. Com ritmos variados como Zumba, FitDance e Funk, você queima calorias sem perceber que está treinando. É a opção perfeita para quem busca uma atividade física leve e descontraída.',
        benefits: [
            'Melhoria da coordenação motora',
            'Socialização e diversão',
            'Redução do estresse',
            'Melhoria da capacidade cardiovascular',
            'Tonificação muscular'
        ],
        schedule: ['Seg-Qua: 18:30 (Zumba)', 'Ter-Qui: 18:30 (FitDance)']
    }
];
