"use client";

import React from 'react';
import { MarketCard } from '../components';
import { useTheme } from '../design-system/providers/ThemeProvider';
import type { Market, BettingModalState } from '../types';
import { Loader2 } from 'lucide-react';

interface MarketsViewProps {
    markets: Market[];
    onMarketDetailClick: (market: Market) => void;
    onBetClick: (modal: BettingModalState) => void;
    isLoading?: boolean;
}

export const MarketsView: React.FC<MarketsViewProps> = ({
    markets,
    onMarketDetailClick,
    onBetClick,
    isLoading = false,
}) => {
    const { theme } = useTheme();

    if (isLoading) {
        return (
            <div className="container mx-auto px-6 py-12">
                <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                    <Loader2 size={48} className="animate-spin text-primary" />
                    <p className="text-zinc-400 text-lg">Carregando mercados...</p>
                </div>
            </div>
        );
    }

    if (markets.length === 0) {
        return (
            <div className="container mx-auto px-6 py-12">
                <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                    <p className="text-zinc-400 text-lg">Nenhum mercado disponível no momento</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-12 animate-enter">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Mercados Ativos</h2>
                    <p className="text-zinc-400 text-sm">
                        {markets.length} mercados disponíveis • Dados em tempo real do Kalshi
                    </p>
                </div>
            </div>

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