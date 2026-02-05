"use client";

import React from 'react';
import type { Outcome } from '../../hooks/useBetFlow';
import { decimalToPercent } from '../../utils/bet-math';

interface OutcomeButtonProps {
  outcome: Outcome;
  label: string;
  price: number;
  isSelected?: boolean;
  onClick: () => void;
  variant?: 'preview' | 'select' | 'confirm';
  theme?: 'dark' | 'light';
}

export const OutcomeButton: React.FC<OutcomeButtonProps> = ({
  outcome,
  label,
  price,
  isSelected = false,
  onClick,
  variant = 'preview',
  theme = 'dark',
}) => {
  const priceCents = Math.round(price * 100);
  const isYes = outcome === 'YES';

  // Classes base por outcome
  const baseClasses = isYes
    ? 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20'
    : 'bg-purple-500/10 text-purple-400 border-purple-500/20 hover:bg-purple-500/20';

  const selectedClasses = isYes
    ? 'bg-primary text-black border-2 border-primary'
    : 'bg-purple-500 text-white border-2 border-purple-400';

  const disabledClasses = isYes
    ? 'bg-primary/10 text-primary/40 border-primary/20'
    : 'bg-purple-500/10 text-purple-400/40 border-purple-500/20';

  // Renderização por variante
  if (variant === 'preview') {
    return (
      <button
        onClick={onClick}
        className={`px-2 py-1 text-[10px] font-bold rounded transition-colors min-w-15 text-center border ${baseClasses}`}
        aria-label={`Apostar ${label} por R$ ${priceCents}`}
      >
        R$ {priceCents}
      </button>
    );
  }

  if (variant === 'select') {
    return (
      <button
        onClick={onClick}
        className={`w-full py-3 px-4 rounded-xl font-bold transition-all border ${baseClasses}`}
        aria-label={`Selecionar ${label} por R$ ${priceCents}`}
      >
        <div className="text-sm">
          {label} R$ {priceCents}
        </div>
      </button>
    );
  }

  // variant === 'confirm'
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all ${
        isSelected ? selectedClasses : `${disabledClasses} hover:bg-opacity-20`
      }`}
      aria-label={`${label} R$ ${priceCents}`}
      aria-pressed={isSelected}
    >
      <div className="text-sm">
        {label} R$ {priceCents}
      </div>
    </button>
  );
};
