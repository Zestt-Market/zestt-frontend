"use client";

import React from "react";
import { GoogleSignInButton } from "@/src/components/auth/GoogleSignInButton";
import { EmailPasswordForm } from "@/src/components/auth/EmailPasswordForm";
import { LoginFormDivider } from "@/src/components/auth/LoginFormDivider";

export const LoginScreen = () => {
    const handleEmailLogin = (email: string, password: string) => {
        console.log("Login demo:", email);
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
                <div
                    className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "1s" }}
                ></div>
            </div>

            <div className="relative z-10 w-full max-w-md space-y-12">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <img
                        src="/logo.png"
                        alt="ZEST"
                        className="w-48 h-auto drop-shadow-[0_0_20px_rgba(190,242,100,0.3)]"
                    />
                </div>

                {/* Form Container */}
                <div className="bg-zinc-950/80 border border-zinc-800 rounded-[32px] p-12 shadow-2xl backdrop-blur-sm">
                    <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">
                        Bem-vindo
                    </h1>
                    <p className="text-zinc-400 text-sm mb-8">
                        Entre para acessar os melhores mercados de previsão
                    </p>

                    <GoogleSignInButton />
                    <LoginFormDivider />
                    <EmailPasswordForm onSubmit={handleEmailLogin} />

                    {/* Register Link */}
                    <p className="text-center text-xs text-zinc-600 mt-8">
                        Não tem conta?{" "}
                        <a
                            href="#"
                            className="text-primary hover:text-lime-400 transition-colors font-semibold"
                        >
                            Criar conta
                        </a>
                    </p>
                </div>

                {/* Demo Notice */}
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-center">
                    <p className="text-xs text-zinc-400">
                        <span className="font-bold text-primary">Demo:</span> Use qualquer
                        email e senha
                    </p>
                </div>
            </div>
        </div>
    );
};
