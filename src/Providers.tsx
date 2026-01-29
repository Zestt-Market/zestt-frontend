"use client";

import { ThemeProvider } from './design-system';
import { AuthProvider, MarketProvider } from './contexts';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="zestt-theme">
            <AuthProvider>
                <MarketProvider>
                    {children}
                </MarketProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}
