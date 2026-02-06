"use client";

import React from 'react';

interface MarketCardHeaderProps {
  image: string;
  question: string;
  subtitle?: string;
  onDetailClick: () => void;
  theme?: 'dark' | 'light';
}

export const MarketCardHeader: React.FC<MarketCardHeaderProps> = ({
  image,
  question,
  subtitle,
  onDetailClick,
  theme = 'dark',
}) => {
  return (
    <div className="flex gap-3 items-start mb-4">
      <div
        className={`w-10 h-10 rounded-md overflow-hidden shrink-0 border ${
          theme === 'dark'
            ? 'bg-zinc-800 border-zinc-700'
            : 'bg-zinc-100 border-zinc-200'
        }`}
      >
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
        />
      </div>
      <div className="flex-1">
        <button
          onClick={onDetailClick}
          className={`text-sm font-bold leading-snug line-clamp-2 transition-all text-left w-full ${
            theme === 'dark'
              ? 'bg-linear-to-r from-white to-zinc-400 bg-clip-text text-transparent group-hover:to-white'
              : 'text-zinc-900'
          }`}
          aria-label={`Ver detalhes: ${question}`}
        >
          {question}
        </button>
        {subtitle && (
          <p
            className={`text-xs mt-1 font-medium ${
              theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};
