"use client";

import { Bell, Globe, Lock, Palette, Zap } from "lucide-react";
import { useState } from "react";

export const SettingsView = ({
  theme,
  onThemeChange,
  onBack,
}: {
  theme: "dark" | "light";
  onThemeChange: (theme: "dark" | "light") => void;
  onBack: () => void;
}) => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: true,
    marketAlerts: true,
    priceAlerts: true,
    languagePreference: "pt-BR",
    theme: theme,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleThemeChange = (newTheme: "dark" | "light") => {
    setSettings((prev) => ({
      ...prev,
      theme: newTheme,
    }));
    onThemeChange(newTheme);
  };

  return (
    <div
      className={`min-h-screen ${theme === "dark" ? "bg-black" : "bg-white"}`}
    >
      {/* Header */}
      <div
        className={`border-b ${theme === "dark"
          ? "border-zinc-800 bg-zinc-950/50"
          : "border-zinc-200 bg-zinc-50"
          }`}
      >
        <div className="container mx-auto px-6 py-8">
          <button
            onClick={onBack}
            className={`flex items-center gap-2 mb-6 text-sm font-bold uppercase transition-colors ${theme === "dark"
              ? "text-zinc-400 hover:text-white"
              : "text-zinc-600 hover:text-zinc-900"
              }`}
          >
            ← Voltar
          </button>
          <h1
            className={`text-5xl font-black uppercase tracking-tighter ${theme === "dark" ? "text-white" : "text-zinc-900"
              }`}
          >
            Configurações
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className={`space-y-2 h-fit sticky top-32`}>
            {[
              { id: "notifications", label: "Notificações", icon: Bell },
              { id: "theme", label: "Tema", icon: Palette },
              { id: "language", label: "Idioma", icon: Globe },
              { id: "privacy", label: "Privacidade", icon: Lock },
              { id: "advanced", label: "Avançado", icon: Zap },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-sm transition-all ${theme === "dark"
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
          <div className="lg:col-span-3 space-y-8">
            {/* Notifications */}
            <div
              className={`rounded-2xl border p-8 ${theme === "dark"
                ? "bg-zinc-900/30 border-zinc-800"
                : "bg-zinc-50 border-zinc-200"
                }`}
            >
              <h2
                className={`text-2xl font-black mb-6 uppercase ${theme === "dark" ? "text-white" : "text-zinc-900"
                  }`}
              >
                Notificações
              </h2>
              <div className="space-y-4">
                {[
                  {
                    key: "emailNotifications",
                    label: "Notificações por Email",
                    description: "Receba atualizações importantes por email",
                  },
                  {
                    key: "pushNotifications",
                    label: "Notificações Push",
                    description: "Receba alertas em tempo real",
                  },
                  {
                    key: "smsNotifications",
                    label: "Notificações por SMS",
                    description: "Alertas críticos por mensagem",
                  },
                  {
                    key: "marketAlerts",
                    label: "Alertas de Mercado",
                    description: "Notificações sobre movimentação de mercados",
                  },
                  {
                    key: "priceAlerts",
                    label: "Alertas de Preço",
                    description: "Notificações quando preços atingem seu alvo",
                  },
                ].map(({ key, label, description }) => (
                  <div
                    key={key}
                    className={`flex items-center justify-between p-4 rounded-lg ${theme === "dark"
                      ? "bg-zinc-800/30 border border-zinc-700"
                      : "bg-white border border-zinc-200"
                      }`}
                  >
                    <div>
                      <p
                        className={`font-bold ${theme === "dark" ? "text-white" : "text-zinc-900"
                          }`}
                      >
                        {label}
                      </p>
                      <p
                        className={`text-xs mt-1 ${theme === "dark" ? "text-zinc-500" : "text-zinc-600"
                          }`}
                      >
                        {description}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={
                          settings[key as keyof typeof settings] as boolean
                        }
                        onChange={() => handleToggle(key as keyof typeof settings)}
                        className="sr-only peer"
                      />
                      <div
                        className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${settings[key as keyof typeof settings]
                          ? "bg-primary"
                          : ""
                          }`}
                      ></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Theme */}
            <div
              className={`rounded-2xl border p-8 ${theme === "dark"
                ? "bg-zinc-900/30 border-zinc-800"
                : "bg-zinc-50 border-zinc-200"
                }`}
            >
              <h2
                className={`text-2xl font-black mb-6 uppercase ${theme === "dark" ? "text-white" : "text-zinc-900"
                  }`}
              >
                Tema
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: "dark", label: "Escuro", icon: "🌙" },
                  { id: "light", label: "Claro", icon: "☀️" },
                ].map(({ id, label, icon }) => (
                  <button
                    key={id}
                    onClick={() => handleThemeChange(id as "dark" | "light")}
                    className={`p-6 rounded-xl font-bold text-center transition-all border-2 ${settings.theme === id
                      ? "border-primary bg-primary/10"
                      : theme === "dark"
                        ? "border-zinc-700 hover:border-zinc-600"
                        : "border-zinc-300 hover:border-zinc-400"
                      }`}
                  >
                    <div className="text-4xl mb-2">{icon}</div>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Language */}
            <div
              className={`rounded-2xl border p-8 ${theme === "dark"
                ? "bg-zinc-900/30 border-zinc-800"
                : "bg-zinc-50 border-zinc-200"
                }`}
            >
              <h2
                className={`text-2xl font-black mb-6 uppercase ${theme === "dark" ? "text-white" : "text-zinc-900"
                  }`}
              >
                Idioma
              </h2>
              <select
                value={settings.languagePreference}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    languagePreference: e.target.value,
                  }))
                }
                className={`w-full px-4 py-3 rounded-lg font-bold border transition-all focus:outline-none focus:ring-1 focus:ring-primary ${theme === "dark"
                  ? "bg-zinc-800 border-zinc-700 text-white"
                  : "bg-white border-zinc-300 text-zinc-900"
                  }`}
              >
                <option value="pt-BR">Português (Brasil)</option>
                <option value="en-US">English (US)</option>
                <option value="es-ES">Español (España)</option>
              </select>
            </div>

            {/* Save Button */}
            <div className="flex gap-4">
              <button className="flex-1 py-4 bg-primary text-black font-black rounded-lg hover:bg-lime-400 transition-all">
                Salvar Alterações
              </button>
              <button
                onClick={onBack}
                className={`flex-1 py-4 border-2 font-black rounded-lg transition-all ${theme === "dark"
                  ? "border-zinc-700 hover:border-zinc-600 text-white"
                  : "border-zinc-300 hover:border-zinc-400 text-zinc-900"
                  }`}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
