"use client";

import React from 'react';
import type { Outcome } from '../../hooks/useBetFlow';
import { OutcomeRow } from './OutcomeRow';

interface MarketOutcomesPreviewProps {
  yesLabel: string;
  noLabel: string;
  yesPrice: number;
  noPrice: number;
  onOutcomeClick: (outcome: Outcome) => void;
  theme?: 'dark' | 'light';
}

export const MarketOutcomesPreview: React.FC<MarketOutcomesPreviewProps> = ({
  yesLabel,
  noLabel,
  yesPrice,
  noPrice,
  onOutcomeClick,
  theme = 'dark',
}) => {
  const yesPriceCents = Math.round(yesPrice * 100);
  const noPriceCents = Math.round(noPrice * 100);

  return (
    <div className="flex flex-col gap-3 mb-4">
      <OutcomeRow
        label={yesLabel}
        price={yesPrice}
        priceLabel={`R$ ${yesPriceCents}`}
        outcome="YES"
        onClick={() => onOutcomeClick('YES')}
        theme={theme}
      />
      <OutcomeRow
        label={noLabel}
        price={noPrice}
        priceLabel={`R$ ${noPriceCents}`}
        outcome="NO"
        onClick={() => onOutcomeClick('NO')}
        theme={theme}
      />
    </div>
  );
};
