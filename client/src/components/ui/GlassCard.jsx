import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function GlassCard({ children, className, ...props }) {
    return (
        <div
            className={twMerge(
                "glass-panel p-6 text-gray-100 transition-all duration-300 hover:border-white/40",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
