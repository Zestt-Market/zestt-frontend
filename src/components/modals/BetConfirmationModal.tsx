"use client";

import React, { useEffect, useState } from 'react';
import { CheckCircle2, TrendingUp, X } from 'lucide-react';
import { formatPercentage } from '../../utils/bet-math';

interface BetConfirmationModalProps {
    amount: number;
    outcome: 'YES' | 'NO';
    marketQuestion: string;
    potentialReturn: number;
    onClose: () => void;
    theme?: 'dark' | 'light';
}

export const BetConfirmationModal: React.FC<BetConfirmationModalProps> = ({
    amount,
    outcome,
    marketQuestion,
    potentialReturn,
    onClose,
    theme = 'dark'
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const profit = potentialReturn - amount;
    const profitPercentage = amount > 0 ? (profit / amount) * 100 : 0;

    useEffect(() => {
        // Trigger animation after mount
        setTimeout(() => setIsVisible(true), 10);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
                    }`}
                onClick={handleClose}
            />

            {/* Modal */}
            <div
                className={`relative w-full max-w-md rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 transform ${isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
                    } ${theme === 'dark' ? 'bg-gradient-to-br from-zinc-900 to-zinc-800' : 'bg-white'}`}
            >
                {/* Success Icon with Animation */}
                <div className="relative pt-12 pb-6 px-8">
                    <div className="flex justify-center mb-6">
                        <div className={`relative ${isVisible ? 'animate-bounce-in' : ''}`}>
                            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                            <CheckCircle2
                                className="relative w-20 h-20 text-primary drop-shadow-lg"
                                strokeWidth={2.5}
                            />
                        </div>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className={`absolute top-6 right-6 p-2 rounded-full transition-colors ${theme === 'dark'
                            ? 'hover:bg-white/10 text-zinc-400'
                            : 'hover:bg-zinc-100 text-zinc-600'
                            }`}
                    >
                        <X size={20} />
                    </button>

                    {/* Title */}
                    <h2 className={`text-2xl font-black text-center mb-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'
                        }`}>
                        Aposta Confirmada! 🎉
                    </h2>
                    <p className={`text-center text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                        }`}>
                        Sua aposta foi registrada com sucesso
                    </p>
                </div>

                {/* Bet Details */}
                <div className="px-8 pb-8 space-y-4">
                    {/* Market Info */}
                    <div className={`rounded-2xl p-4 ${theme === 'dark' ? 'bg-zinc-800/50' : 'bg-zinc-50'
                        }`}>
                        <p className={`text-xs font-medium mb-2 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'
                            }`}>
                            MERCADO
                        </p>
                        <p className={`text-sm font-bold leading-tight ${theme === 'dark' ? 'text-white' : 'text-zinc-900'
                            }`}>
                            {marketQuestion}
                        </p>
                    </div>

                    {/* Bet Amount & Outcome */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className={`rounded-2xl p-4 ${theme === 'dark' ? 'bg-zinc-800/50' : 'bg-zinc-50'
                            }`}>
                            <p className={`text-xs font-medium mb-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'
                                }`}>
                                VALOR
                            </p>
                            <p className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}
                                }`}>
                                R$ {Math.round(amount)}
                            </p>
                        </div>

                        <div className={`rounded-2xl p-4 ${outcome === 'YES'
                            ? 'bg-primary/20 border-2 border-primary'
                            : 'bg-purple-500/20 border-2 border-purple-500'
                            }`}>
                            <p className={`text-xs font-medium mb-1 ${outcome === 'YES' ? 'text-primary' : 'text-purple-400'
                                }`}>
                                POSIÇÃO
                            </p>
                            <p className={`text-xl font-black ${outcome === 'YES' ? 'text-primary' : 'text-purple-400'
                                }`}>
                                {outcome === 'YES' ? 'SIM' : 'NÃO'}
                            </p>
                        </div>
                    </div>

                    {/* Potential Return */}
                    <div className={`rounded-2xl p-5 border-2 ${theme === 'dark'
                        ? 'bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30'
                        : 'bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20'
                        }`}>
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-primary" />
                                <p className="text-xs font-bold text-primary uppercase tracking-wider">
                                    Ganho Potencial
                                </p>
                            </div>
                            <span className="text-xs font-bold text-primary bg-primary/20 px-2 py-1 rounded-full">
                                +{formatPercentage(profitPercentage)}%
                            </span>
                        </div>
                        <p className="text-3xl font-black text-primary">
                            R$ {Math.round(profit)}
                        </p>
                        <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-600'}
                            }`}>
                            Retorno total: R$ {Math.round(potentialReturn)}
                        </p>
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={handleClose}
                        className="w-full py-4 rounded-xl text-sm font-black uppercase tracking-wide transition-all transform active:scale-95 bg-primary hover:bg-lime-400 text-black shadow-lg shadow-primary/20 hover:shadow-primary/40 mt-2"
                    >
                        Continuar Apostando
                    </button>
                </div>
            </div>

            <style jsx>{`
                @keyframes bounce-in {
                    0% {
                        transform: scale(0);
                        opacity: 0;
                    }
                    50% {
                        transform: scale(1.1);
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                .animate-bounce-in {
                    animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }
            `}</style>
        </div>
    );
};
