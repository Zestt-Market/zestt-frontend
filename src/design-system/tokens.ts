// Design System Tokens - Using Tailwind classes where possible
export const tokens = {
    colors: {
        primary: 'primary', // Custom primary color in tailwind.config.js
        primaryHover: 'primary-hover',

        // Background
        bgDark: 'zinc-950', // #09090b
        bgLight: 'zinc-50', // #fafafa
        bgCard: 'zinc-900', // #18181b
        bgCardLight: 'white',

        // Text
        textPrimary: '#ffffff',
        textSecondary: '#a1a1aa', // zinc-400
        textLight: '#09090b',
        textMuted: '#71717a', // zinc-500

        // Borders
        borderDark: '#27272a', // zinc-800
        borderLight: '#e4e4e7', // zinc-200

        // Status
        success: '#22c55e', // green-500
        error: '#ef4444', // red-500
        warning: '#f59e0b', // amber-500
        info: '#3b82f6', // blue-500

        // Purple accent (for NO buttons)
        purple: '#a855f7', // purple-500
        purpleHover: '#9333ea', // purple-600
    },

    spacing: {
        xs: '0.25rem', // 1
        sm: '0.5rem',  // 2
        md: '0.75rem', // 3
        lg: '1rem',    // 4
        xl: '1.5rem',  // 6
        '2xl': '2rem', // 8
        '3xl': '3rem', // 12
        '4xl': '4rem', // 16
    },

    radius: {
        sm: '0.375rem', // rounded-md
        md: '0.5rem',   // rounded-lg
        lg: '0.75rem',  // rounded-xl
        xl: '2.5rem',   // rounded-[40px]
        full: '9999px', // rounded-full
    },

    shadows: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        xl: '0 0 50px rgba(0,0,0,0.5)',
        glow: '0 0 10px rgba(190,242,100,0.2)',
        glowHover: '0 0 15px rgba(190,242,100,0.4)',
    },

    typography: {
        fontSizes: {
            xs: '0.75rem',   // 12px
            sm: '0.875rem',  // 14px
            base: '1rem',    // 16px
            lg: '1.125rem',  // 18px
            xl: '1.25rem',   // 20px
            '2xl': '1.5rem', // 24px
        },
        fontWeights: {
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
            black: '900',
        },
        lineHeights: {
            tight: '1.25',
            normal: '1.5',
            relaxed: '1.75',
        },
    },

    breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
    },

    zIndex: {
        dropdown: '1000',
        sticky: '1020',
        fixed: '1030',
        modal: '1040',
        popover: '1050',
        tooltip: '1060',
    },
} as const;

export type Theme = typeof tokens;
