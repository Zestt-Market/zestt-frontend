import { Position } from "./position.interface";
import { Trade } from "./trade.interface";

export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    isAdmin: boolean;
    balance: number;
    portfolioValue: number;
    positions: Position[];
    tradeHistory: Trade[];
}

