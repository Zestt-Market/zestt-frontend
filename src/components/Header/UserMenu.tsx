'use client';

import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { useAuth } from '@/src/contexts';
import { useTheme } from '@/src/design-system';

const MENU_ITEMS = [
    { label: 'Conta & Segurança', href: '/account' },
    { label: 'Sua Atividade', href: '/activity' },
    { label: 'Transferências', href: '/transfers' },
    { label: 'Documentos', href: '/documents' },
    { label: 'API Docs', href: '/api-docs' },
    { label: 'Configurações', href: '/settings' },
];

export function UserMenu() {
    const { user, logout } = useAuth();
    const { theme } = useTheme();

    if (!user) return null;

    return (
        <div className="relative group py-4">
            <div className="flex items-center gap-2 cursor-pointer">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-zinc-800 border border-zinc-700">
                    <img
                        src={user.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                        alt="avatar"
                        className="w-full h-full object-cover"
                    />
                </div>
                <ChevronDown size={14} className="text-zinc-500" />
            </div>

            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full -mt-2 w-64 pt-2 hidden group-hover:block z-50">
                <div
                    className={`border rounded-xl shadow-xl overflow-hidden py-2 ${theme === 'dark'
                        ? 'bg-[#1c2127] border-zinc-800'
                        : 'bg-white border-zinc-200'
                        }`}
                >
                    {MENU_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`block w-full text-left px-5 py-3 text-[13px] font-medium transition-colors ${theme === 'dark'
                                ? 'text-zinc-200 hover:bg-white/5'
                                : 'text-zinc-700 hover:bg-zinc-50'
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}

                    <div
                        className={`h-px mx-0 my-1 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-100'
                            }`}
                    ></div>

                    <Link
                        href="/support"
                        className={`block w-full text-left px-5 py-3 text-[13px] font-medium transition-colors ${theme === 'dark'
                            ? 'text-zinc-200 hover:bg-white/5'
                            : 'text-zinc-700 hover:bg-zinc-50'
                            }`}
                    >
                        Zest Suporte
                    </Link>

                    <Link
                        href="/portfolio"
                        className={`block w-full text-left px-5 py-3 text-[13px] font-medium transition-colors ${theme === 'dark'
                            ? 'text-zinc-200 hover:bg-white/5'
                            : 'text-zinc-700 hover:bg-zinc-50'
                            }`}
                    >
                        Meu Portfolio
                    </Link>

                    <div
                        className={`h-px mx-0 my-1 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-100'
                            }`}
                    ></div>

                    <button
                        onClick={logout}
                        className={`w-full text-left px-5 py-3 text-[13px] font-medium transition-colors ${theme === 'dark'
                            ? 'text-zinc-200 hover:bg-white/5'
                            : 'text-zinc-700 hover:bg-zinc-50'
                            }`}
                    >
                        Sair
                    </button>
                </div>
            </div>
        </div>
    );
}
