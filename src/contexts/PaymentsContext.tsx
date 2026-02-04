"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { usePayments as usePaymentsHook } from '../hooks/usePayments';
import type { Wallet, Payment } from '../hooks/usePayments';

interface PaymentsContextType {
    balance: Wallet | null;
    loading: boolean;
    error: string | null;
    getBalance: (currency?: 'USD' | 'BRL') => Promise<void>;
    createDeposit: (amountCents: number, currency: 'USD' | 'BRL', paymentMethod?: 'PIX' | 'CREDIT_CARD' | 'BANK_TRANSFER') => Promise<Payment>;
    createWithdrawal: (amountCents: number, currency: 'USD' | 'BRL', destination?: { pixKey?: string; bankAccount?: string }) => Promise<Payment>;
}

const PaymentsContext = createContext<PaymentsContextType | undefined>(undefined);

export const PaymentsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const payments = usePaymentsHook();

    return (
        <PaymentsContext.Provider value={payments}>
            {children}
        </PaymentsContext.Provider>
    );
};

export const usePayments = () => {
    const context = useContext(PaymentsContext);
    if (context === undefined) {
        throw new Error('usePayments must be used within a PaymentsProvider');
    }
    return context;
};
