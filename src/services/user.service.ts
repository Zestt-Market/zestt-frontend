import { config } from '@/src/config';

interface SyncUserPayload {
    clerkUserId: string;
    email: string;
    displayName: string;
    avatarUrl?: string;
}

interface SyncUserResponse {
    id: string;
    clerkUserId: string;
    email: string;
    displayName: string;
}

export class UserService {
    private static readonly BASE_URL = config.apiUrl;

    static async syncUser(payload: SyncUserPayload, token?: string): Promise<SyncUserResponse> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${this.BASE_URL}/users/sync`, {
            method: 'POST',
            headers,
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Failed to sync user: ${response.status}`);
        }

        return response.json();
    }
}
