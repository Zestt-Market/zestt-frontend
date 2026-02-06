/**
 * Teste de exemplo para componente OutcomeButton
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OutcomeButton } from '../OutcomeButton';

describe('OutcomeButton', () => {
  it('deve renderizar botão YES corretamente', () => {
    render(
      <OutcomeButton
        outcome="YES"
        label="Sim"
        price={0.65}
        onClick={() => {}}
        variant="preview"
      />
    );

    // Verifica se o preço está exibido (65 centavos)
    expect(screen.getByText(/R\$ 65/i)).toBeInTheDocument();
  });

  it('deve renderizar botão NO corretamente', () => {
    render(
      <OutcomeButton
        outcome="NO"
        label="Não"
        price={0.35}
        onClick={() => {}}
        variant="preview"
      />
    );

    // Verifica se o preço está exibido (35 centavos)
    expect(screen.getByText(/R\$ 35/i)).toBeInTheDocument();
  });

  it('deve ter aria-label correto', () => {
    render(
      <OutcomeButton
        outcome="YES"
        label="Sim"
        price={0.65}
        onClick={() => {}}
        variant="preview"
      />
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Apostar Sim por R$ 65');
  });

  it('deve aplicar classe correta quando selecionado', () => {
    const { container } = render(
      <OutcomeButton
        outcome="YES"
        label="Sim"
        price={0.65}
        isSelected={true}
        onClick={() => {}}
        variant="confirm"
      />
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-primary');
  });

  it('deve aplicar aria-pressed quando selecionado', () => {
    render(
      <OutcomeButton
        outcome="YES"
        label="Sim"
        price={0.65}
        isSelected={true}
        onClick={() => {}}
        variant="confirm"
      />
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });
});
