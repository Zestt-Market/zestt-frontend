"use client";

import React from "react";
import { ArrowUpRight, ArrowDownLeft, Calendar } from "lucide-react";

export const TransfersView = ({
  theme,
  onBack,
}: {
  theme: "dark" | "light";
  onBack: () => void;
}) => {
  const transfers = [
    {
      id: "1",
      type: "deposit",
      amount: 500,
      bank: "Nubank",
      status: "Concluído",
      date: "2025-01-12",
      time: "14:32",
    },
    {
      id: "2",
      type: "withdrawal",
      amount: 250,
      bank: "Itaú",
      status: "Concluído",
      date: "2025-01-10",
      time: "10:15",
    },
    {
      id: "3",
      type: "deposit",
      amount: 1000,
      bank: "Bradesco",
      status: "Concluído",
      date: "2025-01-08",
      time: "09:45",
    },
  ];

  return (
    <div
      className={`min-h-screen ${theme === "dark" ? "bg-black" : "bg-white"}`}
    >
      {/* Header */}
      <div
        className={`border-b ${
          theme === "dark"
            ? "border-zinc-800 bg-zinc-950/50"
            : "border-zinc-200 bg-zinc-50"
        }`}
      >
        <div className="container mx-auto px-6 py-8">
          <button
            onClick={onBack}
            className={`flex items-center gap-2 mb-6 text-sm font-bold uppercase transition-colors ${
              theme === "dark"
                ? "text-zinc-400 hover:text-white"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            ← Voltar
          </button>
          <h1
            className={`text-5xl font-black uppercase tracking-tighter ${
              theme === "dark" ? "text-white" : "text-zinc-900"
            }`}
          >
            Transferências
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Stats */}
          <div
            className={`rounded-2xl p-8 border ${
              theme === "dark"
                ? "bg-zinc-900/30 border-zinc-800"
                : "bg-zinc-50 border-zinc-200"
            }`}
          >
            <p
              className={`text-xs font-black uppercase tracking-widest mb-3 ${
                theme === "dark" ? "text-zinc-500" : "text-zinc-600"
              }`}
            >
              Total Depositado
            </p>
            <p className="text-4xl font-black text-green-500">R$ 1.500,00</p>
          </div>

          <div
            className={`rounded-2xl p-8 border ${
              theme === "dark"
                ? "bg-zinc-900/30 border-zinc-800"
                : "bg-zinc-50 border-zinc-200"
            }`}
          >
            <p
              className={`text-xs font-black uppercase tracking-widest mb-3 ${
                theme === "dark" ? "text-zinc-500" : "text-zinc-600"
              }`}
            >
              Total Sacado
            </p>
            <p className="text-4xl font-black text-red-500">R$ 250,00</p>
          </div>

          <div
            className={`rounded-2xl p-8 border ${
              theme === "dark"
                ? "bg-zinc-900/30 border-zinc-800"
                : "bg-zinc-50 border-zinc-200"
            }`}
          >
            <p
              className={`text-xs font-black uppercase tracking-widest mb-3 ${
                theme === "dark" ? "text-zinc-500" : "text-zinc-600"
              }`}
            >
              Saldo Líquido
            </p>
            <p className="text-4xl font-black text-primary">R$ 1.250,00</p>
          </div>
        </div>

        {/* Transfers List */}
        <div
          className={`rounded-2xl border ${
            theme === "dark"
              ? "bg-zinc-900/30 border-zinc-800"
              : "bg-zinc-50 border-zinc-200"
          }`}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead
                className={`border-b ${
                  theme === "dark" ? "border-zinc-800" : "border-zinc-200"
                }`}
              >
                <tr>
                  <th
                    className={`px-8 py-4 font-black uppercase text-xs tracking-wider ${
                      theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                    }`}
                  >
                    Tipo
                  </th>
                  <th
                    className={`px-8 py-4 font-black uppercase text-xs tracking-wider ${
                      theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                    }`}
                  >
                    Banco
                  </th>
                  <th
                    className={`px-8 py-4 font-black uppercase text-xs tracking-wider ${
                      theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                    }`}
                  >
                    Data
                  </th>
                  <th
                    className={`px-8 py-4 font-black uppercase text-xs tracking-wider ${
                      theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                    }`}
                  >
                    Status
                  </th>
                  <th
                    className={`px-8 py-4 font-black uppercase text-xs tracking-wider text-right ${
                      theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                    }`}
                  >
                    Valor
                  </th>
                </tr>
              </thead>
              <tbody>
                {transfers.map((transfer) => (
                  <tr
                    key={transfer.id}
                    className={`border-t ${
                      theme === "dark"
                        ? "border-zinc-800 hover:bg-zinc-800/30"
                        : "border-zinc-200 hover:bg-zinc-100"
                    }`}
                  >
                    <td className={`px-8 py-4 font-bold`}>
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            transfer.type === "deposit"
                              ? "bg-green-500/20"
                              : "bg-red-500/20"
                          }`}
                        >
                          {transfer.type === "deposit" ? (
                            <ArrowDownLeft
                              className="text-green-500"
                              size={16}
                            />
                          ) : (
                            <ArrowUpRight className="text-red-500" size={16} />
                          )}
                        </div>
                        <span
                          className={
                            transfer.type === "deposit"
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {transfer.type === "deposit" ? "Depósito" : "Saque"}
                        </span>
                      </div>
                    </td>
                    <td
                      className={`px-8 py-4 font-semibold ${
                        theme === "dark" ? "text-white" : "text-zinc-900"
                      }`}
                    >
                      {transfer.bank}
                    </td>
                    <td
                      className={`px-8 py-4 font-mono text-xs ${
                        theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {transfer.date} {transfer.time}
                      </div>
                    </td>
                    <td className={`px-8 py-4 font-bold`}>
                      <span className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-500">
                        {transfer.status}
                      </span>
                    </td>
                    <td
                      className={`px-8 py-4 font-black text-right text-lg ${
                        transfer.type === "deposit"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {transfer.type === "deposit" ? "+" : "-"}R${" "}
                      {transfer.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* New Transfer Button */}
        <div className="mt-8 text-center">
          <button className="px-8 py-4 bg-primary text-black font-black rounded-2xl hover:bg-lime-400 transition-all shadow-lg">
            + Nova Transferência
          </button>
        </div>
      </div>
    </div>
  );
};
