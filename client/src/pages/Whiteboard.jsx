import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { GlassCard } from '../components/ui/GlassCard';
import { TEAMS, EVENTS } from '../data/initialData';

export default function Whiteboard() {
    const { gameState, isAdmin } = useGame();
    const navigate = useNavigate();
    const [showNews, setShowNews] = useState(false);

    // Security: Protect Whiteboard
    useEffect(() => {
        if (!isAdmin) {
            navigate('/admin');
        }
    }, [isAdmin, navigate]);

    // News Popup Logic
    useEffect(() => {
        if (gameState?.phase === 'EVENT') {
            // Round 1: Manual open (so teacher can explain UI first)
            // Round > 1: Auto open
            if (gameState.round === 1) {
                setShowNews(false);
            } else {
                setShowNews(true);
            }
        } else {
            setShowNews(false);
        }
    }, [gameState?.phase, gameState?.round]);

    // Custom "Waiting / Connection" Screen defined by User
    if (!gameState) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-10 space-y-8">
                <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse">
                    TerraLink
                </h1>

                <div className="bg-white p-8 rounded-3xl shadow-2xl shadow-blue-500/20 transform hover:scale-105 transition-transform duration-500">
                    <img
                        src="/qr-code.png"
                        alt="Join Game QR"
                        className="w-64 h-64 md:w-96 md:h-96 object-contain"
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block' }}
                    />
                    <div className="hidden text-black text-center p-4">QR-Code fehlt<br />(qr-code.png)</div>
                </div>

                <div className="text-center space-y-2">
                    <p className="text-gray-400 text-xl font-medium">Spiel beitreten unter:</p>
                    <a href="https://terralink-game.onrender.com" className="block text-3xl md:text-5xl font-black text-blue-500 hover:text-blue-400 underline decoration-4 underline-offset-8 transition-colors">
                        terralink-game.onrender.com
                    </a>
                </div>

                <div className="absolute bottom-10 text-gray-600 font-mono text-sm animate-bounce">
                    Warte auf Server-Verbindung...
                </div>
            </div>
        );
    }

    const formatNumber = (num) => {
        if (num === undefined || num === null) return "0";
        return num.toString().replace('.', ',');
    };

    const getTeamStat = (id) => gameState.teamStats.find(t => t.id === id) || TEAMS.find(t => t.id === id);

    // --- END GAME PODIUM ---
    // --- END GAME PODIUM ---
    if (gameState.phase === 'END') {
        return <Podium ranking={gameState.finalRanking} />;
    }

    return (
        <div className="min-h-screen pt-4 px-4 pb-4 text-white overflow-hidden flex flex-col">

            {/* Breaking News Ticker / Header */}
            <div className="mb-6 relative cursor-pointer hover:scale-[1.01] transition-transform" onClick={() => setShowNews(true)}>
                {/* Timer Display */}
                {gameState.phase === 'DECISION' && (
                    <div className="absolute top-0 right-0 bg-red-600 text-white font-mono text-4xl px-6 py-2 rounded-bl-xl shadow-lg animate-pulse z-10">
                        {gameState.timer}s
                    </div>
                )}

                <div className="bg-red-600 text-white font-bold px-6 py-2 text-2xl uppercase tracking-widest shadow-red-500/50 shadow-lg inline-block transform -skew-x-12 ml-4">
                    NEWS
                </div>

                {/* Global News or Event Title */}
                <div className="mt-4 p-6 bg-white/5 border-l-4 border-red-500 backdrop-blur-sm rounded-r-xl group">
                    <h1 className="text-4xl font-light mb-2 flex items-center justify-between">
                        {gameState.displayNews || "Das System läuft stabil."}
                        {!showNews && gameState.currentEvent && (
                            <span className="text-sm font-bold bg-white/20 px-3 py-1 rounded uppercase tracking-wider group-hover:bg-white/40 transition-colors">
                                Öffnen &rarr;
                            </span>
                        )}
                    </h1>
                </div>
            </div>

            {/* Newspaper Overlay */}
            {showNews && gameState.currentEvent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-10">
                    {/* Main Paper Container */}
                    <div className="animate-pop-in bg-[#f0e6d2] text-black w-full max-w-4xl p-8 shadow-2xl relative border-4 border-black ring-4 ring-offset-4 ring-red-600 animate-pulse-slow">

                        {/* Floating Megaphones (Requested Feature) */}
                        <div className="absolute -right-16 top-0 text-6xl animate-bounce" style={{ animationDuration: '2s' }}>📢</div>
                        <div className="absolute -left-16 bottom-10 text-6xl animate-bounce" style={{ animationDuration: '3s', animationDelay: '0.5s' }}>📢</div>

                        {/* Header */}
                        <div className="border-b-4 border-black mb-4 pb-2 flex justify-between items-end">
                            <h1 className="text-6xl font-black uppercase tracking-tighter">TERRALINK TIMES</h1>
                            <span className="font-serif italic text-xl">Sonderausgabe</span>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            {/* Left Column: Text */}
                            <div className="flex flex-col">
                                {/* Title with client-side override to fix stale server data */}
                                <h2 className="text-4xl font-bold font-serif leading-tight mb-4 relative z-10 bg-[#f0e6d2]/90 p-1">
                                    {EVENTS.find(e => e.id === gameState.currentEvent?.id)?.title || gameState.currentEvent.title}
                                </h2>
                                <div className="h-1 w-20 bg-black mb-4"></div>
                                <p className="text-xl font-serif text-justify leading-relaxed">
                                    {EVENTS.find(e => e.id === gameState.currentEvent?.id)?.description || gameState.currentEvent.description}
                                </p>
                            </div>

                            {/* Right Column: Image */}
                            <div className="flex flex-col justify-center items-center border-l-2 border-black pl-8">
                                <div className="relative w-full h-64 border-4 border-black mb-2 bg-gray-300">
                                    <img
                                        src={`/events/${gameState.currentEvent.id}.jpg`}
                                        alt="Event"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.parentElement.querySelector('.fallback').style.display = 'flex';
                                        }}
                                    />
                                    {/* Fallback */}
                                    <div className="fallback hidden absolute inset-0 items-center justify-center text-gray-600 font-bold flex-col">
                                        <span className="text-4xl mb-2">📷</span>
                                        <span>NO SIGNAL</span>
                                    </div>
                                    <span className="absolute bottom-0 right-0 bg-black text-white text-xs px-2 py-1 uppercase tracking-widest">Live-Aufnahme</span>
                                </div>
                            </div>
                        </div>

                        {/* Footer / Close Hint */}
                        <div className="mt-8 text-center">
                            <button
                                onClick={(e) => { e.stopPropagation(); setShowNews(false); }}
                                className="bg-red-600 text-white font-bold py-2 px-6 hover:bg-red-700 transition uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
                            >
                                Schließen
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Team Stats Grid */}
            <div className="grid grid-cols-4 gap-4 flex-1">
                {TEAMS.map((baseTeam) => {
                    const liveData = getTeamStat(baseTeam.id);
                    // Color mapping helper
                    // Color mapping helper with HEX for stability
                    const colorMap = {
                        'blue': '#60a5fa', // blue-400
                        'pink': '#f472b6', // pink-400
                        'green': '#4ade80', // green-400
                        'orange': '#fb923c' // orange-400
                    };
                    const colorHex = colorMap[baseTeam.color] || '#ffffff';

                    return (
                        <GlassCard key={baseTeam.id} className="flex flex-col items-center justify-center border-t-8 h-full min-h-[50vh]" style={{ borderColor: colorHex }}>
                            {/* Logo */}
                            <img
                                src={`/logos/${baseTeam.id}.png`}
                                alt={baseTeam.name}
                                className="w-48 h-48 object-contain mb-8 filter drop-shadow-xl hover:scale-110 transition-transform duration-500"
                                onError={(e) => { e.target.style.display = 'none'; }}
                            />

                            {/* Emoji Icon */}
                            <span className="text-8xl filter drop-shadow-lg animate-pulse-slow cursor-default hover:rotate-12 transition-transform">
                                {baseTeam.icon}
                            </span>

                            {/* Secretly keeping the name visible only on hover for accessibility/teacher context if needed? 
                                User said "ONLY logo and emoji". I will stick to that strictly. 
                            */}
                        </GlassCard>
                    );
                })}
            </div>
        </div >
    );
}
