/**
 * Category Configuration
 * 
 * Centralized category definitions for the Zestt platform.
 * Maps frontend category slugs to Kalshi API categories.
 */

export interface Category {
    slug: string;
    label: string;
    kalshiCategory?: string; // Maps to Kalshi API category
    icon?: string;
    color?: string;
    description?: string;
}

export const CATEGORIES: Category[] = [
    {
        slug: 'politica',
        label: 'Política',
        kalshiCategory: 'Politics',
        description: 'Mercados sobre política nacional e internacional'
    },
    {
        slug: 'esportes',
        label: 'Esportes',
        kalshiCategory: 'Sports',
        description: 'Mercados sobre eventos esportivos e competições'
    },
    {
        slug: 'crypto',
        label: 'Crypto',
        kalshiCategory: 'Crypto',
        description: 'Mercados sobre criptomoedas e blockchain'
    },
    {
        slug: 'financas',
        label: 'Finanças',
        kalshiCategory: 'Finance',
        description: 'Mercados sobre mercados financeiros e economia'
    },
    {
        slug: 'geopolitica',
        label: 'Geopolítica',
        kalshiCategory: 'Geopolitics',
        description: 'Mercados sobre relações internacionais'
    },
    {
        slug: 'tech',
        label: 'Tech',
        kalshiCategory: 'Technology',
        description: 'Mercados sobre tecnologia e inovação'
    },
    {
        slug: 'cultura',
        label: 'Cultura',
        kalshiCategory: 'Culture',
        description: 'Mercados sobre cultura, entretenimento e mídia'
    },
    {
        slug: 'economia',
        label: 'Economia',
        kalshiCategory: 'Economics',
        description: 'Mercados sobre indicadores econômicos'
    },
    {
        slug: 'trump',
        label: 'Trump',
        kalshiCategory: 'Politics',
        description: 'Mercados relacionados a Donald Trump'
    },
    {
        slug: 'eleicoes',
        label: 'Eleições',
        kalshiCategory: 'Politics',
        description: 'Mercados sobre eleições e processos eleitorais'
    },
];

/**
 * Get category by slug
 */
export const getCategoryBySlug = (slug: string): Category | undefined => {
    return CATEGORIES.find(c => c.slug === slug);
};

/**
 * Get category slug from label
 */
export const getCategorySlug = (label: string): string => {
    const category = CATEGORIES.find(c => c.label === label);
    return category?.slug || label.toLowerCase();
};

/**
 * Get all category slugs
 */
export const getAllCategorySlugs = (): string[] => {
    return CATEGORIES.map(c => c.slug);
};
