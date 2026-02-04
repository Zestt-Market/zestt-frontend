import React, { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

interface SuccessAnimationProps {
    amount: number;
    currency: "BRL" | "USD";
    onComplete: () => void;
    theme?: "dark" | "light";
}

export const SuccessAnimation: React.FC<SuccessAnimationProps> = ({
    amount,
    currency,
    onComplete,
    theme = "dark",
}) => {
    useEffect(() => {
        const timer = setTimeout(onComplete, 2500);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="text-center py-8">
            <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto rounded-full bg-green-500/20 flex items-center justify-center animate-scale-in">
                    <CheckCircle2 size={48} className="text-green-500 animate-check" />
                </div>
                <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full bg-green-500/10 animate-ping" />
            </div>

            <h4 className={`text-2xl font-black mb-2 ${theme === "dark" ? "text-white" : "text-zinc-900"
                }`}>
                Depósito Confirmado!
            </h4>

            <p className={`text-lg font-bold text-green-500 mb-4`}>
                {currency === "BRL" ? "R$" : "$"}{amount.toFixed(2)}
            </p>

            <p className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
                ✅ Seu saldo foi atualizado
            </p>

            <style jsx>{`
        @keyframes scale-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes check {
          0% {
            transform: scale(0) rotate(-45deg);
          }
          50% {
            transform: scale(1.2) rotate(0deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
          }
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }

        .animate-check {
          animation: check 0.6s ease-out 0.2s both;
        }
      `}</style>
        </div>
    );
};
