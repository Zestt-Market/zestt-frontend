import React, { useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react';
import { useTheme } from '../../design-system/providers/ThemeProvider';

export const FiltersBar: React.FC = () => {
    const { theme } = useTheme();
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

    const closeAllDropdowns = () => {
        setShowTrendingDropdown(false);
        setShowFrequencyDropdown(false);
        setShowMarketStatusDropdown(false);
        setShowAdvancedFilters(false);
    };

    return (
        <div className="flex items-center gap-3 mb-8 flex-wrap">
            {/* Em Alta Dropdown */}
            <FilterDropdown
                label={trendingFilter}
                isOpen={showTrendingDropdown}
                onToggle={() => {
                    setShowTrendingDropdown(!showTrendingDropdown);
                    setShowFrequencyDropdown(false);
                    setShowMarketStatusDropdown(false);
                    setShowAdvancedFilters(false);
                }}
                options={[
                    "Em Alta",
                    "Volátil",
                    "Novo",
                    "Fechamento em breve",
                    "Volume",
                    "Liquidez",
                    "50-50",
                ]}
                selectedOption={trendingFilter}
                onSelect={setTrendingFilter}
            />

            {/* Frequência Dropdown */}
            <FilterDropdown
                label={frequencyFilter}
                isOpen={showFrequencyDropdown}
                onToggle={() => {
                    setShowFrequencyDropdown(!showFrequencyDropdown);
                    setShowTrendingDropdown(false);
                    setShowMarketStatusDropdown(false);
                    setShowAdvancedFilters(false);
                }}
                options={["Todos", "Por Hora", "Diário", "Semanal", "Mensal", "Anual"]}
                selectedOption={frequencyFilter}
                onSelect={setFrequencyFilter}
            />

            {/* Mercados Status Dropdown */}
            <FilterDropdown
                label={marketStatusFilter}
                isOpen={showMarketStatusDropdown}
                onToggle={() => {
                    setShowMarketStatusDropdown(!showMarketStatusDropdown);
                    setShowTrendingDropdown(false);
                    setShowFrequencyDropdown(false);
                    setShowAdvancedFilters(false);
                }}
                options={["Todos os mercados", "Mercados abertos", "Mercados fechados"]}
                selectedOption={marketStatusFilter}
                onSelect={setMarketStatusFilter}
            />

            <div className="w-px h-4 bg-zinc-800 mx-1"></div>

            {/* Advanced Filters Dropdown */}
            <div className="relative">
                <button
                    onClick={() => {
                        setShowAdvancedFilters(!showAdvancedFilters);
                        closeAllDropdowns();
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
                        className={`absolute top-full mt-2 right-0 w-56 rounded-xl shadow-2xl border py-2 z-[9999] ${theme === "dark" ? "bg-zinc-900 border-zinc-700" : "bg-white border-zinc-200"
                            }`}
                    >
                        <AdvancedFilterOption
                            label="Preço do contrato"
                            checked={showContractPrice}
                            onChange={setShowContractPrice}
                        />
                        <AdvancedFilterOption
                            label="Visualização em lista"
                            checked={showListView}
                            onChange={setShowListView}
                        />
                        <AdvancedFilterOption
                            label="Excluir esportes"
                            checked={excludeSports}
                            onChange={setExcludeSports}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

const FilterDropdown: React.FC<{
    label: string;
    isOpen: boolean;
    onToggle: () => void;
    options: string[];
    selectedOption: string;
    onSelect: (option: string) => void;
}> = ({ label, isOpen, onToggle, options, selectedOption, onSelect }) => {
    const { theme } = useTheme();

    return (
        <div className="relative">
            <button
                onClick={onToggle}
                className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${theme === "dark"
                        ? "bg-zinc-800/50 hover:bg-zinc-800 border-zinc-700 text-zinc-300 hover:text-white"
                        : "bg-white hover:bg-zinc-50 border-zinc-300 text-zinc-900 hover:text-black shadow-sm"
                    }`}
            >
                <span>{label}</span>
                <ChevronDown size={12} />
            </button>
            {isOpen && (
                <div
                    className={`absolute top-full mt-2 left-0 w-64 rounded-xl shadow-2xl border py-2 z-[9999] ${theme === "dark" ? "bg-zinc-900 border-zinc-700" : "bg-white border-zinc-200"
                        }`}
                >
                    {options.map((option) => (
                        <button
                            key={option}
                            onClick={() => {
                                onSelect(option);
                                onToggle();
                            }}
                            className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center gap-3 whitespace-nowrap ${theme === "dark" ? "text-zinc-100 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-50"
                                }`}
                        >
                            <div
                                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedOption === option ? "border-primary" : "border-zinc-300"
                                    }`}
                            >
                                {selectedOption === option && <div className="w-2 h-2 rounded-full bg-primary" />}
                            </div>
                            <span>{option}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

const AdvancedFilterOption: React.FC<{
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}> = ({ label, checked, onChange }) => {
    const { theme } = useTheme();

    return (
        <button
            onClick={() => onChange(!checked)}
            className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between ${theme === "dark" ? "text-zinc-100 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-50"
                }`}
        >
            <span>{label}</span>
            <div
                className={`w-10 h-5 rounded-full transition-colors relative ${checked ? "bg-primary" : theme === "dark" ? "bg-zinc-700" : "bg-zinc-300"
                    }`}
            >
                <div
                    className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${checked ? "transform translate-x-5" : "transform translate-x-0.5"
                        }`}
                />
            </div>
        </button>
    );
};