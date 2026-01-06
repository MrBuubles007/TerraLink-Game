import React, { useState, useEffect } from 'react';
import { GlassCard } from './GlassCard';

export default function LandscapeGuard({ children }) {
    const [isPortrait, setIsPortrait] = useState(false);

    const checkOrientation = () => {
        // Check if device is in portrait mode (height > width)
        // Also consider mobile devices specifically
        const isMobile = window.innerWidth <= 1024;
        const portrait = window.innerHeight > window.innerWidth;

        setIsPortrait(isMobile && portrait);
    };

    useEffect(() => {
        checkOrientation();
        window.addEventListener('resize', checkOrientation);
        return () => window.removeEventListener('resize', checkOrientation);
    }, []);

    if (isPortrait) {
        return (
            <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-6 text-center">
                <GlassCard className="animate-pulse border-red-500/50">
                    <div className="text-6xl mb-4">📱➡️🔄</div>
                    <h1 className="text-2xl font-bold text-red-400 mb-4">Bitte drehen!</h1>
                    <p className="text-gray-300">
                        TerraLink muss im <strong>Querformat</strong> (Landscape) gespielt werden.
                    </p>
                </GlassCard>
            </div>
        );
    }

    return children;
}
