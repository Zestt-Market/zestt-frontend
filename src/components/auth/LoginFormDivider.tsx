"use client";

import React from "react";

export const LoginFormDivider = () => {
    return (
        <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-800"></div>
            </div>
            <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-zinc-950/80 text-zinc-600">
                    ou continue com email
                </span>
            </div>
        </div>
    );
};
