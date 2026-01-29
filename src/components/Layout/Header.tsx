import React from 'react';
import { Search, Bell, Menu, ChevronDown, Moon, Sun, TrendingUp } from 'lucide-react';
import { ZestLogo } from '../Brand/ZestLogo';
import { useTheme } from '../../design-system/providers/ThemeProvider';
import { Button } from '../../design-system';
import type { User, ViewState } from '../../types';

interface HeaderProps {
    user: User | null;
    onViewChange: (view: ViewState) => void;
    onUserChange: (user: User | null) => void;
    onDepositClick: () => void;
}

const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(val);
};

export const Header: React.FC<HeaderProps> = ({
    user,
    onViewChange,
    onUserChange,
    onDepositClick
}) => {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <header className="fixed top-0 w-full z-50 border-b border-white/10 transition-colors duration-300 bg-[#010101]">
            {/* Top Row */}
            <div className="container mx-auto px-6 h-20 flex items-center justify-between gap-8">
                <div
                    onClick={() => onViewChange('HOME' as ViewState)}
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
                        onClick={toggleTheme}
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
                        <UserMenu
                            user={user}
                            onViewChange={onViewChange}
                            onUserChange={onUserChange}
                            onDepositClick={onDepositClick}
                            formatCurrency={formatCurrency}
                            theme={theme}
                        />
                    ) : (
                        <GuestActions onUserChange={onUserChange} />
                    )}

                    <button className="md:hidden text-zinc-400 hover:text-primary transition-colors">
                        <Menu size={24} />
                    </button>
                </div>
            </div>

            {/* Navigation */}
            <Navigation onViewChange={onViewChange} />
        </header>
    );
};

const UserMenu: React.FC<{
    user: User;
    onViewChange: (view: ViewState) => void;
    onUserChange: (user: User | null) => void;
    onDepositClick: () => void;
    formatCurrency: (val: number) => string;
    theme: 'dark' | 'light';
}> = ({ user, onViewChange, onUserChange, onDepositClick, formatCurrency, theme }) => {
    return (
        <div className="flex items-center gap-6 group relative">
            <div className="hidden lg:flex items-center gap-6 mr-2">
                <button
                    onClick={() => onViewChange('PORTFOLIO' as ViewState)}
                    className="text-right hover:opacity-80 transition-opacity"
                >
                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider mb-0.5">
                        Portfolio
                    </p>
                    <p className="font-mono font-bold text-sm text-primary">
                        {formatCurrency(user.portfolioValue)}
                    </p>
                </button>
                <div className="text-right">
                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider mb-0.5">
                        Cash
                    </p>
                    <p className="font-mono font-bold text-sm text-primary">
                        {formatCurrency(user.balance)}
                    </p>
                </div>
                <Button
                    onClick={onDepositClick}
                    variant="primary"
                    size="sm"
                    className="shadow-[0_0_10px_rgba(190,242,100,0.2)] hover:shadow-[0_0_15px_rgba(190,242,100,0.4)] hover:scale-105 active:scale-95"
                >
                    Depositar
                </Button>
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
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
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
                            { label: "Conta & Segurança", view: 'ACCOUNT_SECURITY' as ViewState },
                            { label: "Sua Atividade", view: 'ACTIVITY' as ViewState },
                            { label: "Transferências", view: 'TRANSFERS' as ViewState },
                            { label: "Documentos", view: 'DOCUMENTS' as ViewState },
                            { label: "API Docs", view: 'API_DOCS' as ViewState },
                            { label: "Configurações", view: 'SETTINGS' as ViewState },
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

                        <div className={`h-px mx-0 my-1 ${theme === "dark" ? "bg-zinc-800" : "bg-zinc-100"}`}></div>

                        <button
                            onClick={() => onViewChange('SUPPORT' as ViewState)}
                            className={`w-full text-left px-5 py-3 text-[13px] font-medium transition-colors ${theme === "dark" ? "text-zinc-200 hover:bg-white/5" : "text-zinc-700 hover:bg-zinc-50"
                                }`}
                        >
                            Zest Suporte
                        </button>

                        <button
                            onClick={() => onViewChange('PORTFOLIO' as ViewState)}
                            className={`w-full text-left px-5 py-3 text-[13px] font-medium transition-colors ${theme === "dark" ? "text-zinc-200 hover:bg-white/5" : "text-zinc-700 hover:bg-zinc-50"
                                }`}
                        >
                            Meu Portfolio
                        </button>

                        <div className={`h-px mx-0 my-1 ${theme === "dark" ? "bg-zinc-800" : "bg-zinc-100"}`}></div>

                        <button
                            onClick={() => {
                                onUserChange(null);
                                onViewChange('LOGIN' as ViewState);
                            }}
                            className={`w-full text-left px-5 py-3 text-[13px] font-medium transition-colors ${theme === "dark" ? "text-zinc-200 hover:bg-white/5" : "text-zinc-700 hover:bg-zinc-50"
                                }`}
                        >
                            Sair
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const GuestActions: React.FC<{
    onUserChange: (user: User | null) => void;
}> = ({ onUserChange }) => {
    // Mock user para desenvolvimento
    const MOCK_USER = {
        id: "u-1",
        name: "Investidor Z",
        email: "zest@markets.com",
        isAdmin: false,
        balance: 3500.0,
        portfolioValue: 1200.0,
        positions: [],
        tradeHistory: [],
    };

    return (
        <div className="flex items-center gap-4">
            <button
                onClick={() => onUserChange(MOCK_USER)}
                className="text-xs font-bold text-zinc-300 hover:text-white transition-colors tracking-wide"
            >
                Entrar
            </button>
            <Button
                onClick={() => onUserChange(MOCK_USER)}
                variant="primary"
                size="sm"
                className="shadow-[0_0_10px_rgba(190,242,100,0.2)] hover:shadow-[0_0_15px_rgba(190,242,100,0.4)] hover:scale-105 active:scale-95"
            >
                Cadastrar
            </Button>
        </div>
    );
};

const Navigation: React.FC<{
    onViewChange: (view: ViewState) => void;
}> = ({ onViewChange }) => {
    return (
        <div className="border-t border-white/5 bg-[#010101]/50 backdrop-blur-sm">
            <div className="container mx-auto px-6">
                <nav className="flex items-center justify-center gap-8 py-3.5 overflow-x-auto no-scrollbar whitespace-nowrap text-[11px] font-black uppercase tracking-[0.1em] text-zinc-500">
                    <button
                        onClick={() => onViewChange('MARKETS' as ViewState)}
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
                        "Política",
                        "Esportes",
                        "Crypto",
                        "Finanças",
                        "Geopolítica",
                        "Resultados",
                        "Tech",
                        "Cultura",
                        "Mundo",
                        "Economia",
                        "Trump",
                        "Eleições",
                        "Menções",
                    ].map((item) => (
                        <button
                            key={item}
                            onClick={() => onViewChange('MARKETS' as ViewState)}
                            className="hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] transition-all"
                        >
                            {item}
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
    );
};