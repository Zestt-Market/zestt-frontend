"use client";

import React, { useState } from "react";
import { X, Loader2, AlertCircle } from "lucide-react";
import { usePayments } from "../../hooks/usePayments";

interface WithdrawalModalProps {
    onClose: () => void;
    onSuccess?: () => void;
    theme?: "dark" | "light";
}

export const WithdrawalModal: React.FC<WithdrawalModalProps> = ({
    onClose,
    onSuccess,
    theme = "dark",
}) => {
    const [amount, setAmount] = useState<string>("");
    const [currency, setCurrency] = useState<"BRL" | "USD">("BRL");
    const [pixKey, setPixKey] = useState<string>("");
    const [bankAccount, setBankAccount] = useState<string>("");
    const { balance, createWithdrawal, loading, error, getBalance } = usePayments();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    React.useEffect(() => {
        getBalance(currency);
    }, [currency]);

    const availableBalance = balance ? balance.availableCents / 100 : 0;

    const handleSubmit = async () => {
        const amountValue = parseFloat(amount);

        if (!amountValue || amountValue <= 0) {
            alert("Digite um valor válido!");
            return;
        }

        if (amountValue > availableBalance) {
            alert("Saldo insuficiente!");
            return;
        }

        if (currency === "BRL" && !pixKey) {
            alert("Digite uma chave PIX válida!");
            return;
        }

        if (currency === "USD" && !bankAccount) {
            alert("Digite uma conta bancária válida!");
            return;
        }

        try {
            const amountCents = Math.round(amountValue * 100);
            const destination = currency === "BRL"
                ? { pixKey }
                : { bankAccount };

            const payment = await createWithdrawal(amountCents, currency, destination);

            if (payment.status === "PAID") {
                setSuccessMessage(`✅ Saque de ${currency === "BRL" ? "R$" : "$"}${amountValue.toFixed(2)} confirmado!`);
                setTimeout(() => {
                    onSuccess?.();
                    onClose();
                }, 2000);
            }
        } catch (err) {
            console.error("Erro ao criar saque:", err);
        }
    };

    const quickAmounts = currency === "BRL"
        ? [50, 100, 200, 500]
        : [10, 25, 50, 100];

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />
            <div
                className={`relative w-full max-w-md rounded-3xl shadow-2xl overflow-hidden ${theme === "dark" ? "bg-[#1c2127]" : "bg-white"
                    }`}
            >
                <button
                    onClick={onClose}
                    className={`absolute top-6 right-6 p-2 rounded-full transition-colors z-10 ${theme === "dark"
                            ? "hover:bg-white/10 text-zinc-400"
                            : "hover:bg-zinc-100 text-zinc-600"
                        }`}
                >
                    <X size={24} />
                </button>

                <div className="p-8">
                    <h3 className={`text-3xl font-black uppercase tracking-tight mb-2 ${theme === "dark" ? "text-white" : "text-zinc-900"
                        }`}>
                        Sacar
                    </h3>

                    {/* Available Balance */}
                    <div className={`mb-6 p-4 rounded-xl ${theme === "dark" ? "bg-zinc-800/50" : "bg-zinc-50"
                        }`}>
                        <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${theme === "dark" ? "text-zinc-500" : "text-zinc-600"
                            }`}>
                            Saldo Disponível
                        </p>
                        <p className={`text-2xl font-black ${theme === "dark" ? "text-white" : "text-zinc-900"
                            }`}>
                            {currency === "BRL" ? "R$" : "$"}{availableBalance.toFixed(2)}
                        </p>
                    </div>

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
                                max={availableBalance}
                            />
                        </div>
                    </div>

                    {/* Quick Amounts */}
                    <div className="grid grid-cols-4 gap-2 mb-6">
                        {quickAmounts.map((val) => (
                            <button
                                key={val}
                                onClick={() => setAmount(Math.min(val, availableBalance).toString())}
                                disabled={val > availableBalance}
                                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all disabled:opacity-30 ${theme === "dark"
                                        ? "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800"
                                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                                    }`}
                            >
                                {currency === "BRL" ? "R$" : "$"}{val}
                            </button>
                        ))}
                    </div>

                    {/* Destination */}
                    <div className="mb-6">
                        <label className={`text-xs font-bold uppercase tracking-wider mb-2 block ${theme === "dark" ? "text-zinc-500" : "text-zinc-600"
                            }`}>
                            {currency === "BRL" ? "Chave PIX" : "Conta Bancária"}
                        </label>
                        <input
                            type="text"
                            value={currency === "BRL" ? pixKey : bankAccount}
                            onChange={(e) => currency === "BRL" ? setPixKey(e.target.value) : setBankAccount(e.target.value)}
                            placeholder={currency === "BRL" ? "email@exemplo.com ou CPF" : "Número da conta"}
                            className={`w-full p-4 rounded-xl border-2 outline-none transition-colors ${theme === "dark"
                                    ? "bg-zinc-800/50 border-zinc-700 text-white placeholder-zinc-600 focus:border-primary"
                                    : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:border-primary"
                                }`}
                        />
                    </div>

                    {/* Warning */}
                    <div className={`mb-4 p-3 rounded-lg flex items-start gap-2 ${theme === "dark"
                            ? "bg-orange-500/10 border border-orange-500/20"
                            : "bg-orange-50 border border-orange-200"
                        }`}>
                        <AlertCircle size={16} className="text-orange-500 mt-0.5 flex-shrink-0" />
                        <p className={`text-xs ${theme === "dark" ? "text-orange-400" : "text-orange-700"
                            }`}>
                            {currency === "BRL"
                                ? "Saques via PIX são processados em até 1 dia útil"
                                : "Saques internacionais podem levar até 3-5 dias úteis"}
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <p className="text-sm text-red-500">{error}</p>
                        </div>
                    )}

                    {/* Success Message */}
                    {successMessage && (
                        <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <p className="text-sm text-green-500">{successMessage}</p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading || !amount || parseFloat(amount) > availableBalance}
                        className="w-full py-4 px-6 bg-purple-600 text-white rounded-xl text-base font-black uppercase tracking-wide transition-all hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={20} className="animate-spin" />
                                Processando...
                            </>
                        ) : (
                            `Sacar ${currency === "BRL" ? "R$" : "$"}${parseFloat(amount || "0").toFixed(2)}`
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
