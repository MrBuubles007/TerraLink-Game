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

        <div className="h-screen w-screen overflow-hidden text-white font-sans flex flex-col">
            {/* 1. Header (Fixed Height) */}
            <header className="flex-none p-2">
                <GlassCard className="flex justify-between items-center px-4 py-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">{myTeamData.icon}</span>
                        <div>
                            <h2 className="text-sm font-bold leading-tight">{myTeamData.name}</h2>
                            <div className="text-[10px] text-gray-400">Runde {gameState.round}</div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm font-mono text-green-400 font-bold">€ {formatNumber(liveTeamStats.capital)} {liveTeamStats.capitalSuffix || "Mrd."}</div>
                        <div className="text-[10px] text-gray-400">Markt: {formatNumber(liveTeamStats.marketShare)}%</div>
                    </div>
                </GlassCard>
            </header>

            {/* 2. Main Content (Flex Grow - takes remaining space) */}
            <main className="flex-1 min-h-0 flex flex-col justify-center px-4 py-2 relative">

                {/* TIMER OVERLAY (If active) */}
                {gameState.phase === 'DECISION' && gameState.timer > 0 && (
                    <div className="absolute top-0 right-4 -mt-2 z-20">
                        <span className="bg-red-600/90 text-white text-xs px-2 py-1 rounded-b-lg animate-pulse font-mono shadow-lg border border-red-400/50">
                            ⏱ {gameState.timer}s
                        </span>
                    </div>
                )}

                {/* SCENARIO: LOBBY */}
                {gameState.phase === 'LOBBY' && (
                    <GlassCard className="flex flex-col items-center justify-center text-center h-full max-h-[80vh]">
                        <h1 className="text-2xl font-bold mb-1" style={{ color: teamColorHex }}>{myTeamData.name}</h1>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">{myTeamData.type}</div>

                        <div className="bg-black/30 p-3 rounded-lg mb-4 text-left border-l-2 border-gray-500 overflow-y-auto max-h-[40vh]">
                            <p className="text-xs leading-relaxed text-gray-200">{myTeamData.briefing}</p>
                        </div>

                        <div className="text-yellow-400 animate-pulse font-bold text-sm">
                            Warte auf Spielstart...
                        </div>
                    </GlassCard>
                )}

                {/* SCENARIO: EVENT & DECISION */}
                {(gameState.phase === 'EVENT' || gameState.phase === 'DECISION') && (
                    <div className="h-full flex flex-col gap-4">
                        {/* News Teaser */}
                        <GlassCard className="flex-none bg-red-900/20 border-red-500/30 p-5 rounded-2xl text-center shadow-lg relative overflow-hidden group">
                            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50"></div>

                            <div className="inline-block bg-red-600/90 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full mb-3 tracking-widest shadow-red-500/50 shadow-sm animate-pulse">
                                Breaking News
                            </div>

                            <h2 className="text-xl md:text-2xl font-bold text-gray-100 leading-tight mb-3 drop-shadow-md">
                                {EVENTS.find(e => e.id === gameState.currentEvent?.id)?.title || gameState.currentEvent?.title}
                            </h2>

                            <p className="text-sm md:text-base text-gray-300 leading-relaxed font-medium">
                                {EVENTS.find(e => e.id === gameState.currentEvent?.id)?.description || gameState.currentEvent?.description}
                            </p>
                        </GlassCard>

                        {/* Decision Buttons Area */}
                        <div className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-3 pb-4">
                            {gameState.phase === 'EVENT' ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-3 py-10">
                                    <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                                    <span className="text-sm font-medium animate-pulse">Optionen werden geladen...</span>
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
                                            className={`w-full relative group overflow-hidden p-4 rounded-xl transition-all duration-300 border flex flex-col items-center gap-2 text-center shadow-lg
                                                ${hasVoted
                                                    ? 'opacity-50 cursor-not-allowed bg-gray-800 border-gray-700 grayscale'
                                                    : 'bg-gradient-to-br from-white/10 to-white/5 border-white/10 hover:border-yellow-400/50 hover:bg-white/15 hover:scale-[1.02] active:scale-[0.98]'
                                                }
                                            `}
                                        >
                                            {/* Selection Indicator */}
                                            <div className="absolute top-3 left-3 bg-yellow-400/20 text-yellow-400 font-bold w-6 h-6 flex items-center justify-center rounded-lg text-xs border border-yellow-400/40 opacity-70 group-hover:opacity-100 transition-opacity">
                                                {opt.id}
                                            </div>

                                            <span className="text-base text-gray-100 font-medium leading-normal w-full mt-1 px-2">{displayText}</span>

                                            {!hasVoted && (
                                                <div className="mt-1 h-0.5 w-0 bg-yellow-400/50 group-hover:w-1/3 transition-all duration-500 rounded-full"></div>
                                            )}
                                        </button>
                                    );
                                })
                            )}
                        </div>
                    </div>
                )}

                {/* SCENARIO: RESULT */}
                {gameState.phase === 'RESULT' && (
                    <GlassCard className="text-center py-6">
                        <h2 className="text-lg font-bold text-gray-200 mb-2">Auswertung läuft...</h2>
                        <div className="animate-spin text-2xl mb-2">⏳</div>
                        <p className="text-xs text-gray-400">Blick zum Whiteboard!</p>
                    </GlassCard>
                )}
            </main>
        </div>
    );
}
