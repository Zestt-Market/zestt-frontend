"use client";

import React, { useState } from 'react';
import { Header } from './components/Header';
import { ZestLogo } from './components/ZestLogo';
import { BettingModal } from './components/modals/BettingModal';
import { DepositModal } from './components/modals/DepositModal';
import { WithdrawalModal } from './components/modals/WithdrawalModal';
import { HomePage } from './HomePage';
import { MarketDetailPage } from './MarketDetailPage';
import { LoginScreen } from './views/LoginView';
import { PortfolioView } from './views/PortfolioView';
import { AccountSecurityView } from './views/AccountSecurityView';
import { ActivityView } from './views/ActivityView';
import { TransfersView } from './views/TransfersView';
import { DocumentsView } from './views/DocumentsView';
import { ApiDocsView } from './views/ApiDocsView';
import { SettingsView } from './views/SettingsView';
import { SupportView } from './views/SupportView';
import { useAuth, useMarkets } from './contexts';
import { useTheme } from './design-system';
import { ViewState, Market } from './types';

export const AppContainer: React.FC = () => {
    const [view, setView] = useState<ViewState>(ViewState.HOME);
    const [bettingModalId, setBettingModalId] = useState<{
        marketId: string;
        outcome: 'YES' | 'NO';
    } | null>(null);
    const [showDepositModal, setShowDepositModal] = useState(false);
    const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);

    const { user, login, isLoading } = useAuth();
    const { setSelectedMarket, markets } = useMarkets();
    const { theme, setTheme } = useTheme();

    // DEBUG: Track AppContainer renders
    React.useEffect(() => {
        console.log('🏗️ AppContainer RENDERED');
    }, []);

    // DEBUG: Track markets update
    React.useEffect(() => {
        console.log('📈 Markets UPDATED in AppContainer');
    }, [markets]);

    const handleMarketClick = React.useCallback((marketId: string) => {
        const market = markets.find(m => m.id === marketId);
        if (market) {
            setSelectedMarket(market);
            setView(ViewState.MARKET_DETAIL);
        }
    }, [markets, setSelectedMarket]);

    const handleBetClick = React.useCallback((marketId: string, outcome: 'YES' | 'NO') => {
        setBettingModalId({ marketId, outcome });
    }, []);

    return (
        <div
            className={`min-h-screen font-sans selection:bg-primary/30 transition-colors duration-300 ${theme === 'dark' ? 'bg-[#09090b] text-zinc-100' : 'bg-zinc-50 text-zinc-900'
                }`}
        >
            {/* Mostrar Header apenas se logado */}
            {user && (
                <Header
                    onViewChange={setView}
                    onDepositClick={() => setShowDepositModal(true)}
                    onWithdrawClick={() => setShowWithdrawalModal(true)}
                />
            )}

            <main className={user ? "pt-36" : ""}>
                {/* Loading durante autenticação */}
                {isLoading ? (
                    <div className="min-h-screen flex items-center justify-center">
                        <div className="text-center">
                            <ZestLogo />
                            <p className="mt-4 text-zinc-400 animate-pulse">Carregando...</p>
                        </div>
                    </div>
                ) : !user ? (
                    /* Se não estiver logado E não estiver carregando, mostrar tela de LOGIN */
                    <LoginScreen />
                ) : (
                    <>
                        {view === ViewState.HOME && (
                            <HomePage onMarketClick={handleMarketClick} onBetClick={handleBetClick} />
                        )}

                        {view === ViewState.MARKET_DETAIL && (
                            <MarketDetailPage
                                onBack={() => setView(ViewState.HOME)}
                                onBetClick={handleBetClick}
                            />
                        )}

                        {view === ViewState.PORTFOLIO && user && (
                            <PortfolioView user={user} theme={theme} onBack={() => setView(ViewState.HOME)} />
                        )}

                        {view === ViewState.ACCOUNT_SECURITY && (
                            <AccountSecurityView theme={theme} onBack={() => setView(ViewState.HOME)} />
                        )}

                        {view === ViewState.ACTIVITY && user && (
                            <ActivityView user={user} theme={theme} onBack={() => setView(ViewState.HOME)} />
                        )}

                        {view === ViewState.TRANSFERS && (
                            <TransfersView theme={theme} onBack={() => setView(ViewState.HOME)} />
                        )}

                        {view === ViewState.DOCUMENTS && (
                            <DocumentsView theme={theme} onBack={() => setView(ViewState.HOME)} />
                        )}

                        {view === ViewState.API_DOCS && (
                            <ApiDocsView theme={theme} onBack={() => setView(ViewState.HOME)} />
                        )}

                        {view === ViewState.SETTINGS && (
                            <SettingsView
                                theme={theme}
                                onThemeChange={setTheme}
                                onBack={() => setView(ViewState.HOME)}
                            />
                        )}

                        {view === ViewState.SUPPORT && (
                            <SupportView theme={theme} onBack={() => setView(ViewState.HOME)} />
                        )}
                    </>
                )}
            </main>

            <footer className="mt-32 border-t border-zinc-900 bg-black py-24">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-16">
                    <div>
                        <ZestLogo />
                    </div>
                    <div className="flex flex-wrap justify-center gap-12 text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">
                        <a href="#" className="hover:text-primary transition-colors">
                            Termos de Uso
                        </a>
                        <a href="#" className="hover:text-primary transition-colors">
                            Privacidade
                        </a>
                        <a href="#" className="hover:text-primary transition-colors">
                            API Docs
                        </a>
                        <a href="#" className="hover:text-primary transition-colors">
                            Suporte
                        </a>
                    </div>
                    <div className="text-center md:text-right">
                        <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                            © 2025 ZEST Markets Brasil.
                        </p>
                        <p className="text-[9px] text-zinc-800 uppercase mt-1">
                            Sua dose diária de mercados reais.
                        </p>
                    </div>
                </div>
            </footer>

            {/* Betting Modal */}
            {bettingModalId && markets.find(m => m.id === bettingModalId.marketId) && (
                <BettingModal
                    market={markets.find(m => m.id === bettingModalId.marketId)!}
                    outcome={bettingModalId.outcome}
                    onClose={() => setBettingModalId(null)}
                    theme={theme}
                />
            )}

            {/* Deposit Modal */}
            {showDepositModal && (
                <DepositModal
                    onClose={() => setShowDepositModal(false)}
                    onSuccess={() => {
                        setShowDepositModal(false);
                        // TODO: Atualizar saldo no AuthContext
                    }}
                    theme={theme}
                />
            )}

            {/* Withdrawal Modal */}
            {showWithdrawalModal && (
                <WithdrawalModal
                    onClose={() => setShowWithdrawalModal(false)}
                    onSuccess={() => {
                        setShowWithdrawalModal(false);
                        // TODO: Atualizar saldo no AuthContext
                    }}
                    theme={theme}
                />
            )}
        </div>
    );
};