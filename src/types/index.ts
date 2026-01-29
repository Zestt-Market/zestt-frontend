export interface User {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    balance: number;
    portfolioValue: number;
    positions: Position[];
    tradeHistory: Trade[];
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

export interface Market {
    id: string;
    question: string;
    category: "Política" | "Esportes" | "Crypto" | "Economia" | "Clima" | "Entretenimento";
    description: string;
    endDate: string;
    image: string;
    volume: number;
    yesPrice: number;
    noPrice: number;
    yesLabel?: string;
    noLabel?: string;
    priceHistory: Array<{ time: string; value: number }>;
    news: Array<{
        title: string;
        source: string;
        url: string;
        timestamp: string;
    }>;
}

export enum ViewState {
    LOGIN = "LOGIN",
    HOME = "HOME",
    MARKETS = "MARKETS",
    MARKET_DETAIL = "MARKET_DETAIL",
    PORTFOLIO = "PORTFOLIO",
    ACCOUNT_SECURITY = "ACCOUNT_SECURITY",
    ACTIVITY = "ACTIVITY",
    TRANSFERS = "TRANSFERS",
    DOCUMENTS = "DOCUMENTS",
    API_DOCS = "API_DOCS",
    SETTINGS = "SETTINGS",
    SUPPORT = "SUPPORT",
}

export interface BettingModalState {
    market: Market;
    outcome: "YES" | "NO";
}