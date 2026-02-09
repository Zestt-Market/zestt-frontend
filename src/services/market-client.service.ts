import { config } from '../config';
import { Market } from '../types';

export async function getMarketByIdClient(
    id: string,
    platform: 'polymarket' | 'kalshi' = 'kalshi'
): Promise<Market | undefined> {
    try {
        const endpoint = platform === 'kalshi'
            ? `/v1/kalshi/market/${id}`
            : `/v1/polymarket/market/${id}`;

        const response = await fetch(`${config.apiUrl}${endpoint}`, {
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store',
        });

        if (!response.ok) return undefined;

        const data = await response.json();

        if (platform === 'polymarket') {
            const m = data.market;
            return {
                id: m.marketSlug,
                question: m.title,
                category: 'Outros' as any,
                description: m.description,
                endDate: m.endDate,
                image: m.image,
                volume: m.volume24h || 0,
                yesPrice: data.sideAPrice?.price || 0.5,
                noPrice: data.sideBPrice?.price || 0.5,
                yesLabel: m.sideA?.label || 'Yes',
                noLabel: m.sideB?.label || 'No',
                platform: 'polymarket',
                priceHistory: [],
                news: []
            } as Market;
        }

        const m = data.market;
        const yesPrice = data.price?.yes?.price ?? 0.5;
        const noPrice = data.price?.no?.price ?? 0.5;

        return {
            id: m.marketTicker,
            question: m.title,
            category: 'Outros' as any,
            description: m.subtitle || m.title,
            endDate: m.closeTime ? new Date(m.closeTime * 1000).toLocaleDateString('pt-BR') : '',
            image: '',
            volume: m.volume || 0,
            yesPrice,
            noPrice,
            yesLabel: 'Sim',
            noLabel: 'Não',
            platform: 'kalshi',
            priceHistory: [],
            news: []
        } as Market;
    } catch (error) {
        console.error('Error fetching market:', error);
        return undefined;
    }
}

export function detectPlatformFromId(id: string): 'polymarket' | 'kalshi' {
    if (/^[A-Z]+-/.test(id) || /^[A-Z]+SNBER-\d+$/.test(id)) {
        return 'kalshi';
    }
    return 'polymarket';
}
