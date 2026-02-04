import React from "react";

export type CardBrand = "visa" | "mastercard" | "amex" | "elo" | "discover" | "diners" | "jcb" | "unknown";

export const detectCardBrand = (cardNumber: string): CardBrand => {
    const number = cardNumber.replace(/\s/g, "");

    // Visa: começa com 4
    if (/^4/.test(number)) return "visa";

    // Mastercard: 51-55, 2221-2720
    if (/^5[1-5]/.test(number) || /^2(2[2-9][0-9]|[3-6][0-9]{2}|7[0-1][0-9]|720)/.test(number)) {
        return "mastercard";
    }

    // American Express: 34 ou 37
    if (/^3[47]/.test(number)) return "amex";

    // Elo: 4011, 4312, 4389, 4514, 4576, 5041, 5066, 5067, 509, 6277, 6362, 6363, 650, 6516, 6550
    if (/^(4011|4312|4389|4514|4576|5041|5066|5067|509|6277|6362|6363|650|6516|6550)/.test(number)) {
        return "elo";
    }

    // Discover: 6011, 622126-622925, 644-649, 65
    if (/^(6011|65|64[4-9]|622)/.test(number)) return "discover";

    // Diners: 300-305, 36, 38
    if (/^(30[0-5]|36|38)/.test(number)) return "diners";

    // JCB: 3528-3589
    if (/^35(2[8-9]|[3-8][0-9])/.test(number)) return "jcb";

    return "unknown";
};

interface CardBrandIconProps {
    brand: CardBrand;
    className?: string;
}

