"use client";


import { useState } from 'react';
import { Market } from '../types';
import { useAuth } from '../contexts';

/**
 * Custom hook for betting logic
 * Encapsulates all betting-related business logic
 */
export const useBetting = () => {
    const { user, handleSimulatedPayment } = useAuth();
    const [isProcessing, setIsProcessing] = useState(false);

    /**
     * Place a bet on a market
     * Validates balance and processes payment
     */
    const placeBet = async (
        market: Market,
        side: 'YES' | 'NO',
        amount: number
    ): Promise<{ success: boolean; error?: string }> => {
        if (!user) {
            return { success: false, error: 'Usuário não autenticado' };
        }

        if (amount <= 0) {
            return { success: false, error: 'Valor inválido' };
        }

        if (amount > user.balance) {
            return { success: false, error: 'Saldo insuficiente' };
        }

        setIsProcessing(true);

        try {
            const price = side === 'YES' ? market.yesPrice : market.noPrice;

            handleSimulatedPayment({
                market,
                side,
                amount,
                price,
                date: new Date().toLocaleString('pt-BR'),
                id: `bet-${Date.now()}`,
            });

            return { success: true };
        } catch (error) {
            return { success: false, error: 'Erro ao processar aposta' };
        } finally {
            setIsProcessing(false);
        }
    };

    /**
     * Calculate potential return for a bet
     */
    const calculateReturn = (
        market: Market,
        side: 'YES' | 'NO',
        amount: number
    ): { potentialReturn: number; profit: number } => {
        const price = side === 'YES' ? market.yesPrice : market.noPrice;
        const potentialReturn = amount / price;
        const profit = potentialReturn - amount;

        return { potentialReturn, profit };
    };

    return {
        placeBet,
        calculateReturn,
        isProcessing,
    };
};
