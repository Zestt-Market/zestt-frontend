export interface BetCalculation {
  stakeCents: number;
  priceCents: number;
  contracts: number;
  payoutCents: number;
  profitCents: number;
  profitPercent: number;
}


function isValidNumber(value: number): boolean {
  return (
    typeof value === 'number' &&
    !isNaN(value) &&
    isFinite(value) &&
    value >= 0
  );
}

function safeRound(value: number): number {
  if (!isValidNumber(value)) {
    return 0;
  }
  const rounded = Math.round(value);
  return isValidNumber(rounded) ? rounded : 0;
}

export function calculateBetReturns(
  stakeReais: number,
  priceDecimal: number
): BetCalculation {
  if (!isValidNumber(stakeReais) || stakeReais <= 0) {
    return {
      stakeCents: 0,
      priceCents: 0,
      contracts: 0,
      payoutCents: 0,
      profitCents: 0,
      profitPercent: 0,
    };
  }

  if (!isValidNumber(priceDecimal) || priceDecimal <= 0 || priceDecimal > 1) {
    return {
      stakeCents: 0,
      priceCents: 0,
      contracts: 0,
      payoutCents: 0,
      profitCents: 0,
      profitPercent: 0,
    };
  }

  const stakeCents = safeRound(stakeReais * 100);
  const priceCents = safeRound(priceDecimal * 100);

  if (priceCents === 0) {
    return {
      stakeCents,
      priceCents: 0,
      contracts: 0,
      payoutCents: 0,
      profitCents: -stakeCents,
      profitPercent: -100,
    };
  }

  const contracts = stakeCents / priceCents;

  if (!isValidNumber(contracts)) {
    return {
      stakeCents,
      priceCents,
      contracts: 0,
      payoutCents: 0,
      profitCents: -stakeCents,
      profitPercent: -100,
    };
  }

  const payoutCents = safeRound(contracts * 100);

  const profitCents = payoutCents - stakeCents;

  let profitPercent = 0;
  if (stakeCents > 0) {
    profitPercent = (profitCents / stakeCents) * 100;
    if (!isValidNumber(profitPercent)) {
      profitPercent = 0;
    }
  }

  return {
    stakeCents,
    priceCents,
    contracts: isValidNumber(contracts) ? contracts : 0,
    payoutCents,
    profitCents,
    profitPercent,
  };
}
export function centsToReais(cents: number): number {
  if (!isValidNumber(cents)) {
    return 0;
  }
  const reaisInt = Math.floor(cents / 100);
  const centavosRest = cents % 100;
  return reaisInt + (centavosRest / 100);
}

export function formatCentsToReais(cents: number, showDecimals: boolean = false): string {
  if (!isValidNumber(cents)) {
    return showDecimals ? '0,00' : '0';
  }
  const reaisInt = Math.floor(Math.abs(cents) / 100);
  const centavosRest = Math.abs(cents) % 100;
  const signal = cents < 0 ? '-' : '';

  if (showDecimals) {
    const centavosStr = centavosRest < 10 ? `0${centavosRest}` : `${centavosRest}`;
    return `${signal}${reaisInt},${centavosStr}`;
  }

  return `${signal}${reaisInt}`;
}

export function formatPercentage(percent: number, decimals: number = 1): string {
  if (!isValidNumber(percent)) {
    return '0';
  }
  const multiplier = Math.pow(10, decimals);
  const rounded = Math.round(Math.abs(percent) * multiplier);
  const signal = percent < 0 ? '-' : '';

  if (decimals === 0) {
    return `${signal}${rounded}`;
  }

  const intPart = Math.floor(rounded / multiplier);
  const decPart = rounded % multiplier;
  const decStr = decPart.toString().padStart(decimals, '0');

  return `${signal}${intPart},${decStr}`;
}

export function decimalToPercent(decimal: number): number {
  if (!isValidNumber(decimal)) {
    return 0;
  }
  const percent = Math.round(decimal * 100);
  return isValidNumber(percent) ? Math.max(0, Math.min(100, percent)) : 0;
}

export function safeParseFloat(value: string | number): number {
  if (typeof value === 'number') {
    return isValidNumber(value) ? value : 0;
  }

  if (typeof value !== 'string' || value.trim() === '') {
    return 0;
  }

  const parsed = parseFloat(value.replace(',', '.'));
  return isValidNumber(parsed) ? parsed : 0;
}

export function reaisToCents(reais: string | number): number {
  const value = typeof reais === 'string' ? safeParseFloat(reais) : reais;
  if (!isValidNumber(value)) {
    return 0;
  }
  return safeRound(value * 100);
}

export function formatNumber(value: number, decimals: number = 2): string {
  if (!isValidNumber(value)) return '0.00';
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
