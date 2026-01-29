
export const colors = {
    // Brand Colors
    primary: {
        DEFAULT: '#bef264', // lime-400
        hover: '#a3e635',   // lime-300
        foreground: '#000000',
    },
    secondary: {
        DEFAULT: '#a855f7', // purple-500
        hover: '#9333ea',   // purple-600
        foreground: '#ffffff',
    },

    // Backgrounds
    background: {
        DEFAULT: '#09090b', // zinc-950
        paper: '#18181b',   // zinc-900 (cards, panels)
        subtle: '#27272a',  // zinc-800
    },

    // Text
    text: {
        primary: '#ffffff',
        secondary: '#a1a1aa', // zinc-400
        muted: '#71717a',     // zinc-500
        inverted: '#09090b',
    },

    // Borders
    border: {
        DEFAULT: '#27272a', // zinc-800
        hover: '#3f3f46',   // zinc-700
        active: '#e4e4e7',  // zinc-200
    },

    // Status
    status: {
        success: '#22c55e',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6',
    }
} as const;
