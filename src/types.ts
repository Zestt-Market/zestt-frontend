export interface NewsItem {
  id: string;
  date: string;
  source: string;
  title: string;
  url?: string;
}

export interface Market {
  id: string;
  question: string;
  subtitle?: string; // Subtítulo contextual (ex: "More than $80", "Team A wins", etc)
  category:
  | "Política"
  | "Economia"
  | "Esportes"
  | "Entretenimento"
  | "Clima"
  | "Crypto";
  description: string;
  endDate: string;
  image: string;
  volume: number;
  yesPrice: number; // 0.01 to 0.99
  noPrice: number;
  yesLabel?: string; // Label customizado para "Sim" (ex: "Villarreal", "Yes", etc)
  noLabel?: string; // Label customizado para "Não" (ex: "Levante", "No", etc)
  priceHistory: { time: string; value: number }[]; // For chart
  news: NewsItem[]; // Novo campo
}

export interface Position {
  marketId: string;
  marketQuestion: string;
  side: "YES" | "NO";
  quantity: number;
  avgPrice: number;
  currentPrice: number;
}

export interface Trade {
  id: string;
  date: string;
  marketQuestion: string;
  side: "YES" | "NO";
  quantity: number;
  price: number;
  totalValue: number;
  action: "BUY" | "SELL";
}

export interface User {
  id: string;
  email: string;
  avatarUrl?: string;
  isAdmin: boolean;
  balance: number;
  portfolioValue: number;
  name: string;
  positions: Position[];
  tradeHistory: Trade[];
}

export interface Order {
  side: "YES" | "NO";
  quantity: number;
  price: number;
}

export interface BettingModalState {
  marketId: string;
  outcome: 'YES' | 'NO';
}

export interface AdminStats {
  totalUsers: number;
  totalDeposited: number;
  totalVolume: number;
  activeMarkets: number;
}

export enum ViewState {
  HOME = "HOME",
  MARKETS = "MARKETS",
  MARKET_DETAIL = "MARKET_DETAIL",
  PORTFOLIO = "PORTFOLIO",
  DEPOSIT = "DEPOSIT",
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  ADMIN = "ADMIN",
  ACCOUNT_SECURITY = "ACCOUNT_SECURITY",
  ACTIVITY = "ACTIVITY",
  TRANSFERS = "TRANSFERS",
  DOCUMENTS = "DOCUMENTS",
  API_DOCS = "API_DOCS",
  SETTINGS = "SETTINGS",
  SUPPORT = "SUPPORT",
}
