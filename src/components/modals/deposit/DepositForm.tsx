import React from "react";
import { Loader2, CreditCard, QrCode as QrCodeIcon } from "lucide-react";

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
    const quickAmounts = currency === "BRL" ? [50, 100, 200, 500] : [10, 25, 50, 100];

    return (
        <>
            {/* Currency Selector */}
            <div className="mb-6">
                <label className={`text-xs font-bold uppercase tracking-wider mb-2 block ${theme === "dark" ? "text-zinc-500" : "text-zinc-600"
                    }`}>
                    Moeda
                </label>
                <div className="grid grid-cols-2 gap-2">
                    <button
                        onClick={() => setCurrency("BRL")}
                        className={`py-3 px-4 rounded-xl text-sm font-bold transition-all border-2 ${currency === "BRL"
                                ? "bg-primary/20 text-primary border-primary"
                                : theme === "dark"
                                    ? "bg-zinc-800/50 text-zinc-400 border-transparent hover:bg-zinc-800"
                                    : "bg-zinc-100 text-zinc-600 border-transparent hover:bg-zinc-200"
                            }`}
                    >
                        🇧🇷 BRL (R$)
                    </button>
                    <button
                        onClick={() => setCurrency("USD")}
                        className={`py-3 px-4 rounded-xl text-sm font-bold transition-all border-2 ${currency === "USD"
                                ? "bg-primary/20 text-primary border-primary"
                                : theme === "dark"
                                    ? "bg-zinc-800/50 text-zinc-400 border-transparent hover:bg-zinc-800"
                                    : "bg-zinc-100 text-zinc-600 border-transparent hover:bg-zinc-200"
                            }`}
                    >
                        🇺🇸 USD ($)
                    </button>
                </div>
            </div>

            {/* Payment Method */}
            <div className="mb-6">
                <label className={`text-xs font-bold uppercase tracking-wider mb-2 block ${theme === "dark" ? "text-zinc-500" : "text-zinc-600"
                    }`}>
                    Método de Pagamento
                </label>
                <div className="grid grid-cols-2 gap-2">
                    <button
                        onClick={() => setPaymentMethod("PIX")}
                        className={`py-3 px-4 rounded-xl text-sm font-bold transition-all border-2 flex items-center justify-center gap-2 ${paymentMethod === "PIX"
                                ? "bg-primary/20 text-primary border-primary"
                                : theme === "dark"
                                    ? "bg-zinc-800/50 text-zinc-400 border-transparent hover:bg-zinc-800"
                                    : "bg-zinc-100 text-zinc-600 border-transparent hover:bg-zinc-200"
                            }`}
                    >
                        <QrCodeIcon size={16} />
                        PIX
                    </button>
                    <button
                        onClick={() => setPaymentMethod("CREDIT_CARD")}
                        className={`py-3 px-4 rounded-xl text-sm font-bold transition-all border-2 flex items-center justify-center gap-2 ${paymentMethod === "CREDIT_CARD"
                                ? "bg-primary/20 text-primary border-primary"
                                : theme === "dark"
                                    ? "bg-zinc-800/50 text-zinc-400 border-transparent hover:bg-zinc-800"
                                    : "bg-zinc-100 text-zinc-600 border-transparent hover:bg-zinc-200"
                            }`}
                    >
                        <CreditCard size={16} />
                        Cartão
                    </button>
                </div>
            </div>

            {/* Amount Input */}
            <div className="mb-4">
                <label className={`text-xs font-bold uppercase tracking-wider mb-2 block ${theme === "dark" ? "text-zinc-500" : "text-zinc-600"
                    }`}>
                    Valor
                </label>
                <div className={`flex items-center gap-2 p-4 rounded-xl border-2 ${theme === "dark"
                        ? "bg-zinc-800/50 border-zinc-700"
                        : "bg-zinc-50 border-zinc-200"
                    }`}>
                    <span className="text-2xl font-black">
                        {currency === "BRL" ? "R$" : "$"}
                    </span>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className={`flex-1 bg-transparent outline-none text-2xl font-black ${theme === "dark" ? "text-white" : "text-zinc-900"
                            }`}
                        placeholder="0.00"
                    />
                </div>
            </div>

            {/* Quick Amounts */}
            <div className="grid grid-cols-4 gap-2 mb-6">
                {quickAmounts.map((val) => (
                    <button
                        key={val}
                        onClick={() => setAmount(val.toString())}
                        className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${theme === "dark"
                                ? "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800"
                                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                            }`}
                    >
                        {currency === "BRL" ? "R$" : "$"}
                        {val}
                    </button>
                ))}
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <p className="text-sm text-red-500">{error}</p>
                </div>
            )}

            {/* Submit Button */}
            <button
                onClick={onSubmit}
                disabled={loading}
                className="w-full py-4 px-6 bg-primary text-black rounded-xl text-base font-black uppercase tracking-wide transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {loading ? (
                    <>
                        <Loader2 size={20} className="animate-spin" />
                        Processando...
                    </>
                ) : (
                    `Depositar ${currency === "BRL" ? "R$" : "$"}${parseFloat(amount || "0").toFixed(2)}`
                )}
            </button>

            <p className={`text-xs text-center mt-4 ${theme === "dark" ? "text-zinc-500" : "text-zinc-600"
                }`}>
                {paymentMethod === "PIX"
                    ? "💡 Depósitos via PIX são instantâneos"
                    : "💳 Depósitos via cartão podem levar alguns minutos"}
            </p>
        </>
    );
};
