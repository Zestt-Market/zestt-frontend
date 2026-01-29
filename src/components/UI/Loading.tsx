import React from 'react';
import { useTheme } from '../../design-system/providers/ThemeProvider';

interface LoadingProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export const Loading: React.FC<LoadingProps> = ({
    size = 'md',
    className = ''
}) => {
    const { theme } = useTheme();

    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12'
    };

    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div
                className={`${sizeClasses[size]} border-2 border-t-primary rounded-full animate-spin ${theme === 'dark' ? 'border-zinc-700' : 'border-zinc-300'
                    }`}
            />
        </div>
    );
};

export const LoadingSpinner: React.FC<{ message?: string }> = ({
    message = 'Carregando...'
}) => {
    const { theme } = useTheme();

    return (
        <div className="flex flex-col items-center justify-center py-12 gap-4">
            <Loading size="lg" />
            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                }`}>
                {message}
            </p>
        </div>
    );
};