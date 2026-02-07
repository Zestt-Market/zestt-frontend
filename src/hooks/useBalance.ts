'use client';

import { useEffect, useState } from 'react';
import { usePayments } from '@/src/contexts/PaymentsContext';
import { useUser } from '@clerk/nextjs';

export function useBalance() {
    const { user } = useUser();
    const { balance, getBalance } = usePayments();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user) {
            getBalance('BRL').finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, [user, getBalance]);

    return {
        portfolio: balance ? balance.balanceCents / 100 : 0,
        cash: balance ? balance.availableCents / 100 : 0,
        isLoading,
    };
}
