"use client";

import React from 'react';
import { FiltersBar } from './components/FiltersBar';
import MarketCard from './components/MarketCard';
import { useMarkets } from './contexts';
import { useTheme } from './design-system';
import { Loader2 } from 'lucide-react';

interface HomePageProps {
    onMarketClick: (marketId: string) => void;
    onBetClick: (marketId: string, outcome: 'YES' | 'NO') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onMarketClick, onBetClick }) => {
    const { markets, isLoading } = useMarkets();
    const { theme } = useTheme();

    // Memoize SEMPRE deve estar no mesmo lugar (antes dos returns condicionais)
    const marketList = React.useMemo(() => (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-20">
            {markets.map((market, idx) => (
                <MarketCard
                    key={market.id}
                    market={market}
                    index={idx}
                    onDetailClick={() => onMarketClick(market.id)}
                    onBetClick={(outcome) => onBetClick(market.id, outcome)}
                    theme={theme}
                />
            ))}
        </section>
    ), [markets, theme, onMarketClick, onBetClick]);

    if (isLoading) {
        return (
            <div className="container mx-auto px-6 pt-4 pb-12">
                <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                    <Loader2 size={48} className="animate-spin text-primary" />
                    <p className="text-zinc-400 text-lg">Carregando mercados...</p>
                </div>
            </div>
        );
    }

    if (markets.length === 0) {
        return (
            <div className="container mx-auto px-6 pt-4 pb-12">
                <FiltersBar theme={theme} />
                <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                    <p className="text-zinc-400 text-lg">Nenhum mercado disponível no momento</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 pt-4 pb-12">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-1">Mercados em Alta</h2>
                <p className="text-zinc-400 text-sm">
                    {markets.length} mercados ativos • Dados em tempo real do Kalshi
                </p>
            </div>
            <FiltersBar theme={theme} />
            {marketList}
        </div>
    );
};
