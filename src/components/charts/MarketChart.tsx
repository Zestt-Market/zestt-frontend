"use client";

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  data: { time: string; value: number }[];
  color: string;
  height?: number;
}

export const MarketChart: React.FC<Props> = ({ data, color, height = 250 }) => {
  return (
    <div style={{ width: '100%', height: height, minWidth: 0 }} className="relative">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
          <defs>
            {/* Gradiente de Preenchimento para dar volume (efeito 3D) */}
            <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.4} />
              <stop offset="50%" stopColor={color} stopOpacity={0.1} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>

            {/* Filtro de Glow (Brilho Neon) */}
            <filter id={`glow-${color}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#27272a"
            vertical={false}
            strokeOpacity={0.5}
          />

          <XAxis dataKey="time" hide />
          <YAxis domain={[0, 1]} hide />

          <Tooltip
            cursor={{ stroke: color, strokeWidth: 1, strokeDasharray: '4 4' }}
            contentStyle={{
              backgroundColor: 'rgba(24, 24, 27, 0.9)',
              border: '1px solid #27272a',
              borderRadius: '12px',
              color: '#fff',
              boxShadow: `0 0 15px ${color}33`,
              backdropFilter: 'blur(8px)'
            }}
            itemStyle={{ color: '#fff', fontWeight: 600, fontFamily: 'monospace' }}
            formatter={(value: number | undefined) => value !== undefined ? [`${(value * 100).toFixed(1)}%`, 'Probabilidade'] : ['', 'Probabilidade']}
            labelStyle={{ display: 'none' }}
          />

          {/* Camada principal com filtro de Glow */}
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={3}
            fill={`url(#gradient-${color})`}
            fillOpacity={1}
            filter={`url(#glow-${color})`}
            animationDuration={1000}
            isAnimationActive={true}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
