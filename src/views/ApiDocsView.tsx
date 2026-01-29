"use client";

import React, { useState } from "react";
import { Code, Copy, Eye, EyeOff, RefreshCw } from "lucide-react";

export const ApiDocsView = ({
  theme,
  onBack,
}: {
  theme: "dark" | "light";
  onBack: () => void;
}) => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKey] = useState("sk_live_abc123def456ghi789jkl");

  const endpoints = [
    {
      method: "GET",
      path: "/api/v1/markets",
      description: "Lista todos os mercados abertos",
      params: ["limit", "offset", "category"],
    },
    {
      method: "POST",
      path: "/api/v1/trades",
      description: "Cria uma nova operação",
      params: ["market_id", "side", "quantity", "price"],
    },
    {
      method: "GET",
      path: "/api/v1/portfolio",
      description: "Retorna informações do portfólio",
      params: ["user_id"],
    },
    {
      method: "GET",
      path: "/api/v1/positions",
      description: "Lista posições abertas",
      params: ["limit", "offset"],
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
            Documentação API
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* API Key Section */}
        <div
          className={`rounded-2xl border p-8 mb-12 ${
            theme === "dark"
              ? "bg-zinc-900/30 border-zinc-800"
              : "bg-zinc-50 border-zinc-200"
          }`}
        >
          <h2
            className={`text-2xl font-black mb-6 uppercase ${
              theme === "dark" ? "text-white" : "text-zinc-900"
            }`}
          >
            Sua API Key
          </h2>
          <div
            className={`flex items-center gap-4 p-4 rounded-lg border ${
              theme === "dark"
                ? "bg-zinc-800/50 border-zinc-700"
                : "bg-white border-zinc-200"
            }`}
          >
            <div className="flex-1">
              <p
                className={`text-sm font-mono font-bold ${
                  showApiKey
                    ? "text-white"
                    : theme === "dark"
                    ? "text-zinc-500"
                    : "text-zinc-600"
                }`}
              >
                {showApiKey ? apiKey : "••••••••••••••••••••••••••"}
              </p>
            </div>
            <button
              onClick={() => setShowApiKey(!showApiKey)}
              className={`p-2 rounded-lg transition-colors ${
                theme === "dark"
                  ? "hover:bg-zinc-700 text-zinc-400"
                  : "hover:bg-zinc-100 text-zinc-600"
              }`}
            >
              {showApiKey ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            <button
              className={`p-2 rounded-lg transition-colors ${
                theme === "dark"
                  ? "hover:bg-zinc-700 text-zinc-400"
                  : "hover:bg-zinc-100 text-zinc-600"
              }`}
            >
              <Copy size={20} />
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all ${
                theme === "dark"
                  ? "bg-zinc-700 hover:bg-zinc-600 text-white"
                  : "bg-zinc-200 hover:bg-zinc-300 text-zinc-900"
              }`}
            >
              <RefreshCw size={16} />
              Regenerar
            </button>
          </div>
        </div>

        {/* Endpoints */}
        <div className="space-y-6 mb-16">
          <h2
            className={`text-2xl font-black uppercase ${
              theme === "dark" ? "text-white" : "text-zinc-900"
            }`}
          >
            Endpoints Disponíveis
          </h2>

          {endpoints.map((endpoint, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border p-6 ${
                theme === "dark"
                  ? "bg-zinc-900/30 border-zinc-800 hover:border-zinc-700"
                  : "bg-zinc-50 border-zinc-200 hover:border-zinc-300"
              } transition-all`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`px-3 py-1 rounded font-black text-xs ${
                    endpoint.method === "GET"
                      ? "bg-blue-500/20 text-blue-500"
                      : "bg-green-500/20 text-green-500"
                  }`}
                >
                  {endpoint.method}
                </div>
                <div className="flex-1">
                  <p
                    className={`font-mono font-bold ${
                      theme === "dark" ? "text-primary" : "text-primary"
                    }`}
                  >
                    {endpoint.path}
                  </p>
                  <p
                    className={`text-sm mt-1 ${
                      theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                    }`}
                  >
                    {endpoint.description}
                  </p>
                </div>
              </div>

              {endpoint.params.length > 0 && (
                <div
                  className={`mt-4 pt-4 border-t ${
                    theme === "dark" ? "border-zinc-800" : "border-zinc-200"
                  }`}
                >
                  <p
                    className={`text-xs font-bold uppercase tracking-wider mb-3 ${
                      theme === "dark" ? "text-zinc-500" : "text-zinc-600"
                    }`}
                  >
                    Parâmetros
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {endpoint.params.map((param, i) => (
                      <div
                        key={i}
                        className={`px-3 py-2 rounded text-xs font-mono ${
                          theme === "dark"
                            ? "bg-zinc-800 text-zinc-300"
                            : "bg-zinc-100 text-zinc-700"
                        }`}
                      >
                        {param}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Code Examples */}
        <div>
          <h2
            className={`text-2xl font-black mb-6 uppercase ${
              theme === "dark" ? "text-white" : "text-zinc-900"
            }`}
          >
            Exemplo de Uso
          </h2>
          <div
            className={`rounded-2xl border p-6 ${
              theme === "dark"
                ? "bg-zinc-900/30 border-zinc-800"
                : "bg-zinc-50 border-zinc-200"
            }`}
          >
            <div className="flex items-center gap-2 mb-4">
              <Code size={20} className="text-primary" />
              <span
                className={`font-bold ${
                  theme === "dark" ? "text-white" : "text-zinc-900"
                }`}
              >
                Python
              </span>
            </div>
            <pre
              className={`font-mono text-sm p-4 rounded-lg overflow-x-auto ${
                theme === "dark"
                  ? "bg-black text-green-400"
                  : "bg-white text-green-700"
              }`}
            >
              {`import requests

headers = {
  "Authorization": "Bearer YOUR_API_KEY",
  "Content-Type": "application/json"
}

# Get markets
response = requests.get(
  "https://api.zest.markets/v1/markets",
  headers=headers,
  params={"limit": 10}
)

markets = response.json()
print(markets)`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
