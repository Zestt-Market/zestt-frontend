"use client";

import React, { useState } from "react";
import QRCode from "qrcode";
import { X } from "lucide-react";
import { PaymentOptionsModal } from "./PaymentOptionsModal";

interface DepositModalProps {
  onClose: () => void;
  onDeposit: (payload: { amount: number; date: string; id: string }) => void;
  theme?: "dark" | "light";
}

export const DepositModal: React.FC<DepositModalProps> = ({
  onClose,
  onDeposit,
  theme = "dark",
}) => {
  const [amount, setAmount] = useState<number>(100);
  const [qr, setQr] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [optionsVisible, setOptionsVisible] = useState(false);

  const generateQr = async () => {
    setGenerating(true);
    try {
      const payload = {
        id: `dep-${Date.now()}`,
        amount,
        date: new Date().toLocaleString("pt-BR"),
      };
      const txt = JSON.stringify(payload);
      const d = await (QRCode as any).toDataURL(txt, {
        errorCorrectionLevel: "H",
        margin: 1,
      });
      setQr(d);
    } catch (err) {
      console.error(err);
      setQr(null);
    } finally {
      setGenerating(false);
    }
  };

  const confirmDeposit = () => {
    const id = `dep-${Date.now()}`;
    const date = new Date().toLocaleString("pt-BR");
    onDeposit({ amount, date, id });
    onClose();
  };

  const handlePayMethod = (method: string, payload?: any) => {
    // For prototype we just confirm deposit when any method is chosen
    if (method === "apple_pay" || method === "google_pay" || method === "pix") {
      confirmDeposit();
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className={`relative w-full max-w-md rounded-2xl p-6 ${
          theme === "dark" ? "bg-zinc-900" : "bg-white"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:bg-white/5"
        >
          <X size={18} />
        </button>
        <h3 className="text-xl font-bold mb-4">Depositar</h3>
        <label className="text-sm text-zinc-400">Valor (BRL)</label>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-2xl font-bold">R$</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="flex-1 bg-transparent outline-none text-2xl font-bold"
          />
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setOptionsVisible(true)}
            className="px-4 py-2 bg-primary text-black rounded font-bold"
          >
            Opções de pagamento
          </button>
          <button
            onClick={confirmDeposit}
            className="px-4 py-2 bg-green-600 text-white rounded font-bold"
          >
            Confirmar depósito
          </button>
        </div>

        {optionsVisible && (
          <PaymentOptionsModal
            amount={amount}
            onClose={() => setOptionsVisible(false)}
            onPay={handlePayMethod}
            theme={theme}
          />
        )}
      </div>
    </div>
  );
};
