"use client";

import React from 'react';
import { MarketCard } from '../components';
import { useTheme } from '../design-system/providers/ThemeProvider';
import type { Market, BettingModalState } from '../types';

interface MarketsViewProps {
    markets: Market[];
    onMarketDetailClick: (market: Market) => void;
    onBetClick: (modal: BettingModalState) => void;
}

export const MarketsView: React.FC<MarketsViewProps> = ({
    markets,
    onMarketDetailClick,
    onBetClick,
}) => {
    const { theme } = useTheme();

    return (
        <div className="container mx-auto px-6 py-12 animate-enter">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {markets.map((market, idx) => (
                    <MarketCard
                        key={market.id}
                        market={market}
                        index={idx}
                        onDetailClick={() => onMarketDetailClick(market)}
                        onBetClick={(outcome) => onBetClick({ marketId: market.id, outcome })}
                    />
                ))}
            </div>
        </div>
    );
};