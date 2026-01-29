"use client";

import React from 'react';
import { ArrowLeft } from 'lucide-react';

import { useTheme } from './design-system';
import { useMarkets } from './contexts';
import { MarketTabs } from './components/Market/MarketTabs';
import MarketCard from './components/MarketCard';

interface MarketDetailPageProps {
    onBack: () => void;
    onBetClick: (marketId: string, outcome: 'YES' | 'NO') => void;
}

export const MarketDetailPage: React.FC<MarketDetailPageProps> = ({ onBack, onBetClick }) => {
    const { selectedMarket } = useMarkets();
    const { theme } = useTheme();

    if (!selectedMarket) {
        return (
            <div className="container mx-auto px-6 py-12">
                <p className="text-zinc-400">Mercado não encontrado</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-12 max-w-7xl animate-enter">
            <button
                onClick={onBack}
                className={`mb-10 flex items-center gap-3 font-black uppercase text-[10px] tracking-[0.4em] transition-all ${theme === 'dark'
                    ? 'text-zinc-500 hover:text-primary'
                    : 'text-zinc-400 hover:text-zinc-900'
                    }`}
            >
                <ArrowLeft className="w-4 h-4" /> Voltar
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-10">
                    <div
                        className={`rounded-[40px] p-10 shadow-xl border ${theme === 'dark'
                            ? 'bg-zinc-900/30 border-zinc-800'
                            : 'bg-white border-zinc-200 shadow-sm'
                            }`}
                    >
                        <h1 className="text-3xl font-bold mb-6">{selectedMarket.question}</h1>
                        <p className="text-zinc-400 mb-8">{selectedMarket.description}</p>
                        <div className="flex items-center gap-6 text-sm text-zinc-500">
                            <span>Categoria: {selectedMarket.category}</span>
                            <span>•</span>
                            <span>Encerra em: {selectedMarket.endDate}</span>
                            <span>•</span>
                            <span>Volume: R$ {(selectedMarket.volume / 1000).toFixed(0)}k</span>
                        </div>
                    </div>
                    <MarketTabs theme={theme} />
                </div>

                <div className="space-y-8">
                    <MarketCard
                        market={selectedMarket}
                        index={0}
                        onDetailClick={() => { }}
                        onBetClick={(outcome) => onBetClick(selectedMarket.id, outcome)}
                        theme={theme}
                    />
                </div>
            </div>
        </div>
    );
};
