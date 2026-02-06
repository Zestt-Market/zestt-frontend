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
    setSelectedMarketById: (marketId: string) => void;
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
        console.log('🔄 Buscando eventos do Kalshi...');

        const eventsResponse = await KalshiService.getEvents({
            limit: 100,
            status: 'open',
            with_nested_markets: true,
        });

        if (!eventsResponse || !eventsResponse.events || eventsResponse.events.length === 0) {
            console.warn('⚠️ Nenhum evento retornado da API do Kalshi');
            return [];
        }

        console.log(`✅ ${eventsResponse.events.length} eventos do Kalshi recebidos`);

        const markets: Market[] = [];

        for (const event of eventsResponse.events) {
            if (!event.markets || event.markets.length === 0) continue;

            const sortedMarkets = [...event.markets].sort((a, b) =>
                (b.volume_24h || b.volume || 0) - (a.volume_24h || a.volume || 0)
            );

            const topMarket = sortedMarkets[0];

            if (topMarket.ticker &&
                topMarket.title &&
                (topMarket.yes_ask > 0 || topMarket.no_ask > 0 || topMarket.last_price > 0)) {

                try {
                    const converted = convertKalshiMarket(topMarket);
                    markets.push(converted);
                } catch (error) {
                    console.error('❌ Erro ao converter market:', error);
                }
            }
        }

        console.log(`✅ ${markets.length} mercados processados`);

        const sortedMarkets = markets.sort((a, b) => b.volume - a.volume);

        return sortedMarkets;

    } catch (error) {
        console.error('❌ Erro ao buscar mercados do Kalshi:', error);
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
            console.log(`✅ ${kalshiMarkets.length} mercados do Kalshi carregados`);
            setMarkets(kalshiMarkets);
        } catch (error) {
            console.error('❌ Erro ao atualizar mercados:', error);
            setMarkets([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Compute filtered markets based on category filter
    const filteredMarkets = useMemo(() => {
        // If "Esportes" filter is active, return World Cup mock data
        if (categoryFilter === 'Esportes') {
            console.log('🏆 Returning World Cup Mock Markets:', worldCupMockMarkets.length);
            return worldCupMockMarkets;
        }
        // Otherwise return all markets
        return markets;
    }, [markets, categoryFilter]);

    useEffect(() => {
        let isMounted = true;

        const loadMarkets = async () => {
            setIsLoading(true);
            try {
                const kalshiMarkets = await fetchKalshiMarkets();
                if (isMounted) {
                    console.log(`✅ ${kalshiMarkets.length} mercados do Kalshi carregados`);
                    setMarkets(kalshiMarkets);
                }
            } catch (error) {
                console.error('❌ Erro ao carregar mercados:', error);
                if (isMounted) {
                    setMarkets([]);
                }
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        loadMarkets();

        return () => {
            isMounted = false;
        };
    }, []);

    const setSelectedMarketById = (marketId: string) => {
        // Search in filteredMarkets first
        let market = filteredMarkets.find(m => m.id === marketId);

        // If not found and we're not in Esportes filter, also check worldCupMockMarkets
        if (!market && categoryFilter !== 'Esportes') {
            market = worldCupMockMarkets.find(m => m.id === marketId);
        }

        setSelectedMarket(market || null);
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
