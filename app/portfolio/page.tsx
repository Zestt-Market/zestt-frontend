'use client';

import { PortfolioView as PortfolioViewBase } from '@/src/views/PortfolioView';
import { useAuth } from '@/src/contexts';
import { useTheme } from '@/src/design-system';

export default function PortfolioPage() {
    const { user } = useAuth();
    const { theme } = useTheme();

    if (!user) return null;

    return <PortfolioViewBase user={user} theme={theme} onBack={() => window.history.back()} />;
}
