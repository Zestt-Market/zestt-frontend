export interface Position {
    marketId: string;
    marketQuestion: string;
    side: "YES" | "NO";
    quantity: number;
    avgPrice: number;
    currentPrice: number;
}
