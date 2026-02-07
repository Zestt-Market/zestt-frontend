'use client';

import { SupportView as SupportViewBase } from "@/src/views/SupportView";
import { useTheme } from '@/src/design-system';

export default function SupportPage() {
    const { theme } = useTheme();

    return <SupportViewBase theme={theme} onBack={() => window.history.back()} />;
}
