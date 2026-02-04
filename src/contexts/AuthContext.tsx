"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useUser, useAuth as useClerkAuth } from '@clerk/nextjs';
import { User, Position, Trade, Market } from '../types';
import { UserService } from '@/src/services/user.service';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string) => void;
    logout: () => void;
    // Business Logic Methods
    handleDeposit: (payload: { amount: number; date: string; id: string }) => void;
    handleSimulatedPayment: (payload: {
        market: Market;
        side: "YES" | "NO";
        amount: number;
        price: number;
        date: string;
        id: string;
    }) => void;
    handleResolveMarket: (marketId: string, outcome: "YES" | "NO") => void;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user: clerkUser, isLoaded } = useUser();
    const { signOut, getToken } = useClerkAuth();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (isLoaded && clerkUser) {
            const email = clerkUser.primaryEmailAddress?.emailAddress || '';
            const name = clerkUser.fullName || clerkUser.firstName || email.split('@')[0];

            const syncUserWithBackend = async () => {
                try {
                    const token = await getToken();
                    await UserService.syncUser({
                        clerkUserId: clerkUser.id,
                        email,
                        displayName: name,
                        avatarUrl: clerkUser.imageUrl,
                    }, token || undefined);

                } catch (err) {
                    console.error('❌ Backend sync error:', err);
                }
            };

            syncUserWithBackend();

            setUser({
                id: clerkUser.id,
                name,
                email,
                avatarUrl: clerkUser.imageUrl,
                isAdmin: false,
                balance: 3500.0,
                portfolioValue: 1200.0,
                positions: [],
                tradeHistory: [],
            });
        } else if (isLoaded && !clerkUser) {
            // Limpar user se Clerk confirmar que não está autenticado
            setUser(null);
        }
    }, [clerkUser, isLoaded, getToken]);

    // Log quando user state mudar
    useEffect(() => {
    }, [user]);

    const login = (email: string) => {
        setUser({
            id: 'demo-user',
            name: email.split('@')[0],
            email,
            isAdmin: false,
            balance: 3500.0,
            portfolioValue: 1200.0,
            positions: [],
            tradeHistory: [],
        });
    };

    const logout = async () => {
        console.log('🚪 Logout');
        if (signOut) {
            await signOut();
        }
        setUser(null);
    };


    const handleDeposit = (payload: { amount: number; date: string; id: string }) => {
        setUser((prev) => {
            if (!prev) return prev;
            const newBalance = prev.balance + payload.amount;
            const newTrade: Trade = {
                id: payload.id,
                date: payload.date,
                marketQuestion: "Depósito",
                side: "YES",
                quantity: payload.amount,
                price: 1,
                totalValue: payload.amount,
                action: "BUY",
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

            const newTrade: Trade = {
                id: payload.id,
                date: payload.date,
                marketQuestion: payload.market.question,
                side: payload.side,
                quantity: payload.amount,
                price: payload.price,
                totalValue: payload.amount,
                action: "BUY",
            };

            const newPosition: Position = {
                marketId: payload.market.id,
                marketQuestion: payload.market.question,
                side: payload.side,
                quantity: payload.amount,
                avgPrice: payload.price,
                currentPrice: payload.price,
            };

            return {
                ...prev,
                balance: newBalance,
                tradeHistory: [newTrade, ...(prev.tradeHistory || [])],
                positions: [...prev.positions, newPosition],
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

            const settlementTrade: Trade = {
                id: `settle-${Date.now()}`,
                date: new Date().toLocaleString("pt-BR"),
                marketQuestion: marketId,
                side: outcome,
                quantity: payoutTotal,
                price: 1,
                totalValue: payoutTotal,
                action: "BUY",
            };

            return {
                ...prev,
                balance: newBalance,
                positions: remainingPositions,
                tradeHistory: [settlementTrade, ...prev.tradeHistory],
            };
        });
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            isLoading: !isLoaded,
            login,
            logout,
            handleDeposit,
            handleSimulatedPayment,
            handleResolveMarket,
            setUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
