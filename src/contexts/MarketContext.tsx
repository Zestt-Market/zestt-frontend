"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Market } from '../types';
import { KalshiService, KalshiMarket } from '../services/kalshi.service';

interface MarketContextType {
    markets: Market[];
    selectedMarket: Market | null;
    setSelectedMarket: (market: Market | null) => void;
    isLoading: boolean;
    refreshMarkets: () => Promise<void>;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

// Cache de traduções para evitar chamadas repetidas à API
const translationCache = new Map<string, string>();


// Controle de rate limiting
let lastTranslationTime = 0;
const MIN_TRANSLATION_DELAY = 200; // 200ms entre traduções

/**
 * Traduz texto de inglês para português
 * Usa dicionário local primeiro, depois API com rate limiting
 */
const translateText = async (text: string): Promise<string> => {
    if (!text || text.trim() === '') return text;

    // Verificar cache primeiro
    const cached = translationCache.get(text);
    if (cached) return cached;


    // Rate limiting: aguardar antes de fazer nova chamada à API
    const now = Date.now();
    const timeSinceLastCall = now - lastTranslationTime;
    if (timeSinceLastCall < MIN_TRANSLATION_DELAY) {
        await new Promise(resolve => setTimeout(resolve, MIN_TRANSLATION_DELAY - timeSinceLastCall));
    }

    try {
        lastTranslationTime = Date.now();

        const response = await fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|pt-br`
        );

        // Se rate limited (429), retornar texto original
        if (response.status === 429) {
            console.warn('⚠️ Rate limit atingido, usando texto original:', text);
            translationCache.set(text, text);
            return text;
        }

        const data = await response.json();

        if (data.responseStatus === 200 && data.responseData?.translatedText) {
            const translated = data.responseData.translatedText;
            translationCache.set(text, translated);
            return translated;
        }

        // Fallback: retornar original
        translationCache.set(text, text);
        return text;
    } catch (error) {
        console.warn('⚠️ Erro ao traduzir:', text, error);
        translationCache.set(text, text);
        return text;
    }
};

/**
 * Converte um market do Kalshi para nosso formato interno
 * Agora com tradução dinâmica para português
 */
const convertKalshiMarket = async (kalshiMarket: KalshiMarket): Promise<Market> => {
    // Usar title principal (mais descritivo)
    let question = (kalshiMarket.title || '').trim();

    // Limpar prefixos "yes" e "no"
    question = question.replace(/^(yes |no )/i, '');

    // Se a pergunta tem muitas vírgulas (parlay), pegar apenas as primeiras opções
    const parts = question.split(',');
    if (parts.length > 3) {
        question = parts.slice(0, 3).join(', ') + ` e mais ${parts.length - 3}...`;
    }

    // Limitar tamanho
    if (question.length > 120) {
        question = question.substring(0, 117) + '...';
    }

    // Traduzir a pergunta para português
    question = await translateText(question);

    // Calcular preços (Kalshi retorna em centavos, 0-100)
    let yesPrice = 0.5;

    if (kalshiMarket.yes_ask > 0) {
        yesPrice = kalshiMarket.yes_ask / 100;
    } else if (kalshiMarket.no_ask > 0) {
        yesPrice = 1 - (kalshiMarket.no_ask / 100);
    } else if (kalshiMarket.last_price > 0) {
        yesPrice = kalshiMarket.last_price / 100;
    }

    const noPrice = Number((1 - yesPrice).toFixed(2));

    // Formatar data de expiração
    const endDate = new Date(kalshiMarket.close_time).toLocaleDateString('pt-BR');

    // Formatar labels de forma inteligente
    const getLabels = async () => {
        const yesSubTitle = kalshiMarket.yes_sub_title || '';
        const noSubTitle = kalshiMarket.no_sub_title || '';

        // Se os labels são diferentes, usar eles (traduzidos)
        if (yesSubTitle && noSubTitle && yesSubTitle !== noSubTitle) {
            const cleanLabel = (label: string) => {
                const cleaned = label.split(/[,:]/)[0].trim();
                return cleaned.length > 20 ? cleaned.substring(0, 17) + '...' : cleaned;
            };

            // Traduzir ambos os labels
            const [yesTranslated, noTranslated] = await Promise.all([
                translateText(cleanLabel(yesSubTitle)),
                translateText(cleanLabel(noSubTitle))
            ]);

            return {
                yes: yesTranslated,
                no: noTranslated
            };
        }

        // Caso contrário, usar Sim/Não
        return { yes: 'Sim', no: 'Não' };
    };

    const labels = await getLabels();

    // Traduzir a descrição também
    const description = await translateText(
        kalshiMarket.subtitle || kalshiMarket.title.substring(0, 100)
    );

    // Criar subtítulo contextual baseado nos dados da API do Kalshi
    // CRÍTICO: SEMPRE mostrar contexto quando yes_sub_title != no_sub_title
    let subtitle: string | undefined = undefined;

    // Prioridade 1: usar yes_sub_title se existir (SEMPRE, pois dá contexto essencial)
    if (kalshiMarket.yes_sub_title && kalshiMarket.yes_sub_title.trim() !== '') {
        // Limpar e extrair a parte mais importante
        const cleanSubtitle = kalshiMarket.yes_sub_title.split(/[,]/)[0].trim();
        subtitle = await translateText(cleanSubtitle);
    }
    // Prioridade 2: usar subtitle da API se existir
    else if (kalshiMarket.subtitle && kalshiMarket.subtitle.trim() !== '') {
        subtitle = await translateText(kalshiMarket.subtitle);
    }
    // Prioridade 3: usar no_sub_title se yes_sub_title não existir
    else if (kalshiMarket.no_sub_title && kalshiMarket.no_sub_title.trim() !== '') {
        const cleanSubtitle = kalshiMarket.no_sub_title.split(/[,]/)[0].trim();
        subtitle = await translateText(cleanSubtitle);
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
            value: yesPrice + (Math.random() - 0.5) * 0.05, // Variação pequena para histórico
        })),
        news: [],
    };
};

/**
 * Busca markets ativos do Kalshi de forma diversificada
 * Agora com tradução assíncrona em paralelo
 */
const fetchKalshiMarkets = async (): Promise<Market[]> => {
    try {
        console.log('🔄 Buscando eventos do Kalshi...');

        // Buscar EVENTOS ao invés de markets individuais para ter mais variedade
        const eventsResponse = await KalshiService.getEvents({
            limit: 100,
            status: 'open',
            with_nested_markets: true, // Incluir os markets dentro dos eventos
        });

        if (!eventsResponse || !eventsResponse.events || eventsResponse.events.length === 0) {
            console.warn('⚠️ Nenhum evento retornado da API do Kalshi');
            return [];
        }

        console.log(`✅ ${eventsResponse.events.length} eventos do Kalshi recebidos`);

        const marketPromises: Promise<Market | null>[] = [];

        // Para cada evento, pegar APENAS o primeiro market (mais popular/com mais volume)
        for (const event of eventsResponse.events) {
            if (!event.markets || event.markets.length === 0) continue;

            // Ordenar markets do evento por volume e pegar o primeiro
            const sortedMarkets = [...event.markets].sort((a, b) =>
                (b.volume_24h || b.volume || 0) - (a.volume_24h || a.volume || 0)
            );

            const topMarket = sortedMarkets[0];

            // Validar se tem dados válidos
            if (topMarket.ticker &&
                topMarket.title &&
                (topMarket.yes_ask > 0 || topMarket.no_ask > 0 || topMarket.last_price > 0)) {

                // Criar promise de conversão (com tradução)
                marketPromises.push(
                    convertKalshiMarket(topMarket).catch(error => {
                        console.error('❌ Erro ao converter market:', error);
                        return null;
                    })
                );
            }
        }

        console.log(`⏳ Convertendo e traduzindo ${marketPromises.length} mercados...`);

        // Executar todas as conversões em paralelo
        const allMarkets = (await Promise.all(marketPromises)).filter((m): m is Market => m !== null);

        console.log(`✅ ${allMarkets.length} mercados processados e traduzidos`);

        // Ordenar por volume total
        const sortedMarkets = allMarkets.sort((a, b) => b.volume - a.volume);

        return sortedMarkets;

    } catch (error) {
        console.error('❌ Erro ao buscar mercados do Kalshi:', error);
        return [];
    }
};

export const MarketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [markets, setMarkets] = useState<Market[]>([]);
    const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const refreshMarkets = async () => {
        setIsLoading(true);
        try {
            const kalshiMarkets = await fetchKalshiMarkets();
            console.log(`✅ ${kalshiMarkets.length} mercados do Kalshi carregados`);
            setMarkets(kalshiMarkets);
        } catch (error) {
            console.error('❌ Erro ao atualizar mercados:', error);
            setMarkets([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        let isMounted = true;

        const loadMarkets = async () => {
            setIsLoading(true);
            try {
                const kalshiMarkets = await fetchKalshiMarkets();
                if (isMounted) {
                    console.log(`✅ ${kalshiMarkets.length} mercados do Kalshi carregados`);
                    setMarkets(kalshiMarkets);
                }
            } catch (error) {
                console.error('❌ Erro ao carregar mercados:', error);
                if (isMounted) {
                    setMarkets([]);
                }
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        loadMarkets();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <MarketContext.Provider value={{
            markets,
            selectedMarket,
            setSelectedMarket,
            isLoading,
            refreshMarkets
        }}>
            {children}
        </MarketContext.Provider>
    );
};

export const useMarkets = () => {
    const context = useContext(MarketContext);
    if (context === undefined) {
        throw new Error('useMarkets must be used within a MarketProvider');
    }
    return context;
};
