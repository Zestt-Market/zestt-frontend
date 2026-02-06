import React, { useState } from "react";
import { Loader2, CreditCard, QrCode as QrCodeIcon, Wallet, Bitcoin, Gift } from "lucide-react";

interface DepositFormProps {
    amount: string;
    setAmount: (value: string) => void;
    currency: "BRL" | "USD";
    setCurrency: (value: "BRL" | "USD") => void;
    paymentMethod: "PIX" | "CREDIT_CARD";
    setPaymentMethod: (value: "PIX" | "CREDIT_CARD") => void;
    loading: boolean;
    error: string | null;
    onSubmit: () => void;
    theme?: "dark" | "light";
}

interface DepositOption {
    amount: number;
    bonus: number;
}

const DEPOSIT_OPTIONS_BRL: DepositOption[] = [
    { amount: 30, bonus: 3 },
    { amount: 60, bonus: 6 },
    { amount: 150, bonus: 15 },
    { amount: 300, bonus: 30 },
    { amount: 600, bonus: 60 },
    { amount: 1500, bonus: 150 },
    { amount: 3000, bonus: 300 },
    { amount: 6000, bonus: 600 },
];

const DEPOSIT_OPTIONS_USD: DepositOption[] = [
    { amount: 10, bonus: 1 },
    { amount: 25, bonus: 2.5 },
    { amount: 50, bonus: 5 },
    { amount: 100, bonus: 10 },
    { amount: 250, bonus: 25 },
    { amount: 500, bonus: 50 },
    { amount: 1000, bonus: 100 },
    { amount: 2000, bonus: 200 },
];

