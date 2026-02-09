import { getMarketsByCategory } from '@/src/services/market.service';
import { getCategoryBySlug, getAllCategorySlugs } from '@/src/constants/categories';
import { CategoryMarketsView } from '@/src/components/CategoryMarketsView';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
    params: {
        slug: string;
    };
}

// Enable ISR
export const revalidate = 60;

export async function generateStaticParams() {
    const slugs = getAllCategorySlugs();
    return slugs.map((slug) => ({
        slug,
    }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = await params;

    console.log('[CategoryPage] Rendering category:', slug);
    console.log('[CategoryPage] API URL:', process.env.NEXT_PUBLIC_API_URL);

    const category = getCategoryBySlug(slug);

    if (!category) {
        console.warn('[CategoryPage] Category not found:', slug);
        notFound();
    }

    console.log('[CategoryPage] Fetching markets for category:', category.label);
    const markets = await getMarketsByCategory(slug);

    console.log('[CategoryPage] Markets fetched:', markets.length);

    return <CategoryMarketsView category={category} markets={markets} />;
}
