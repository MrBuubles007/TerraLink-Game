import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { GlassCard } from '../components/ui/GlassCard';
import { TEAMS, EVENTS } from '../data/initialData';
import Podium from '../components/ui/Podium';

export default function PlayerGame() {
    const { gameState, myTeam, submitVote } = useGame();
    const [hasVoted, setHasVoted] = useState(false);

    // If no team assigned yet or game not active, show loading or lobby partial
    if (!gameState || !myTeam) return <div className="text-center p-10 text-white">Lade Spieldaten...</div>;

    // --- END GAME PODIUM ---
    if (gameState.phase === 'END') {
        return <Podium ranking={gameState.finalRanking} />;
    }

    const formatNumber = (num) => {
        if (num === undefined || num === null) return "0";
        return num.toString().replace('.', ',');
    };

    // myTeam is just the ID string from context
    const myTeamId = typeof myTeam === 'object' ? myTeam.id : myTeam; // Safety check in case it changes
    const myTeamData = TEAMS.find(t => t.id === myTeamId) || {};
    // Get live stats from gameState if available, else static
    const liveTeamStats = gameState.teamStats.find(t => t.id === myTeamId) || {};

    const teamColorHex = {
        blue: '#3b82f6',
        green: '#22c55e',
        pink: '#ec4899',
        orange: '#f97316'
    }[myTeamData.color] || '#ffffff';

    const handleVote = (optionId) => {
        if (hasVoted) return;
        submitVote(optionId);
        setHasVoted(true);
    };

    // Reset vote state when round changes
    useEffect(() => {
        setHasVoted(false);
    }, [gameState.round]);

    return (

        <div className="h-screen w-screen overflow-hidden text-white font-sans flex flex-col bg-black text-xs">
            {/* WRAPPER to Scale Down UI (0.9x) */}
            <div className="flex-1 flex flex-col h-full transform scale-[0.9] origin-top w-full mx-auto" style={{ height: '111%' }}>

                {/* 1. EXPANDED DASHBOARD HEADER */}
                <header className="flex-none p-2 z-10">
                    <GlassCard className="flex flex-col items-stretch px-4 py-3 bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl w-full md:w-3/4 mx-auto shadow-xl gap-3">

                        {/* Top Row: Identity */}
                        <div className="flex items-center justify-between border-b border-white/10 pb-2">
                            <div className="flex items-center gap-3">
                                <span className="text-4xl filter drop-shadow-md">{myTeamData.icon}</span>
                                <div className="text-left">
                                    <h2 className="text-lg font-bold leading-none mb-0.5" style={{ color: teamColorHex }}>{myTeamData.name}</h2>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{myTeamData.type}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-[9px] text-gray-500 uppercase font-bold tracking-wider mb-0.5">Aktuelle Runde</div>
                                <div className="text-2xl font-mono font-bold leading-none">{gameState.round}</div>
                            </div>
                        </div>

                        {/* Bottom Row: Key Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 rounded-lg p-2 flex flex-col items-center justify-center border border-white/5">
                                <span className="text-[9px] uppercase text-gray-400 font-bold mb-0.5">Kapital</span>
                                <span className="text-base font-mono font-bold text-green-400">
                                    € {formatNumber(liveTeamStats.capital)} {liveTeamStats.capitalSuffix || "Mrd."}
                                </span>
                            </div>
                            <div className="bg-white/5 rounded-lg p-2 flex flex-col items-center justify-center border border-white/5">
                                <span className="text-[9px] uppercase text-gray-400 font-bold mb-0.5">Marktanteil</span>
                                <span className="text-base font-mono font-bold text-blue-400">
                                    {formatNumber(liveTeamStats.marketShare)}%
                                </span>
                            </div>
                        </div>
                    </GlassCard>
                </header>

                {/* 2. Main Content */}
                <main className="flex-1 min-h-0 flex flex-col px-2 pb-8 w-full md:w-3/4 mx-auto relative gap-2">

                    {/* TIMER OVERLAY */}
                    {gameState.phase === 'DECISION' && gameState.timer > 0 && (
                        <div className="absolute top-0 right-4 -mt-2 z-20">
                            <span className="bg-red-600/90 text-white text-[10px] px-2 py-0.5 rounded-b-lg animate-pulse font-mono shadow-lg border border-red-400/50">
                                ⏱ {gameState.timer}s
                            </span>
                        </div>
                    )}

                    {/* SCENARIO: LOBBY */}
                    {gameState.phase === 'LOBBY' && (
                        <GlassCard className="flex-1 flex flex-col items-center justify-center text-center">
                            <h1 className="text-2xl font-bold mb-1" style={{ color: teamColorHex }}>{myTeamData.name}</h1>
                            <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">{myTeamData.type}</div>
                            <div className="bg-black/30 p-3 rounded-xl mb-4 text-left border-l-4 border-gray-500 overflow-y-auto max-h-[40vh]">
                                <p className="text-[10px] leading-relaxed text-gray-200">{myTeamData.briefing}</p>
                            </div>
                            <div className="text-yellow-400 animate-pulse font-bold">Warte auf Start...</div>
                        </GlassCard>
                    )}

                    {/* SCENARIO: EVENT & DECISION (NO NEWS, ONLY BUTTONS) */}
                    {(gameState.phase === 'EVENT' || gameState.phase === 'DECISION') && (
                        <div className="flex-1 min-h-0 flex flex-col justify-end gap-2 h-full">
                            {gameState.phase === 'EVENT' ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-500 animate-pulse gap-2">
                                    <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                                    <span className="text-sm uppercase tracking-widest font-bold">Spiel wird geladen...</span>
                                    <span className="text-[10px] text-gray-600">Blick auf das Whiteboard</span>
                                </div>
                            ) : (
                                gameState.currentEvent?.options.map((opt) => {
                                    const localEvent = EVENTS.find(e => e.id === gameState.currentEvent.id);
                                    const localOption = localEvent?.options.find(o => o.id === opt.id);
                                    const displayText = localOption ? localOption.text : opt.text;

                                    return (
                                        <button
                                            key={opt.id}
                                            disabled={hasVoted}
                                            onClick={() => handleVote(opt.id)}
                                            className={`flex-1 flex flex-col items-start justify-center p-4 rounded-xl transition-all duration-200 border shadow-lg relative overflow-hidden group
                                                ${hasVoted
                                                    ? 'opacity-40 grayscale bg-gray-800 border-gray-700'
                                                    : 'bg-gradient-to-r from-white/10 to-white/5 border-white/10 hover:border-yellow-400/50 hover:bg-white/10 active:scale-[0.98]'
                                                }
                                            `}
                                        >
                                            {/* Big Option Label Background */}
                                            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white/5 to-transparent pointer-events-none"></div>

                                            <div className="flex items-center gap-3 w-full relative z-10">
                                                <div className="flex-none w-8 h-8 rounded-full bg-yellow-400/20 border border-yellow-400/50 text-yellow-400 flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-110 transition-transform">
                                                    {opt.id}
                                                </div>
                                                <div className="flex-1 text-left">
                                                    <div className="text-sm md:text-base text-gray-100 font-bold leading-tight mb-0.5">
                                                        Option {opt.id}
                                                    </div>
                                                    <div className="text-[11px] md:text-xs text-gray-300 leading-tight opacity-90 line-clamp-2">
                                                        {displayText}
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })
                            )}
                        </div>
                    )}

                    {/* SCENARIO: RESULT */}
                    {gameState.phase === 'RESULT' && (
                        <GlassCard className="flex-1 flex flex-col items-center justify-center text-center">
                            <div className="text-5xl mb-4 animate-bounce">⏳</div>
                            <h2 className="text-xl font-bold text-gray-200 mb-2">Auswertung</h2>
                            <p className="text-xs text-gray-400">Ergebnisse auf dem Hauptbildschirm</p>
                        </GlassCard>
                    )}
                </main>
            </div>
        </div>
    );
}
