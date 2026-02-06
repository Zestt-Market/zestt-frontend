"use client";

import { HomePage } from '@/src/HomePage';
import { Header } from '@/src/components/Header';
import { useMarkets } from '@/src/contexts/MarketContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ViewState } from '@/src/types';

export default function SportsPage() {
    const { setCategoryFilter } = useMarkets();
    const router = useRouter();
    const [view, setView] = useState<ViewState>(ViewState.MARKETS);

    useEffect(() => {
        // Set filter to Esportes when this page loads
        setCategoryFilter('Esportes');

        // Cleanup: reset filter when leaving this page
        return () => {
            setCategoryFilter(null);
        };
    }, [setCategoryFilter]);

    const handleMarketClick = (marketId: string) => {
        router.push(`/markets/${marketId}`);
    };

    const handleBetClick = (marketId: string, outcome: 'YES' | 'NO') => {
        router.push(`/markets/${marketId}?bet=${outcome}`);
    };

    const handleViewChange = (newView: ViewState) => {
        setView(newView);
        if (newView !== ViewState.MARKETS) {
            router.push('/');
        }
    };

    const handleDepositClick = () => {
        // Could open a modal or navigate to deposit page
        console.log('Deposit clicked');
    };

    const handleWithdrawClick = () => {
        // Could open a modal or navigate to withdraw page
        console.log('Withdraw clicked');
    };

    return (
        <>
            <Header
                onViewChange={handleViewChange}
                onDepositClick={handleDepositClick}
                onWithdrawClick={handleWithdrawClick}
            />
            <HomePage onMarketClick={handleMarketClick} onBetClick={handleBetClick} />
        </>
    );
}
