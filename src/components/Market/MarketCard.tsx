import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button, Card } from '../../design-system';
import { useTheme } from '../../design-system/providers/ThemeProvider';
import type { Market } from '../../types';

interface MarketCardProps {
    market: Market;
    index: number;
    onDetailClick: () => void;
    onBetClick: (outcome: "YES" | "NO") => void;
}

export const MarketCard: React.FC<MarketCardProps> = ({
    market,
    index,
    onDetailClick,
    onBetClick,
}) => {
    const { theme } = useTheme();
    const [expandedOutcome, setExpandedOutcome] = useState<"YES" | "NO" | null>(null);
    const [selectedOutcome, setSelectedOutcome] = useState<"YES" | "NO" | null>(null);
    const [amount, setAmount] = useState("");

    const handleOutcomeClick = (e: React.MouseEvent, outcome: "YES" | "NO") => {
        e.stopPropagation();
        setExpandedOutcome(expandedOutcome === outcome ? null : outcome);
        setSelectedOutcome(null);
        setAmount("");
    };

    const handleYesNoClick = (e: React.MouseEvent, outcome: "YES" | "NO") => {
        e.stopPropagation();
        setSelectedOutcome(outcome);
    };

    const handleConfirmBet = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedOutcome && parseFloat(amount) > 0) {
            onBetClick(selectedOutcome);
            setExpandedOutcome(null);
            setSelectedOutcome(null);
            setAmount("");
        }
    };

    const numAmount = parseFloat(amount) || 0;
    const price = selectedOutcome === "YES" ? market.yesPrice : market.noPrice;
    const potentialReturn = numAmount / price;
    const profit = potentialReturn - numAmount;

    return (
        <Card
            variant="default"
            className="animate-enter group relative transition-all"
            style={{ animationDelay: `${index * 0.05}s`, animationFillMode: "both" }}
        >
            {/* Header: Icon + Title */}
            <div className="flex gap-3 items-start mb-4" onClick={onDetailClick}>
                <div
                    className={`w-10 h-10 rounded-md overflow-hidden flex-shrink-0 border ${theme === "dark"
                            ? "bg-zinc-800 border-zinc-700"
                            : "bg-zinc-100 border-zinc-200"
                        }`}
                >
                    <img
                        src={market.image}
                        alt=""
                        className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                    />
                </div>
                <h3
                    className={`text-sm font-bold leading-snug line-clamp-2 transition-all cursor-pointer ${theme === "dark"
                            ? "text-zinc-100 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent group-hover:to-white"
                            : "text-zinc-900"
                        }`}
                >
                    {market.question}
                </h3>
            </div>

            {/* Outcomes */}
            {!expandedOutcome ? (
                <div className="flex flex-col gap-3 mb-4">
                    <OutcomeRow
                        label={market.yesLabel || "Sim"}
                        price={market.yesPrice}
                        onClick={(e) => handleOutcomeClick(e, "YES")}
                    />
                    <OutcomeRow
                        label={market.noLabel || "Não"}
                        price={market.noPrice}
                        onClick={(e) => handleOutcomeClick(e, "NO")}
                    />
                </div>
            ) : (
                <ExpandedOutcome
                    outcome={expandedOutcome}
                    market={market}
                    selectedOutcome={selectedOutcome}
                    amount={amount}
                    onOutcomeSelect={handleYesNoClick}
                    onAmountChange={setAmount}
                    onConfirm={handleConfirmBet}
                    onCollapse={() => {
                        setExpandedOutcome(null);
                        setSelectedOutcome(null);
                        setAmount("");
                    }}
                    profit={profit}
                    numAmount={numAmount}
                />
            )}

            {/* Footer */}
            <div
                className={`flex items-center justify-between mt-auto pt-3 border-t ${theme === "dark" ? "border-zinc-800/50" : "border-zinc-100"
                    }`}
            >
                <div className="flex items-center gap-2 text-[10px] font-medium text-zinc-500">
                    <span>R$ {(market.volume / 1000).toFixed(0)}k</span>
                    <span
                        className={`w-1 h-1 rounded-full ${theme === "dark" ? "bg-zinc-700" : "bg-zinc-300"
                            }`}
                    ></span>
                    <span className="text-zinc-600">Vol.</span>
                </div>
                <button
                    onClick={onDetailClick}
                    title="Adicionar à Lista de espera"
                    className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all group/add ${theme === "dark"
                            ? "border-zinc-700 hover:border-primary text-zinc-600 hover:text-primary hover:bg-primary/10"
                            : "border-zinc-300 hover:border-primary text-zinc-400 hover:text-primary hover:bg-primary/10"
                        }`}
                >
                    <Plus size={16} className="transition-transform group-hover/add:rotate-90" />
                </button>
            </div>
        </Card>
    );
};

const OutcomeRow: React.FC<{
    label: string;
    price: number;
    onClick: (e: React.MouseEvent) => void;
}> = ({ label, price, onClick }) => {
    const { theme } = useTheme();

    return (
        <div
            onClick={onClick}
            className="flex items-center justify-between cursor-pointer group/row transition-all"
        >
            <span className="text-xs font-semibold text-white">{label}</span>
            <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-white">
                    {Math.round(price * 100)}%
                </span>
                <div className="flex items-center gap-1">
                    <div className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded hover:bg-primary/20 transition-colors min-w-[60px] text-center">
                        R$ {(price * 100).toFixed(0)}
                    </div>
                    <div className="px-2 py-1 bg-purple-500/10 text-purple-400 text-[10px] font-bold rounded hover:bg-purple-500/20 transition-colors min-w-[60px] text-center">
                        R$ {((1 - price) * 100).toFixed(0)}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ExpandedOutcome: React.FC<{
    outcome: "YES" | "NO";
    market: Market;
    selectedOutcome: "YES" | "NO" | null;
    amount: string;
    onOutcomeSelect: (e: React.MouseEvent, outcome: "YES" | "NO") => void;
    onAmountChange: (amount: string) => void;
    onConfirm: (e: React.MouseEvent) => void;
    onCollapse: () => void;
    profit: number;
    numAmount: number;
}> = ({
    outcome,
    market,
    selectedOutcome,
    amount,
    onOutcomeSelect,
    onAmountChange,
    onConfirm,
    onCollapse,
    profit,
    numAmount,
}) => {
        const { theme } = useTheme();

        return (
            <div className="mb-4 animate-enter">
                {/* Header */}
                <div
                    onClick={onCollapse}
                    className="flex items-center justify-between mb-3 cursor-pointer hover:opacity-80 transition-opacity"
                >
                    <span className={`text-xs font-semibold ${theme === "dark" ? "text-zinc-400" : "text-zinc-500"}`}>
                        {outcome === "YES" ? market.yesLabel || "Sim" : market.noLabel || "Não"}
                    </span>
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-white">
                            {Math.round((outcome === "YES" ? market.yesPrice : market.noPrice) * 100)}%
                        </span>
                        <span className={`text-xs ${theme === "dark" ? "text-zinc-500" : "text-zinc-400"}`}>↑</span>
                    </div>
                </div>

                {!selectedOutcome ? (
                    <div className="space-y-3">
                        <div className="flex gap-2">
                            <Button
                                onClick={(e) => onOutcomeSelect(e, "YES")}
                                variant="primary"
                                size="md"
                                className="flex-1 py-3 text-sm"
                            >
                                Sim R$ {(market.yesPrice * 100).toFixed(0)}
                            </Button>
                            <Button
                                onClick={(e) => onOutcomeSelect(e, "NO")}
                                variant="secondary"
                                size="md"
                                className="flex-1 py-3 text-sm bg-purple-500/10 text-purple-400 border-purple-500/20 hover:bg-purple-500/20"
                            >
                                Não R$ {(market.noPrice * 100).toFixed(0)}
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-3 animate-enter">
                        {/* Amount Input */}
                        <div className={`rounded-xl p-4 ${theme === "dark" ? "bg-zinc-800/50" : "bg-zinc-50"}`}>
                            <label className={`text-xs font-medium mb-2 block ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
                                Reais
                            </label>
                            <div className="flex items-center gap-2">
                                <span className={`text-2xl font-bold ${theme === "dark" ? "text-zinc-600" : "text-zinc-400"}`}>
                                    R$
                                </span>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => onAmountChange(e.target.value)}
                                    onClick={(e) => e.stopPropagation()}
                                    placeholder="0"
                                    className={`flex-1 text-2xl font-bold bg-transparent outline-none ${theme === "dark"
                                            ? "text-white placeholder-zinc-700"
                                            : "text-zinc-900 placeholder-zinc-300"
                                        }`}
                                />
                            </div>
                        </div>

                        {/* Profit Display */}
                        {numAmount > 0 && (
                            <div className="text-center py-2">
                                <div className="text-xs text-zinc-500 mb-1">Ganho potencial</div>
                                <div className="text-lg font-bold text-primary">
                                    R$ {profit.toFixed(0)} <span className="text-sm">({((profit / numAmount) * 100).toFixed(1)}%)</span>
                                </div>
                            </div>
                        )}

                        {/* Confirm Button */}
                        <Button
                            onClick={onConfirm}
                            disabled={numAmount <= 0}
                            variant={selectedOutcome === "YES" ? "primary" : "secondary"}
                            size="md"
                            className={`w-full py-3 text-sm font-bold ${numAmount > 0
                                    ? selectedOutcome === "YES"
                                        ? "shadow-lg shadow-primary/30"
                                        : "bg-purple-500 hover:bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                                    : ""
                                } ${numAmount <= 0 ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                        >
                            Comprar
                        </Button>
                    </div>
                )}
            </div>
        );
    };