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
    const category = getCategoryBySlug(slug);

    if (!category) {
        notFound();
    }

    const markets = await getMarketsByCategory(slug);

    return <CategoryMarketsView category={category} markets={markets} />;
}
