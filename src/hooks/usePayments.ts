import { useState, useCallback } from 'react';
import { useAuth } from '@clerk/nextjs';

export interface Wallet {
    userId: string;
    currency: 'USD' | 'BRL';
    balanceCents: number;
    availableCents: number;
    heldCents: number;
}

export interface Payment {
    id: string;
    userId: string;
    type: 'DEPOSIT' | 'WITHDRAWAL';
    status: 'CREATED' | 'PENDING' | 'PAID' | 'FAILED' | 'CANCELED' | 'REFUNDED';
    amountCents: number;
    currency: string;
    provider: string;
    externalRef?: string;
    paymentUrl?: string;
    createdAt: Date;
}

interface UsePaymentsReturn {
    balance: Wallet | null;
    loading: boolean;
    error: string | null;
    getBalance: (currency?: 'USD' | 'BRL') => Promise<void>;
    createDeposit: (amountCents: number, currency: 'USD' | 'BRL', paymentMethod?: 'PIX' | 'CREDIT_CARD' | 'BANK_TRANSFER') => Promise<Payment>;
    createWithdrawal: (amountCents: number, currency: 'USD' | 'BRL', destination?: { pixKey?: string; bankAccount?: string }) => Promise<Payment>;
}

export const usePayments = (): UsePaymentsReturn => {
    const [balance, setBalance] = useState<Wallet | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { getToken } = useAuth();

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333';

    const getAuthHeaders = async () => {
        const token = await getToken();

        return {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : '',
        };
    };

    const getBalance = useCallback(async (currency: 'USD' | 'BRL' = 'USD') => {
        setLoading(true);
        setError(null);

        try {
            const headers = await getAuthHeaders();
            const response = await fetch(`${API_URL}/api/payments/balance?currency=${currency}`, {
                headers,
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar saldo');
            }

            const data = await response.json();
            setBalance(data);
            console.log('✅ Balance atualizado no hook:', data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro desconhecido');
            console.error('Erro ao buscar saldo:', err);
        } finally {
            setLoading(false);
        }
    }, [API_URL]);

    const createDeposit = useCallback(async (
        amountCents: number,
        currency: 'USD' | 'BRL',
        paymentMethod?: 'PIX' | 'CREDIT_CARD' | 'BANK_TRANSFER'
    ): Promise<Payment> => {
        setLoading(true);
        setError(null);

        try {
            const headers = await getAuthHeaders();
            const response = await fetch(`${API_URL}/api/payments/deposit`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    amountCents,
                    currency,
                    paymentMethod: paymentMethod || 'PIX',
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro ao criar depósito');
            }

            const payment = await response.json();

            // Atualizar saldo após depósito bem-sucedido
            if (payment.status === 'PAID') {
                await getBalance(currency);
            }

            return payment;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
            setError(errorMessage);
            console.error('Erro ao criar depósito:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [API_URL, getBalance]);

    const createWithdrawal = useCallback(async (
        amountCents: number,
        currency: 'USD' | 'BRL',
        destination?: { pixKey?: string; bankAccount?: string }
    ): Promise<Payment> => {
        setLoading(true);
        setError(null);

        try {
            const headers = await getAuthHeaders();
            const response = await fetch(`${API_URL}/api/payments/withdrawal`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    amountCents,
                    currency,
                    destination,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro ao criar saque');
            }

            const payment = await response.json();

            // Atualizar saldo após saque bem-sucedido
            if (payment.status === 'PAID') {
                await getBalance(currency);
            }

            return payment;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
            setError(errorMessage);
            console.error('Erro ao criar saque:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [API_URL, getBalance]);

    return {
        balance,
        loading,
        error,
        getBalance,
        createDeposit,
        createWithdrawal,
    };
};
