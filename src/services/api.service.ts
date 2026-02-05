import { config } from '../config';

export class ApiService {
    private static baseUrl = config.apiUrl;

    static async checkHealth() {
        try {
            const response = await fetch(`${this.baseUrl}/health`);
            const data = await response.json();
            console.log('✅ Backend Health:', data);
            return data;
        } catch (error) {
            console.error('❌ Backend Error:', error);
            return null;
        }
    }

    static async getProtected(token: string) {
        try {
            const response = await fetch(`${this.baseUrl}/protected`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log('✅ Protected Route:', data);
            return data;
        } catch (error) {
            console.error('❌ Protected Route Error:', error);
            return null;
        }
    }

    static async getKalshiMarkets(params?: { limit?: number; status?: string; series_ticker?: string }) {
        try {
            const queryParams = new URLSearchParams();
            if (params?.limit) queryParams.append('limit', params.limit.toString());
            if (params?.status) queryParams.append('status', params.status);
            if (params?.series_ticker) queryParams.append('series_ticker', params.series_ticker);

            const url = `${this.baseUrl}/kalshi/markets${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Kalshi API error: ${response.status}`);
            }

            const data = await response.json();
            console.log('✅ Kalshi Markets:', data);
            return data;
        } catch (error) {
            console.error('❌ Kalshi Markets Error:', error);
            return null;
        }
    }
}

