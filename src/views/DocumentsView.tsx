"use client";

import React from "react";
import { FileText, Download, Eye, MoreVertical, Plus } from "lucide-react";

export const DocumentsView = ({
  theme,
  onBack,
}: {
  theme: "dark" | "light";
  onBack: () => void;
}) => {
  const documents = [
    {
      id: "1",
      name: "RG Frente",
      type: "Documento de Identidade",
      uploadDate: "2025-01-05",
      status: "Verificado",
      size: "2.4 MB",
    },
    {
      id: "2",
      name: "RG Verso",
      type: "Documento de Identidade",
      uploadDate: "2025-01-05",
      status: "Verificado",
      size: "2.1 MB",
    },
    {
      id: "3",
      name: "Comprovante de Residência",
      type: "Endereço",
      uploadDate: "2025-01-10",
      status: "Pendente",
      size: "1.8 MB",
    },
    {
      id: "4",
      name: "CPF",
      type: "Documento Fiscal",
      uploadDate: "2025-01-05",
      status: "Verificado",
      size: "0.9 MB",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Verificado":
        return "text-green-500";
      case "Pendente":
        return "text-yellow-500";
      case "Rejeitado":
        return "text-red-500";
      default:
        return "text-zinc-500";
    }
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
          <div className="flex items-center justify-between">
            <h1
              className={`text-5xl font-black uppercase tracking-tighter ${
                theme === "dark" ? "text-white" : "text-zinc-900"
              }`}
            >
              Documentos
            </h1>
            <button className="flex items-center gap-2 px-6 py-3 bg-primary text-black font-black rounded-lg hover:bg-lime-400 transition-all">
              <Plus size={20} />
              Enviar Documento
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Verification Status */}
        <div
          className={`rounded-2xl p-8 border mb-12 ${
            theme === "dark"
              ? "bg-zinc-900/30 border-zinc-800"
              : "bg-zinc-50 border-zinc-200"
          }`}
        >
          <h2
            className={`text-lg font-black mb-4 uppercase ${
              theme === "dark" ? "text-white" : "text-zinc-900"
            }`}
          >
            Status de Verificação
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="text-xl font-black text-green-500">3</span>
              </div>
              <div>
                <p
                  className={`text-sm font-bold ${
                    theme === "dark" ? "text-white" : "text-zinc-900"
                  }`}
                >
                  Verificados
                </p>
                <p
                  className={`text-xs ${
                    theme === "dark" ? "text-zinc-500" : "text-zinc-600"
                  }`}
                >
                  Documentos ok
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <span className="text-xl font-black text-yellow-500">1</span>
              </div>
              <div>
                <p
                  className={`text-sm font-bold ${
                    theme === "dark" ? "text-white" : "text-zinc-900"
                  }`}
                >
                  Pendentes
                </p>
                <p
                  className={`text-xs ${
                    theme === "dark" ? "text-zinc-500" : "text-zinc-600"
                  }`}
                >
                  Aguardando análise
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-xl font-black text-primary">75%</span>
              </div>
              <div>
                <p
                  className={`text-sm font-bold ${
                    theme === "dark" ? "text-white" : "text-zinc-900"
                  }`}
                >
                  Progresso
                </p>
                <p
                  className={`text-xs ${
                    theme === "dark" ? "text-zinc-500" : "text-zinc-600"
                  }`}
                >
                  Quase completo
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className={`rounded-2xl p-6 border transition-all hover:border-primary ${
                theme === "dark"
                  ? "bg-zinc-900/30 border-zinc-800"
                  : "bg-zinc-50 border-zinc-200"
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    theme === "dark" ? "bg-zinc-800" : "bg-zinc-100"
                  }`}
                >
                  <FileText className="text-primary" size={24} />
                </div>
                <button
                  className={`p-2 rounded-lg transition-colors ${
                    theme === "dark" ? "hover:bg-zinc-800" : "hover:bg-zinc-100"
                  }`}
                >
                  <MoreVertical
                    size={18}
                    className={
                      theme === "dark" ? "text-zinc-500" : "text-zinc-600"
                    }
                  />
                </button>
              </div>

              {/* Content */}
              <div className="mb-4">
                <h3
                  className={`font-bold mb-1 ${
                    theme === "dark" ? "text-white" : "text-zinc-900"
                  }`}
                >
                  {doc.name}
                </h3>
                <p
                  className={`text-xs ${
                    theme === "dark" ? "text-zinc-500" : "text-zinc-600"
                  }`}
                >
                  {doc.type}
                </p>
              </div>

              {/* Status */}
              <div className="mb-4 pb-4 border-t border-zinc-800">
                <div className="flex items-center justify-between mt-4">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider ${getStatusColor(
                      doc.status
                    )}`}
                  >
                    {doc.status}
                  </span>
                  <span
                    className={`text-xs ${
                      theme === "dark" ? "text-zinc-600" : "text-zinc-500"
                    }`}
                  >
                    {doc.size}
                  </span>
                </div>
                <p
                  className={`text-xs mt-2 ${
                    theme === "dark" ? "text-zinc-600" : "text-zinc-500"
                  }`}
                >
                  Enviado em {doc.uploadDate}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-bold text-sm transition-all ${
                    theme === "dark"
                      ? "bg-zinc-800 hover:bg-zinc-700 text-white"
                      : "bg-zinc-100 hover:bg-zinc-200 text-zinc-900"
                  }`}
                >
                  <Eye size={16} />
                  Ver
                </button>
                <button
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-bold text-sm transition-all ${
                    theme === "dark"
                      ? "bg-zinc-800 hover:bg-zinc-700 text-white"
                      : "bg-zinc-100 hover:bg-zinc-200 text-zinc-900"
                  }`}
                >
                  <Download size={16} />
                  Baixar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
