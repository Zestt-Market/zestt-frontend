'use server';

import { getCategoryBySlug } from "../constants/categories";
import { worldCupMockMarkets } from "../data/worldCupMockData";
import { Market } from "../types";
import { KalshiMarket, KalshiService } from "./kalshi.service";




const convertKalshiMarket = (kalshiMarket: KalshiMarket): Market => {
    let question = (kalshiMarket.title || '').trim();

    question = question.replace(/^(yes |no )/i, '');

    const parts = question.split(',');
    if (parts.length > 3) {
        question = parts.slice(0, 3).join(', ') + ` e mais ${parts.length - 3}...`;
    }

    if (question.length > 120) {
        question = question.substring(0, 117) + '...';
    }

    let yesPrice = 0.5;

    if (kalshiMarket.yes_ask > 0) {
        yesPrice = kalshiMarket.yes_ask / 100;
    } else if (kalshiMarket.no_ask > 0) {
        yesPrice = 1 - (kalshiMarket.no_ask / 100);
    } else if (kalshiMarket.last_price > 0) {
        yesPrice = kalshiMarket.last_price / 100;
    }

    const noPrice = Number((1 - yesPrice).toFixed(2));

    const endDate = new Date(kalshiMarket.close_time).toLocaleDateString('pt-BR');

    const getLabels = () => {
        const yesSubTitle = kalshiMarket.yes_sub_title || '';
        const noSubTitle = kalshiMarket.no_sub_title || '';

        if (yesSubTitle && noSubTitle && yesSubTitle !== noSubTitle) {
            const cleanLabel = (label: string) => {
                const cleaned = label.split(/[,:]/)[0].trim();
                return cleaned.length > 20 ? cleaned.substring(0, 17) + '...' : cleaned;
            };

            return {
                yes: cleanLabel(yesSubTitle),
                no: cleanLabel(noSubTitle)
            };
        }

        return { yes: 'Sim', no: 'Não' };
    };

    const labels = getLabels();

    const description = kalshiMarket.subtitle || kalshiMarket.title.substring(0, 100);

    let subtitle: string | undefined = undefined;

    if (kalshiMarket.yes_sub_title && kalshiMarket.yes_sub_title.trim() !== '') {
        const cleanSubtitle = kalshiMarket.yes_sub_title.split(/[,]/)[0].trim();
        subtitle = cleanSubtitle;
    }
    else if (kalshiMarket.subtitle && kalshiMarket.subtitle.trim() !== '') {
        subtitle = kalshiMarket.subtitle;
    }
    else if (kalshiMarket.no_sub_title && kalshiMarket.no_sub_title.trim() !== '') {
        const cleanSubtitle = kalshiMarket.no_sub_title.split(/[,]/)[0].trim();
        subtitle = cleanSubtitle;
    }

    return {
        id: kalshiMarket.ticker,
        question,
        subtitle,
        category: KalshiService.mapCategory(kalshiMarket.category || 'Other'),
        description,
        endDate,
        image: KalshiService.getImageForCategory(kalshiMarket.category || 'Other'),
        volume: kalshiMarket.volume_24h || kalshiMarket.volume || 0,
        yesPrice,
        noPrice,
        yesLabel: labels.yes,
        noLabel: labels.no,
        priceHistory: Array.from({ length: 24 }, (_, i) => ({
            time: `${i}:00`,
            value: yesPrice + (Math.random() - 0.5) * 0.05,
        })),
        news: [],
    };
};

/**
 * Fetch markets from Kalshi API
 */
const fetchKalshiMarkets = async (): Promise<Market[]> => {
    try {
        const eventsResponse = await KalshiService.getEvents({
            limit: 100,
            status: 'open',
            with_nested_markets: true,
        });

        if (!eventsResponse || !eventsResponse.events || eventsResponse.events.length === 0) {
            return [];
        }

        const markets: Market[] = [];

        for (const event of eventsResponse.events) {
            if (!event.markets || event.markets.length === 0) continue;

            const sortedMarkets = [...event.markets].sort((a, b) =>
                (b.volume_24h || b.volume || 0) - (a.volume_24h || a.volume || 0)
            );

            const topMarket = sortedMarkets[0];

            if (topMarket.ticker &&
                topMarket.title &&
                (topMarket.yes_ask > 0 || topMarket.no_ask > 0 || topMarket.last_price > 0)) {

                try {
                    const converted = convertKalshiMarket(topMarket);
                    markets.push(converted);
                } catch (error) {
                    console.error('Error converting market:', error);
                }
            }
        }

        const sortedMarkets = markets.sort((a, b) => b.volume - a.volume);

        return sortedMarkets;

    } catch (error) {
        console.error('Error fetching Kalshi markets:', error);
        return [];
    }
};

/**
 * Get all markets
 */
export async function getAllMarkets(): Promise<Market[]> {
    return await fetchKalshiMarkets();
}

/**
 * Get markets filtered by category
 */
export async function getMarketsByCategory(slug: string): Promise<Market[]> {
    // Special case for sports/esportes - return World Cup mock data
    if (slug === 'esportes') {
        return worldCupMockMarkets;
    }

    const category = getCategoryBySlug(slug);
    if (!category) return [];

    const allMarkets = await getAllMarkets();

    // If no Kalshi category mapping, return empty
    if (!category.kalshiCategory) return allMarkets;

    // Filter markets by category
    return allMarkets.filter(m => m.category === category.kalshiCategory);
}

/**
 * Get a single market by ID
 */
export async function getMarketById(id: string): Promise<Market | null> {
    // Check World Cup markets first
    const worldCupMarket = worldCupMockMarkets.find(m => m.id === id);
    if (worldCupMarket) return worldCupMarket;

    // Check Kalshi markets
    const allMarkets = await getAllMarkets();
    const market = allMarkets.find(m => m.id === id);

    return market || null;
}
