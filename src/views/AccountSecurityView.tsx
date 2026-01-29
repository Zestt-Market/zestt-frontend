"use client";

import React, { useState } from "react";
import { ArrowLeft, Lock, Mail, Shield, Smartphone } from "lucide-react";

export const AccountSecurityView = ({
  theme,
  onBack,
}: {
  theme: "dark" | "light";
  onBack: () => void;
}) => {
  const [activeSection, setActiveSection] = useState<
    "password" | "email" | "2fa"
  >("password");

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
            Conta & Segurança
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className={`space-y-2 h-fit sticky top-32`}>
            {[
              { id: "password", label: "Alterar Senha", icon: Lock },
              { id: "email", label: "Alterar Email", icon: Mail },
              { id: "2fa", label: "Autenticação 2FA", icon: Smartphone },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-sm transition-all ${
                  activeSection === id
                    ? theme === "dark"
                      ? "bg-primary/20 text-primary border-l-2 border-primary"
                      : "bg-lime-100/50 text-primary border-l-2 border-primary"
                    : theme === "dark"
                    ? "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeSection === "password" && (
              <div
                className={`rounded-2xl border p-8 ${
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
                  Alterar Senha
                </h2>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      Senha Atual
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-1 focus:ring-primary ${
                        theme === "dark"
                          ? "bg-zinc-800 border-zinc-700 text-white"
                          : "bg-white border-zinc-300 text-zinc-900"
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      Nova Senha
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-1 focus:ring-primary ${
                        theme === "dark"
                          ? "bg-zinc-800 border-zinc-700 text-white"
                          : "bg-white border-zinc-300 text-zinc-900"
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      Confirmar Nova Senha
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-1 focus:ring-primary ${
                        theme === "dark"
                          ? "bg-zinc-800 border-zinc-700 text-white"
                          : "bg-white border-zinc-300 text-zinc-900"
                      }`}
                    />
                  </div>
                  <button className="w-full mt-6 py-3 bg-primary text-black font-black rounded-lg hover:bg-lime-400 transition-all">
                    Salvar Alterações
                  </button>
                </div>
              </div>
            )}

            {activeSection === "email" && (
              <div
                className={`rounded-2xl border p-8 ${
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
                  Alterar Email
                </h2>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      Email Atual
                    </label>
                    <input
                      type="email"
                      defaultValue="usuario@email.com"
                      className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-1 focus:ring-primary ${
                        theme === "dark"
                          ? "bg-zinc-800 border-zinc-700 text-white"
                          : "bg-white border-zinc-300 text-zinc-900"
                      }`}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      Novo Email
                    </label>
                    <input
                      type="email"
                      placeholder="novo@email.com"
                      className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-1 focus:ring-primary ${
                        theme === "dark"
                          ? "bg-zinc-800 border-zinc-700 text-white"
                          : "bg-white border-zinc-300 text-zinc-900"
                      }`}
                    />
                  </div>
                  <p
                    className={`text-xs ${
                      theme === "dark" ? "text-zinc-500" : "text-zinc-600"
                    }`}
                  >
                    Você receberá um link de confirmação no novo email
                  </p>
                  <button className="w-full mt-6 py-3 bg-primary text-black font-black rounded-lg hover:bg-lime-400 transition-all">
                    Alterar Email
                  </button>
                </div>
              </div>
            )}

            {activeSection === "2fa" && (
              <div
                className={`rounded-2xl border p-8 ${
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
                  Autenticação de Dois Fatores
                </h2>
                <div className="space-y-4">
                  <div
                    className={`p-4 rounded-lg ${
                      theme === "dark"
                        ? "bg-green-500/10 border border-green-500/30"
                        : "bg-green-50 border border-green-200"
                    }`}
                  >
                    <p
                      className={`font-bold text-sm ${
                        theme === "dark" ? "text-green-400" : "text-green-700"
                      }`}
                    >
                      ✓ 2FA Ativado
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        theme === "dark" ? "text-green-300" : "text-green-600"
                      }`}
                    >
                      Sua conta está protegida com autenticação de dois fatores
                      via Google Authenticator
                    </p>
                  </div>
                  <button
                    className={`w-full py-3 border-2 border-red-500 text-red-500 font-black rounded-lg hover:bg-red-500/10 transition-all`}
                  >
                    Desativar 2FA
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
