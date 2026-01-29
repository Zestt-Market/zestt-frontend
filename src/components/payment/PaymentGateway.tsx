"use client";

import React, { useState } from "react";
import { X, Lock, CreditCard, Smartphone, Zap } from "lucide-react";

interface Props {
  amount: number;
  onClose: () => void;
  onPaymentComplete: (method: string) => void;
  theme?: "dark" | "light";
}

export const PaymentGateway: React.FC<Props> = ({
  amount,
  onClose,
  onPaymentComplete,
  theme = "dark",
}) => {
  const [step, setStep] = useState<"method" | "processing" | "success">(
    "method"
  );
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handlePaymentInitiate = (method: string) => {
    setSelectedMethod(method);
    setProcessing(true);
    setStep("processing");

    // Simulate payment processing
    setTimeout(() => {
      setStep("success");
      setTimeout(() => {
        onPaymentComplete(method);
        onClose();
      }, 2000);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div
        className={`relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl ${
          theme === "dark"
            ? "bg-gradient-to-b from-zinc-900 to-zinc-950"
            : "bg-white"
        }`}
      >
        {/* Header */}
        <div
          className={`relative px-8 py-6 border-b ${
            theme === "dark"
              ? "border-zinc-800 bg-zinc-900/80"
              : "border-zinc-200 bg-zinc-50"
          }`}
        >
          <div className="flex items-center justify-between">
            <h2
              className={`text-xl font-black tracking-tight ${
                theme === "dark" ? "text-white" : "text-zinc-900"
              }`}
            >
              Pagamento Seguro
            </h2>
            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors ${
                theme === "dark"
                  ? "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                  : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
              }`}
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex items-center gap-2 mt-4 text-xs font-medium text-primary">
            <Lock size={14} />
            <span>Seus dados estão protegidos com criptografia SSL</span>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-10">
          {step === "method" && (
            <div className="space-y-6">
              {/* Amount Display */}
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20">
                <p
                  className={`text-xs font-bold uppercase tracking-widest ${
                    theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                  }`}
                >
                  Valor a pagar
                </p>
                <p className="text-4xl font-black text-primary mt-2">
                  R$ {amount.toFixed(2)}
                </p>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <p
                  className={`text-xs font-bold uppercase tracking-widest ${
                    theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                  }`}
                >
                  Escolha seu método
                </p>

                {/* Apple Pay */}
                <button
                  onClick={() => handlePaymentInitiate("apple_pay")}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all bg-black text-white border-black hover:border-primary hover:shadow-[0_0_20px_rgba(190,242,100,0.2)]"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <Smartphone size={20} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-bold text-sm">Apple Pay</p>
                    <p className="text-xs text-white/60">Rápido e seguro</p>
                  </div>
                  <div className="text-primary font-bold text-sm">→</div>
                </button>

                {/* Google Pay */}
                <button
                  onClick={() => handlePaymentInitiate("google_pay")}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all border-zinc-700 hover:border-primary hover:shadow-[0_0_20px_rgba(190,242,100,0.2)] ${
                    theme === "dark"
                      ? "bg-zinc-800/50 text-white"
                      : "bg-zinc-50 text-zinc-900"
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                      theme === "dark" ? "bg-white/10" : "bg-zinc-200"
                    }`}
                  >
                    <span className="font-bold text-sm">G</span>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-bold text-sm">Google Pay</p>
                    <p
                      className={`text-xs ${
                        theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                      }`}
                    >
                      Pague com sua conta Google
                    </p>
                  </div>
                  <div className="text-primary font-bold text-sm">→</div>
                </button>

                {/* Pix/QR */}
                <button
                  onClick={() => handlePaymentInitiate("pix")}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all border-primary/30 hover:border-primary hover:shadow-[0_0_20px_rgba(190,242,100,0.2)] ${
                    theme === "dark"
                      ? "bg-primary/5 text-white"
                      : "bg-primary/5 text-zinc-900"
                  }`}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Zap size={20} className="text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-bold text-sm">Pix (QR Code)</p>
                    <p
                      className={`text-xs ${
                        theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                      }`}
                    >
                      Transferência instantânea
                    </p>
                  </div>
                  <div className="text-primary font-bold text-sm">→</div>
                </button>

                {/* Cartão de Crédito */}
                <button
                  onClick={() => handlePaymentInitiate("card")}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all border-zinc-700 hover:border-primary hover:shadow-[0_0_20px_rgba(190,242,100,0.2)] ${
                    theme === "dark"
                      ? "bg-zinc-800/50 text-white"
                      : "bg-zinc-50 text-zinc-900"
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                      theme === "dark" ? "bg-white/10" : "bg-zinc-200"
                    }`}
                  >
                    <CreditCard size={20} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-bold text-sm">Cartão de Crédito</p>
                    <p
                      className={`text-xs ${
                        theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                      }`}
                    >
                      Parcelado em até 12x
                    </p>
                  </div>
                  <div className="text-primary font-bold text-sm">→</div>
                </button>
              </div>
            </div>
          )}

          {step === "processing" && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="relative w-16 h-16 mb-6">
                <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
              </div>
              <p className="text-lg font-bold text-center">
                Processando pagamento...
              </p>
              <p
                className={`text-sm mt-2 ${
                  theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                Aguarde alguns segundos
              </p>
              <p className="text-2xl font-black text-primary mt-6">
                R$ {amount.toFixed(2)}
              </p>
            </div>
          )}

          {step === "success" && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6 animate-pulse">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-lime-300 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-black"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-xl font-bold text-center">
                Pagamento confirmado!
              </p>
              <p
                className={`text-sm mt-2 ${
                  theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                Sua transação foi processada com sucesso
              </p>
              <p className="text-2xl font-black text-primary mt-6">
                R$ {amount.toFixed(2)}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {step === "method" && (
          <div
            className={`px-8 py-4 border-t text-xs text-center ${
              theme === "dark"
                ? "border-zinc-800 text-zinc-500"
                : "border-zinc-200 text-zinc-600"
            }`}
          >
            Todas as transações são protegidas e criptografadas.
          </div>
        )}
      </div>
    </div>
  );
};
