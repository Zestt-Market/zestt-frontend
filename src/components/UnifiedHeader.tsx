'use client';

import React from 'react';
import Link from 'next/link';
import { Bell, Menu } from 'lucide-react';
import { SignInButton } from '@clerk/nextjs';
import { ZestLogo } from './ZestLogo';
import { useAuth } from '../contexts';
import { useTheme } from '../design-system';
import { CategoryNav } from './Header/CategoryNav';
import { UserMenu } from './Header/UserMenu';
import { BalanceDisplay } from './Header/BalanceDisplay';
import { SearchBar } from './Header/SearchBar';

export const UnifiedHeader: React.FC = () => {
    const { user, login } = useAuth();
    const { theme, setTheme } = useTheme();

    return (
        <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-zinc-800">
            {/* Top Bar */}
            <div className="border-b border-zinc-800">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between gap-6">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
                            <ZestLogo />
                        </Link>

                        {/* Search Bar */}
                        <SearchBar />

                        {/* Right Side */}
                        <div className="flex items-center gap-4 flex-shrink-0">
                            {/* Balance Display */}
                            {user && <BalanceDisplay />}

                            {/* Theme Toggle - Animated Switch */}
                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className={`
                                    relative w-14 h-7 rounded-full transition-colors duration-300
                                    ${theme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-600'}
                                `}
                                aria-label="Toggle theme"
                            >
                                <div className={`
                                    absolute top-0.5 left-0.5 w-6 h-6 rounded-full
                                    bg-white shadow-md
                                    transform transition-transform duration-300 ease-in-out
                                    flex items-center justify-center
                                    ${theme === 'dark' ? 'translate-x-7' : 'translate-x-0'}
                                `}>
                                    {theme === 'dark' ? (
                                        <span className="text-xs">🌙</span>
                                    ) : (
                                        <span className="text-xs">☀️</span>
                                    )}
                                </div>
                            </button>

                            {/* Notifications */}
                            {user && (
                                <button
                                    className="p-2 rounded-lg transition-colors relative hover:bg-zinc-800"
                                    aria-label="Notifications"
                                >
                                    <Bell size={20} className="text-zinc-400" />
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
                                </button>
                            )}

                            {/* User Menu or Login */}
                            {user ? (
                                <UserMenu />
                            ) : (
                                <SignInButton mode="modal">
                                    <button className="px-6 py-2 bg-primary text-black font-bold rounded-lg hover:bg-primary-hover transition-all shadow-[0_0_10px_rgba(190,242,100,0.2)] hover:shadow-[0_0_15px_rgba(190,242,100,0.4)]">
                                        Entrar
                                    </button>
                                </SignInButton>
                            )}

                            {/* Mobile Menu */}
                            <button
                                className="lg:hidden p-2 rounded-lg transition-colors hover:bg-zinc-800"
                                aria-label="Menu"
                            >
                                <Menu size={20} className="text-zinc-400" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Navigation */}
            <CategoryNav />
        </header>
    );
};
