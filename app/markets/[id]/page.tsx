"use client";

import { MarketDetailPage } from '@/src/MarketDetailPage';
import { Header } from '@/src/components/Header';
import { useMarkets } from '@/src/contexts/MarketContext';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ViewState } from '@/src/types';
import { BettingModal } from '@/src/components/modals/BettingModal';

export default function MarketPage() {
    const { setSelectedMarketById, selectedMarket } = useMarkets();
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const [showBettingModal, setShowBettingModal] = useState(false);
    const [betOutcome, setBetOutcome] = useState<'YES' | 'NO'>('YES');

    const marketId = params.id as string;
    const betParam = searchParams.get('bet') as 'YES' | 'NO' | null;

    useEffect(() => {
        if (marketId) {
            setSelectedMarketById(marketId);
        }
    }, [marketId, setSelectedMarketById]);

    useEffect(() => {
        // If there's a bet parameter in the URL, open the betting modal
        if (betParam && selectedMarket) {
            setBetOutcome(betParam);
            setShowBettingModal(true);
        }
    }, [betParam, selectedMarket]);

    const handleBack = () => {
        router.back();
    };

    const handleBetClick = (marketId: string, outcome: 'YES' | 'NO') => {
        setBetOutcome(outcome);
        setShowBettingModal(true);
    };

    const handleViewChange = (newView: ViewState) => {
        if (newView !== ViewState.MARKETS) {
            router.push('/');
        }
    };

    const handleDepositClick = () => {
        console.log('Deposit clicked');
    };

    const handleWithdrawClick = () => {
        console.log('Withdraw clicked');
    };

    return (
        <>
            <Header
                onViewChange={handleViewChange}
                onDepositClick={handleDepositClick}
                onWithdrawClick={handleWithdrawClick}
            />
            <MarketDetailPage onBack={handleBack} onBetClick={handleBetClick} />

            {showBettingModal && selectedMarket && (
                <BettingModal
                    market={selectedMarket}
                    outcome={betOutcome}
                    onClose={() => setShowBettingModal(false)}
                />
            )}
        </>
    );
}
