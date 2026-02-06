"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Market } from '../../types';
import { useAuth } from '../../contexts';
import { DepositModal } from './DepositModal';

interface BettingModalProps {
    market: Market;
    outcome: 'YES' | 'NO';
    onClose: () => void;
    theme?: 'dark' | 'light';
}

export const BettingModal: React.FC<BettingModalProps> = ({ market, outcome, onClose, theme = 'dark' }) => {
    const [side, setSide] = useState<'BUY' | 'SELL'>('BUY');
    const [amount, setAmount] = useState('');
    const [showDepositModal, setShowDepositModal] = useState(false);
    const { user, handleSimulatedPayment } = useAuth();

    const price = outcome === 'YES' ? market.yesPrice : market.noPrice;
    const numAmount = parseFloat(amount) || 0;
    const potentialReturn = side === 'BUY' ? (numAmount / price) : (numAmount / (1 - price));
    const profit = potentialReturn - numAmount;

    const handleBuy = () => {
        if (!user) {
            alert('Você precisa estar logado para apostar!');
            return;
        }

        if (numAmount <= 0) {
            alert('Digite um valor válido!');
            return;
        }

        if (numAmount > user.balance) {
            // Abre o modal de depósito quando saldo for insuficiente
            setShowDepositModal(true);
            return;
        }

        // Call the actual betting logic from AuthContext
        handleSimulatedPayment({
            market,
            side: outcome,
            amount: numAmount,
            price,
            date: new Date().toLocaleString('pt-BR'),
            id: `bet-${Date.now()}`,
        });

        alert(`✅ Aposta de R$ ${numAmount.toFixed(0)} em ${outcome} confirmada!`);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className={`relative w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-enter ${theme === 'dark' ? 'bg-[#1c2127]' : 'bg-white'}`} style={{ maxHeight: '90vh' }}>
                {/* Header */}
                <div className="p-8 pb-6">
                    <button
                        onClick={onClose}
                        className={`absolute top-6 right-6 p-2 rounded-full transition-colors ${theme === 'dark' ? 'hover:bg-white/10 text-zinc-400' : 'hover:bg-zinc-100 text-zinc-600'}`}
                    >
                        <X size={24} />
                    </button>

                    <div className="flex gap-4 mb-2">
                        <img
                            src={market.image}
                            alt={market.question}
                            className="w-16 h-16 rounded-xl object-cover flex-shrink-0 border border-white/5"
                        />
                        <div className="flex-1 pr-8">
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-2 ${theme === 'dark' ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-100 text-zinc-500'
                                }`}>
                                {market.category}
                            </span>
                            <h3 className={`text-lg font-bold leading-tight ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                                {market.question}
                            </h3>
                        </div>
                    </div>
                </div>

                {/* Buy/Sell Tabs */}
                <div className="px-8 pb-4">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setSide('BUY')}
                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all ${side === 'BUY'
                                ? 'bg-primary/10 text-primary border-2 border-primary'
                                : theme === 'dark'
                                    ? 'bg-zinc-800 text-zinc-400 border-2 border-transparent'
                                    : 'bg-zinc-100 text-zinc-600 border-2 border-transparent'
                                }`}
                        >
                            Comprar
                        </button>
                        <button
                            onClick={() => setSide('SELL')}
                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all ${side === 'SELL'
                                ? 'bg-primary/10 text-primary border-2 border-primary'
                                : theme === 'dark'
                                    ? 'bg-zinc-800 text-zinc-400 border-2 border-transparent'
                                    : 'bg-zinc-100 text-zinc-600 border-2 border-transparent'
                                }`}
                        >
                            Vender
                        </button>
                    </div>
                </div>

                {/* Outcome Selection */}
                <div className="px-8 pb-6">
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            className={`relative py-4 px-4 rounded-xl text-sm font-bold transition-all border-2 ${outcome === 'YES'
                                ? 'bg-primary/20 text-primary border-primary'
                                : theme === 'dark'
                                    ? 'bg-zinc-800/50 text-zinc-500 border-transparent hover:bg-zinc-800'
                                    : 'bg-zinc-100 text-zinc-500 border-transparent hover:bg-zinc-200'
                                }`}
                        >
                            <span className="block text-xs uppercase opacity-70 mb-1">Sim</span>
                            <span className="text-xl">R${(market.yesPrice * 100).toFixed(0)}</span>
                            {outcome === 'YES' && (
                                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary animate-pulse" />
                            )}
                        </button>
                        <button
                            className={`relative py-4 px-4 rounded-xl text-sm font-bold transition-all border-2 ${outcome === 'NO'
                                ? 'bg-purple-500/20 text-purple-400 border-purple-500'
                                : theme === 'dark'
                                    ? 'bg-zinc-800/50 text-zinc-500 border-transparent hover:bg-zinc-800'
                                    : 'bg-zinc-100 text-zinc-500 border-transparent hover:bg-zinc-200'
                                }`}
                        >
                            <span className="block text-xs uppercase opacity-70 mb-1">Não</span>
                            <span className="text-xl">R${(market.noPrice * 100).toFixed(0)}</span>
                            {outcome === 'NO' && (
                                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Amount Input */}
                <div className="px-8 pb-6">
                    <div className={`rounded-xl p-5 ${theme === 'dark' ? 'bg-zinc-800/50' : 'bg-zinc-50'}`}>
                        <label className={`text-xs font-medium mb-3 block ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                            Reais
                        </label>
                        <div className="flex items-center gap-3">
                            <span className={`text-3xl font-bold ${theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'}`}>
                                R$
                            </span>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0"
                                className={`flex-1 text-3xl font-bold bg-transparent outline-none ${theme === 'dark' ? 'text-white placeholder-zinc-700' : 'text-zinc-900 placeholder-zinc-300'}`}
                                autoFocus
                                style={{ minWidth: 0 }}
                            />
                        </div>
                        {numAmount > 0 && (
                            <p className="text-xs font-medium text-primary mt-3">
                                Ganho potencial: R$ {profit.toFixed(0)} ({((profit / numAmount) * 100).toFixed(1)}%)
                            </p>
                        )}
                    </div>
                </div>

                {/* Buy Button */}
                <div className="px-8 pb-8">
                    <button
                        onClick={handleBuy}
                        disabled={numAmount <= 0}
                        className={`w-full py-4 rounded-xl text-sm font-black uppercase tracking-wide transition-all transform active:scale-95 ${numAmount > 0
                            ? 'bg-primary hover:bg-lime-400 text-black shadow-lg shadow-primary/20 hover:shadow-primary/40'
                            : theme === 'dark'
                                ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                                : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                            }`}
                    >
                        Confirmar {side === 'BUY' ? 'Compra' : 'Venda'}
                    </button>
                </div>
            </div>

            {/* Modal de Depósito */}
            {showDepositModal && (
                <DepositModal
                    onClose={() => setShowDepositModal(false)}
                    onSuccess={() => {
                        setShowDepositModal(false);
                        // Opcionalmente, pode processar a aposta automaticamente após o depósito
                    }}
                    theme={theme}
                />
            )}
        </div>
    );
};
