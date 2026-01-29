"use client";


import React, { useEffect, useRef, memo } from 'react';
import { TrendingUp, Sparkles } from 'lucide-react';

interface Props {
  amount: number;
  price: number;
  side: 'YES' | 'NO';
}

const TradeSimulationComponent: React.FC<Props> = ({ amount, price, side }) => {
  const payoutRef = useRef<HTMLSpanElement>(null);
  const roiRef = useRef<HTMLSpanElement>(null);
  const currentValues = useRef({ payout: 0, roi: 0 });
  const animationRef = useRef<number>(0);

  const safePrice = Math.max(0.01, price);
  const safeAmount = Math.max(0, amount);
  const potentialPayout = safeAmount / safePrice;
  const roi = safeAmount > 0 ? ((potentialPayout - safeAmount) / safeAmount) * 100 : 0;
  const multiplier = 1 / safePrice;

  useEffect(() => {
    const startPayout = currentValues.current.payout;
    const startRoi = currentValues.current.roi;
    const endPayout = potentialPayout;
    const endRoi = roi;

    const duration = 600;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      const nextPayout = startPayout + (endPayout - startPayout) * ease;
      const nextRoi = startRoi + (endRoi - startRoi) * ease;

      currentValues.current = { payout: nextPayout, roi: nextRoi };

      if (payoutRef.current) {
        payoutRef.current.textContent = `R$ ${nextPayout.toFixed(2)}`;
      }
      if (roiRef.current) {
        roiRef.current.textContent = `+${nextRoi.toFixed(0)}%`;
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [potentialPayout, roi]);

  const colors = {
    YES: {
      hex: '#bef264',
      icon: 'text-lime-500/50',
      label: 'text-primary',
      glow: 'bg-primary',
      gradient: 'from-lime-900/40 to-primary/80',
      border: 'border-primary/50',
      top: 'bg-primary',
      textMain: 'text-primary',
      badge: 'bg-primary/20 text-primary border-primary/30'
    },
    NO: {
      hex: '#a855f7',
      icon: 'text-purple-500',
      label: 'text-purple-400',
      glow: 'bg-purple-500',
      gradient: 'from-purple-950/80 to-purple-500/50',
      border: 'border-purple-500/40',
      top: 'bg-purple-400',
      textMain: 'text-purple-400',
      badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
    }
  };

  const c = colors[side];
  const baseHeight = 50;
  const targetHeight = Math.min(Math.max(baseHeight * multiplier, 50), 160);

  return (
    <div className="relative w-full rounded-3xl bg-zinc-950 border border-zinc-800 p-8 perspective-1000 shadow-2xl overflow-visible group/card">
      <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(${c.hex} 1px, transparent 1px), linear-gradient(90deg, ${c.hex} 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
            transform: 'perspective(500px) rotateX(60deg) translateY(-50px) scale(2)',
            maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 60%, transparent)'
          }}
        />
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 ${c.glow} blur-[100px] opacity-10`} />
      </div>

      <div className="relative z-10 flex items-end justify-between gap-6 h-[240px] pb-4">
        <div className="flex flex-col items-center gap-3 w-1/3">
          <div className="relative w-full max-w-[70px] transform-style-3d transition-all duration-500 ease-out hover:scale-105"
            style={{ height: `${baseHeight}px` }}>
            <div className="absolute inset-0 bg-zinc-900 rounded-xl border border-zinc-800 backdrop-blur-sm shadow-inner" />
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center whitespace-nowrap">
              <span className="text-[9px] text-zinc-500 font-black uppercase tracking-[0.2em] mb-1">Entrada</span>
              <span className="text-lg font-mono text-zinc-300 font-bold">
                R$ {amount.toFixed(0)}
              </span>
            </div>
          </div>
        </div>

        <div className={`pb-10 transition-colors duration-500 ${c.icon}`}>
          <TrendingUp size={32} strokeWidth={3} className="filter drop-shadow-[0_0_10px_currentColor] animate-bounce" style={{ animationDuration: '3s' }} />
        </div>

        <div className="flex flex-col items-center gap-3 w-1/3">
          <div className="relative w-full max-w-[70px] transform-style-3d group-hover/card:scale-105 transition-transform duration-500"
            style={{
              height: `${targetHeight}px`,
              transition: 'height 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}>
            <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-[120%] h-[20px] ${c.glow} blur-xl opacity-40`} />
            <div className={`absolute inset-0 bg-gradient-to-t ${c.gradient} rounded-xl border-t border-l border-r ${c.border} backdrop-blur-md transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.3)]`} >
              <div className="absolute inset-x-0 top-0 h-[1px] bg-white opacity-40"></div>
            </div>
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
              <span className={`text-[9px] ${c.label} font-black uppercase tracking-[0.2em] mb-1 flex items-center gap-1`}>
                <Sparkles size={10} /> Retorno
              </span>
              <span ref={payoutRef} className={`text-2xl font-black font-mono ${c.textMain} drop-shadow-[0_0_15px_currentColor] whitespace-nowrap`}>
                R$ {currentValues.current.payout.toFixed(2)}
              </span>
              <span ref={roiRef} className={`text-[10px] font-black ${c.badge} px-3 py-1 rounded-full mt-1 shadow-lg border backdrop-blur-md`}>
                +{currentValues.current.roi.toFixed(0)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 pt-5 border-t border-zinc-900/50 flex justify-between items-center relative z-20">
        <span className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em]">Multiplicador</span>
        <span className={`${c.textMain} font-mono font-black text-lg drop-shadow-[0_0_5px_currentColor]`}>{multiplier.toFixed(2)}x</span>
      </div>
    </div>
  );
};

export const TradeSimulation = memo(TradeSimulationComponent);
