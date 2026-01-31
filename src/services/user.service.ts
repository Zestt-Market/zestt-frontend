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

    static async syncUser(payload: SyncUserPayload): Promise<SyncUserResponse> {
        const response = await fetch(`${this.BASE_URL}/users/sync`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Failed to sync user: ${response.status}`);
        }

        return response.json();
    }
}
