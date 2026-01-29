
import React from 'react';
import { cn } from '../../utils';

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
    ({ className, level = 1, variant, children, ...props }, ref) => {
        const Component = `h${level}` as React.ElementType;

        // Map variant to styles, defaulting to level if variant not provided
        const v = variant || `h${level}`;

        const styles = {
            h1: "text-4xl font-bold tracking-tight",
            h2: "text-3xl font-semibold tracking-tight",
            h3: "text-2xl font-semibold tracking-tight",
            h4: "text-xl font-semibold tracking-tight",
            h5: "text-lg font-medium",
            h6: "text-base font-medium",
        };

        return (
            <Component
                ref={ref}
                className={cn("text-white mb-2", styles[v as keyof typeof styles], className)}
                {...props}
            >
                {children}
            </Component>
        );
    }
);
Heading.displayName = "Heading";

type TextProps = React.HTMLAttributes<HTMLParagraphElement> & {
    as?: React.ElementType;
    size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
    weight?: 'normal' | 'medium' | 'semibold' | 'bold';
    variant?: 'primary' | 'secondary' | 'muted';
};

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
    ({ className, as: Component = 'p', size = 'base', weight = 'normal', variant = 'primary', children, ...props }, ref) => {
        const sizes = {
            xs: "text-xs",
            sm: "text-sm",
            base: "text-base",
            lg: "text-lg",
            xl: "text-xl",
        };

        const weights = {
            normal: "font-normal",
            medium: "font-medium",
            semibold: "font-semibold",
            bold: "font-bold",
        };

        const variants = {
            primary: "text-white",
            secondary: "text-zinc-400",
            muted: "text-zinc-500",
        };

        return (
            <Component
                ref={ref}
                className={cn(sizes[size], weights[weight], variants[variant], className)}
                {...props}
            >
                {children}
            </Component>
        );
    }
);
Text.displayName = "Text";
