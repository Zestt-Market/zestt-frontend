"use client";

import { Plus, Send } from "lucide-react";
import { useState } from "react";

export const SupportView = ({
  theme,
  onBack,
}: {
  theme: "dark" | "light";
  onBack: () => void;
}) => {
  const [selectedChat, setSelectedChat] = useState("1");
  const [message, setMessage] = useState("");

  const chats = [
    {
      id: "1",
      title: "Problema com login",
      lastMessage: "Obrigado pela ajuda!",
      timestamp: "14:32",
      unread: 1,
    },
    {
      id: "2",
      title: "Verificação de documentos",
      lastMessage: "Seu documento foi verificado",
      timestamp: "10:15",
      unread: 0,
    },
    {
      id: "3",
      title: "Limite de saque",
      lastMessage: "Seu limite foi aumentado para R$ 50.000",
      timestamp: "ontem",
      unread: 0,
    },
  ];

  const messages =
    selectedChat === "1"
      ? [
        { id: "1", sender: "support", text: "Olá! Como posso ajudá-lo?" },
        {
          id: "2",
          sender: "user",
          text: "Estou com dificuldade em fazer login",
        },
        {
          id: "3",
          sender: "support",
          text: "Entendo. Vamos resolver isso. Qual é o erro que você está recebendo?",
        },
        {
          id: "4",
          sender: "user",
          text: "Diz que minha senha está incorreta, mas tenho certeza que está certa",
        },
        {
          id: "5",
          sender: "support",
          text: "Tudo bem. Vou redefini-la para você em um momento.",
        },
        { id: "6", sender: "user", text: "Obrigado pela ajuda!" },
      ]
      : selectedChat === "2"
        ? [
          {
            id: "1",
            sender: "support",
            text: "Seu documento foi verificado com sucesso!",
          },
          { id: "2", sender: "user", text: "Ótimo! Muito obrigado" },
        ]
        : [
          {
            id: "1",
            sender: "support",
            text: "Seu limite de saque foi aumentado para R$ 50.000",
          },
        ];

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
            Zest Suporte
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
          {/* Chat List */}
          <div
            className={`rounded-2xl border flex flex-col ${theme === "dark"
                ? "bg-zinc-900/30 border-zinc-800"
                : "bg-zinc-50 border-zinc-200"
              }`}
          >
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <h2
                className={`font-black ${theme === "dark" ? "text-white" : "text-zinc-900"
                  }`}
              >
                Conversas
              </h2>
              <button className="p-2 rounded-lg hover:bg-primary/20 transition-colors">
                <Plus size={20} className="text-primary" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1">
              {chats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className={`w-full text-left p-4 border-b transition-all ${selectedChat === chat.id
                      ? "bg-primary/10 border-primary"
                      : theme === "dark"
                        ? "hover:bg-zinc-800/50 border-zinc-800"
                        : "hover:bg-zinc-100 border-zinc-200"
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <p
                      className={`font-bold text-sm ${selectedChat === chat.id
                          ? "text-primary"
                          : theme === "dark"
                            ? "text-white"
                            : "text-zinc-900"
                        }`}
                    >
                      {chat.title}
                    </p>
                    {chat.unread > 0 && (
                      <span className="w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-xs mt-1 line-clamp-1 ${theme === "dark" ? "text-zinc-500" : "text-zinc-600"
                      }`}
                  >
                    {chat.lastMessage}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          <div
            className={`lg:col-span-2 rounded-2xl border flex flex-col ${theme === "dark"
                ? "bg-zinc-900/30 border-zinc-800"
                : "bg-zinc-50 border-zinc-200"
              }`}
          >
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                >
                  <div
                    className={`max-w-xs px-4 py-3 rounded-2xl ${msg.sender === "user"
                        ? "bg-primary text-black rounded-br-none"
                        : theme === "dark"
                          ? "bg-zinc-800 text-white rounded-bl-none"
                          : "bg-white border border-zinc-200 text-zinc-900 rounded-bl-none"
                      }`}
                  >
                    <p className="text-sm font-medium">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div
              className={`p-6 border-t ${theme === "dark" ? "border-zinc-800" : "border-zinc-200"
                }`}
            >
              <div
                className={`flex gap-3 p-3 rounded-2xl border ${theme === "dark"
                    ? "bg-zinc-800 border-zinc-700"
                    : "bg-white border-zinc-300"
                  }`}
              >
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className={`flex-1 bg-transparent outline-none font-medium ${theme === "dark"
                      ? "text-white placeholder-zinc-500"
                      : "text-zinc-900 placeholder-zinc-400"
                    }`}
                />
                <button className="text-primary hover:scale-110 transition-transform">
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
