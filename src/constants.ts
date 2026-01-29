
import { Market } from './types';

// Helper to generate fake chart data
const generateHistory = (startPrice: number) => {
  const data = [];
  let current = startPrice;
  for (let i = 0; i < 24; i++) {
    const change = (Math.random() - 0.5) * 0.1;
    current = Math.max(0.01, Math.min(0.99, current + change));
    data.push({ time: `${i}:00`, value: current });
  }
  return data;
};

export const MOCK_MARKETS: Market[] = [
  // Política
  {
    id: 'pol-1',
    question: 'Lula completa o mandato presidencial até 2026?',
    category: 'Política',
    description: 'Este mercado prevê se Luiz Inácio Lula da Silva permanecerá no cargo de Presidente até o final do mandato.',
    endDate: '2026-12-31',
    image: 'https://picsum.photos/400/400?random=1',
    volume: 1540200,
    yesPrice: 0.82,
    noPrice: 0.18,
    yesLabel: 'Completa',
    noLabel: 'Não completa',
    priceHistory: generateHistory(0.82),
    news: [
      { id: 'n1', date: 'Hoje, 10:30', source: 'Folha', title: 'Aprovação do governo oscila positivamente em nova pesquisa.', url: '#' },
      { id: 'n2', date: 'Ontem, 18:00', source: 'G1', title: 'Centrão negocia novos ministérios em reforma ministerial.', url: '#' },
      { id: 'n3', date: '02/10, 14:15', source: 'Estadão', title: 'Presidente afirma compromisso com meta fiscal.', url: '#' }
    ]
  },
  {
    id: 'pol-2',
    question: 'Tarcísio de Freitas será candidato à presidência em 2026?',
    category: 'Política',
    description: 'Considera-se candidatura oficial registrada no TSE.',
    endDate: '2026-08-15',
    image: 'https://picsum.photos/400/400?random=2',
    volume: 890000,
    yesPrice: 0.65,
    noPrice: 0.35,
    yesLabel: 'Será candidato',
    noLabel: 'Não será',
    priceHistory: generateHistory(0.65),
    news: [
      { id: 'n4', date: 'Hoje, 09:00', source: 'CNN Brasil', title: 'Tarcísio desconversa sobre 2026 em evento em SP.', url: '#' },
      { id: 'n5', date: 'Ontem, 20:00', source: 'O Globo', title: 'Aliados pressionam governador por definição partidária.', url: '#' }
    ]
  },
  // Economia
  {
    id: 'eco-1',
    question: 'Selic terminará 2025 abaixo de 10.0%?',
    category: 'Economia',
    description: 'Baseado na meta oficial do Banco Central do Brasil na última reunião do COPOM de 2025.',
    endDate: '2025-12-31',
    image: 'https://picsum.photos/400/400?random=3',
    volume: 3200000,
    yesPrice: 0.30,
    noPrice: 0.70,
    yesLabel: 'Abaixo de 10%',
    noLabel: '10% ou mais',
    priceHistory: generateHistory(0.30),
    news: [
      { id: 'n6', date: 'Hoje, 08:30', source: 'Valor', title: 'Boletim Focus eleva projeção de inflação para 2025.', url: '#' },
      { id: 'n7', date: 'Ontem, 11:00', source: 'Bloomberg', title: 'Campos Neto sinaliza cautela com cenário fiscal.', url: '#' }
    ]
  },
  {
    id: 'eco-2',
    question: 'Dólar (USD/BRL) ultrapassa R$ 6,00 em 2025?',
    category: 'Economia',
    description: 'Baseado na cotação PTAX de fechamento do Banco Central.',
    endDate: '2025-12-31',
    image: 'https://picsum.photos/400/400?random=4',
    volume: 5600000,
    yesPrice: 0.45,
    noPrice: 0.55,
    yesLabel: 'Ultrapassa R$ 6',
    noLabel: 'Abaixo de R$ 6',
    priceHistory: generateHistory(0.45),
    news: []
  },
  // Esportes
  {
    id: 'sport-1',
    question: 'Flamengo vence a Libertadores 2025?',
    category: 'Esportes',
    description: 'Vencedor oficial da final da Copa Libertadores da América.',
    endDate: '2025-11-30',
    image: 'https://picsum.photos/400/400?random=5',
    volume: 450000,
    yesPrice: 0.15,
    noPrice: 0.85,
    yesLabel: 'Flamengo',
    noLabel: 'Outro time',
    priceHistory: generateHistory(0.15),
    news: [
      { id: 'n8', date: 'Hoje, 12:00', source: 'GE', title: 'Flamengo anuncia novo reforço para o meio-campo.', url: '#' },
      { id: 'n9', date: 'Ontem, 22:00', source: 'ESPN', title: 'Análise: O caminho do Rubro-Negro na fase de grupos.', url: '#' }
    ]
  },
  {
    id: 'sport-2',
    question: 'Brasil vence a próxima Copa do Mundo (2026)?',
    category: 'Esportes',
    description: 'Se a Seleção Brasileira masculina vencer a final.',
    endDate: '2026-07-19',
    image: 'https://picsum.photos/400/400?random=6',
    volume: 2100000,
    yesPrice: 0.20,
    noPrice: 0.80,
    yesLabel: 'Brasil campeão',
    noLabel: 'Outro país',
    priceHistory: generateHistory(0.20),
    news: []
  },
  {
    id: 'sport-3',
    question: 'Neymar joga no Santos em 2025?',
    category: 'Esportes',
    description: 'Contrato assinado e registrado no BID.',
    endDate: '2025-12-31',
    image: 'https://picsum.photos/400/400?random=7',
    volume: 780000,
    yesPrice: 0.75,
    noPrice: 0.25,
    yesLabel: 'Joga no Santos',
    noLabel: 'Outro clube',
    priceHistory: generateHistory(0.75),
    news: []
  },
  // Entretenimento
  {
    id: 'ent-1',
    question: 'Anitta ganha um Grammy (Global) em 2026?',
    category: 'Entretenimento',
    description: 'Qualquer categoria na premiação principal do Grammy Awards.',
    endDate: '2026-02-01',
    image: 'https://picsum.photos/400/400?random=8',
    volume: 120000,
    yesPrice: 0.10,
    noPrice: 0.90,
    yesLabel: 'Ganha Grammy',
    noLabel: 'Não ganha',
    priceHistory: generateHistory(0.10),
    news: []
  },
  {
    id: 'ent-2',
    question: 'Influenciador digital entra no BBB 26 (Camarote)?',
    category: 'Entretenimento',
    description: 'Pelo menos 3 participantes confirmados como Camarote.',
    endDate: '2026-01-20',
    image: 'https://picsum.photos/400/400?random=9',
    volume: 500000,
    yesPrice: 0.98,
    noPrice: 0.02,
    yesLabel: '3+ influencers',
    noLabel: 'Menos de 3',
    priceHistory: generateHistory(0.98),
    news: []
  },
  // Crypto
  {
    id: 'cry-1',
    question: 'Bitcoin atinge $150k em 2025?',
    category: 'Crypto',
    description: 'Preço spot na Binance ultrapassa 150.000 USD.',
    endDate: '2025-12-31',
    image: 'https://picsum.photos/400/400?random=10',
    volume: 8900000,
    yesPrice: 0.33,
    noPrice: 0.67,
    yesLabel: 'Atinge $150k',
    noLabel: 'Abaixo de $150k',
    priceHistory: generateHistory(0.33),
    news: [
      { id: 'n10', date: 'Hoje, 07:00', source: 'CoinDesk', title: 'ETF de Bitcoin registra entrada recorde de capital.', url: '#' },
      { id: 'n11', date: 'Ontem, 16:30', source: 'InfoMoney', title: 'Analistas preveem alta volatilidade com halving.', url: '#' }
    ]
  },
  {
    id: 'cry-2',
    question: 'Brasil aprova lei de CBDC (Drex) oficial?',
    category: 'Crypto',
    description: 'Promulgação de lei específica regulamentando o Real Digital.',
    endDate: '2025-12-31',
    image: 'https://picsum.photos/400/400?random=11',
    volume: 34000,
    yesPrice: 0.55,
    noPrice: 0.45,
    yesLabel: 'Aprova lei',
    noLabel: 'Não aprova',
    priceHistory: generateHistory(0.55),
    news: []
  },
  // Clima
  {
    id: 'clim-1',
    question: 'Rio de Janeiro registra 45°C no Verão 2025?',
    category: 'Clima',
    description: 'Temperatura oficial medida pelo INMET na estação convencional.',
    endDate: '2025-03-20',
    image: 'https://picsum.photos/400/400?random=12',
    volume: 67000,
    yesPrice: 0.40,
    noPrice: 0.60,
    yesLabel: 'Registra 45°C',
    noLabel: 'Abaixo de 45°C',
    priceHistory: generateHistory(0.40),
    news: []
  }
];
