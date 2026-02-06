// Kalshi API Service
// Baseado na documentação: https://docs.kalshi.com/api-reference/exchange/get-exchange-status

const KALSHI_API_BASE = 'https://api.elections.kalshi.com/trade-api/v2';
const DEMO_API_BASE = 'https://demo-api.kalshi.co/trade-api/v2';

// Use DEMO para testes sem autenticação
const API_BASE = DEMO_API_BASE;

export interface KalshiMarket {
    ticker: string;
    event_ticker: string;
    series_ticker: string;
    title: string;
    subtitle: string;
    yes_sub_title: string;
    no_sub_title: string;
    open_time: string;
    close_time: string;
    expiration_time: string;
    status: 'active' | 'closed' | 'settled' | 'finalized';
    yes_bid: number;
    yes_ask: number;
    no_bid: number;
    no_ask: number;
    last_price: number;
    previous_yes_bid: number;
    previous_yes_ask: number;
    previous_price: number;
    volume: number;
    volume_24h: number;
    liquidity: number;
    open_interest: number;
    result: string;
    can_close_early: boolean;
    expiration_value: string;
    category: string;
    risk_limit_cents: number;
    strike_type: string;
    floor_strike: number;
    cap_strike: number;
    notional_value: number;
    tick_size: number;
    functional_strike: number;
}

export interface KalshiEvent {
    event_ticker: string;
    series_ticker: string;
    sub_title: string;
    title: string;
    mutually_exclusive: boolean;
    category: string;
    strike_date: string;
    markets: KalshiMarket[];
}

export interface KalshiMarketsResponse {
    cursor?: string;
    markets: KalshiMarket[];
}

export interface KalshiEventsResponse {
    cursor?: string;
    events: KalshiEvent[];
}

export class KalshiService {

    /**
     * Get exchange status
     */
    static async getExchangeStatus() {
        try {
            const response = await fetch(`${API_BASE}/exchange/status`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('❌ Kalshi Exchange Status Error:', error);
            return null;
        }
    }

    /**
     * Get markets with filters
     * @param params - Filtros opcionais
     */
    static async getMarkets(params?: {
        limit?: number;
        cursor?: string;
        event_ticker?: string;
        series_ticker?: string;
        status?: 'open' | 'closed' | 'settled' | 'finalized';
        tickers?: string;
        min_close_ts?: number;
        max_close_ts?: number;
    }): Promise<KalshiMarketsResponse | null> {
        try {
            const queryParams = new URLSearchParams();

            if (params?.limit) queryParams.append('limit', params.limit.toString());
            if (params?.cursor) queryParams.append('cursor', params.cursor);
            if (params?.event_ticker) queryParams.append('event_ticker', params.event_ticker);
            if (params?.series_ticker) queryParams.append('series_ticker', params.series_ticker);
            if (params?.status) queryParams.append('status', params.status);
            if (params?.tickers) queryParams.append('tickers', params.tickers);
            if (params?.min_close_ts) queryParams.append('min_close_ts', params.min_close_ts.toString());
            if (params?.max_close_ts) queryParams.append('max_close_ts', params.max_close_ts.toString());

            const url = `${API_BASE}/markets?${queryParams.toString()}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${await response.text()}`);
            }

            const data: KalshiMarketsResponse = await response.json();
            console.log('✅ Kalshi Markets:', data);
            return data;
        } catch (error) {
            console.error('❌ Kalshi Markets Error:', error);
            return null;
        }
    }

    /**
     * Get events with filters
     */
    static async getEvents(params?: {
        limit?: number;
        cursor?: string;
        status?: 'open' | 'active' | 'closed' | 'settled' | 'finalized';
        series_ticker?: string;
        with_nested_markets?: boolean;
    }): Promise<KalshiEventsResponse | null> {
        try {
            const queryParams = new URLSearchParams();

            if (params?.limit) queryParams.append('limit', params.limit.toString());
            if (params?.cursor) queryParams.append('cursor', params.cursor);
            if (params?.status) queryParams.append('status', params.status);
            if (params?.series_ticker) queryParams.append('series_ticker', params.series_ticker);
            if (params?.with_nested_markets) queryParams.append('with_nested_markets', 'true');

            const url = `${API_BASE}/events?${queryParams.toString()}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${await response.text()}`);
            }

            const data: KalshiEventsResponse = await response.json();
            console.log('✅ Kalshi Events:', data);
            return data;
        } catch (error) {
            console.error('❌ Kalshi Events Error:', error);
            return null;
        }
    }

    /**
     * Get a specific market by ticker
     */
    static async getMarket(ticker: string): Promise<KalshiMarket | null> {
        try {
            const response = await fetch(`${API_BASE}/markets/${ticker}`);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${await response.text()}`);
            }

            const data = await response.json();
            console.log('✅ Kalshi Market:', data);
            return data.market;
        } catch (error) {
            console.error('❌ Kalshi Market Error:', error);
            return null;
        }
    }

    /**
     * Get market history/orderbook
     */
    static async getMarketHistory(ticker: string, params?: {
        limit?: number;
        cursor?: string;
        min_ts?: number;
        max_ts?: number;
    }) {
        try {
            const queryParams = new URLSearchParams();

            if (params?.limit) queryParams.append('limit', params.limit.toString());
            if (params?.cursor) queryParams.append('cursor', params.cursor);
            if (params?.min_ts) queryParams.append('min_ts', params.min_ts.toString());
            if (params?.max_ts) queryParams.append('max_ts', params.max_ts.toString());

            const url = `${API_BASE}/markets/${ticker}/history?${queryParams.toString()}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${await response.text()}`);
            }

            const data = await response.json();
            console.log('✅ Kalshi Market History:', data);
            return data;
        } catch (error) {
            console.error('❌ Kalshi Market History Error:', error);
            return null;
        }
    }

    /**
     * Map Kalshi category to our category
     */
    static mapCategory(kalshiCategory: string): "Política" | "Economia" | "Esportes" | "Entretenimento" | "Clima" | "Crypto" {
        const categoryMap: Record<string, "Política" | "Economia" | "Esportes" | "Entretenimento" | "Clima" | "Crypto"> = {
            'Politics': 'Política',
            'Economics': 'Economia',
            'Sports': 'Esportes',
            'Entertainment': 'Entretenimento',
            'Climate': 'Clima',
            'Crypto': 'Crypto',
            'Financial': 'Economia',
            'Technology': 'Entretenimento',
        };

        return categoryMap[kalshiCategory] || 'Entretenimento';
    }

    /**
     * Generate placeholder image based on category
     */
    static getImageForCategory(category: string): string {
        const seed = category.toLowerCase().replace(/\s/g, '');
        return `https://picsum.photos/400/400?random=${seed}`;
    }
}
