import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { tokens } from '../tokens';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    children: ReactNode;
}

const variantStyles = {
    primary: 'bg-primary hover:bg-primary-hover text-black font-semibold shadow-glow hover:shadow-glow-hover hover:scale-105 active:scale-95',
    secondary: 'bg-zinc-700 hover:bg-zinc-600 text-white border border-zinc-600',
    ghost: 'bg-transparent hover:bg-zinc-800 text-zinc-300 hover:text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
};

const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
};

export function Button({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    children,
    className = '',
    ...props
}: ButtonProps) {
    const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed';

    const styles = [
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
    ].filter(Boolean).join(' ');

    return (
        <button
            className={styles}
            {...props}
        >
            {isLoading ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
            ) : leftIcon}
            {children}
            {!isLoading && rightIcon}
        </button>
    );
}
