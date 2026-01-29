"use client";

import React, { useState } from 'react';
import { MarketCard, FiltersBar } from '../components';
import { useTheme } from '../design-system/providers/ThemeProvider';
import type { Market, BettingModalState } from '../types';

interface HomeViewProps {
    markets: Market[];
    onMarketDetailClick: (market: Market) => void;
    onBetClick: (modal: BettingModalState) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
    markets,
    onMarketDetailClick,
    onBetClick,
}) => {
    const { theme } = useTheme();

    return (
        <div className="container mx-auto px-6 pt-4 pb-12">
            <FiltersBar />

            {/* Markets Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-20">
                {markets.map((market, idx) => (
                    <MarketCard
                        key={market.id}
                        market={market}
                        index={idx}
                        onDetailClick={() => onMarketDetailClick(market)}
                        onBetClick={(outcome) => onBetClick({ marketId: market.id, outcome })}
                    />
                ))}
            </section>
        </div>
    );
};