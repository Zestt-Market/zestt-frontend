"use client";

import { ThemeProvider } from './design-system';
import { AuthProvider, MarketProvider, PaymentsProvider } from './contexts';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="zestt-theme">
            <AuthProvider>
                <MarketProvider>
                    <PaymentsProvider>
                        {children}
                    </PaymentsProvider>
                </MarketProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}
