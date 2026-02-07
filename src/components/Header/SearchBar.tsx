'use client';

import React, { useState } from 'react';
import { Search, Command } from 'lucide-react';
import { useTheme } from '@/src/design-system';

export function SearchBar() {
    const { theme } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="relative flex-1 max-w-xl">
            <div className="relative">
                <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />
                <input
                    type="text"
                    placeholder="Buscar mercados..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="
                        w-full pl-12 pr-20 py-2.5 rounded-lg
                        bg-zinc-900/50 border-zinc-800 text-white placeholder-zinc-500
                        border focus:outline-none focus:ring-2 focus:ring-primary/50
                        transition-all
                    "
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <kbd className="px-2 py-1 text-xs font-mono rounded bg-zinc-800 text-zinc-400">
                        <Command size={10} className="inline" /> K
                    </kbd>
                </div>
            </div>
        </div>
    );
}
