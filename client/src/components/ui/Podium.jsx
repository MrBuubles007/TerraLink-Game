import React from 'react';
import CyberpunkBackground from './CyberpunkBackground';

export default function Podium({ ranking }) {
    if (!ranking) return null;

    const top3 = ranking.slice(0, 3);
    const rest = ranking.slice(3);

    const formatNumber = (num) => {
        if (num === undefined || num === null) return "0";
        return num.toString().replace('.', ',');
    };

    // Cyberpunk Confetti Generator
    const confettiPieces = Array.from({ length: 50 }).map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = 3 + Math.random() * 4;
        const color = ['#ff00ff', '#00ffff', '#ffff00', '#00ff00'][Math.floor(Math.random() * 4)];
        return (
            <div
                key={i}
                className="absolute top-0 w-2 h-4 sm:w-3 sm:h-6 opacity-80 animate-fall"
                style={{
                    left: `${left}%`,
                    backgroundColor: color,
                    animationDelay: `${delay}s`,
                    animationDuration: `${duration}s`,
                    boxShadow: `0 0 10px ${color}` // Glow
                }}
            />
        );
    });

    return (
        <CyberpunkBackground>
            <div className="flex flex-col items-center justify-center min-h-screen w-full relative overflow-y-auto pt-10 pb-10">

                {/* Confetti Overlay */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {confettiPieces}
                </div>

                <h1 className="text-4xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 mb-8 md:mb-16 animate-pulse drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] text-center tracking-tighter"
                    style={{ fontFamily: '"Courier New", monospace' }}>
                    &lt; SYSTEM_WINNER /&gt;
                </h1>

                <div className="flex flex-col md:flex-row gap-6 items-end justify-center w-full max-w-7xl mb-12 relative z-20 px-4">
                    {top3.map((rank, index) => {
                        // Responsive height & Styling
                        let height = "h-auto min-h-[200px] md:min-h-[280px]";
                        let order = "order-2";
                        let borderClass = "border-gray-600";
                        let shadowClass = "shadow-none";
                        let textGlow = "text-gray-400";
                        let scale = "scale-90 opacity-90 md:scale-100 hover:scale-95 md:hover:scale-105";
                        let zIndex = "z-10";
                        let trophy = "🥈";
                        let bgColor = "bg-white/10"; // Light glass for default

                        if (index === 0) { // Gold
                            height = "h-auto min-h-[240px] md:min-h-[350px]";
                            order = "order-1 md:order-2";
                            scale = "scale-100 md:scale-110 z-30 opacity-100";
                            borderClass = "border-yellow-400";
                            shadowClass = "shadow-[0_0_50px_rgba(250,204,21,0.5),inset_0_0_20px_rgba(250,204,21,0.2)]";
                            textGlow = "text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]";
                            trophy = "👑";
                            bgColor = "bg-black/80"; // Darker for contrast
                        } else if (index === 1) { // Silver
                            order = "order-2 md:order-1";
                            borderClass = "border-slate-300";
                            shadowClass = "shadow-[0_0_30px_rgba(203,213,225,0.3)]";
                            textGlow = "text-slate-300";
                        } else if (index === 2) { // Bronze
                            order = "order-3";
                            borderClass = "border-orange-600";
                            shadowClass = "shadow-[0_0_30px_rgba(234,88,12,0.3)]";
                            textGlow = "text-orange-500";
                            trophy = "🥉";
                        }

                        // Fix Logic: Only show + if > 0.
                        const capPrefix = rank.capitalGrowth > 0 ? "+" : "";
                        const mktPrefix = rank.marketGrowth > 0 ? "+" : "";

                        return (
                            <div key={rank.id} className={`${order} ${scale} ${zIndex} transition-all duration-500 w-full md:w-64 flex flex-col justify-end`}>
                                <div className={`flex flex-col items-center relative ${height} w-full ${bgColor} backdrop-blur-xl border-4 ${borderClass} ${shadowClass} group overflow-visible rounded-xl p-4 pt-12 md:pt-16`}>

                                    {/* Scanline Effect */}
                                    <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/dummy/giphy.gif')] opacity-5 pointer-events-none rounded-xl overflow-hidden"></div>

                                    {/* Trophy Icon - Adjusted position to not be cut off */}
                                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-6xl md:text-7xl animate-bounce filter drop-shadow-lg"
                                        style={{ animationDelay: `${index * 0.2}s`, zIndex: 40 }}>
                                        {trophy}
                                    </div>

                                    <div className="text-center w-full mt-4 flex-1 flex flex-col justify-end">
                                        <div className="text-xs font-mono text-gray-400 mb-1 uppercase tracking-widest">PLATZ {index + 1}</div>
                                        <h2 className={`text-2xl md:text-3xl font-black truncate ${textGlow} uppercase tracking-tight mb-2`}>{rank.name}</h2>

                                        <div className="text-sm md:text-lg font-mono text-white/90 border-y border-white/10 py-2 w-full bg-black/20 rounded">
                                            Score: <span className="text-white font-bold">{rank.totalScore}</span>
                                        </div>
                                    </div>

                                    {/* Detailed Stats */}
                                    <div className="w-full mt-4 bg-black/50 p-3 rounded-lg text-xs font-mono space-y-2 border border-white/10">
                                        <div className="flex justify-between items-center text-gray-300">
                                            <span className="uppercase text-[10px]">Kapital</span>
                                            <span className={rank.capitalGrowth >= 0 ? "text-green-400 font-bold" : "text-red-400 font-bold"}>
                                                {capPrefix}{formatNumber(rank.capitalGrowth)}%
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-gray-300">
                                            <span className="uppercase text-[10px]">Marktanteil</span>
                                            <span className={rank.marketGrowth >= 0 ? "text-blue-400 font-bold" : "text-red-400 font-bold"}>
                                                {mktPrefix}{formatNumber(rank.marketGrowth)}%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Rest of the list */}
                <div className="w-full max-w-4xl grid grid-cols-1 gap-2 relative z-20 px-4 pb-20">
                    {rest.map((rank, i) => (
                        <div key={rank.id} className="bg-black/60 border border-gray-700 hover:border-gray-500 p-4 flex items-center justify-between backdrop-blur-sm transition-colors rounded">
                            <div className="flex items-center gap-4">
                                <span className="text-gray-500 font-mono text-xl">#{i + 4}</span>
                                <span className="text-xl font-bold font-mono text-cyan-300">{rank.name}</span>
                            </div>
                            <div className="font-mono text-gray-400">Score: {rank.totalScore}</div>
                        </div>
                    ))}
                </div>
            </div>
        </CyberpunkBackground>
    );
}
