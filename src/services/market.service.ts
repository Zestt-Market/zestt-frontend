'use server';

import { getCategoryBySlug } from "../constants/categories";
import { worldCupMockMarkets } from "../data/worldCupMockData";
import { Market } from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333';

interface DomeMarket {
    id: string;
    platform: 'polymarket' | 'kalshi';
    title: string;
    description?: string;
    volume24h: number; // Changed from volume to match backend DTO
    volumeTotal: number;
    trendingScore?: number;
    // Polymarket
    sideA?: { id: string; label: string; price: number };
    sideB?: { id: string; label: string; price: number };
    // Kalshi
    yesPrice?: number;
    noPrice?: number;
    tags: string[];
    status: string;
    endDate?: string;
    image?: string;
}

const mapDomeMarketToMarket = (domeMarket: DomeMarket): Market => {
    // Determine prices and labels based on platform
    let yesPrice = 0.5;
    let noPrice = 0.5;
    let yesLabel = 'Sim';
    let noLabel = 'Não';

    if (domeMarket.platform === 'polymarket' && domeMarket.sideA && domeMarket.sideB) {
        yesPrice = domeMarket.sideA.price;
        noPrice = domeMarket.sideB.price;
        yesLabel = domeMarket.sideA.label;
        noLabel = domeMarket.sideB.label;
    } else if (domeMarket.platform === 'kalshi') {
        yesPrice = domeMarket.yesPrice || 0.5;
        noPrice = domeMarket.noPrice || 0.5;
    }

    // Generate specific categories based on tags if available
    let category: Market['category'] = 'Outros' as any;

    // Map tags to frontend categories (simple logic for now)
    const tags = (domeMarket.tags || []).map(t => t.toLowerCase());
    if (tags.some(t => t.includes('politic') || t.includes('election') || t.includes('trump'))) category = 'Política';
    else if (tags.some(t => t.includes('sport') || t.includes('futebol') || t.includes('soccer'))) category = 'Esportes';
    else if (tags.some(t => t.includes('crypto') || t.includes('bitcoin') || t.includes('eth'))) category = 'Crypto';
    else if (tags.some(t => t.includes('econ') || t.includes('fed') || t.includes('rate'))) category = 'Economia';
    else if (tags.some(t => t.includes('entert') || t.includes('pop') || t.includes('music'))) category = 'Entretenimento';
    else if (tags.some(t => t.includes('climate') || t.includes('temp'))) category = 'Clima';

    return {
        id: domeMarket.id,
        question: domeMarket.title,
        subtitle: domeMarket.description ? domeMarket.description.substring(0, 60) + (domeMarket.description.length > 60 ? '...' : '') : undefined,
        category,
        description: domeMarket.description || '',
        endDate: domeMarket.endDate ? new Date(domeMarket.endDate).toLocaleDateString('pt-BR') : '',
        image: domeMarket.image || '/images/placeholder.png', // Fallback image
        volume: domeMarket.volume24h || 0,
        yesPrice,
        noPrice,
        yesLabel,
        noLabel,
        priceHistory: Array.from({ length: 24 }, (_, i) => ({
            time: `${i}:00`,
            value: yesPrice + (Math.random() - 0.5) * 0.05, // Mock history for now
        })),
        news: [],
        platform: domeMarket.platform,
        sideA: domeMarket.sideA,
        sideB: domeMarket.sideB,
    };
};

/**
 * Get unified trending markets from Dome API
 */
export async function getTrendingMarkets(): Promise<Market[]> {
    try {
        console.log('[Market Service] Fetching trending markets from:', `${API_URL}/v1/markets/trending`);

        const response = await fetch(`${API_URL}/v1/markets/trending`, {
            next: { revalidate: 60 }, // ISR: Cache for 60 seconds
        });

        if (!response.ok) {
            console.error('[Market Service] Failed to fetch trending markets:', response.status, response.statusText);
            return [];
        }

        const data = await response.json();

        if (!data.markets || !Array.isArray(data.markets)) {
            console.warn('[Market Service] Invalid data structure received');
            return [];
        }

        return data.markets.map(mapDomeMarketToMarket);
    } catch (error) {
        console.error('Error fetching trending markets:', error);
        return [];
    }
}

