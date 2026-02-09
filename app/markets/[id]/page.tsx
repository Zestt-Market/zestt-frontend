"use client";

import { MarketDetailPage } from '@/src/MarketDetailPage';
import { useMarkets } from '@/src/contexts/MarketContext';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
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
        if (marketId) setSelectedMarketById(marketId);
    }, [marketId, setSelectedMarketById]);

    useEffect(() => {
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

    return (
        <>
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
