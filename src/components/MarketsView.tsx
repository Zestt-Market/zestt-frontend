'use client';

import React from 'react';
import { FiltersBar } from './FiltersBar';
import MarketCard from './MarketCard';
import { useTheme } from '@/src/design-system';
import { Market } from '@/src/types';
import { useRouter } from 'next/navigation';

interface MarketsViewProps {
    markets: Market[];
}

export const MarketsView: React.FC<MarketsViewProps> = ({ markets }) => {
    const { theme } = useTheme();
    const router = useRouter();

    const handleMarketClick = (marketId: string) => {
        router.push(`/markets/${marketId}`);
    };

    const handleBetClick = (marketId: string, outcome: 'YES' | 'NO') => {
        // TODO: Open betting modal
        console.log('Bet click:', marketId, outcome);
    };

    if (markets.length === 0) {
        return (
            <div className="container mx-auto px-6 pt-4 pb-12">
                <FiltersBar theme={theme} />
                <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                    <p className="text-zinc-400 text-lg">
                        Nenhum mercado disponível no momento
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 pt-4 pb-12">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-1">
                    Todos os Mercados
                </h2>
                <p className="text-zinc-400 text-sm">
                    {markets.length} mercados ativos • Dados em tempo real do Kalshi
                </p>
            </div>
            <FiltersBar theme={theme} />
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-20">
                {markets.map((market, idx) => (
                    <MarketCard
                        key={market.id}
                        market={market}
                        index={idx}
                        onDetailClick={() => handleMarketClick(market.id)}
                        onBetClick={(outcome) => handleBetClick(market.id, outcome)}
                        theme={theme}
                    />
                ))}
            </section>
        </div>
    );
};
