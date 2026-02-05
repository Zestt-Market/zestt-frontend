"use client";

import React from 'react';
import { decimalToPercent } from '../../utils/bet-math';

interface OutcomeRowProps {
  label: string;
  price: number;
  priceLabel: string;
  onClick: () => void;
  outcome: 'YES' | 'NO';  // ✅ Adicionado para diferenciar YES/NO
  theme?: 'dark' | 'light';
}

export const OutcomeRow: React.FC<OutcomeRowProps> = ({
  label,
  price,
  priceLabel,
  onClick,
  outcome,
  theme = 'dark',
}) => {
  const probability = decimalToPercent(price);
  const isYes = outcome === 'YES';

  // Classes diferentes para YES (verde) e NO (roxo)
  const priceButtonClasses = isYes
    ? theme === 'dark'
      ? 'bg-primary/10 text-primary border-primary/20 group-hover/row:bg-primary/20'
      : 'bg-primary/20 text-primary-dark border-primary/30'
    : theme === 'dark'
      ? 'bg-purple-500/10 text-purple-400 border-purple-500/20 group-hover/row:bg-purple-500/20'
      : 'bg-purple-500/20 text-purple-700 border-purple-500/30';

  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full group/row transition-all hover:opacity-80"
      aria-label={`Apostar em ${label} com ${probability}% de probabilidade por ${priceLabel}`}
    >
      <span className="text-xs font-semibold text-white">{label}</span>
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold text-white">{probability}%</span>
        <div
          className={`px-2 py-1 text-[10px] font-bold rounded transition-colors min-w-15 text-center border ${priceButtonClasses}`}
        >
          {priceLabel}
        </div>
      </div>
    </button>
  );
};
