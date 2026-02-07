'use client';

import { useState } from 'react';

export function useModals() {
    const [bettingModal, setBettingModal] = useState<{
        marketId: string;
        outcome: 'YES' | 'NO';
    } | null>(null);
    const [showDepositModal, setShowDepositModal] = useState(false);
    const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);

    return {
        bettingModal,
        openBettingModal: setBettingModal,
        closeBettingModal: () => setBettingModal(null),

        showDepositModal,
        openDepositModal: () => setShowDepositModal(true),
        closeDepositModal: () => setShowDepositModal(false),

        showWithdrawalModal,
        openWithdrawalModal: () => setShowWithdrawalModal(true),
        closeWithdrawalModal: () => setShowWithdrawalModal(false),
    };
}
