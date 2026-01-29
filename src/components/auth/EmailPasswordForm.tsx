"use client";

import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

interface EmailPasswordFormProps {
    onSubmit: (email: string, password: string) => void;
}

export const EmailPasswordForm = ({ onSubmit }: EmailPasswordFormProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) return;

        setIsLoading(true);
        setTimeout(() => {
            onSubmit(email, password);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-3">
                <label className="text-[11px] font-black text-zinc-400 uppercase tracking-widest block">
                    E-mail
                </label>
                <div className="relative">
                    <Mail
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu@email.com"
                        className="w-full pl-12 pr-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                    />
                </div>
            </div>

            {/* Password Input */}
            <div className="space-y-3">
                <label className="text-[11px] font-black text-zinc-400 uppercase tracking-widest block">
                    Senha
                </label>
                <div className="relative">
                    <Lock
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                    />
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-12 pr-12 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 transition-colors"
                    >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded accent-primary" />
                    <span className="text-zinc-500 group-hover:text-zinc-400 transition-colors">
                        Lembrar-me
                    </span>
                </label>
                <a
                    href="#"
                    className="text-primary hover:text-lime-400 transition-colors font-semibold"
                >
                    Esqueci minha senha
                </a>
            </div>

            {/* Login Button */}
            <button
                type="submit"
                disabled={isLoading || !email || !password}
                className="w-full py-4 px-6 bg-gradient-to-r from-primary via-lime-400 to-primary text-black font-black rounded-2xl hover:shadow-[0_0_30px_rgba(190,242,100,0.3)] hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
            >
                {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        <span>Autenticando...</span>
                    </div>
                ) : (
                    "Entrar"
                )}
            </button>
        </form>
    );
};