export const CardBrandIcon: React.FC<CardBrandIconProps> = ({ brand, className = "w-12 h-8" }) => {
    if (brand === "visa") {
        return (
            <svg className={className} viewBox="0 0 48 32" fill="none">
                <rect width="48" height="32" rx="4" fill="#1A1F71" />
                <path d="M19.5 21L21.8 11H24.5L22.2 21H19.5Z" fill="white" />
                <path d="M30.2 11.3C29.7 11.1 28.9 10.9 27.9 10.9C25.2 10.9 23.3 12.3 23.3 14.3C23.3 15.7 24.6 16.5 25.6 17C26.6 17.5 27 17.8 27 18.3C27 19.1 25.9 19.4 24.9 19.4C23.6 19.4 22.9 19.2 21.9 18.8L21.5 18.6L21.1 21C21.7 21.3 22.8 21.5 24 21.5C26.9 21.5 28.7 20.1 28.8 18C28.8 16.9 28.1 16.1 26.6 15.4C25.7 15 25.2 14.6 25.2 14.1C25.2 13.7 25.7 13.2 26.8 13.2C27.6 13.2 28.2 13.3 28.7 13.6L28.9 13.7L29.3 11.3L30.2 11.3Z" fill="white" />
                <path d="M34.8 11H32.8C32.2 11 31.7 11.2 31.5 11.8L27.5 21H30.4L30.9 19.7H34.4L34.7 21H37.2L35 11H34.8ZM31.8 17.5L33 14.1L33.7 17.5H31.8Z" fill="white" />
                <path d="M17.2 11L14.4 18L14.1 16.5C13.6 14.9 12.1 13.2 10.4 12.3L12.9 21H15.8L20.1 11H17.2Z" fill="white" />
                <path d="M11.8 11H7.1L7 11.2C10.4 12.1 12.7 14.3 13.6 17.2L12.6 11.8C12.5 11.3 12 11 11.5 11H11.8Z" fill="#F7981D" />
            </svg>
        );
    }

    if (brand === "mastercard") {
        return (
            <svg className={className} viewBox="0 0 48 32" fill="none">
                <rect width="48" height="32" rx="4" fill="#000000" />
                <circle cx="18" cy="16" r="9" fill="#EB001B" />
                <circle cx="30" cy="16" r="9" fill="#F79E1B" />
                <path d="M24 9C22.1 10.5 20.9 12.9 20.9 15.6C20.9 18.3 22.1 20.7 24 22.2C25.9 20.7 27.1 18.3 27.1 15.6C27.1 12.9 25.9 10.5 24 9Z" fill="#FF5F00" />
            </svg>
        );
    }

    if (brand === "amex") {
        return (
            <svg className={className} viewBox="0 0 48 32" fill="none">
                <rect width="48" height="32" rx="4" fill="#006FCF" />
                <path d="M14 11L11 21H14L14.5 19H16.5L17 21H20L17 11H14ZM15 17L15.8 14L16.6 17H15Z" fill="white" />
                <path d="M22 11L20 21H22.5L23 18.5L24 21H26.5L24.5 18.5L26.5 16L24.5 11H22L23.5 14.5L22 11Z" fill="white" />
                <path d="M28 11V21H33V19H30V17H32.5V15H30V13H33V11H28Z" fill="white" />
            </svg>
        );
    }

    if (brand === "elo") {
        return (
            <svg className={className} viewBox="0 0 48 32" fill="none">
                <rect width="48" height="32" rx="4" fill="#000000" />
                <path d="M18 12C15.2 12 13 14.2 13 17C13 19.8 15.2 22 18 22C19.3 22 20.5 21.5 21.4 20.6L19.8 19C19.3 19.5 18.7 19.8 18 19.8C16.3 19.8 15.2 18.5 15.2 17C15.2 15.5 16.3 14.2 18 14.2C18.7 14.2 19.3 14.5 19.8 15L21.4 13.4C20.5 12.5 19.3 12 18 12Z" fill="#FFCB05" />
                <path d="M23 12V22H25V18H28V16H25V14H28.5V12H23Z" fill="#FFCB05" />
                <path d="M30 17C30 19.8 32.2 22 35 22C37.8 22 40 19.8 40 17C40 14.2 37.8 12 35 12C32.2 12 30 14.2 30 17ZM35 19.8C33.3 19.8 32.2 18.5 32.2 17C32.2 15.5 33.3 14.2 35 14.2C36.7 14.2 37.8 15.5 37.8 17C37.8 18.5 36.7 19.8 35 19.8Z" fill="#00A4E0" />
            </svg>
        );
    }

    if (brand === "discover") {
        return (
            <svg className={className} viewBox="0 0 48 32" fill="none">
                <rect width="48" height="32" rx="4" fill="#FF6000" />
                <circle cx="38" cy="16" r="8" fill="#F9A533" />
                <path d="M10 14H12V18H14C15.1 18 16 17.1 16 16C16 14.9 15.1 14 14 14H10ZM12 16.5V15.5H14C14.3 15.5 14.5 15.7 14.5 16C14.5 16.3 14.3 16.5 14 16.5H12Z" fill="white" />
            </svg>
        );
    }

    if (brand === "diners") {
        return (
            <svg className={className} viewBox="0 0 48 32" fill="none">
                <rect width="48" height="32" rx="4" fill="#0079BE" />
                <circle cx="24" cy="16" r="10" fill="white" />
                <path d="M20 16C20 18.2 21.8 20 24 20V12C21.8 12 20 13.8 20 16Z" fill="#0079BE" />
                <path d="M28 16C28 13.8 26.2 12 24 12V20C26.2 20 28 18.2 28 16Z" fill="#0079BE" />
            </svg>
        );
    }

    if (brand === "jcb") {
        return (
            <svg className={className} viewBox="0 0 48 32" fill="none">
                <rect width="48" height="32" rx="4" fill="#0E4C96" />
                <rect x="6" y="10" width="8" height="12" rx="1" fill="#0E4C96" />
                <rect x="16" y="10" width="8" height="12" rx="1" fill="#CC0000" />
                <rect x="26" y="10" width="8" height="12" rx="1" fill="#00A650" />
            </svg>
        );
    }

    // Unknown/Default - generic credit card icon
    return null;
};
