'use client';

import { ActivityView as ActivityViewBase } from '@/src/views/ActivityView';
import { useAuth } from '@/src/contexts';
import { useTheme } from '@/src/design-system';

export default function ActivityPage() {
    const { user } = useAuth();
    const { theme } = useTheme();

    if (!user) return null;

    return <ActivityViewBase user={user} theme={theme} onBack={() => window.history.back()} />;
}
