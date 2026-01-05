import React from 'react';

export default function AnimatedLogo({ className = "" }) {
    // Letters mapping to colors cyclically
    // T: Blue, e: Pink, r: Green, r: Orange, ...
    const letters = "TerraLink".split("");
    const colors = [
        "text-blue-400",  // MegaLogistics
        "text-pink-400",  // FastFash
        "text-green-400", // HeideHof
        "text-orange-400" // TechSolutions
    ];

    // Shadow colors corresponding to text colors
    const shadows = [
        "shadow-blue-500/50",
        "shadow-pink-500/50",
        "shadow-green-500/50",
        "shadow-orange-500/50"
    ];

    return (
        <div className={`flex justify-center items-center ${className} select-none`}>
            {letters.map((char, index) => {
                const colorClass = colors[index % colors.length];
                const shadowClass = shadows[index % shadows.length];

                return (
                    <span
                        key={index}
                        className={`
                            ${colorClass} 
                            font-black 
                            text-6xl 
                            inline-block
                            animate-bounce
                            drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]
                        `}
                        style={{
                            animationDuration: '2s',
                            animationDelay: `${index * 0.1}s`
                        }}
                    >
                        {char}
                    </span>
                );
            })}
        </div>
    );
}
