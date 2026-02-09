"use client";

import React from 'react';
import type { Market } from '../types';
import type { Outcome } from '../hooks/useBetFlow';
import { useBetFlow } from '../hooks/useBetFlow';
import { MarketCardHeader } from './Market/MarketCardHeader';
import { MarketOutcomesPreview } from './Market/MarketOutcomesPreview';
import { BetFlow } from './Market/BetFlow';
import { MarketCardFooter } from './Market/MarketCardFooter';

interface MarketCardProps {
  market: Market;
  index: number;
  onDetailClick: () => void;
  onBetClick: (outcome: Outcome) => void;
  theme?: 'dark' | 'light';
}

export const MarketCard: React.FC<MarketCardProps> = ({
  market,
  index,
  onDetailClick,
  onBetClick,
  theme = 'dark',
}) => {
  const betFlow = useBetFlow();

  const handleConfirmBet = () => {
    if (betFlow.state.selectedOutcome && betFlow.state.amountReais > 0) {
      onBetClick(betFlow.state.selectedOutcome);
    }
  };

  return (
    <div
      className={`animate-enter group relative flex flex-col border rounded-xl overflow-hidden transition-all p-4 ${theme === 'dark'
        ? 'bg-zinc-900 border-zinc-800'
        : 'bg-white border-zinc-200 shadow-sm'
        }`}
      style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'both' }}
    >
      <MarketCardHeader
        image={market.image}
        question={market.question}
        subtitle={market.subtitle}
        onDetailClick={onDetailClick}
        theme={theme}
        platform={market.platform}
      />

      {betFlow.state.step === 'collapsed' ? (
        <MarketOutcomesPreview
          yesLabel={market.yesLabel || 'Sim'}
          noLabel={market.noLabel || 'Não'}
          yesPrice={market.yesPrice}
          noPrice={market.noPrice}
          onOutcomeClick={betFlow.expandOutcome}
          theme={theme}
        />
      ) : (
        <BetFlow
          expandedOutcome={betFlow.state.expandedOutcome!}
          selectedOutcome={betFlow.state.selectedOutcome}
          amountReais={betFlow.state.amountReais}
          yesPrice={market.yesPrice}
          noPrice={market.noPrice}
          yesLabel={market.yesLabel || 'Sim'}
          noLabel={market.noLabel || 'Não'}
          onCollapse={betFlow.collapse}
          onSelectOutcome={betFlow.selectOutcome}
          onSetAmount={betFlow.setAmount}
          onConfirm={handleConfirmBet}
          theme={theme}
        />
      )}

      <MarketCardFooter
        volume={market.volume}
        onDetailClick={onDetailClick}
        theme={theme}
      />
    </div>
  );
};

export default MarketCard;