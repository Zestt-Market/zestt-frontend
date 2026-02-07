'use client';

import Link from 'next/link';
import { TrendingUp } from 'lucide-react';
import { CATEGORIES } from '@/src/constants/categories';

export function CategoryNav() {
    return (
        <nav className="flex items-center justify-center gap-8 py-3.5 overflow-x-auto no-scrollbar whitespace-nowrap text-[11px] font-black uppercase tracking-[0.1em] text-zinc-500">
            <Link
                href="/"
                className="flex items-center gap-2 text-white hover:text-primary transition-colors group"
            >
                <TrendingUp
                    size={14}
                    className="text-primary group-hover:drop-shadow-[0_0_8px_rgba(190,242,100,0.8)] transition-all"
                />
                <span className="drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                    Em Alta
                </span>
            </Link>

            <button className="hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] transition-all">
                Novos
            </button>

            <div className="w-px h-3 bg-zinc-800 mx-2"></div>

            {CATEGORIES.map((category) => (
                <Link
                    key={category.slug}
                    href={`/${category.slug}`}
                    className="hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] transition-all"
                >
                    {category.label}
                </Link>
            ))}

            <button
                onClick={() => alert('Ranking em breve')}
                className="flex items-center gap-1.5 hover:text-primary transition-colors ml-2 pl-4 border-l border-zinc-800"
            >
                <span>Ranking</span>
            </button>

            <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </nav>
    );
}
