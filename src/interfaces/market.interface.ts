import { NewsItem } from './news-item.interface';

export interface Market {
    id: string;
    question: string;
    category:
    | "Política"
    | "Economia"
    | "Esportes"
    | "Entretenimento"
    | "Clima"
    | "Crypto";
    description: string;
    endDate: string;
    image: string;
    volume: number;
    yesPrice: number; // 0.01 to 0.99
    noPrice: number;
    yesLabel?: string; // Label customizado para "Sim" (ex: "Villarreal", "Yes", etc)
    noLabel?: string; // Label customizado para "Não" (ex: "Levante", "No", etc)
    priceHistory: { time: string; value: number }[]; // For chart
    news: NewsItem[];
}
