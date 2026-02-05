"use client";

import React from 'react';
import { Plus } from 'lucide-react';

interface MarketCardFooterProps {
  volume: number;
  onDetailClick: () => void;
  theme?: 'dark' | 'light';
}

export const MarketCardFooter: React.FC<MarketCardFooterProps> = ({
  volume,
  onDetailClick,
  theme = 'dark',
}) => {
  const volumeK = (volume / 1000).toFixed(0);

  return (
    <div
      className={`flex items-center justify-between mt-auto pt-3 border-t ${
        theme === 'dark' ? 'border-zinc-800/50' : 'border-zinc-100'
      }`}
    >
      <div className="flex items-center gap-2 text-[10px] font-medium text-zinc-500">
        <span>R$ {volumeK}k</span>
        <span
          className={`w-1 h-1 rounded-full ${
            theme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-300'
          }`}
        ></span>
        <span className="text-zinc-600">Vol.</span>
      </div>
      <button
        onClick={onDetailClick}
        title="Ver detalhes do mercado"
        className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all group/add ${
          theme === 'dark'
            ? 'border-zinc-700 hover:border-primary text-zinc-600 hover:text-primary hover:bg-primary/10'
            : 'border-zinc-300 hover:border-primary text-zinc-400 hover:text-primary hover:bg-primary/10'
        }`}
        aria-label="Ver mais detalhes"
      >
        <Plus size={16} className="transition-transform group-hover/add:rotate-90" />
      </button>
    </div>
  );
};
