import { describe, it, expect } from 'vitest';
import {
  calculateBetReturns,
  formatCentsToReais,
  decimalToPercent,
  safeParseFloat,
  formatNumber,
} from '../bet-math';

describe('calculateBetReturns', () => {
  it('deve calcular corretamente retornos válidos', () => {
    const result = calculateBetReturns(100, 0.65);

    expect(result.stakeCents).toBe(10000);
    expect(result.priceCents).toBe(65);
    expect(result.contracts).toBeCloseTo(153.85, 2);
    expect(result.payoutCents).toBe(15385);
    expect(result.profitCents).toBe(5385);
    expect(result.profitPercent).toBeCloseTo(53.85, 2);
  });

  it('deve retornar zeros para stake inválido', () => {
    const result = calculateBetReturns(-10, 0.5);

    expect(result.stakeCents).toBe(0);
    expect(result.profitCents).toBe(0);
  });

  it('deve retornar zeros para preço inválido', () => {
    const result = calculateBetReturns(100, 1.5);

    expect(result.stakeCents).toBe(0);
    expect(result.profitCents).toBe(0);
  });

  it('deve proteger contra divisão por zero (price = 0)', () => {
    const result = calculateBetReturns(100, 0);

    // Quando price é 0, a função retorna zeros (entrada inválida)
    expect(result.stakeCents).toBe(0);
    expect(result.priceCents).toBe(0);
    expect(result.contracts).toBe(0);
    expect(result.profitCents).toBe(0);
    expect(result.profitPercent).toBe(0);
  });

  it('deve proteger contra NaN', () => {
    const result = calculateBetReturns(NaN, 0.5);

    expect(result.stakeCents).toBe(0);
    expect(result.profitCents).toBe(0);
  });

  it('deve proteger contra Infinity', () => {
    const result = calculateBetReturns(Infinity, 0.5);

    expect(result.stakeCents).toBe(0);
    expect(result.profitCents).toBe(0);
  });

  it('deve calcular corretamente com preço muito baixo', () => {
    const result = calculateBetReturns(10, 0.01);

    expect(result.stakeCents).toBe(1000);
    expect(result.priceCents).toBe(1);
    expect(result.contracts).toBe(1000);
    expect(result.payoutCents).toBe(100000);
    expect(result.profitCents).toBe(99000);
  });

  it('deve calcular corretamente com preço muito alto', () => {
    const result = calculateBetReturns(10, 0.99);

    expect(result.stakeCents).toBe(1000);
    expect(result.priceCents).toBe(99);
    expect(result.payoutCents).toBeGreaterThan(1000);
  });
});

describe('formatCentsToReais', () => {
  it('deve formatar centavos corretamente', () => {
    expect(formatCentsToReais(10000)).toBe('100');
    expect(formatCentsToReais(5000)).toBe('50');
    expect(formatCentsToReais(0)).toBe('0');
  });

  it('deve proteger contra NaN', () => {
    expect(formatCentsToReais(NaN)).toBe('0');
  });

  it('deve proteger contra Infinity', () => {
    expect(formatCentsToReais(Infinity)).toBe('0');
  });

  it('deve proteger contra valores negativos', () => {
    expect(formatCentsToReais(-1000)).toBe('0');
  });
});

describe('decimalToPercent', () => {
  it('deve converter decimal para percentual', () => {
    expect(decimalToPercent(0.65)).toBe(65);
    expect(decimalToPercent(0.5)).toBe(50);
    expect(decimalToPercent(1)).toBe(100);
    expect(decimalToPercent(0)).toBe(0);
  });

  it('deve limitar percentual entre 0 e 100', () => {
    expect(decimalToPercent(1.5)).toBe(100);
    expect(decimalToPercent(-0.5)).toBe(0);
  });

  it('deve proteger contra NaN', () => {
    expect(decimalToPercent(NaN)).toBe(0);
  });

  it('deve proteger contra Infinity', () => {
    // Infinity não passa em isValidNumber, retorna 0
    expect(decimalToPercent(Infinity)).toBe(0);
  });
});

describe('safeParseFloat', () => {
  it('deve parsear strings válidas', () => {
    expect(safeParseFloat('100')).toBe(100);
    expect(safeParseFloat('50.5')).toBe(50.5);
    expect(safeParseFloat('0')).toBe(0);
  });

  it('deve aceitar números diretamente', () => {
    expect(safeParseFloat(100)).toBe(100);
    expect(safeParseFloat(50.5)).toBe(50.5);
  });

  it('deve converter vírgula para ponto', () => {
    expect(safeParseFloat('100,5')).toBe(100.5);
  });

  it('deve retornar 0 para string vazia', () => {
    expect(safeParseFloat('')).toBe(0);
    expect(safeParseFloat('   ')).toBe(0);
  });

  it('deve proteger contra strings inválidas', () => {
    expect(safeParseFloat('abc')).toBe(0);
    expect(safeParseFloat('infinity')).toBe(0);
  });

  it('deve proteger contra NaN', () => {
    expect(safeParseFloat(NaN)).toBe(0);
  });

  it('deve proteger contra Infinity', () => {
    expect(safeParseFloat(Infinity)).toBe(0);
  });
});