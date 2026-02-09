export interface MarketId {
    id: string;
    platform: 'kalshi' | 'polymarket';
}

export function isValidKalshiTicker(ticker: string): boolean {
    const patterns = [
        /^KX[A-Z]+-\d{2}-[A-Z]+$/,
        /^KX[A-Z]+-\d{2,4}-[A-Z0-9]+$/,
        /^[A-Z]+SNBER-\d{2}$/,
        /^[A-Z]+-\d{2,4}$/,
    ];
    return patterns.some(pattern => pattern.test(ticker));
}

export function parseKalshiTicker(ticker: string) {
    const parts = ticker.split('-');
    return {
        prefix: parts[0],
        year: parts[1],
        identifier: parts[2],
    };
}

export function isLikelyExpiredTicker(ticker: string): boolean {
    const parsed = parseKalshiTicker(ticker);
    if (!parsed.year) return false;

    const currentYear = new Date().getFullYear();
    const tickerYear = parseInt(`20${parsed.year}`);
    if (tickerYear < currentYear) {
        return true;
    }

    // Se contém "DEC" e estamos em janeiro ou depois, pode ter expirado
    if (ticker.includes('DEC') && new Date().getMonth() > 0 && tickerYear <= currentYear) {
        return true;
    }

    return false;
}

/**
 * Formata erro de API para mensagem amigável
 */
export function formatMarketError(error: unknown): string {
    if (error instanceof Error) {
        if (error.message.includes('not found') || error.message.includes('404')) {
            return 'Este mercado não está mais disponível. Por favor, selecione outro mercado da lista.';
        }

        if (error.message.includes('timeout')) {
            return 'A requisição demorou muito. Por favor, tente novamente.';
        }

        if (error.message.includes('Network')) {
            return 'Erro de conexão. Verifique sua internet e tente novamente.';
        }

        return 'Erro ao buscar mercado. Por favor, tente novamente.';
    }

    return 'Erro desconhecido. Por favor, tente novamente.';
}

/**
 * Cache simples em memória para market details
 */
class MarketCache {
    private cache = new Map<string, { data: any; expires: number }>();
    private defaultTTL = 30000; // 30 segundos

    set(key: string, data: any, ttl = this.defaultTTL): void {
        this.cache.set(key, {
            data,
            expires: Date.now() + ttl,
        });
    }

    get(key: string): any | null {
        const cached = this.cache.get(key);

        if (!cached) return null;

        if (cached.expires < Date.now()) {
            this.cache.delete(key);
            return null;
        }

        return cached.data;
    }

    clear(): void {
        this.cache.clear();
    }
}

export const marketCache = new MarketCache();

/**
 * Helper para fazer requisição com cache automático
 */
export async function fetchMarketWithCache<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttl?: number
): Promise<T> {
    const cached = marketCache.get(key);
    if (cached) return cached;

    const data = await fetcher();
    marketCache.set(key, data, ttl);

    return data;
}

/**
 * Exemplo de uso:
 * 
 * ```typescript
 * // Validar ticker antes de usar
 * const ticker = 'KXSB-26-PHI';
 * 
 * if (!isValidKalshiTicker(ticker)) {
 *   console.warn('Ticker inválido');
 * }
 * 
 * if (isLikelyExpiredTicker(ticker)) {
 *   console.warn('Ticker pode estar expirado');
 * }
 * 
 * // Buscar com cache
 * try {
 *   const market = await fetchMarketWithCache(
 *     `kalshi-${ticker}`,
 *     () => api.getKalshiMarket(ticker)
 *   );
 * } catch (error) {
 *   const message = formatMarketError(error);
 *   toast.error(message);
 * }
 * ```
 */
