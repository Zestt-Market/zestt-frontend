'use client';

import React from 'react';
import { FiltersBar } from './FiltersBar';
import MarketCard from './MarketCard';
import { useTheme } from '@/src/design-system';
import { Market } from '@/src/types';
import { Category } from '@/src/constants/categories';
import { useRouter } from 'next/navigation';

interface CategoryMarketsViewProps {
    category: Category;
    markets: Market[];
}

export const CategoryMarketsView: React.FC<CategoryMarketsViewProps> = ({ category, markets }) => {
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
                        Nenhum mercado disponível em {category.label} no momento
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 pt-4 pb-12">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-1">
                    {category.label}
                </h2>
                <p className="text-zinc-400 text-sm">
                    {markets.length} mercados ativos • {category.slug === 'esportes' ? 'Dados simulados' : 'Dados em tempo real do Kalshi'}
                </p>
                {category.description && (
                    <p className="text-zinc-500 text-xs mt-1">
                        {category.description}
                    </p>
                )}
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
