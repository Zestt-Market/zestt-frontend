"use client";

import React from 'react';
import {
    Bell,
    ChevronDown,
    Menu,
    Moon,
    Search,
    Sun,
    TrendingUp,
} from 'lucide-react';
import { ZestLogo } from './ZestLogo';
import { useAuth } from '../contexts';
import { useMarkets } from '../contexts/MarketContext';
import { useTheme } from '../design-system';
import { ViewState } from '../types';
import { usePayments } from '../contexts/PaymentsContext';
import { useRouter } from 'next/navigation';

interface HeaderProps {
    onViewChange: (view: ViewState) => void;
    onDepositClick: () => void;
    onWithdrawClick?: () => void;
}

const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(val);
};

export const Header: React.FC<HeaderProps> = ({
    onViewChange,
    onDepositClick,
}) => {
    const { user, login, logout } = useAuth();
    const { theme, setTheme } = useTheme();
    const { setCategoryFilter } = useMarkets();
    const { balance, getBalance } = usePayments();
    const router = useRouter();
    const [displayBalance, setDisplayBalance] = React.useState({ portfolio: 0, cash: 0 });

    React.useEffect(() => {
        if (user) {
            getBalance('BRL');
        }
    }, [user]);

    React.useEffect(() => {
        console.log('💰 Balance atualizado:', balance);
        if (balance) {
            setDisplayBalance({
                portfolio: balance.balanceCents / 100,
                cash: balance.availableCents / 100
            });
        }
    }, [balance]);

    const handleThemeToggle = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    const handleLogin = () => {
        onViewChange(ViewState.LOGIN);
    };

    const handleLogout = () => {
        logout();
        onViewChange(ViewState.LOGIN);
    };

    return (
        <header className="fixed top-0 w-full z-50 border-b border-white/10 transition-colors duration-300 bg-[#010101]">
            {/* Top Row */}
            <div className="container mx-auto px-6 h-20 flex items-center justify-between gap-8">
                <div
                    onClick={() => onViewChange(ViewState.HOME)}
                    className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                >
                    <ZestLogo />
                </div>

                <div className="flex-1 max-w-3xl relative hidden md:block group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Buscar mercados..."
                        className="w-full h-12 bg-zinc-900/50 border border-zinc-800 rounded-full pl-12 pr-12 text-sm text-zinc-100 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 focus:outline-none transition-all placeholder:text-zinc-600 shadow-inner"
                    />
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-600 text-[10px] font-mono border border-zinc-700 px-1.5 rounded">
                        /
                    </span>
                </div>

                <div className="flex items-center gap-6">
                    <button
                        onClick={handleThemeToggle}
                        className={`
              relative w-16 h-8 rounded-full border-2 transition-all duration-500 overflow-hidden group outline-none focus:ring-2 focus:ring-primary/50
              ${theme === "dark"
                                ? "bg-zinc-950 border-zinc-800 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]"
                                : "bg-zinc-200 border-zinc-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"
                            }
            `}
                    >
                        <div
                            className={`absolute inset-0 transition-opacity duration-500 ${theme === "dark" ? "opacity-100" : "opacity-0"
                                }`}
                        >
                            <div
                                className="absolute top-2 left-3 w-0.5 h-0.5 bg-white rounded-full animate-pulse"
                                style={{ animationDelay: "0s" }}
                            />
                            <div
                                className="absolute bottom-2 left-6 w-0.5 h-0.5 bg-white rounded-full animate-pulse"
                                style={{ animationDelay: "0.5s" }}
                            />
                            <div
                                className="absolute top-3 right-4 w-0.5 h-0.5 bg-white rounded-full animate-pulse"
                                style={{ animationDelay: "1s" }}
                            />
                        </div>

                        <div
                            className={`
                absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full shadow-md transform transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) flex items-center justify-center z-10
                ${theme === "dark"
                                    ? "translate-x-8 bg-zinc-800 border border-zinc-700 shadow-[0_0_8px_rgba(0,0,0,0.5)]"
                                    : "translate-x-1 bg-white border border-zinc-300 shadow-[0_0_4px_rgba(0,0,0,0.1)]"
                                }
              `}
                        >
                            <div className="relative w-full h-full flex items-center justify-center">
                                <Moon
                                    size={12}
                                    className={`absolute transition-all duration-500 text-zinc-300 ${theme === "dark"
                                        ? "scale-100 rotate-0 opacity-100"
                                        : "scale-0 -rotate-90 opacity-0"
                                        }`}
                                    fill="currentColor"
                                />
                                <Sun
                                    size={12}
                                    className={`absolute transition-all duration-500 text-amber-500 ${theme === "light"
                                        ? "scale-100 rotate-0 opacity-100"
                                        : "scale-0 rotate-90 opacity-0"
                                        }`}
                                    fill="currentColor"
                                />
                            </div>
                        </div>
                    </button>

                    <div className="h-6 w-px bg-zinc-800"></div>

                    {user ? (
                        <div className="flex items-center gap-6 group relative">
                            <div className="hidden lg:flex items-center gap-6 mr-2">
                                <button
                                    onClick={() => onViewChange(ViewState.PORTFOLIO)}
                                    className="text-right hover:opacity-80 transition-opacity"
                                >
                                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider mb-0.5">
                                        Portfolio
                                    </p>
                                    <p className="font-mono font-bold text-sm text-primary">
                                        {formatCurrency(displayBalance.portfolio)}
                                    </p>
                                </button>
                                <div className="text-right">
                                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider mb-0.5">
                                        Cash
                                    </p>
                                    <p className="font-mono font-bold text-sm text-primary">
                                        {formatCurrency(displayBalance.cash)}
                                    </p>
                                </div>
                                <button
                                    onClick={onDepositClick}
                                    className="bg-primary hover:bg-lime-400 text-black px-4 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-[0_0_10px_rgba(190,242,100,0.2)] hover:shadow-[0_0_15px_rgba(190,242,100,0.4)] hover:scale-105 active:scale-95"
                                >
                                    Depositar
                                </button>
                            </div>

                            <button
                                className={`relative p-2 rounded-full transition-colors ${theme === "dark"
                                    ? "text-zinc-400 hover:text-white hover:bg-zinc-800"
                                    : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
                                    }`}
                            >
                                <Bell size={20} />
                                <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#010101]"></span>
                            </button>

                            <div className="w-px h-6 bg-zinc-800 mx-1"></div>

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
                                        className={`border rounded-xl shadow-xl overflow-hidden py-2 ${theme === "dark"
                                            ? "bg-[#1c2127] border-zinc-800"
                                            : "bg-white border-zinc-200"
                                            }`}
                                    >
                                        {[
                                            {
                                                label: "Conta & Segurança",
                                                view: ViewState.ACCOUNT_SECURITY,
                                            },
                                            { label: "Sua Atividade", view: ViewState.ACTIVITY },
                                            { label: "Transferências", view: ViewState.TRANSFERS },
                                            { label: "Documentos", view: ViewState.DOCUMENTS },
                                            { label: "API Docs", view: ViewState.API_DOCS },
                                            { label: "Configurações", view: ViewState.SETTINGS },
                                        ].map((item) => (
                                            <button
                                                key={item.label}
                                                onClick={() => onViewChange(item.view)}
                                                className={`w-full text-left px-5 py-3 text-[13px] font-medium transition-colors ${theme === "dark"
                                                    ? "text-zinc-200 hover:bg-white/5"
                                                    : "text-zinc-700 hover:bg-zinc-50"
                                                    }`}
                                            >
                                                {item.label}
                                            </button>
                                        ))}

                                        <div
                                            className={`h-px mx-0 my-1 ${theme === "dark" ? "bg-zinc-800" : "bg-zinc-100"
                                                }`}
                                        ></div>

                                        <button
                                            onClick={() => onViewChange(ViewState.SUPPORT)}
                                            className={`w-full text-left px-5 py-3 text-[13px] font-medium transition-colors ${theme === "dark"
                                                ? "text-zinc-200 hover:bg-white/5"
                                                : "text-zinc-700 hover:bg-zinc-50"
                                                }`}
                                        >
                                            Zest Suporte
                                        </button>

                                        <button
                                            onClick={() => onViewChange(ViewState.PORTFOLIO)}
                                            className={`w-full text-left px-5 py-3 text-[13px] font-medium transition-colors ${theme === "dark"
                                                ? "text-zinc-200 hover:bg-white/5"
                                                : "text-zinc-700 hover:bg-zinc-50"
                                                }`}
                                        >
                                            Meu Portfolio
                                        </button>

                                        <div
                                            className={`h-px mx-0 my-1 ${theme === "dark" ? "bg-zinc-800" : "bg-zinc-100"
                                                }`}
                                        ></div>

                                        <button
                                            onClick={handleLogout}
                                            className={`w-full text-left px-5 py-3 text-[13px] font-medium transition-colors ${theme === "dark"
                                                ? "text-zinc-200 hover:bg-white/5"
                                                : "text-zinc-700 hover:bg-zinc-50"
                                                }`}
                                        >
                                            Sair
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleLogin}
                                className="text-xs font-bold text-zinc-300 hover:text-white transition-colors tracking-wide"
                            >
                                Entrar
                            </button>
                            <button
                                onClick={handleLogin}
                                className="bg-primary hover:bg-lime-400 text-black px-4 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-[0_0_10px_rgba(190,242,100,0.2)] hover:shadow-[0_0_15px_rgba(190,242,100,0.4)] hover:scale-105 active:scale-95"
                            >
                                Cadastrar
                            </button>
                        </div>
                    )}

                    <button className="md:hidden text-zinc-400 hover:text-primary transition-colors">
                        <Menu size={24} />
                    </button>
                </div>
            </div>

            {/* Bottom Row - Navigation */}
            <div className="border-t border-white/5 bg-[#010101]/50 backdrop-blur-sm">
                <div className="container mx-auto px-6">
                    <nav className="flex items-center justify-center gap-8 py-3.5 overflow-x-auto no-scrollbar whitespace-nowrap text-[11px] font-black uppercase tracking-[0.1em] text-zinc-500">
                        <button
                            onClick={() => {
                                setCategoryFilter(null);
                                onViewChange(ViewState.HOME);
                            }}
                            className="flex items-center gap-2 text-white hover:text-primary transition-colors group"
                        >
                            <TrendingUp
                                size={14}
                                className="text-primary group-hover:drop-shadow-[0_0_8px_rgba(190,242,100,0.8)] transition-all"
                            />
                            <span className="drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                                Em Alta
                            </span>
                        </button>
                        {["Novos"].map((item) => (
                            <button
                                key={item}
                                className="hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] transition-all"
                            >
                                {item}
                            </button>
                        ))}
                        <div className="w-px h-3 bg-zinc-800 mx-2"></div>
                        {[
                            { label: "Política", view: ViewState.MARKETS },
                            { label: "Esportes", view: ViewState.MARKETS },
                            { label: "Crypto", view: ViewState.MARKETS },
                            { label: "Finanças", view: ViewState.MARKETS },
                            { label: "Geopolítica", view: ViewState.MARKETS },
                            { label: "Resultados", view: ViewState.MARKETS },
                            { label: "Tech", view: ViewState.MARKETS },
                            { label: "Cultura", view: ViewState.MARKETS },
                            { label: "Mundo", view: ViewState.MARKETS },
                            { label: "Economia", view: ViewState.MARKETS },
                            { label: "Trump", view: ViewState.MARKETS },
                            { label: "Eleições", view: ViewState.MARKETS },
                            { label: "Menções", view: ViewState.MARKETS },
                        ].map((item) => (
                            <button
                                key={item.label}
                                onClick={() => {
                                    if (item.label === 'Esportes') {
                                        router.push('/sports');
                                    } else {
                                        setCategoryFilter(null);
                                        onViewChange(item.view);
                                    }
                                }}
                                className="hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] transition-all"
                            >
                                {item.label}
                            </button>
                        ))}
                        <button
                            onClick={() => alert("Ranking em breve")}
                            className="flex items-center gap-1.5 hover:text-primary transition-colors ml-2 pl-4 border-l border-zinc-800"
                        >
                            <span>Ranking</span>
                        </button>
                    </nav>
                </div>
            </div>

            <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </header>
    );
};