export const DepositForm: React.FC<DepositFormProps> = ({
    amount,
    setAmount,
    currency,
    setCurrency,
    paymentMethod,
    setPaymentMethod,
    loading,
    error,
    onSubmit,
    theme = "dark",
}) => {
    const [customAmount, setCustomAmount] = useState<string>("");
    const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

    const depositOptions = currency === "BRL" ? DEPOSIT_OPTIONS_BRL : DEPOSIT_OPTIONS_USD;

    const calculateBonus = (value: number): number => {
        const option = depositOptions.find(opt => opt.amount === value);
        if (option) return option.bonus;
        // Para valores customizados, calcula 10% de bônus
        return Math.floor(value * 0.1);
    };

    const currentAmount = customAmount ? parseFloat(customAmount) : parseFloat(amount);
    const currentBonus = calculateBonus(currentAmount);

    const selectPresetAmount = (value: number) => {
        setAmount(value.toString());
        setCustomAmount("");
        setSelectedPreset(value);
    };

    const handleCustomAmountChange = (value: string) => {
        setCustomAmount(value);
        setAmount(value);
        setSelectedPreset(null);
    };

    return (
        <>
            {/* Métodos de Pagamento */}
            <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                    onClick={() => setPaymentMethod("PIX")}
                    className={`p-3 rounded-xl border-2 transition-all ${paymentMethod === "PIX"
                        ? "border-primary bg-primary/10"
                        : "border-zinc-700 bg-zinc-800/50 hover:border-zinc-600"
                        }`}
                >
                    <div className="flex flex-col items-center gap-1">
                        <Wallet size={20} className="text-primary" />
                        <span className="font-bold text-white text-xs">PIX</span>
                    </div>
                </button>

                <button
                    onClick={() => setPaymentMethod("CREDIT_CARD")}
                    className={`p-3 rounded-xl border-2 transition-all ${paymentMethod === "CREDIT_CARD"
                        ? "border-primary bg-primary/10"
                        : "border-zinc-700 bg-zinc-800/50 hover:border-zinc-600"
                        }`}
                >
                    <div className="flex flex-col items-center gap-1">
                        <CreditCard size={20} className="text-blue-400" />
                        <span className="font-bold text-white text-xs">Cartão</span>
                    </div>
                </button>

                <button
                    className="p-3 rounded-xl border-2 border-zinc-700 bg-zinc-800/50 opacity-50 cursor-not-allowed"
                >
                    <div className="flex flex-col items-center gap-1">
                        <Bitcoin size={20} className="text-orange-400" />
                        <span className="font-bold text-white text-xs">Crypto</span>
                    </div>
                </button>

                <button
                    className="p-3 rounded-xl border-2 border-zinc-700 bg-zinc-800/50 opacity-50 cursor-not-allowed"
                >
                    <div className="flex flex-col items-center gap-1">
                        <Gift size={20} className="text-purple-400" />
                        <span className="font-bold text-white text-xs">Gift</span>
                    </div>
                </button>
            </div>


            {/* Valores Pré-definidos */}
            <div className="mb-6">
                <label className={`text-xs font-bold uppercase tracking-wider mb-3 block ${theme === "dark" ? "text-zinc-500" : "text-zinc-600"}`}>
                    Valores Disponíveis
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {depositOptions.map((option) => (
                        <button
                            key={option.amount}
                            onClick={() => selectPresetAmount(option.amount)}
                            className={`relative p-3 rounded-xl border-2 transition-all ${selectedPreset === option.amount
                                ? "border-primary bg-primary/10"
                                : "border-zinc-700 bg-zinc-800/50 hover:border-zinc-600"
                                }`}
                        >
                            <div className="text-center">
                                <div className="mb-1">
                                    <span className="text-lg">💰</span>
                                </div>
                                <p className="text-base font-bold text-white">
                                    {currency === "BRL" ? "R$" : "$"}{option.amount}
                                </p>
                                <p className="text-[10px] text-primary font-medium mt-0.5">
                                    + {currency === "BRL" ? "R$" : "$"}{option.bonus} bônus
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Input Customizado */}
            <div className="mb-4">
                <label className={`text-xs font-bold uppercase tracking-wider mb-2 block ${theme === "dark" ? "text-zinc-500" : "text-zinc-600"}`}>
                    Valor Personalizado
                </label>
                <div className={`flex items-center gap-2 p-4 rounded-xl border-2 ${theme === "dark" ? "bg-zinc-800/50 border-zinc-700" : "bg-zinc-50 border-zinc-200"}`}>
                    <span className="text-2xl font-black text-zinc-500">
                        {currency === "BRL" ? "BRL" : "USD"}
                    </span>
                    <input
                        type="number"
                        value={customAmount}
                        onChange={(e) => handleCustomAmountChange(e.target.value)}
                        className={`flex-1 bg-transparent outline-none text-2xl font-black ${theme === "dark" ? "text-white placeholder-zinc-600" : "text-zinc-900 placeholder-zinc-400"}`}
                        placeholder={currency === "BRL" ? "30,00" : "10.00"}
                    />
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <p className="text-sm text-red-500">{error}</p>
                </div>
            )}

            {/* Resumo e Botão */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-800/50 border border-zinc-700">
                <div>
                    <p className="text-xs text-zinc-400 mb-1">Você recebe:</p>
                    <p className="text-xl font-bold text-white">
                        {currency === "BRL" ? "R$" : "$"}{currentAmount.toFixed(2)}
                        {currentBonus > 0 && (
                            <>
                                <span className="text-primary text-sm ml-2">+ 🎁 {currentBonus.toFixed(0)}</span>
                            </>
                        )}
                    </p>
                    {currentBonus > 0 && (
                        <p className="text-xs text-zinc-400 mt-1">
                            + {currency === "BRL" ? "R$" : "$"}{currentBonus.toFixed(2)} bônus
                        </p>
                    )}
                </div>
                <button
                    onClick={onSubmit}
                    disabled={loading || currentAmount <= 0}
                    className="px-6 py-3 bg-primary hover:bg-lime-400 text-black rounded-xl text-sm font-black uppercase tracking-wider transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {loading ? (
                        <>
                            <Loader2 size={16} className="animate-spin" />
                            Processando...
                        </>
                    ) : (
                        "Pagar"
                    )}
                </button>
            </div>

            <p className={`text-xs text-center mt-4 ${theme === "dark" ? "text-zinc-500" : "text-zinc-600"}`}>
                {paymentMethod === "PIX"
                    ? "💡 Depósitos via PIX são instantâneos"
                    : "💳 Depósitos via cartão podem levar alguns minutos"}
            </p>
        </>
    );
};
