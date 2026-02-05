/**
 * Hook para gerenciar fluxo de aposta com máquina de estados
 * Evita null spaghetti e transições inválidas
 */

import { useReducer, useCallback } from 'react';
import { safeParseFloat } from '../utils/bet-math';

export type BetStep = 'collapsed' | 'chooseSide' | 'amount' | 'confirm';
export type Outcome = 'YES' | 'NO';

interface BetState {
  step: BetStep;
  expandedOutcome: Outcome | null;
  selectedOutcome: Outcome | null;
  amountReais: number;
}

type BetAction =
  | { type: 'EXPAND_OUTCOME'; outcome: Outcome }
  | { type: 'SELECT_OUTCOME'; outcome: Outcome }
  | { type: 'SET_AMOUNT'; amount: number }
  | { type: 'COLLAPSE' }
  | { type: 'CONFIRM' }
  | { type: 'RESET' };

const initialState: BetState = {
  step: 'collapsed',
  expandedOutcome: null,
  selectedOutcome: null,
  amountReais: 0,
};

function betFlowReducer(state: BetState, action: BetAction): BetState {
  switch (action.type) {
    case 'EXPAND_OUTCOME':
      return {
        ...initialState,
        step: 'chooseSide',
        expandedOutcome: action.outcome,
      };

    case 'SELECT_OUTCOME':
      // Só pode selecionar se já expandiu
      if (state.step !== 'chooseSide') return state;
      return {
        ...state,
        step: 'amount',
        selectedOutcome: action.outcome,
      };

    case 'SET_AMOUNT':
      // Só pode definir valor se já selecionou outcome
      if (state.step !== 'amount' && state.step !== 'confirm') return state;
      
      // Validação robusta do valor
      const validAmount = Math.max(0, action.amount);
      const isFiniteAmount = isFinite(validAmount) && !isNaN(validAmount);
      const finalAmount = isFiniteAmount ? validAmount : 0;
      
      return {
        ...state,
        step: finalAmount > 0 ? 'confirm' : 'amount',
        amountReais: finalAmount,
      };

    case 'COLLAPSE':
      return initialState;

    case 'CONFIRM':
      // Só pode confirmar se tiver valor válido
      if (state.step !== 'confirm' || state.amountReais <= 0) return state;
      // Estado de confirmação (pode fazer loading aqui)
      return state;

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

export function useBetFlow() {
  const [state, dispatch] = useReducer(betFlowReducer, initialState);

  const expandOutcome = useCallback((outcome: Outcome) => {
    dispatch({ type: 'EXPAND_OUTCOME', outcome });
  }, []);

  const selectOutcome = useCallback((outcome: Outcome) => {
    dispatch({ type: 'SELECT_OUTCOME', outcome });
  }, []);

  const setAmount = useCallback((amount: number | string) => {
    // Parse seguro do valor
    const parsedAmount = typeof amount === 'string' ? safeParseFloat(amount) : amount;
    dispatch({ type: 'SET_AMOUNT', amount: parsedAmount });
  }, []);

  const collapse = useCallback(() => {
    dispatch({ type: 'COLLAPSE' });
  }, []);

  const confirm = useCallback(() => {
    dispatch({ type: 'CONFIRM' });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  return {
    state,
    expandOutcome,
    selectOutcome,
    setAmount,
    collapse,
    confirm,
    reset,
  };
}
