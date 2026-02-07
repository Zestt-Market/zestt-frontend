'use client';

import { AccountSecurityView as AccountSecurityViewBase } from '@/src/views/AccountSecurityView';
import { useTheme } from '@/src/design-system';

export default function AccountPage() {
    const { theme } = useTheme();

    return <AccountSecurityViewBase theme={theme} onBack={() => window.history.back()} />;
}
