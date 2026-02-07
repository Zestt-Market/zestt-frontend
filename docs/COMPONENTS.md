# Zestt Frontend - Componentes e Arquitetura

## 📁 Estrutura do Projeto

### `/app` - Rotas Next.js
Cada pasta representa uma URL da aplicação:

- `/` - Página inicial (todos os mercados)
- `/[slug]` - Páginas de categoria dinâmicas (/crypto, /politica, etc)
- `/portfolio` - Portfólio do usuário
- `/activity` - Histórico de transações
- `/account` - Configurações de conta
- `/settings` - Configurações gerais
- `/support` - Suporte

### `/src` - Código da Aplicação

```
src/
├── components/          # Componentes React reutilizáveis
│   ├── Header/         # Componentes do header (CategoryNav, UserMenu, BalanceDisplay)
│   ├── modals/         # Modais (Betting, Deposit, Withdrawal)
│   ├── auth/           # Componentes de autenticação (futuro)
│   └── UI/             # Utilitários de UI
├── views/              # Componentes de página completa
├── contexts/           # React Context (Auth, Markets, Payments, Theme)
├── hooks/              # Custom hooks (useBalance, useModals)
├── services/           # Chamadas de API
├── constants/          # Constantes (categorias)
└── types.ts            # TypeScript types
```

## 🎯 Componentes Principais

### Navegação
- **UnifiedHeader** - Header principal com navegação
- **CategoryNav** - Barra de categorias
- **UserMenu** - Menu dropdown do usuário
- **BalanceDisplay** - Exibição de saldo

### Mercados
- **CategoryMarketsView** - Lista de mercados por categoria
- **MarketsView** - Todos os mercados
- **MarketCard** - Card individual de mercado
- **FiltersBar** - Filtros de mercados

### Modais
- **BettingModal** - Realizar apostas
- **DepositModal** - Depósitos (PIX/Cartão)
- **WithdrawalModal** - Saques

## 🔧 Hooks Customizados

- `useBalance()` - Gerencia saldo do usuário
- `useModals()` - Controla estado dos modais
- `useTheme()` - Gerencia tema (dark/light)
- `useAuth()` - Autenticação e dados do usuário

## 📝 Convenções de Código

### Imports
Use sempre o alias `@/src`:
```tsx
import { CategoryNav } from '@/src/components/Header/CategoryNav';
```

### Client Components
Componentes com interatividade precisam de `'use client'`:
```tsx
'use client';
import { useState } from 'react';
```

### Server Components
Páginas em `/app` são Server Components por padrão:
```tsx
export default async function Page() {
    const data = await fetchData();
    return <Component data={data} />;
}
```

## 🚀 Próximos Passos

- [ ] Implementar SearchBar component
- [ ] Migrar para shadcn/ui (Fase 5)
- [ ] Adicionar testes unitários
- [ ] Implementar error boundaries
- [ ] Otimizar performance

## 📚 Documentação Completa

Veja os arquivos de documentação:
- `components_documentation.md` - Documentação detalhada de todos os componentes
- `architecture_analysis.md` - Análise completa da arquitetura

## 🔐 Autenticação

**Versão Atual:** Clerk (Google OAuth)
**Futuro:** Email/Password (componentes em `src/components/auth/` reservados)