/**
 * Get markets filtered by category
 */
export async function getMarketsByCategory(slug: string): Promise<Market[]> {
    // Special case for prioritized categories if needed
    if (slug === 'esportes') {
        const mockSports = worldCupMockMarkets; // Keep mock data for World Cup if needed
        // Ideally fetch from API: /v1/categories/sports/events
    }

    const category = getCategoryBySlug(slug);
    if (!category || !category.domeTag) {
        console.warn('[Market Service] Invalid category slug:', slug);
        return [];
    }

    try {
        console.log('[Market Service] Fetching category markets:', slug, 'tag:', category.domeTag);

        const response = await fetch(`${API_URL}/v1/categories/${category.domeTag}/events`, {
            next: { revalidate: 60 }, // ISR: Cache for 60 seconds
        });

        if (!response.ok) {
            console.error('[Market Service] Failed to fetch category markets:', response.status, response.statusText);
            return [];
        }

        const data = await response.json();
        // The endpoint returns events which contain markets
        // We need to flatten this to a list of markets for the view

        const markets: Market[] = [];

        for (const event of (data.events || [])) {
            if (event.markets) {
                for (const m of event.markets) {
                    // Need to map event market format to DomeMarket format if different
                    // The backend /events endpoint returns Polymarket events structure
                    // We might need to adjust the mapper here or in the backend
                    // For now assuming a compatible structure or simple mapping

                    // NOTE: The current backend /events endpoint returns raw-ish Polymarket data structure
                    // tailored by PolymarketEventDto. We need to map it.

                    markets.push({
                        id: m.marketSlug,
                        question: m.title, // Market title usually
                        category: category.label as any,
                        description: m.description || event.description,
                        endDate: m.endDate,
                        image: event.image,
                        volume: m.volume24h,
                        yesPrice: 0.5, // Price might not be in event list, usually requires separate fetch
                        noPrice: 0.5,
                        // ... defaults
                        platform: 'polymarket', // Events endpoint is currently Polymarket only
                        priceHistory: [],
                        news: []
                    } as Market);
                }
            }
        }

        return markets;
    } catch (error) {
        console.error(`Error fetching category ${slug}:`, error);
        return [];
    }
}

/**
 * Get a single market by ID
 */
export async function getMarketById(id: string, platform: 'polymarket' | 'kalshi' = 'polymarket'): Promise<Market | null> {
    try {
        const endpoint = platform === 'kalshi'
            ? `/v1/kalshi/market/${id}`
            : `/v1/polymarket/market/${id}`;

        const response = await fetch(`${API_URL}${endpoint}`, {
            next: { revalidate: 60 }, // ISR: Cache for 60 seconds
        });

        if (!response.ok) return null;

        const data = await response.json();

        // Map response to Market
        // This depends on the exact return shape of getMarket endpoints

        if (platform === 'polymarket') {
            const m = data.market;
            return {
                id: m.marketSlug,
                question: m.title,
                category: 'Outros' as any,
                description: m.description,
                endDate: m.endDate,
                image: m.image,
                volume: m.volume24h,
                yesPrice: data.sideAPrice?.price || 0.5,
                noPrice: data.sideBPrice?.price || 0.5,
                yesLabel: m.sideA.label,
                noLabel: m.sideB.label,
                platform: 'polymarket',
                priceHistory: [],
                news: []
            } as Market;
        } else {
            const m = data.market;
            return {
                id: m.marketTicker,
                question: m.title,
                category: 'Outros' as any,
                description: m.subtitle,
                endDate: m.closeTime,
                image: '',
                volume: m.volume || 0,
                yesPrice: data.price?.yes?.price && data.price.yes.price <= 1 ? data.price.yes.price : (data.price?.yes?.price || 50) / 100,
                noPrice: data.price?.no?.price && data.price.no.price <= 1 ? data.price.no.price : (data.price?.no?.price || 50) / 100,
                platform: 'kalshi',
                priceHistory: [],
                news: []
            } as Market;
        }

    } catch (error) {
        console.error('Error fetching market by ID:', error);
        return null;
    }
}

/**
 * Compatibility export for existing components
 */
export async function getAllMarkets(): Promise<Market[]> {
    return getTrendingMarkets();
}
