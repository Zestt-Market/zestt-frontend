"use client";

import React, { useState } from "react";
import QRCode from "qrcode";
import { X } from "lucide-react";

interface Props {
  amount: number;
  onClose: () => void;
  onPay: (method: string, payload?: any) => void;
  theme?: "dark" | "light";
}

export const PaymentOptionsModal: React.FC<Props> = ({
  amount,
  onClose,
  onPay,
  theme = "dark",
}) => {
  const [qr, setQr] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  const generateQr = async () => {
    setGenerating(true);
    try {
      const payload = {
        id: `pay-${Date.now()}`,
        amount,
        date: new Date().toLocaleString("pt-BR"),
        method: "QR",
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

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div
        className={`relative w-full max-w-2xl rounded-2xl p-6 ${
          theme === "dark" ? "bg-zinc-900" : "bg-white"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:bg-white/5"
        >
          <X size={18} />
        </button>

        <h3 className="text-xl font-bold mb-4">
          Escolha seu método de pagamento
        </h3>
        <p className="text-sm text-zinc-400 mb-4">
          Valor: <span className="font-bold">R$ {amount.toFixed(2)}</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => onPay("apple_pay")}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-black text-white font-bold"
          >
            <span className="text-2xl"></span>
            <span>Apple Pay</span>
          </button>

          <button
            onClick={() => onPay("google_pay")}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white text-black border"
          >
            <span className="text-2xl font-bold">G</span>
            <span>Google Pay</span>
          </button>

          <div className="flex flex-col items-center p-4 rounded-xl bg-zinc-800">
            <button
              onClick={generateQr}
              className="px-3 py-2 bg-primary text-black rounded font-bold w-full"
            >
              Gerar QR
            </button>
            {generating && (
              <div className="text-sm text-zinc-400 mt-2">Gerando QR...</div>
            )}
            {qr && (
              <img
                src={qr}
                alt="QR"
                className="w-40 h-40 mt-3 rounded bg-white p-2"
              />
            )}
            <button
              onClick={() => onPay("pix", { qr })}
              className="mt-3 px-3 py-2 bg-green-600 text-white rounded font-bold w-full"
            >
              Pagar com QR
            </button>
          </div>
        </div>

        <div className="mt-6 text-sm text-zinc-500">
          Métodos adicionais: Cartão de Crédito, Boleto, Transferência bancária
          (opções podem ser integradas posteriormente).
        </div>
      </div>
    </div>
  );
};
