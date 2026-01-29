import React from 'react';
import { ZestLogo } from '../Brand/ZestLogo';

export const Footer: React.FC = () => {
    return (
        <footer className="mt-32 border-t border-zinc-900 bg-black py-24">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-16">
                <div>
                    <ZestLogo />
                </div>
                <div className="flex flex-wrap justify-center gap-12 text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">
                    <a href="#" className="hover:text-primary transition-colors">
                        Termos de Uso
                    </a>
                    <a href="#" className="hover:text-primary transition-colors">
                        Privacidade
                    </a>
                    <a href="#" className="hover:text-primary transition-colors">
                        API Docs
                    </a>
                    <a href="#" className="hover:text-primary transition-colors">
                        Suporte
                    </a>
                </div>
                <div className="text-center md:text-right">
                    <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                        © 2025 ZEST Markets Brasil.
                    </p>
                    <p className="text-[9px] text-zinc-800 uppercase mt-1">
                        Sua dose diária de mercados reais.
                    </p>
                </div>
            </div>
        </footer>
    );
};