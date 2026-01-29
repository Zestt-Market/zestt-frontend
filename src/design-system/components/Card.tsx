import React, { HTMLAttributes, ReactNode } from 'react';
import { useTheme } from '../providers/ThemeProvider';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'elevated' | 'outline';
    padding?: 'sm' | 'md' | 'lg';
    children: ReactNode;
}

export function Card({
    variant = 'default',
    padding = 'md',
    children,
    className = '',
    ...props
}: CardProps) {
    const { theme } = useTheme();

    const baseStyles = 'transition-colors duration-300';

    const variantStyles = {
        default: theme === 'dark'
            ? 'bg-zinc-900 border border-zinc-800'
            : 'bg-white border border-zinc-200 shadow-sm',
        elevated: theme === 'dark'
            ? 'bg-zinc-900/30 border border-zinc-800 shadow-xl'
            : 'bg-white border border-zinc-200 shadow-lg',
        outline: theme === 'dark'
            ? 'bg-transparent border border-zinc-800'
            : 'bg-transparent border border-zinc-200',
    };

    const paddingStyles = {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    };

    const styles = [
        baseStyles,
        variantStyles[variant],
        paddingStyles[padding],
        'rounded-xl',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={styles} {...props}>
            {children}
        </div>
    );
}
