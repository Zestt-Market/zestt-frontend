"use client";

import React, { useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react';

interface FiltersBarProps {
    theme: 'dark' | 'light';
}

export const FiltersBar: React.FC<FiltersBarProps> = ({ theme }) => {
    const [trendingFilter, setTrendingFilter] = useState("Em Alta");
    const [frequencyFilter, setFrequencyFilter] = useState("Todos");
    const [marketStatusFilter, setMarketStatusFilter] = useState("Mercados abertos");
    const [showTrendingDropdown, setShowTrendingDropdown] = useState(false);
    const [showFrequencyDropdown, setShowFrequencyDropdown] = useState(false);
    const [showMarketStatusDropdown, setShowMarketStatusDropdown] = useState(false);
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [showContractPrice, setShowContractPrice] = useState(false);
    const [showListView, setShowListView] = useState(false);
    const [excludeSports, setExcludeSports] = useState(false);

    return (
        <div className="flex items-center gap-3 mb-8 flex-wrap">
            {/* Em Alta Dropdown */}
            <div className="relative">
                <button
                    onClick={() => {
                        setShowTrendingDropdown(!showTrendingDropdown);
                        setShowFrequencyDropdown(false);
                        setShowMarketStatusDropdown(false);
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${theme === "dark"
                            ? "bg-zinc-800/50 hover:bg-zinc-800 border-zinc-700 text-zinc-300 hover:text-white"
                            : "bg-white hover:bg-zinc-50 border-zinc-300 text-zinc-900 hover:text-black shadow-sm"
                        }`}
                >
                    <span>{trendingFilter}</span>
                    <ChevronDown size={12} />
                </button>
                {showTrendingDropdown && (
                    <div
                        className={`absolute top-full mt-2 left-0 w-64 rounded-xl shadow-2xl border py-2 z-[9999] ${theme === "dark"
                                ? "bg-zinc-900 border-zinc-700"
                                : "bg-white border-zinc-200"
                            }`}
                    >
                        {[
                            "Em Alta",
                            "Volátil",
                            "Novo",
                            "Fechamento em breve",
                            "Volume",
                            "Liquidez",
                            "50-50",
                        ].map((option) => (
                            <button
                                key={option}
                                onClick={() => {
                                    setTrendingFilter(option);
                                    setShowTrendingDropdown(false);
                                }}
                                className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center gap-3 whitespace-nowrap ${theme === "dark"
                                        ? "text-zinc-100 hover:bg-zinc-800"
                                        : "text-zinc-700 hover:bg-zinc-50"
                                    }`}
                            >
                                <div
                                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${trendingFilter === option
                                            ? "border-primary"
                                            : "border-zinc-300"
                                        }`}
                                >
                                    {trendingFilter === option && (
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                    )}
                                </div>
                                <span>{option}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Frequência Dropdown */}
            <div className="relative">
                <button
                    onClick={() => {
                        setShowFrequencyDropdown(!showFrequencyDropdown);
                        setShowTrendingDropdown(false);
                        setShowMarketStatusDropdown(false);
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${theme === "dark"
                            ? "bg-zinc-800/50 hover:bg-zinc-800 border-zinc-700 text-zinc-300 hover:text-white"
                            : "bg-white hover:bg-zinc-50 border-zinc-300 text-zinc-900 hover:text-black shadow-sm"
                        }`}
                >
                    <span>{frequencyFilter}</span>
                    <ChevronDown size={12} />
                </button>
                {showFrequencyDropdown && (
                    <div
                        className={`absolute top-full mt-2 left-0 w-48 rounded-xl shadow-2xl border py-2 z-[9999] ${theme === "dark"
                                ? "bg-zinc-900 border-zinc-700"
                                : "bg-white border-zinc-200"
                            }`}
                    >
                        {[
                            "Todos",
                            "Por Hora",
                            "Diário",
                            "Semanal",
                            "Mensal",
                            "Anual",
                        ].map((option) => (
                            <button
                                key={option}
                                onClick={() => {
                                    setFrequencyFilter(option);
                                    setShowFrequencyDropdown(false);
                                }}
                                className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center gap-3 ${theme === "dark"
                                        ? "text-zinc-100 hover:bg-zinc-800"
                                        : "text-zinc-700 hover:bg-zinc-50"
                                    }`}
                            >
                                <div
                                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${frequencyFilter === option
                                            ? "border-primary"
                                            : "border-zinc-300"
                                        }`}
                                >
                                    {frequencyFilter === option && (
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                    )}
                                </div>
                                <span>{option}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Mercados Status Dropdown */}
            <div className="relative">
                <button
                    onClick={() => {
                        setShowMarketStatusDropdown(!showMarketStatusDropdown);
                        setShowTrendingDropdown(false);
                        setShowFrequencyDropdown(false);
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${theme === "dark"
                            ? "bg-zinc-800/50 hover:bg-zinc-800 border-zinc-700 text-zinc-300 hover:text-white"
                            : "bg-white hover:bg-zinc-50 border-zinc-300 text-zinc-900 hover:text-black shadow-sm"
                        }`}
                >
                    <span>{marketStatusFilter}</span>
                    <ChevronDown size={12} />
                </button>
                {showMarketStatusDropdown && (
                    <div
                        className={`absolute top-full mt-2 left-0 w-48 rounded-xl shadow-2xl border py-2 z-[9999] ${theme === "dark"
                                ? "bg-zinc-900 border-zinc-700"
                                : "bg-white border-zinc-200"
                            }`}
                    >
                        {[
                            "Todos os mercados",
                            "Mercados abertos",
                            "Mercados fechados",
                        ].map((option) => (
                            <button
                                key={option}
                                onClick={() => {
                                    setMarketStatusFilter(option);
                                    setShowMarketStatusDropdown(false);
                                }}
                                className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center gap-3 ${theme === "dark"
                                        ? "text-zinc-100 hover:bg-zinc-800"
                                        : "text-zinc-700 hover:bg-zinc-50"
                                    }`}
                            >
                                <div
                                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${marketStatusFilter === option
                                            ? "border-primary"
                                            : "border-zinc-300"
                                        }`}
                                >
                                    {marketStatusFilter === option && (
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                    )}
                                </div>
                                <span>{option}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="w-px h-4 bg-zinc-800 mx-1"></div>

            {/* Advanced Filters Dropdown */}
            <div className="relative">
                <button
                    onClick={() => {
                        setShowAdvancedFilters(!showAdvancedFilters);
                        setShowTrendingDropdown(false);
                        setShowFrequencyDropdown(false);
                        setShowMarketStatusDropdown(false);
                    }}
                    className={`p-1.5 rounded-md transition-colors ${theme === "dark"
                            ? "hover:bg-zinc-800 text-zinc-400 hover:text-white"
                            : "hover:bg-zinc-200 text-zinc-600 hover:text-black"
                        }`}
                >
                    <Filter size={14} />
                </button>
                {showAdvancedFilters && (
                    <div
                        className={`absolute top-full mt-2 right-0 w-56 rounded-xl shadow-2xl border py-2 z-[9999] ${theme === "dark"
                                ? "bg-zinc-900 border-zinc-700"
                                : "bg-white border-zinc-200"
                            }`}
                    >
                        <button
                            onClick={() => setShowContractPrice(!showContractPrice)}
                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between ${theme === "dark"
                                    ? "text-zinc-100 hover:bg-zinc-800"
                                    : "text-zinc-700 hover:bg-zinc-50"
                                }`}
                        >
                            <span>Preço do contrato</span>
                            <div
                                className={`w-10 h-5 rounded-full transition-colors relative ${showContractPrice
                                        ? "bg-primary"
                                        : theme === "dark"
                                            ? "bg-zinc-700"
                                            : "bg-zinc-300"
                                    }`}
                            >
                                <div
                                    className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${showContractPrice
                                            ? "transform translate-x-5"
                                            : "transform translate-x-0.5"
                                        }`}
                                />
                            </div>
                        </button>
                        <button
                            onClick={() => setShowListView(!showListView)}
                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between ${theme === "dark"
                                    ? "text-zinc-100 hover:bg-zinc-800"
                                    : "text-zinc-700 hover:bg-zinc-50"
                                }`}
                        >
                            <span>Visualização em lista</span>
                            <div
                                className={`w-10 h-5 rounded-full transition-colors relative ${showListView
                                        ? "bg-primary"
                                        : theme === "dark"
                                            ? "bg-zinc-700"
                                            : "bg-zinc-300"
                                    }`}
                            >
                                <div
                                    className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${showListView
                                            ? "transform translate-x-5"
                                            : "transform translate-x-0.5"
                                        }`}
                                />
                            </div>
                        </button>
                        <button
                            onClick={() => setExcludeSports(!excludeSports)}
                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between ${theme === "dark"
                                    ? "text-zinc-100 hover:bg-zinc-800"
                                    : "text-zinc-700 hover:bg-zinc-50"
                                }`}
                        >
                            <span>Excluir esportes</span>
                            <div
                                className={`w-10 h-5 rounded-full transition-colors relative ${excludeSports
                                        ? "bg-primary"
                                        : theme === "dark"
                                            ? "bg-zinc-700"
                                            : "bg-zinc-300"
                                    }`}
                            >
                                <div
                                    className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${excludeSports
                                            ? "transform translate-x-5"
                                            : "transform translate-x-0.5"
                                        }`}
                                />
                            </div>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};