import React, { useEffect } from "react";
import { QrCode, Clock, Copy, CheckCircle2 } from "lucide-react";

interface PixQRCodeStepProps {
    qrCode: string;
    amount: number;
    currency: "BRL" | "USD";
    countdown: number;
    onCountdownEnd: () => void;
    theme?: "dark" | "light";
}

export const PixQRCodeStep: React.FC<PixQRCodeStepProps> = ({
    qrCode,
    amount,
    currency,
    countdown,
    onCountdownEnd,
    theme = "dark",
}) => {
    const [copied, setCopied] = React.useState(false);

    useEffect(() => {
        if (countdown === 0) {
            onCountdownEnd();
        }
    }, [countdown, onCountdownEnd]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(qrCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="text-center">
            {/* Timer */}
            <div className={`flex items-center justify-center gap-2 mb-6 p-3 rounded-xl ${theme === "dark" ? "bg-zinc-800/50" : "bg-zinc-100"
                }`}>
                <Clock size={18} className={countdown < 30 ? "text-red-500" : "text-primary"} />
                <span className={`text-lg font-bold ${countdown < 30 ? "text-red-500" : theme === "dark" ? "text-white" : "text-zinc-900"
                    }`}>
                    {formatTime(countdown)}
                </span>
            </div>

            {/* Amount */}
            <div className="mb-6">
                <p className={`text-sm mb-1 ${theme === "dark" ? "text-zinc-500" : "text-zinc-600"}`}>
                    Valor do depósito
                </p>
                <p className={`text-4xl font-black ${theme === "dark" ? "text-white" : "text-zinc-900"}`}>
                    {currency === "BRL" ? "R$" : "$"}{amount.toFixed(2)}
                </p>
            </div>

            {/* QR Code */}
            <div className={`p-6 rounded-2xl mb-6 ${theme === "dark" ? "bg-white" : "bg-zinc-100"
                }`}>
                <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(qrCode)}`}
                    alt="QR Code PIX"
                    className="w-60 h-60 mx-auto"
                />
                <p className="mt-4 text-xs text-zinc-600">
                    Escaneie o QR Code com seu app de pagamento
                </p>
            </div>

            {/* Copy PIX Code */}
            <div className="mb-6">
                <p className={`text-xs mb-2 ${theme === "dark" ? "text-zinc-500" : "text-zinc-600"}`}>
                    Ou copie o código PIX
                </p>
                <button
                    onClick={handleCopy}
                    className={`w-full p-3 rounded-xl font-mono text-sm border-2 transition-all flex items-center justify-between ${copied
                        ? "bg-green-500/20 border-green-500 text-green-500"
                        : theme === "dark"
                            ? "bg-zinc-800/50 border-zinc-700 text-zinc-400 hover:bg-zinc-800"
                            : "bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100"
                        }`}
                >
                    <span className="truncate flex-1 text-left">
                        {qrCode.substring(0, 40)}...
                    </span>
                    {copied ? (
                        <CheckCircle2 size={18} className="ml-2" />
                    ) : (
                        <Copy size={18} className="ml-2" />
                    )}
                </button>
            </div>

            {/* Instructions */}
            <div className={`p-4 rounded-xl ${theme === "dark" ? "bg-zinc-800/50" : "bg-zinc-100"
                }`}>
                <p className={`text-xs ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
                    ⚡ Aguardando pagamento...
                    <br />
                    Após o pagamento, sua conta será creditada automaticamente.
                </p>
            </div>
        </div>
    );
};
