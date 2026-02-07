"use client";

import React from 'react';
import type { Outcome } from '../../hooks/useBetFlow';
import { OutcomeButton } from './OutcomeButton';
import { calculateBetReturns, formatCentsToReais, safeParseFloat, formatPercentage } from '../../utils/bet-math';

interface BetFlowProps {
  expandedOutcome: Outcome;
  selectedOutcome: Outcome | null;
  amountReais: number;
  yesPrice: number;
  noPrice: number;
  yesLabel: string;
  noLabel: string;
  onCollapse: () => void;
  onSelectOutcome: (outcome: Outcome) => void;
  onSetAmount: (amount: number) => void;
  onConfirm: () => void;
  theme?: 'dark' | 'light';
}

export const BetFlow: React.FC<BetFlowProps> = ({
  expandedOutcome,
  selectedOutcome,
  amountReais,
  yesPrice,
  noPrice,
  yesLabel,
  noLabel,
  onCollapse,
  onSelectOutcome,
  onSetAmount,
  onConfirm,
  theme = 'dark',
}) => {
  const currentPrice = expandedOutcome === 'YES' ? yesPrice : noPrice;
  const currentLabel = expandedOutcome === 'YES' ? yesLabel : noLabel;
  const probability = Math.round(currentPrice * 100);

  // Calcula retornos se houver valor selecionado
  const calculation = selectedOutcome && amountReais > 0
    ? calculateBetReturns(amountReais, selectedOutcome === 'YES' ? yesPrice : noPrice)
    : null;

  // Handler robusto para input
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    // Permite campo vazio
    if (rawValue === '') {
      onSetAmount(0);
      return;
    }

    // Parse seguro
    const parsed = safeParseFloat(rawValue);
    onSetAmount(parsed);
  };

  return (
    <div className="mb-4">
      {/* Header do outcome expandido */}
      <button
        onClick={onCollapse}
        className="flex items-center justify-between mb-3 w-full hover:opacity-80 transition-opacity"
        aria-label="Voltar para seleção de mercado"
      >
        <span
          className={`text-xs font-semibold ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'
            }`}
        >
          {currentLabel}
        </span>
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-white">{probability}%</span>
          <span
            className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}
          >
            ↑
          </span>
        </div>
      </button>

      {!selectedOutcome ? (
        // Passo 1: Seleção Yes/No
        <div className="space-y-3">
          <OutcomeButton
            outcome="YES"
            label={yesLabel}
            price={yesPrice}
            onClick={() => onSelectOutcome('YES')}
            variant="select"
            theme={theme}
          />
          <OutcomeButton
            outcome="NO"
            label={noLabel}
            price={noPrice}
            onClick={() => onSelectOutcome('NO')}
            variant="select"
            theme={theme}
          />
        </div>
      ) : (
        // Passo 2: Input de valor
        <div className="space-y-3">
          {/* Botões de confirmação de outcome */}
          <div className="flex gap-2">
            <OutcomeButton
              outcome="YES"
              label={yesLabel}
              price={yesPrice}
              isSelected={selectedOutcome === 'YES'}
              onClick={() => onSelectOutcome('YES')}
              variant="confirm"
              theme={theme}
            />
            <OutcomeButton
              outcome="NO"
              label={noLabel}
              price={noPrice}
              isSelected={selectedOutcome === 'NO'}
              onClick={() => onSelectOutcome('NO')}
              variant="confirm"
              theme={theme}
            />
          </div>

          {/* Input de valor */}
          <div
            className={`rounded-xl p-4 ${theme === 'dark' ? 'bg-zinc-800/50' : 'bg-zinc-50'
              }`}
          >
            <label
              htmlFor="bet-amount"
              className={`text-xs font-medium mb-2 block ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                }`}
            >
              Reais
            </label>
            <div className="flex items-center gap-2">
              <span
                className={`text-2xl font-bold ${theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'
                  }`}
              >
                R$
              </span>
              <input
                id="bet-amount"
                type="number"
                min="0"
                step="1"
                value={amountReais > 0 ? amountReais : ''}
                onChange={handleAmountChange}
                placeholder="0"
                className={`flex-1 text-2xl font-bold bg-transparent outline-none ${theme === 'dark'
                  ? 'text-white placeholder-zinc-700'
                  : 'text-zinc-900 placeholder-zinc-300'
                  }`}
                aria-label="Valor da aposta em reais"
              />
            </div>
          </div>

          {/* Display de ganho potencial */}
          {calculation && calculation.profitCents > 0 && (
            <div className="text-center py-2">
              <div className="text-xs text-zinc-500 mb-1">Ganho potencial</div>
              <div className="text-lg font-bold text-primary">
                R$ {formatCentsToReais(calculation.profitCents)}{' '}
                <span className="text-sm">
                  ({formatPercentage(calculation.profitPercent)}%)
                </span>
              </div>
            </div>
          )}

          {/* Botão de confirmação */}
          <button
            onClick={onConfirm}
            disabled={amountReais <= 0}
            className={`w-full py-3 rounded-xl text-sm font-bold transition-all ${amountReais > 0
              ? selectedOutcome === 'YES'
                ? 'bg-primary hover:bg-lime-400 text-black shadow-lg shadow-primary/30'
                : 'bg-purple-500 hover:bg-purple-600 text-white shadow-lg shadow-purple-500/30'
              : theme === 'dark'
                ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
              }`}
            aria-label={`Confirmar aposta de R$ ${amountReais}`}
          >
            Comprar
          </button>
        </div>
      )}
    </div>
  );
};
