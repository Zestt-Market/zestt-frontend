'use client';

import Link from 'next/link';
import { useBalance } from '@/src/hooks/useBalance';

const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(val);
};

export function BalanceDisplay() {
    const { portfolio, cash, isLoading } = useBalance();

    if (isLoading) {
        return (
            <div className="hidden lg:flex items-center gap-6 mr-2">
                <div className="text-right">
                    <div className="h-3 w-16 bg-zinc-800 animate-pulse rounded mb-1"></div>
                    <div className="h-4 w-20 bg-zinc-800 animate-pulse rounded"></div>
                </div>
                <div className="text-right">
                    <div className="h-3 w-16 bg-zinc-800 animate-pulse rounded mb-1"></div>
                    <div className="h-4 w-20 bg-zinc-800 animate-pulse rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="hidden lg:flex items-center gap-6 mr-2">
            <Link
                href="/portfolio"
                className="text-right hover:opacity-80 transition-opacity"
            >
                <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider mb-0.5">
                    Portfolio
                </p>
                <p className="font-mono font-bold text-sm text-primary">
                    {formatCurrency(portfolio)}
                </p>
            </Link>
            <div className="text-right">
                <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider mb-0.5">
                    Cash
                </p>
                <p className="font-mono font-bold text-sm text-primary">
                    {formatCurrency(cash)}
                </p>
            </div>
        </div>
    );
}
