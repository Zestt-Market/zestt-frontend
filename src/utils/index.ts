import type { Market, Position } from '../types';

export const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(val);
};

export const mapKalshiCategory = (kCategory: string): Market["category"] => {
    const map: Record<string, Market["category"]> = {
        Economics: "Economia",
        Politics: "Política",
        Crypto: "Crypto",
        Science: "Clima",
        Technology: "Entretenimento",
        Financials: "Economia",
    };
    return map[kCategory] || "Entretenimento";
};

export const fetchKalshiMarkets = async (): Promise<Market[]> => {
    const KALSHI_API_URL =
        "https://api.elections.kalshi.com/trade-api/v2/markets?limit=100&status=open";
    try {
        let response = await fetch(
            `https://api.allorigins.win/raw?url=${encodeURIComponent(KALSHI_API_URL)}`
        );
        if (!response.ok) return [];
        const data = await response.json();
        if (!data.markets) return [];
        return data.markets
            .filter((m: any) => m.yes_bid > 0 && m.volume > 0)
            .map((m: any) => {
                const yesPrice = m.yes_bid / 100;
                const noPrice = Number((1 - yesPrice).toFixed(2));
                return {
                    id: m.ticker,
                    question: m.title,
                    category: mapKalshiCategory(m.category),
                    description: `Mercado oficial Kalshi (Ticker: ${m.ticker}).`,
                    endDate: new Date(m.expiration_time).toLocaleDateString("pt-BR"),
                    image: `https://picsum.photos/400/400?random=${m.ticker.charCodeAt(0) + 200
                        }`,
                    volume: m.volume * 5.5,
                    yesPrice,
                    noPrice,
                    priceHistory: Array.from({ length: 24 }, (_, i) => ({
                        time: `${i}:00`,
                        value: yesPrice + (Math.random() - 0.5) * 0.1,
                    })),
                    news: [],
                };
            });
    } catch (error) {
        return [];
    }
};

// Trade calculations
export const calculateTradePnL = (position: Position) => {
    const totalCost = position.quantity * position.avgPrice;
    const currentValue = position.quantity * position.currentPrice;
    return {
        totalCost,
        currentValue,
        pnl: currentValue - totalCost,
        pnlPercentage: ((currentValue - totalCost) / totalCost) * 100,
    };
};

// Date utilities
export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
};

export const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("pt-BR");
};export * from './bet-math';
