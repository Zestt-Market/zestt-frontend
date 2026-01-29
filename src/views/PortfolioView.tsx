"use client";

import React, { useState } from "react";
import {
  ArrowUpRight,
  ArrowDownLeft,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { User, Trade } from "../types";

interface PortfolioViewProps {
  user: User;
  theme: "dark" | "light";
  onBack: () => void;
}

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(val);
};

export const PortfolioView = ({ user, theme, onBack }: PortfolioViewProps) => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "transactions" | "positions"
  >("overview");

  const totalBalance = user.balance + user.portfolioValue;
  const gains =
    user.portfolioValue -
    user.tradeHistory.reduce(
      (acc, t) => (t.action === "BUY" ? acc + t.totalValue : acc),
      0
    );

  // Separate deposits and trades
  const deposits = user.tradeHistory.filter(
    (t) => t.marketQuestion === "Depósito"
  );
  const trades = user.tradeHistory.filter(
    (t) => t.marketQuestion !== "Depósito"
  );

  // Calculate total in/out
  const totalDeposited = deposits.reduce((acc, d) => acc + d.totalValue, 0);
  const totalWithdrawn = 0; // Can be enhanced later
  const totalTradeVolume = trades.reduce((acc, t) => acc + t.totalValue, 0);

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
            Seu Portfolio
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Total Balance */}
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
              Patrimônio Total
            </p>
            <p className="text-4xl font-black text-primary mb-2">
              {formatCurrency(totalBalance)}
            </p>
            <p
              className={`text-xs ${
                theme === "dark" ? "text-zinc-600" : "text-zinc-500"
              }`}
            >
              Saldo + Investimentos
            </p>
          </div>

          {/* Available Balance */}
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
              Saldo Disponível
            </p>
            <p className="text-4xl font-black text-lime-400 mb-2">
              {formatCurrency(user.balance)}
            </p>
            <p
              className={`text-xs ${
                theme === "dark" ? "text-zinc-600" : "text-zinc-500"
              }`}
            >
              Pronto para investir
            </p>
          </div>

          {/* Invested */}
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
              Investido
            </p>
            <p className="text-4xl font-black text-blue-400 mb-2">
              {formatCurrency(user.portfolioValue)}
            </p>
            <p
              className={`text-xs ${
                theme === "dark" ? "text-zinc-600" : "text-zinc-500"
              }`}
            >
              Em posições ativas
            </p>
          </div>

          {/* Gains */}
          <div
            className={`rounded-2xl p-8 border ${
              theme === "dark"
                ? "bg-zinc-900/30 border-zinc-800"
                : "bg-zinc-50 border-zinc-200"
            }`}
          >
            <p
              className={`text-xs font-black uppercase tracking-widest mb-3 ${
                gains >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              Ganhos/Perdas
            </p>
            <p
              className={`text-4xl font-black mb-2 ${
                gains >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {formatCurrency(gains)}
            </p>
            <p
              className={`text-xs ${
                theme === "dark" ? "text-zinc-600" : "text-zinc-500"
              }`}
            >
              {gains >= 0 ? "Lucro estimado" : "Prejuízo estimado"}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-zinc-800">
          {(["overview", "transactions", "positions"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-2 font-bold uppercase text-sm transition-all ${
                activeTab === tab
                  ? `text-primary border-b-2 border-primary`
                  : theme === "dark"
                  ? "text-zinc-500 hover:text-zinc-300"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              {tab === "overview" && "Visão Geral"}
              {tab === "transactions" && "Transações"}
              {tab === "positions" && "Posições"}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Deposits vs Withdrawals */}
            <div
              className={`rounded-2xl p-8 border ${
                theme === "dark"
                  ? "bg-zinc-900/30 border-zinc-800"
                  : "bg-zinc-50 border-zinc-200"
              }`}
            >
              <h3
                className={`text-xl font-black mb-6 uppercase tracking-tight ${
                  theme === "dark" ? "text-white" : "text-zinc-900"
                }`}
              >
                Fluxo de Caixa
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <ArrowDownLeft className="text-green-500" size={20} />
                    </div>
                    <div>
                      <p
                        className={`text-xs uppercase font-bold tracking-wider ${
                          theme === "dark" ? "text-zinc-500" : "text-zinc-600"
                        }`}
                      >
                        Depósitos
                      </p>
                      <p
                        className={`text-sm font-black ${
                          theme === "dark" ? "text-white" : "text-zinc-900"
                        }`}
                      >
                        {deposits.length} transação(ões)
                      </p>
                    </div>
                  </div>
                  <p className="text-2xl font-black text-green-500">
                    +{formatCurrency(totalDeposited)}
                  </p>
                </div>

                <div className="border-t border-zinc-800"></div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                      <ArrowUpRight className="text-red-500" size={20} />
                    </div>
                    <div>
                      <p
                        className={`text-xs uppercase font-bold tracking-wider ${
                          theme === "dark" ? "text-zinc-500" : "text-zinc-600"
                        }`}
                      >
                        Saques
                      </p>
                      <p
                        className={`text-sm font-black ${
                          theme === "dark" ? "text-white" : "text-zinc-900"
                        }`}
                      >
                        0 transação(ões)
                      </p>
                    </div>
                  </div>
                  <p className="text-2xl font-black text-red-500">
                    -{formatCurrency(totalWithdrawn)}
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div
              className={`rounded-2xl p-8 border ${
                theme === "dark"
                  ? "bg-zinc-900/30 border-zinc-800"
                  : "bg-zinc-50 border-zinc-200"
              }`}
            >
              <h3
                className={`text-xl font-black mb-6 uppercase tracking-tight ${
                  theme === "dark" ? "text-white" : "text-zinc-900"
                }`}
              >
                Atividade Recente
              </h3>
              <div className="space-y-3">
                {user.tradeHistory.slice(0, 5).map((trade) => (
                  <div
                    key={trade.id}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      theme === "dark" ? "bg-zinc-800/50" : "bg-zinc-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          trade.action === "BUY"
                            ? "bg-blue-500/20"
                            : "bg-green-500/20"
                        }`}
                      >
                        {trade.action === "BUY" ? (
                          <TrendingUp className="text-blue-500" size={20} />
                        ) : (
                          <ArrowUpRight className="text-green-500" size={20} />
                        )}
                      </div>
                      <div>
                        <p
                          className={`text-sm font-bold ${
                            theme === "dark" ? "text-white" : "text-zinc-900"
                          }`}
                        >
                          {trade.marketQuestion}
                        </p>
                        <p
                          className={`text-xs ${
                            theme === "dark" ? "text-zinc-500" : "text-zinc-600"
                          }`}
                        >
                          {new Date(trade.date).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-sm font-black ${
                          trade.action === "BUY"
                            ? "text-blue-500"
                            : "text-green-500"
                        }`}
                      >
                        {trade.action === "BUY" ? "-" : "+"}
                        {formatCurrency(trade.totalValue)}
                      </p>
                      <p
                        className={`text-xs ${
                          theme === "dark" ? "text-zinc-600" : "text-zinc-500"
                        }`}
                      >
                        {trade.side} @ {(trade.price * 100).toFixed(0)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === "transactions" && (
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
                      Data
                    </th>
                    <th
                      className={`px-8 py-4 font-black uppercase text-xs tracking-wider ${
                        theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                      }`}
                    >
                      Mercado
                    </th>
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
                      Quantidade
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
                  {user.tradeHistory.map((trade) => (
                    <tr
                      key={trade.id}
                      className={`border-t ${
                        theme === "dark"
                          ? "border-zinc-800 hover:bg-zinc-800/30"
                          : "border-zinc-200 hover:bg-zinc-100"
                      }`}
                    >
                      <td
                        className={`px-8 py-4 ${
                          theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                        }`}
                      >
                        {new Date(trade.date).toLocaleDateString("pt-BR")}
                      </td>
                      <td
                        className={`px-8 py-4 font-semibold ${
                          theme === "dark" ? "text-white" : "text-zinc-900"
                        }`}
                      >
                        {trade.marketQuestion}
                      </td>
                      <td className={`px-8 py-4 font-bold`}>
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            trade.action === "BUY"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-green-500/20 text-green-400"
                          }`}
                        >
                          {trade.action === "BUY" ? "Compra" : "Venda"}
                        </span>
                      </td>
                      <td
                        className={`px-8 py-4 font-semibold ${
                          theme === "dark" ? "text-white" : "text-zinc-900"
                        }`}
                      >
                        {trade.quantity.toFixed(2)}
                      </td>
                      <td className={`px-8 py-4 font-black text-right`}>
                        <span
                          className={
                            trade.action === "BUY"
                              ? "text-blue-500"
                              : "text-green-500"
                          }
                        >
                          {trade.action === "BUY" ? "-" : "+"}
                          {formatCurrency(trade.totalValue)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Positions Tab */}
        {activeTab === "positions" && (
          <div
            className={`rounded-2xl border ${
              theme === "dark"
                ? "bg-zinc-900/30 border-zinc-800"
                : "bg-zinc-50 border-zinc-200"
            } p-8`}
          >
            {user.positions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.positions.map((pos) => (
                  <div
                    key={pos.marketId}
                    className={`rounded-xl p-6 border ${
                      theme === "dark"
                        ? "bg-zinc-800/50 border-zinc-700"
                        : "bg-white border-zinc-200"
                    }`}
                  >
                    <h4
                      className={`font-bold text-sm mb-4 line-clamp-2 ${
                        theme === "dark" ? "text-white" : "text-zinc-900"
                      }`}
                    >
                      {pos.marketQuestion}
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <p
                          className={`text-xs uppercase font-bold tracking-wider ${
                            theme === "dark" ? "text-zinc-500" : "text-zinc-600"
                          }`}
                        >
                          Lado
                        </p>
                        <p
                          className={`font-black text-lg ${
                            pos.side === "YES"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {pos.side}
                        </p>
                      </div>
                      <div>
                        <p
                          className={`text-xs uppercase font-bold tracking-wider ${
                            theme === "dark" ? "text-zinc-500" : "text-zinc-600"
                          }`}
                        >
                          Quantidade
                        </p>
                        <p
                          className={`font-black text-lg ${
                            theme === "dark" ? "text-white" : "text-zinc-900"
                          }`}
                        >
                          {pos.quantity.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p
                          className={`text-xs uppercase font-bold tracking-wider ${
                            theme === "dark" ? "text-zinc-500" : "text-zinc-600"
                          }`}
                        >
                          Preço médio
                        </p>
                        <p className="font-black text-lg text-primary">
                          {(pos.avgPrice * 100).toFixed(0)}%
                        </p>
                      </div>
                      <div>
                        <p
                          className={`text-xs uppercase font-bold tracking-wider ${
                            theme === "dark" ? "text-zinc-500" : "text-zinc-600"
                          }`}
                        >
                          Preço atual
                        </p>
                        <p className="font-black text-lg text-lime-400">
                          {(pos.currentPrice * 100).toFixed(0)}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p
                  className={`text-lg font-bold ${
                    theme === "dark" ? "text-zinc-500" : "text-zinc-600"
                  }`}
                >
                  Nenhuma posição ativa no momento
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
