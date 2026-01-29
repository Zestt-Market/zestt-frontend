"use client";


import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Market } from '../types';
import { MOCK_MARKETS } from '../constants';

interface MarketContextType {
    markets: Market[];
    selectedMarket: Market | null;
    setSelectedMarket: (market: Market | null) => void;
    isLoading: boolean;
    refreshMarkets: () => Promise<void>;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

// Utility functions extracted from App.tsx
const mapKalshiCategory = (kCategory: string): Market["category"] => {
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

const fetchKalshiMarkets = async (): Promise<Market[]> => {
    const KALSHI_API_URL = "https://api.elections.kalshi.com/trade-api/v2/markets?limit=100&status=open";
    try {
        let response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(KALSHI_API_URL)}`);
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
                    image: `https://picsum.photos/400/400?random=${m.ticker.charCodeAt(0) + 200}`,
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
        console.error('Error fetching Kalshi markets:', error);
        return [];
    }
};

export const MarketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [markets, setMarkets] = useState<Market[]>(MOCK_MARKETS);
    const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const refreshMarkets = async () => {
        setIsLoading(true);
        try {
            const kalshi = await fetchKalshiMarkets();
            if (kalshi.length > 0) {
                setMarkets([...MOCK_MARKETS, ...kalshi]);
            }
        } catch (error) {
            console.error('Error refreshing markets:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        let isMounted = true;

        const loadMarkets = async () => {
            setIsLoading(true);
            try {
                const kalshi = await fetchKalshiMarkets();
                if (isMounted && kalshi.length > 0) {
                    // CRITICAL FIX: Merge Mock + API markets properly
                    // Do NOT filter mock markets, or user's selected market will vanish
                    setMarkets(prev => [...MOCK_MARKETS, ...kalshi]);
                }
            } catch (error) {
                console.error('Error loading markets:', error);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        loadMarkets();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <MarketContext.Provider value={{
            markets,
            selectedMarket,
            setSelectedMarket,
            isLoading,
            refreshMarkets
        }}>
            {children}
        </MarketContext.Provider>
    );
};

export const useMarkets = () => {
    const context = useContext(MarketContext);
    if (context === undefined) {
        throw new Error('useMarkets must be used within a MarketProvider');
    }
    return context;
};
