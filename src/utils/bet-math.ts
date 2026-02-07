/**
 * Helpers de cálculo financeiro para apostas
 * Todas as unidades são explícitas para evitar confusão
 * Validações robustas estilo Java para prevenir NaN/Infinity
 */

export interface BetCalculation {
  stakeCents: number;
  priceCents: number;
  contracts: number;
  payoutCents: number;
  profitCents: number;
  profitPercent: number;
}

/**
 * Valida se um número é finito e válido
 */
function isValidNumber(value: number): boolean {
  return (
    typeof value === 'number' &&
    !isNaN(value) &&
    isFinite(value) &&
    value >= 0
  );
}

/**
 * Arredonda de forma segura, retornando 0 se inválido
 */
function safeRound(value: number): number {
  if (!isValidNumber(value)) {
    return 0;
  }
  const rounded = Math.round(value);
  return isValidNumber(rounded) ? rounded : 0;
}

/**
 * Calcula retorno e lucro de uma aposta
 * @param stakeReais Valor apostado em reais (deve ser > 0)
 * @param priceDecimal Preço em decimal (0.0 a 1.0, ex: 0.65 = 65%)
 * @returns BetCalculation com valores seguros (nunca NaN/Infinity)
 */
export function calculateBetReturns(
  stakeReais: number,
  priceDecimal: number
): BetCalculation {
  // Validações robustas de entrada
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

  // Conversões seguras para centavos
  const stakeCents = safeRound(stakeReais * 100);
  const priceCents = safeRound(priceDecimal * 100);

  // Proteção contra divisão por zero
  if (priceCents === 0) {
    return {
      stakeCents,
      priceCents: 0,
      contracts: 0,
      payoutCents: 0,
      profitCents: -stakeCents, // Perda total
      profitPercent: -100,
    };
  }

  // Número de contratos que pode comprar
  const contracts = stakeCents / priceCents;

  // Validação extra: contracts deve ser finito
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

  // Payout se ganhar (1 contrato = 100 centavos)
  const payoutCents = safeRound(contracts * 100);

  // Lucro líquido
  const profitCents = payoutCents - stakeCents;

  // Percentual de lucro (com proteção contra divisão por zero)
  let profitPercent = 0;
  if (stakeCents > 0) {
    profitPercent = (profitCents / stakeCents) * 100;
    // Validação final
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

/**
 * Converte centavos para reais (número)
 * Usa divisão inteira para evitar problemas de ponto flutuante
 * @param cents Valor em centavos (inteiro)
 * @returns Valor em reais (número)
 */
export function centsToReais(cents: number): number {
  if (!isValidNumber(cents)) {
    return 0;
  }
  // Divisão inteira: Math.floor para parte inteira, resto para decimais
  const reaisInt = Math.floor(cents / 100);
  const centavosRest = cents % 100;
  return reaisInt + (centavosRest / 100);
}

/**
 * Formata centavos para string em reais (estilo brasileiro)
 * Evita toFixed() usando aritmética de inteiros
 * @param cents Valor em centavos (inteiro)
 * @param showDecimals Se true, mostra centavos (padrão: false)
 * @returns String formatada (ex: "123" ou "123,45")
 */
export function formatCentsToReais(cents: number, showDecimals: boolean = false): string {
  if (!isValidNumber(cents)) {
    return showDecimals ? '0,00' : '0';
  }

  // Aritmética de inteiros para evitar problemas de ponto flutuante
  const reaisInt = Math.floor(Math.abs(cents) / 100);
  const centavosRest = Math.abs(cents) % 100;
  const signal = cents < 0 ? '-' : '';

  if (showDecimals) {
    // Formata centavos com zero à esquerda se necessário
    const centavosStr = centavosRest < 10 ? `0${centavosRest}` : `${centavosRest}`;
    return `${signal}${reaisInt},${centavosStr}`;
  }

  return `${signal}${reaisInt}`;
}

/**
 * Formata percentual de forma robusta
 * @param percent Percentual (ex: 53.846153846)
 * @param decimals Casas decimais (padrão: 1)
 * @returns String formatada (ex: "53,8")
 */
export function formatPercentage(percent: number, decimals: number = 1): string {
  if (!isValidNumber(percent)) {
    return '0';
  }

  // Multiplica por 10^decimals, arredonda, depois divide
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

/**
 * Converte decimal (0-1) para percentual inteiro
 * @param decimal Valor decimal (ex: 0.65)
 * @returns Percentual inteiro (ex: 65)
 */
export function decimalToPercent(decimal: number): number {
  if (!isValidNumber(decimal)) {
    return 0;
  }
  const percent = Math.round(decimal * 100);
  return isValidNumber(percent) ? Math.max(0, Math.min(100, percent)) : 0;
}

/**
 * Converte string para número de forma segura
 * @param value String representando número
 * @returns Número válido ou 0
 */
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

/**
 * Converte reais (string ou número) para centavos (inteiro)
 * @param reais Valor em reais
 * @returns Valor em centavos (inteiro)
 */
export function reaisToCents(reais: string | number): number {
  const value = typeof reais === 'string' ? safeParseFloat(reais) : reais;
  if (!isValidNumber(value)) {
    return 0;
  }
  // Arredonda para evitar problemas de ponto flutuante
  return safeRound(value * 100);
}
