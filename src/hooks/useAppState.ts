"use client";

import { useState, useEffect } from 'react';
import type { User, Market, BettingModalState } from '../types';
import { ViewState } from '../types';
import { MOCK_USER, MOCK_MARKETS } from '../mocks';
import { fetchKalshiMarkets } from '../utils';

export const useAppState = () => {
    const [view, setView] = useState<ViewState>(ViewState.HOME);
    const [user, setUser] = useState<User | null>(MOCK_USER);
    const [markets, setMarkets] = useState<Market[]>(MOCK_MARKETS);
    const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
    const [bettingModal, setBettingModal] = useState<BettingModalState | null>(null);
    const [depositVisible, setDepositVisible] = useState(false);

    // Load markets from Kalshi API
    useEffect(() => {
        const loadMarkets = async () => {
            const kalshi = await fetchKalshiMarkets();
            if (kalshi.length > 0) {
                setMarkets([
                    ...kalshi,
                    ...MOCK_MARKETS.filter((m) => m.category === "Esportes"),
                ]);
            }
        };
        loadMarkets();
    }, []);

    const handleDeposit = (payload: {
        amount: number;
        date: string;
        id: string;
    }) => {
        setUser((prev) => {
            if (!prev) return prev;
            const newBalance = prev.balance + payload.amount;
            const newTrade = {
                id: payload.id,
                date: payload.date,
                marketQuestion: "Depósito",
                side: "YES" as const,
                quantity: payload.amount,
                price: 1,
                totalValue: payload.amount,
                action: "BUY" as const,
            };
            return {
                ...prev,
                balance: newBalance,
                tradeHistory: [newTrade, ...prev.tradeHistory],
            };
        });
    };

    const handleSimulatedPayment = (payload: {
        market: Market;
        side: "YES" | "NO";
        amount: number;
        price: number;
        date: string;
        id: string;
    }) => {
        setUser((prev) => {
            if (!prev) return prev;
            const newBalance = Math.max(0, prev.balance - payload.amount);
            const newTrade = {
                id: payload.id,
                date: payload.date,
                marketQuestion: payload.market.question,
                side: payload.side,
                quantity: payload.amount,
                price: payload.price,
                totalValue: payload.amount,
                action: "BUY" as const,
            };
            const newPositions = [...prev.positions];
            newPositions.push({
                marketId: payload.market.id,
                marketQuestion: payload.market.question,
                side: payload.side,
                quantity: payload.amount,
                avgPrice: payload.price,
                currentPrice: payload.price,
            });
            return {
                ...prev,
                balance: newBalance,
                tradeHistory: [newTrade, ...(prev.tradeHistory || [])],
                positions: newPositions,
            };
        });
    };

    const handleResolveMarket = (marketId: string, outcome: "YES" | "NO") => {
        setUser((prev) => {
            if (!prev) return prev;
            let payoutTotal = 0;
            const remainingPositions = prev.positions.filter((p) => {
                if (p.marketId !== marketId) return true;
                if (p.side === outcome) {
                    const payout = p.quantity / p.avgPrice;
                    payoutTotal += payout;
                }
                return false;
            });

            const newBalance = prev.balance + payoutTotal;
            const settlementTrade = {
                id: `settle-${Date.now()}`,
                date: new Date().toLocaleString("pt-BR"),
                marketQuestion: marketId,
                side: outcome,
                quantity: payoutTotal,
                price: 1,
                totalValue: payoutTotal,
                action: "BUY" as const,
            };
            return {
                ...prev,
                balance: newBalance,
                positions: remainingPositions,
                tradeHistory: [settlementTrade, ...prev.tradeHistory],
            };
        });
    };

    return {
        // State
        view,
        user,
        markets,
        selectedMarket,
        bettingModal,
        depositVisible,
        // Actions
        setView,
        setUser,
        setSelectedMarket,
        setBettingModal,
        setDepositVisible,
        handleDeposit,
        handleSimulatedPayment,
        handleResolveMarket,
    };
};