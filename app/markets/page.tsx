import { getAllMarkets } from '@/src/services/market.service';
import { MarketsView } from '@/src/components/MarketsView';

export default async function MarketsPage() {
    const markets = await getAllMarkets();

    return <MarketsView markets={markets} />;
}
