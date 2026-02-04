import React from "react";
import { CreditCard, Loader2 } from "lucide-react";
import { detectCardBrand, CardBrandIcon } from "./CardBrandIcon";

interface CreditCardFormProps {
    cardNumber: string;
    setCardNumber: (value: string) => void;
    cardName: string;
    setCardName: (value: string) => void;
    cardExpiry: string;
    setCardExpiry: (value: string) => void;
    cardCVV: string;
    setCardCVV: (value: string) => void;
    amount: number;
    currency: "BRL" | "USD";
    loading: boolean;
    onSubmit: () => void;
    theme?: "dark" | "light";
}

export const CreditCardForm: React.FC<CreditCardFormProps> = ({
    cardNumber,
    setCardNumber,
    cardName,
    setCardName,
    cardExpiry,
    setCardExpiry,
    cardCVV,
    setCardCVV,
    amount,
    currency,
    loading,
    onSubmit,
    theme = "dark",
}) => {
    const formatCardNumber = (value: string) => {
        const numbers = value.replace(/\D/g, "");
        const formatted = numbers.match(/.{1,4}/g)?.join(" ") || "";
        return formatted.substring(0, 19); // 16 digits + 3 spaces
    };

    const formatExpiry = (value: string) => {
        const numbers = value.replace(/\D/g, "");
        if (numbers.length >= 2) {
            return `${numbers.substring(0, 2)}/${numbers.substring(2, 4)}`;
        }
        return numbers;
    };

    const cardBrand = detectCardBrand(cardNumber);

    return (
        <>
            {/* Amount Display */}
            <div className={`p-4 rounded-xl mb-6 ${theme === "dark" ? "bg-zinc-800/50" : "bg-zinc-100"
                }`}>
                <p className={`text-sm mb-1 ${theme === "dark" ? "text-zinc-500" : "text-zinc-600"}`}>
                    Valor do depósito
                </p>
                <p className={`text-3xl font-black ${theme === "dark" ? "text-white" : "text-zinc-900"}`}>
                    {currency === "BRL" ? "R$" : "$"}{amount.toFixed(2)}
                </p>
            </div>

            {/* Card Number */}
            <div className="mb-4">
                <label className={`text-xs font-bold uppercase tracking-wider mb-2 block ${theme === "dark" ? "text-zinc-500" : "text-zinc-600"
                    }`}>
                    Número do Cartão
                </label>
                <div className={`flex items-center gap-3 p-4 rounded-xl border-2 ${theme === "dark"
                    ? "bg-zinc-800/50 border-zinc-700"
                    : "bg-zinc-50 border-zinc-200"
                    }`}>
                    {cardBrand !== "unknown" ? (
                        <CardBrandIcon brand={cardBrand} className="w-12 h-8 flex-shrink-0" />
                    ) : (
                        <CreditCard size={20} className={theme === "dark" ? "text-zinc-500" : "text-zinc-400"} />
                    )}
                    <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        className={`flex-1 bg-transparent outline-none font-mono ${theme === "dark" ? "text-white" : "text-zinc-900"
                            }`}
                        placeholder="0000 0000 0000 0000"
                        maxLength={19}
                    />
                </div>
            </div>

            {/* Card Name */}
            <div className="mb-4">
                <label className={`text-xs font-bold uppercase tracking-wider mb-2 block ${theme === "dark" ? "text-zinc-500" : "text-zinc-600"
                    }`}>
                    Nome no Cartão
                </label>
                <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value.toUpperCase())}
                    className={`w-full p-4 rounded-xl border-2 outline-none ${theme === "dark"
                        ? "bg-zinc-800/50 border-zinc-700 text-white"
                        : "bg-zinc-50 border-zinc-200 text-zinc-900"
                        }`}
                    placeholder="NOME COMO NO CARTÃO"
                />
            </div>

            {/* Expiry & CVV */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <label className={`text-xs font-bold uppercase tracking-wider mb-2 block ${theme === "dark" ? "text-zinc-500" : "text-zinc-600"
                        }`}>
                        Validade
                    </label>
                    <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                        className={`w-full p-4 rounded-xl border-2 outline-none font-mono ${theme === "dark"
                            ? "bg-zinc-800/50 border-zinc-700 text-white"
                            : "bg-zinc-50 border-zinc-200 text-zinc-900"
                            }`}
                        placeholder="MM/AA"
                        maxLength={5}
                    />
                </div>
                <div>
                    <label className={`text-xs font-bold uppercase tracking-wider mb-2 block ${theme === "dark" ? "text-zinc-500" : "text-zinc-600"
                        }`}>
                        CVV
                    </label>
                    <input
                        type="text"
                        value={cardCVV}
                        onChange={(e) => setCardCVV(e.target.value.replace(/\D/g, "").substring(0, 4))}
                        className={`w-full p-4 rounded-xl border-2 outline-none font-mono ${theme === "dark"
                            ? "bg-zinc-800/50 border-zinc-700 text-white"
                            : "bg-zinc-50 border-zinc-200 text-zinc-900"
                            }`}
                        placeholder="123"
                        maxLength={4}
                    />
                </div>
            </div>

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
                    `Confirmar Pagamento`
                )}
            </button>

            <p className={`text-xs text-center mt-4 ${theme === "dark" ? "text-zinc-500" : "text-zinc-600"
                }`}>
                🔒 Pagamento seguro e criptografado
            </p>
        </>
    );
};
