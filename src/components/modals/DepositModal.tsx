"use client";

import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { usePayments } from "../../contexts/PaymentsContext";
import { CreditCardForm } from "./deposit/CreditCardForm";
import { DepositForm } from "./deposit/DepositForm";
import { PixQRCodeStep } from "./deposit/PixQRCodeStep";
import { SuccessAnimation } from "./deposit/SuccessAnimation";

interface DepositModalProps {
  onClose: () => void;
  onSuccess?: () => void;
  theme?: "dark" | "light";
}

type FlowStep = "form" | "pix-qrcode" | "card-form" | "success";

export const DepositModal: React.FC<DepositModalProps> = ({
  onClose,
  onSuccess,
  theme = "dark",
}) => {
  const [amount, setAmount] = useState<string>("100");
  const [currency, setCurrency] = useState<"BRL" | "USD">("BRL");
  const [paymentMethod, setPaymentMethod] = useState<"PIX" | "CREDIT_CARD">("PIX");
  const { createDeposit, loading, error } = usePayments();
  const [step, setStep] = useState<FlowStep>("form");
  const [pixQRCode, setPixQRCode] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(120);

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");

  // Countdown timer
  useEffect(() => {
    if (step === "pix-qrcode" && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step, countdown]);

  // Detectar quando countdown chegar a 0 e processar pagamento
  useEffect(() => {
    if (step === "pix-qrcode" && countdown === 0) {
      handlePixPaymentComplete();
    }
  }, [countdown, step]);

  const handlePixPaymentComplete = async () => {
    try {
      const amountValue = parseFloat(amount);
      const amountCents = Math.round(amountValue * 100);
      await createDeposit(amountCents, currency, paymentMethod);
      setStep("success");
    } catch (err) {
      console.error("Erro ao confirmar pagamento PIX:", err);
    }
  };

  const handleFormSubmit = async () => {
    const amountValue = parseFloat(amount);

    if (!amountValue || amountValue <= 0) {
      alert("Digite um valor válido!");
      return;
    }

    if (paymentMethod === "PIX") {
      // Generate mock QR Code
      const qrData = `00020126360014br.gov.bcb.pix0114+5511999999999520400005303986540${amountValue.toFixed(
        2
      )}5802BR5913Zest Platform6009Sao Paulo62070503***6304`;
      setPixQRCode(qrData);
      setCountdown(120);
      setStep("pix-qrcode");
    } else {
      setStep("card-form");
    }
  };

  const handleCardSubmit = async () => {
    if (!cardNumber || !cardName || !cardExpiry || !cardCVV) {
      alert("Preencha todos os campos do cartão!");
      return;
    }

    try {
      const amountValue = parseFloat(amount);
      const amountCents = Math.round(amountValue * 100);
      await createDeposit(amountCents, currency, paymentMethod);
      setStep("success");
    } catch (err) {
      console.error("Erro ao criar depósito:", err);
    }
  };

  const handleSuccess = () => {
    onSuccess?.();
    onClose();
  };

  const getTitle = () => {
    switch (step) {
      case "form":
        return "Depositar";
      case "pix-qrcode":
        return "Pagar com PIX";
      case "card-form":
        return "Dados do Cartão";
      case "success":
        return "Sucesso!";
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={step === "success" ? undefined : onClose}
      />
      <div
        className={`relative w-full max-w-md rounded-3xl shadow-2xl overflow-hidden ${theme === "dark" ? "bg-[#1c2127]" : "bg-white"
          }`}
      >
        {step !== "success" && (
          <button
            onClick={onClose}
            className={`absolute top-6 right-6 p-2 rounded-full transition-colors z-10 ${theme === "dark"
              ? "hover:bg-white/10 text-zinc-400"
              : "hover:bg-zinc-100 text-zinc-600"
              }`}
          >
            <X size={24} />
          </button>
        )}

        <div className="p-8">
          <h3
            className={`text-3xl font-black uppercase tracking-tight mb-6 ${theme === "dark" ? "text-white" : "text-zinc-900"
              }`}
          >
            {getTitle()}
          </h3>

          {step === "form" && (
            <DepositForm
              amount={amount}
              setAmount={setAmount}
              currency={currency}
              setCurrency={setCurrency}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              loading={loading}
              error={error}
              onSubmit={handleFormSubmit}
              theme={theme}
            />
          )}

          {step === "pix-qrcode" && (
            <PixQRCodeStep
              qrCode={pixQRCode}
              amount={parseFloat(amount)}
              currency={currency}
              countdown={countdown}
              onCountdownEnd={() => setStep("success")}
              theme={theme}
            />
          )}

          {step === "card-form" && (
            <CreditCardForm
              cardNumber={cardNumber}
              setCardNumber={setCardNumber}
              cardName={cardName}
              setCardName={setCardName}
              cardExpiry={cardExpiry}
              setCardExpiry={setCardExpiry}
              cardCVV={cardCVV}
              setCardCVV={setCardCVV}
              amount={parseFloat(amount)}
              currency={currency}
              loading={loading}
              onSubmit={handleCardSubmit}
              theme={theme}
            />
          )}

          {step === "success" && (
            <SuccessAnimation
              amount={parseFloat(amount)}
              currency={currency}
              onComplete={handleSuccess}
              theme={theme}
            />
          )}
        </div>
      </div>
    </div>
  );
};
