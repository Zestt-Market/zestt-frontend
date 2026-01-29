
"use client";

import React from 'react';
import { FiltersBar } from './components/FiltersBar';
import MarketCard from './components/MarketCard';
import { useMarkets } from './contexts';
import { useTheme } from './design-system';

interface HomePageProps {
    onMarketClick: (marketId: string) => void;
    onBetClick: (marketId: string, outcome: 'YES' | 'NO') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onMarketClick, onBetClick }) => {
    const { markets } = useMarkets();
    const { theme } = useTheme();

    // Memoize the market list items to prevent re-renders
    const marketList = React.useMemo(() => (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-20">
            {markets.map((market, idx) => (
                <MarketCard
                    key={market.id} // Ensure ID is stable and unique
                    market={market}
                    index={idx}
                    onDetailClick={() => onMarketClick(market.id)}
                    onBetClick={(outcome) => onBetClick(market.id, outcome)}
                    theme={theme}
                />
            ))}
        </section>
    ), [markets, theme, onMarketClick, onBetClick]);

    return (
        <div className="container mx-auto px-6 pt-4 pb-12">
            <FiltersBar theme={theme} />
            {marketList}
        </div>
    );
};
