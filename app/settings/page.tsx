'use client';

import { SettingsView as SettingsViewBase } from "@/src/views/SettingsView";
import { useTheme } from '@/src/design-system';

export default function SettingsPage() {
    const { theme, setTheme } = useTheme();

    return (
        <SettingsViewBase
            theme={theme}
            onThemeChange={setTheme}
            onBack={() => window.history.back()}
        />
    );
}
