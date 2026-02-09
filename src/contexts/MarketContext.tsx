"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { Market } from '../types';
import { KalshiService, KalshiMarket } from '../services/kalshi.service';
import { worldCupMockMarkets } from '../data/worldCupMockData';

interface MarketContextType {
    markets: Market[];
    filteredMarkets: Market[];
    selectedMarket: Market | null;
    setSelectedMarket: (market: Market | null) => void;
    setSelectedMarketById: (marketId: string) => Promise<void>;
    categoryFilter: string | null;
    setCategoryFilter: (category: string | null) => void;
    isLoading: boolean;
    refreshMarkets: () => Promise<void>;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);


const convertKalshiMarket = (kalshiMarket: KalshiMarket): Market => {
    let question = (kalshiMarket.title || '').trim();

    question = question.replace(/^(yes |no )/i, '');

    const parts = question.split(',');
    if (parts.length > 3) {
        question = parts.slice(0, 3).join(', ') + ` e mais ${parts.length - 3}...`;
    }

    if (question.length > 120) {
        question = question.substring(0, 117) + '...';
    }

    let yesPrice = 0.5;

    if (kalshiMarket.yes_ask > 0) {
        yesPrice = kalshiMarket.yes_ask / 100;
    } else if (kalshiMarket.no_ask > 0) {
        yesPrice = 1 - (kalshiMarket.no_ask / 100);
    } else if (kalshiMarket.last_price > 0) {
        yesPrice = kalshiMarket.last_price / 100;
    }

    const noPrice = Number((1 - yesPrice).toFixed(2));

    const endDate = new Date(kalshiMarket.close_time).toLocaleDateString('pt-BR');

    const getLabels = () => {
        const yesSubTitle = kalshiMarket.yes_sub_title || '';
        const noSubTitle = kalshiMarket.no_sub_title || '';

        if (yesSubTitle && noSubTitle && yesSubTitle !== noSubTitle) {
            const cleanLabel = (label: string) => {
                const cleaned = label.split(/[,:]/)[0].trim();
                return cleaned.length > 20 ? cleaned.substring(0, 17) + '...' : cleaned;
            };

            return {
                yes: cleanLabel(yesSubTitle),
                no: cleanLabel(noSubTitle)
            };
        }

        return { yes: 'Sim', no: 'Não' };
    };

    const labels = getLabels();

    const description = kalshiMarket.subtitle || kalshiMarket.title.substring(0, 100);

    let subtitle: string | undefined = undefined;

    if (kalshiMarket.yes_sub_title && kalshiMarket.yes_sub_title.trim() !== '') {
        const cleanSubtitle = kalshiMarket.yes_sub_title.split(/[,]/)[0].trim();
        subtitle = cleanSubtitle;
    }
    else if (kalshiMarket.subtitle && kalshiMarket.subtitle.trim() !== '') {
        subtitle = kalshiMarket.subtitle;
    }
    else if (kalshiMarket.no_sub_title && kalshiMarket.no_sub_title.trim() !== '') {
        const cleanSubtitle = kalshiMarket.no_sub_title.split(/[,]/)[0].trim();
        subtitle = cleanSubtitle;
    }

    return {
        id: kalshiMarket.ticker,
        question,
        subtitle,
        category: KalshiService.mapCategory(kalshiMarket.category || 'Other'),
        description,
        endDate,
        image: KalshiService.getImageForCategory(kalshiMarket.category || 'Other'),
        volume: kalshiMarket.volume_24h || kalshiMarket.volume || 0,
        yesPrice,
        noPrice,
        yesLabel: labels.yes,
        noLabel: labels.no,
        priceHistory: Array.from({ length: 24 }, (_, i) => ({
            time: `${i}:00`,
            value: yesPrice + (Math.random() - 0.5) * 0.05,
        })),
        news: [],
    };
};


const fetchKalshiMarkets = async (): Promise<Market[]> => {
    try {
        const eventsResponse = await KalshiService.getEvents({
            limit: 100,
            status: 'open',
            with_nested_markets: true,
        });

        if (!eventsResponse?.events?.length) {
            return [];
        }

        const markets: Market[] = [];

        for (const event of eventsResponse.events) {
            if (!event.markets?.length) continue;

            const sortedMarkets = [...event.markets].sort((a, b) =>
                (b.volume_24h || b.volume || 0) - (a.volume_24h || a.volume || 0)
            );

            const topMarket = sortedMarkets[0];

            if (topMarket.ticker && topMarket.title &&
                (topMarket.yes_ask > 0 || topMarket.no_ask > 0 || topMarket.last_price > 0)) {
                try {
                    markets.push(convertKalshiMarket(topMarket));
                } catch (error) {
                    console.error('Error converting market:', error);
                }
            }
        }

        return markets.sort((a, b) => b.volume - a.volume);
    } catch (error) {
        console.error('Error fetching Kalshi markets:', error);
        return [];
    }
};

export const MarketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [markets, setMarkets] = useState<Market[]>([]);
    const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
    const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const refreshMarkets = async () => {
        setIsLoading(true);
        try {
            const kalshiMarkets = await fetchKalshiMarkets();
            setMarkets(kalshiMarkets);
        } catch (error) {
            console.error('Error refreshing markets:', error);
            setMarkets([]);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredMarkets = useMemo(() => {
        if (categoryFilter === 'Esportes') {
            return worldCupMockMarkets;
        }
        return markets;
    }, [markets, categoryFilter]);

    useEffect(() => {
        let isMounted = true;

        const loadMarkets = async () => {
            setIsLoading(true);
            try {
                const kalshiMarkets = await fetchKalshiMarkets();
                if (isMounted) setMarkets(kalshiMarkets);
            } catch (error) {
                console.error('Error loading markets:', error);
                if (isMounted) setMarkets([]);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        loadMarkets();
        return () => { isMounted = false; };
    }, []);

    const setSelectedMarketById = async (marketId: string) => {
        let market = filteredMarkets.find(m => m.id === marketId);

        if (!market && categoryFilter !== 'Esportes') {
            market = worldCupMockMarkets.find(m => m.id === marketId);
        }

        if (!market) {
            try {
                const { getMarketByIdClient, detectPlatformFromId } = await import('../services/market-client.service');
                const platform = detectPlatformFromId(marketId);
                market = await getMarketByIdClient(marketId, platform);
            } catch (error) {
                console.error(`Error fetching market ${marketId}:`, error);
            }
        }

        setSelectedMarket(market ?? null);
    };

    return (
        <MarketContext.Provider value={{
            markets,
            filteredMarkets,
            selectedMarket,
            setSelectedMarket,
            setSelectedMarketById,
            categoryFilter,
            setCategoryFilter,
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
