"use client";

import React from 'react';

export const ZestLogo = () => (
    <div className="flex items-center gap-4 group cursor-pointer select-none">
        <div className="relative w-40 h-auto">
            <img
                src="/logo.png"
                alt="ZEST Logo"
                className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]"
            />
        </div>
    </div>
);