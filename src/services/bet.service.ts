import { config } from '@/src/config';

export interface CreateBetPayload {
    userId: string;
    marketTicker: string;
    marketTitle: string;
    marketImage?: string;
    outcome: 'YES' | 'NO';
    side: 'BUY' | 'SELL';
    amountCents: number;
    priceCents: number;
    potentialReturnCents: number;
}

export interface BetResponse {
    id: string;
    userId: string;
    walletId: string;
    marketTicker: string;
    marketTitle: string;
    marketImage?: string | null;
    outcome: 'YES' | 'NO';
    side: 'BUY' | 'SELL';
    status: 'PENDING' | 'WON' | 'LOST' | 'CANCELED' | 'REFUNDED';
    amountCents: number;
    priceCents: number;
    potentialReturnCents: number;
    settledAt?: Date | null;
    profitCents?: number | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface GetUserBetsResponse {
    bets: BetResponse[];
}

export class BetService {
    private static readonly BASE_URL = config.apiUrl;

    static async createBet(payload: CreateBetPayload, token?: string): Promise<BetResponse> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${this.BASE_URL}/api/bets`, {
            method: 'POST',
            headers,
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ error: 'Failed to create bet' }));
            throw new Error(error.error || `Failed to create bet: ${response.status}`);
        }

        return response.json();
    }

    static async getUserBets(userId: string, token?: string): Promise<BetResponse[]> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${this.BASE_URL}/api/bets/user/${userId}`, {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch user bets: ${response.status}`);
        }

        const data: GetUserBetsResponse = await response.json();
        return data.bets;
    }
}
