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
