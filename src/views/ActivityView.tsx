"use client";

import React, { useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { User } from "../types";

export const ActivityView = ({
  user,
  theme,
  onBack,
}: {
  user: User;
  theme: "dark" | "light";
  onBack: () => void;
}) => {
  const [filterType, setFilterType] = useState<"all" | "entrada" | "saida">(
    "all"
  );

  // Separar entradas e saídas do histórico
  const deposits = user.tradeHistory.filter(
    (t) => t.marketQuestion === "Depósito"
  );
  const withdrawals = user.tradeHistory.filter(
    (t) => t.action === "SELL" && t.marketQuestion !== "Depósito"
  );

  const totalEntradas = deposits.reduce((acc, d) => acc + d.totalValue, 0);
  const totalSaidas = withdrawals.reduce((acc, w) => acc + w.totalValue, 0);

  const transactions = [
    ...deposits.map((d) => ({
      id: d.id,
      type: "entrada",
      amount: d.totalValue,
      description: "Depósito",
      timestamp: d.date,
      icon: ArrowDownLeft,
      color: "text-green-500",
      bgColor: "bg-green-500/20",
    })),
    ...withdrawals.map((w) => ({
      id: w.id,
      type: "saida",
      amount: w.totalValue,
      description: "Saque",
      timestamp: w.date,
      icon: ArrowUpRight,
      color: "text-red-500",
      bgColor: "bg-red-500/20",
    })),
  ].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const filteredTransactions =
    filterType === "all"
      ? transactions
      : transactions.filter((t) => t.type === filterType);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(val);
  };

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
            Entradas e Saídas
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Total Entradas */}
          <div
            className={`rounded-2xl p-8 border ${
              theme === "dark"
                ? "bg-zinc-900/30 border-zinc-800"
                : "bg-zinc-50 border-zinc-200"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <p
                className={`text-xs font-black uppercase tracking-widest ${
                  theme === "dark" ? "text-zinc-500" : "text-zinc-600"
                }`}
              >
                Total Entradas
              </p>
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <ArrowDownLeft className="text-green-500" size={20} />
              </div>
            </div>
            <p className="text-3xl font-black text-green-500 mb-2">
              {formatCurrency(totalEntradas)}
            </p>
            <p
              className={`text-xs ${
                theme === "dark" ? "text-zinc-600" : "text-zinc-500"
              }`}
            >
              {deposits.length} transação(ões)
            </p>
          </div>

          {/* Total Saídas */}
          <div
            className={`rounded-2xl p-8 border ${
              theme === "dark"
                ? "bg-zinc-900/30 border-zinc-800"
                : "bg-zinc-50 border-zinc-200"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <p
                className={`text-xs font-black uppercase tracking-widest ${
                  theme === "dark" ? "text-zinc-500" : "text-zinc-600"
                }`}
              >
                Total Saídas
              </p>
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                <ArrowUpRight className="text-red-500" size={20} />
              </div>
            </div>
            <p className="text-3xl font-black text-red-500 mb-2">
              {formatCurrency(totalSaidas)}
            </p>
            <p
              className={`text-xs ${
                theme === "dark" ? "text-zinc-600" : "text-zinc-500"
              }`}
            >
              {withdrawals.length} transação(ões)
            </p>
          </div>

          {/* Saldo Líquido */}
          <div
            className={`rounded-2xl p-8 border ${
              theme === "dark"
                ? "bg-zinc-900/30 border-zinc-800"
                : "bg-zinc-50 border-zinc-200"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <p
                className={`text-xs font-black uppercase tracking-widest ${
                  theme === "dark" ? "text-zinc-500" : "text-zinc-600"
                }`}
              >
                Saldo Líquido
              </p>
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <TrendingUp className="text-primary" size={20} />
              </div>
            </div>
            <p className="text-3xl font-black text-primary mb-2">
              {formatCurrency(totalEntradas - totalSaidas)}
            </p>
            <p
              className={`text-xs ${
                theme === "dark" ? "text-zinc-600" : "text-zinc-500"
              }`}
            >
              Diferença
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-8">
          {[
            { value: "all", label: "Todas" },
            { value: "entrada", label: "Apenas Entradas" },
            { value: "saida", label: "Apenas Saídas" },
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() => setFilterType(filter.value as any)}
              className={`px-6 py-3 rounded-lg font-bold text-sm transition-all ${
                filterType === filter.value
                  ? `bg-primary text-black`
                  : theme === "dark"
                  ? "bg-zinc-800 hover:bg-zinc-700 text-white"
                  : "bg-zinc-100 hover:bg-zinc-200 text-zinc-900"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Transactions List */}
        <div className="space-y-4">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => {
              const IconComponent = transaction.icon;
              return (
                <div
                  key={transaction.id}
                  className={`rounded-2xl p-6 border transition-all ${
                    theme === "dark"
                      ? "bg-zinc-900/30 border-zinc-800 hover:border-zinc-700"
                      : "bg-zinc-50 border-zinc-200 hover:border-zinc-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    {/* Left Side - Icon & Info */}
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${transaction.bgColor}`}
                      >
                        <IconComponent
                          size={24}
                          className={transaction.color}
                        />
                      </div>

                      <div>
                        <p
                          className={`font-bold ${
                            theme === "dark" ? "text-white" : "text-zinc-900"
                          }`}
                        >
                          {transaction.description}
                        </p>
                        <p
                          className={`text-xs mt-1 flex items-center gap-1 ${
                            theme === "dark" ? "text-zinc-500" : "text-zinc-600"
                          }`}
                        >
                          <Calendar size={14} />
                          {new Date(transaction.timestamp).toLocaleDateString(
                            "pt-BR",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Right Side - Amount */}
                    <div className="text-right">
                      <p
                        className={`text-2xl font-black ${
                          transaction.type === "entrada"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {transaction.type === "entrada" ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div
              className={`rounded-2xl p-12 border text-center ${
                theme === "dark"
                  ? "bg-zinc-900/30 border-zinc-800"
                  : "bg-zinc-50 border-zinc-200"
              }`}
            >
              <p
                className={`font-bold text-lg ${
                  theme === "dark" ? "text-zinc-500" : "text-zinc-600"
                }`}
              >
                Nenhuma transação encontrada
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
