"use client";

import React from 'react';

interface MarketCardHeaderProps {
  image: string;
  question: string;
  subtitle?: string;
  onDetailClick: () => void;
  theme?: 'dark' | 'light';
  platform?: 'polymarket' | 'kalshi';
}

export const MarketCardHeader: React.FC<MarketCardHeaderProps> = ({
  image,
  question,
  subtitle,
  onDetailClick,
  theme = 'dark',
  platform,
}) => {
  return (
    <div className="flex gap-3 items-start mb-4 relative">
      <div
        className={`w-10 h-10 rounded-md overflow-hidden shrink-0 border ${theme === 'dark'
          ? 'bg-zinc-800 border-zinc-700'
          : 'bg-zinc-100 border-zinc-200'
          }`}
      >
        {image ? (
          <img
            src={image}
            alt={question}
            className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-600">
            <span className="text-xs">?</span>
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={onDetailClick}
            className={`text-sm font-bold leading-snug line-clamp-2 transition-all text-left ${theme === 'dark'
              ? 'bg-linear-to-r from-white to-zinc-400 bg-clip-text text-transparent group-hover:to-white'
              : 'text-zinc-900'
              }`}
            aria-label={`Ver detalhes: ${question}`}
          >
            {question}
          </button>

          {platform && (
            <div className={`shrink-0 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${platform === 'polymarket'
              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              : 'bg-green-500/20 text-green-400 border border-green-500/30'
              }`}>
              {platform === 'polymarket' ? 'POLY' : 'KALSHI'}
            </div>
          )}
        </div>
        {subtitle && (
          <p
            className={`text-xs mt-1 font-medium ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
              }`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};
