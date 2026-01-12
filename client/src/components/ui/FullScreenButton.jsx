import React, { useState, useEffect } from 'react';

export default function FullScreenButton() {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isSupported, setIsSupported] = useState(true);

    useEffect(() => {
        // Check if fullscreen is supported at all
        const doc = document;
        const enabled = doc.fullscreenEnabled || doc.webkitFullscreenEnabled || doc.mozFullScreenEnabled || doc.msFullscreenEnabled;
        if (!enabled && !doc.webkitFullscreenEnabled) { // Double check for strict iOS
            // Some iOS vers report false but might allow it on ipad? 
            // Usually iOS safari simply returns false for enabled.
            // We'll keep it visible but it might do nothing on iPhone.
            // Let's rely on the method existing.
        }

        const handleChange = () => {
            const doc = document;
            const isFull = !!(doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement || doc.msFullscreenElement);
            setIsFullscreen(isFull);
        };

        const events = [
            'fullscreenchange',
            'webkitfullscreenchange',
            'mozfullscreenchange',
            'MSFullscreenChange'
        ];

        events.forEach(event => document.addEventListener(event, handleChange));
        return () => events.forEach(event => document.removeEventListener(event, handleChange));
    }, []);

    const toggleFullscreen = async () => {
        const doc = document;
        const elem = doc.documentElement;

        try {
            if (!isFullscreen) {
                if (elem.requestFullscreen) {
                    await elem.requestFullscreen();
                } else if (elem.webkitRequestFullscreen) { /* Safari */
                    await elem.webkitRequestFullscreen();
                } else if (elem.msRequestFullscreen) { /* IE11 */
                    await elem.msRequestFullscreen();
                } else if (elem.mozRequestFullScreen) { /* Firefox */
                    await elem.mozRequestFullScreen();
                } else {
                    alert("Ihr Browser unterstützt leider keinen Vollbildmodus.");
                }
            } else {
                if (doc.exitFullscreen) {
                    await doc.exitFullscreen();
                } else if (doc.webkitExitFullscreen) { /* Safari */
                    await doc.webkitExitFullscreen();
                } else if (doc.msExitFullscreen) { /* IE11 */
                    await doc.msExitFullscreen();
                } else if (doc.mozCancelFullScreen) { /* Firefox */
                    await doc.mozCancelFullScreen();
                }
            }
        } catch (err) {
            console.error("Fullscreen error:", err);
            // Fallback UI or specific iOS message
            if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
                alert("Auf iOS Safari bitte 'Teilen' -> 'Zum Home-Bildschirm' nutzen für Vollbild.");
            }
        }
    };

    return (
        <button
            onClick={toggleFullscreen}
            className={`
                fixed bottom-4 left-4 z-50 
                flex items-center justify-center
                w-12 h-12 md:w-14 md:h-14
                bg-black/40 backdrop-blur-md
                border border-cyan-500/50 hover:border-cyan-400
                text-cyan-400 hover:text-cyan-200
                rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.3)]
                transition-all duration-300
                hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]
                hover:scale-105 active:scale-95
                group
            `}
            title={isFullscreen ? "Vollbild beenden" : "Vollbildmodus"}
        >
            {/* Cyberpunk corner accents */}
            <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500 opacity-70 group-hover:opacity-100 transition-opacity" />
            <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500 opacity-70 group-hover:opacity-100 transition-opacity" />
            <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500 opacity-70 group-hover:opacity-100 transition-opacity" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500 opacity-70 group-hover:opacity-100 transition-opacity" />

            {/* Icon */}
            {isFullscreen ? (
                // Minimize Icon
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9L4 4m0 0l5 0m-5 0l0 5M15 9l5-5m0 0l-5 0m5 0l0 5M9 15l-5 5m0 0l5 0m-5 0l0-5M15 15l5 5m0 0l-5 0m5 0l0-5" />
                </svg>
            ) : (
                // Maximize Icon
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
            )}
        </button>
    );
}
