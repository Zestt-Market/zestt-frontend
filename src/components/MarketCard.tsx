"use client";

import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import QRCode from 'qrcode';
import type { Market } from '../types';

interface MarketCardProps {
    market: Market;
    index: number;
    onDetailClick: () => void;
    onBetClick: (outcome: "YES" | "NO") => void;
    theme?: "dark" | "light";
}

export const MarketCard: React.FC<MarketCardProps> = ({
    market,
    index,
    onDetailClick,
    onBetClick,
    theme = "dark",
}) => {
    const [expandedOutcome, setExpandedOutcome] = useState<"YES" | "NO" | null>(null);
    const [selectedOutcome, setSelectedOutcome] = useState<"YES" | "NO" | null>(null);
    const [amount, setAmount] = useState("");
    const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
    const [generatingQr, setGeneratingQr] = useState(false);

    const handleOutcomeClick = (e: React.MouseEvent, outcome: "YES" | "NO") => {
        e.stopPropagation();
        setExpandedOutcome(outcome);
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
        <div
            className={`animate-enter group relative flex flex-col border rounded-xl overflow-hidden transition-all p-4 ${theme === "dark"
                ? "bg-zinc-900 border-zinc-800"
                : "bg-white border-zinc-200 shadow-sm"
                }`}
            style={{ animationDelay: `${index * 0.05}s`, animationFillMode: "both" }}
        >
            {/* Header: Icon + Title */}
            <div className="flex gap-3 items-start mb-4">
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
                <div className="flex-1">
                    <h3
                        onClick={onDetailClick}
                        className={`text-sm font-bold leading-snug line-clamp-2 transition-all cursor-pointer ${theme === "dark"
                            ? "text-zinc-100 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent group-hover:to-white"
                            : "text-zinc-900"
                            }`}
                    >
                        {market.question}
                    </h3>
                    {market.subtitle && (
                        <p className={`text-xs mt-1 font-medium ${theme === "dark"
                            ? "text-emerald-400"
                            : "text-emerald-600"
                            }`}>
                            {market.subtitle}
                        </p>
                    )}
                </div>
            </div>

            {/* Outcomes Rows */}
            {!expandedOutcome ? (
                // Initial state: Show both outcomes
                <div className="flex flex-col gap-3 mb-4">
                    {/* Yes Row */}
                    <div
                        onClick={(e) => handleOutcomeClick(e, "YES")}
                        className="flex items-center justify-between cursor-pointer group/row transition-all"
                    >
                        <span className="text-xs font-semibold text-white">
                            {market.yesLabel || "Sim"}
                        </span>
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-white">
                                {Math.round(market.yesPrice * 100)}%
                            </span>
                            <div className="flex items-center gap-1">
                                <div className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded hover:bg-primary/20 transition-colors min-w-[60px] text-center">
                                    R$ {(market.yesPrice * 100).toFixed(0)}
                                </div>
                                <div className="px-2 py-1 bg-purple-500/10 text-purple-400 text-[10px] font-bold rounded hover:bg-purple-500/20 transition-colors min-w-[60px] text-center">
                                    R$ {(market.noPrice * 100).toFixed(0)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* No Row */}
                    <div
                        onClick={(e) => handleOutcomeClick(e, "NO")}
                        className="flex items-center justify-between cursor-pointer group/row transition-all"
                    >
                        <span className="text-xs font-semibold text-white">
                            {market.noLabel || "Não"}
                        </span>
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-white">
                                {Math.round(market.noPrice * 100)}%
                            </span>
                            <div className="flex items-center gap-1">
                                <div className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded hover:bg-primary/20 transition-colors min-w-[60px] text-center">
                                    R$ {(market.yesPrice * 100).toFixed(0)}
                                </div>
                                <div className="px-2 py-1 bg-purple-500/10 text-purple-400 text-[10px] font-bold rounded hover:bg-purple-500/20 transition-colors min-w-[60px] text-center">
                                    R$ {(market.noPrice * 100).toFixed(0)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // Expanded state: Show only selected outcome with Yes/No buttons
                <div className="mb-4">
                    {/* Selected Outcome Header */}
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            setExpandedOutcome(null);
                            setSelectedOutcome(null);
                            setAmount("");
                        }}
                        className="flex items-center justify-between mb-3 cursor-pointer hover:opacity-80 transition-opacity"
                    >
                        <span
                            className={`text-xs font-semibold ${theme === "dark" ? "text-zinc-400" : "text-zinc-500"
                                }`}
                        >
                            {expandedOutcome === "YES"
                                ? market.yesLabel || "Sim"
                                : market.noLabel || "Não"}
                        </span>
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-white">
                                {Math.round(
                                    (expandedOutcome === "YES" ? market.yesPrice : market.noPrice) * 100
                                )}%
                            </span>
                            <span
                                className={`text-xs ${theme === "dark" ? "text-zinc-500" : "text-zinc-400"
                                    }`}
                            >
                                ↑
                            </span>
                        </div>
                    </div>


                    {!selectedOutcome ? (
                        // Step 2: Yes/No Button Selection
                        <div className="space-y-3">
                            <button
                                onClick={(e) => handleYesNoClick(e, "YES")}
                                className="w-full py-3 px-4 rounded-xl font-bold transition-all bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20"
                            >
                                <div className="text-sm">Sim R$ {(market.yesPrice * 100).toFixed(0)}</div>
                            </button>
                            <button
                                onClick={(e) => handleYesNoClick(e, "NO")}
                                className="w-full py-3 px-4 rounded-xl font-bold transition-all bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20"
                            >
                                <div className="text-sm">Não R$ {(market.noPrice * 100).toFixed(0)}</div>
                            </button>
                        </div>
                    ) : (
                        // Step 3: Amount Input
                        <div className="space-y-3">
                            {/* Selected Outcome Display */}
                            <div className="flex gap-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedOutcome("YES");
                                    }}
                                    className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all ${selectedOutcome === "YES"
                                        ? "bg-primary text-black border-2 border-primary"
                                        : "bg-primary/10 text-primary/40 border border-primary/20 hover:bg-primary/20"
                                        }`}
                                >
                                    <div className="text-sm">Sim R$ {(market.yesPrice * 100).toFixed(0)}</div>
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedOutcome("NO");
                                    }}
                                    className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all ${selectedOutcome === "NO"
                                        ? "bg-purple-500 text-white border-2 border-purple-400"
                                        : "bg-purple-500/10 text-purple-400/40 border border-purple-500/20 hover:bg-purple-500/20"
                                        }`}
                                >
                                    <div className="text-sm">Não R$ {(market.noPrice * 100).toFixed(0)}</div>
                                </button>
                            </div>

                            {/* Amount Input */}
                            <div
                                className={`rounded-xl p-4 ${theme === "dark" ? "bg-zinc-800/50" : "bg-zinc-50"
                                    }`}
                            >
                                <label
                                    className={`text-xs font-medium mb-2 block ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                                        }`}
                                >
                                    Reais
                                </label>
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`text-2xl font-bold ${theme === "dark" ? "text-zinc-600" : "text-zinc-400"
                                            }`}
                                    >
                                        R$
                                    </span>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
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
                                        R$ {profit.toFixed(0)}{" "}
                                        <span className="text-sm">({((profit / numAmount) * 100).toFixed(1)}%)</span>
                                    </div>
                                </div>
                            )}

                            {/* Confirm Button */}
                            <button
                                onClick={handleConfirmBet}
                                disabled={numAmount <= 0}
                                className={`w-full py-3 rounded-xl text-sm font-bold transition-all ${numAmount > 0
                                    ? selectedOutcome === "YES"
                                        ? "bg-primary hover:bg-lime-400 text-black shadow-lg shadow-primary/30"
                                        : "bg-purple-500 hover:bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                                    : theme === "dark"
                                        ? "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                                        : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                                    }`}
                            >
                                Comprar
                            </button>
                        </div>
                    )}
                </div>
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
        </div>
    );
};

// Wrap with React.memo to prevent re-renders when parent updates
export default React.memo(MarketCard);