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
}
