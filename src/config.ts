const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

if (!clerkKey) {
    throw new Error('Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY');
}

export const config = {
    clerkPublishableKey: clerkKey,
    apiUrl,
} as const;
