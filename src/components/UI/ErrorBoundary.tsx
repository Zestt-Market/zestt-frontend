import React, { ReactNode } from 'react';
import { Button } from '../../design-system';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

export const ErrorBoundary: React.FC<Props> = ({ children, fallback }) => {
    return <>{children}</>;
};

export const ErrorFallback: React.FC<{ onRetry?: () => void }> = ({ onRetry }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
            <div className="text-center p-8 max-w-md">
                <div className="mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
                        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                        Ops! Algo deu errado
                    </h2>
                    <p className="text-zinc-400 mb-6">
                        Encontramos um problema inesperado. Nossa equipe foi notificada.
                    </p>
                </div>

                <div className="space-y-3">
                    {onRetry && (
                        <Button
                            onClick={onRetry}
                            variant="primary"
                            className="w-full"
                        >
                            Tentar novamente
                        </Button>
                    )}
                    <Button
                        onClick={() => window.location.reload()}
                        variant="ghost"
                        className="w-full"
                    >
                        Recarregar página
                    </Button>
                </div>
            </div>
        </div>
    );
};