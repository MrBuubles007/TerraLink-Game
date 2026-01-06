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
            <header className="flex-none p-2 z-10">
                <GlassCard className="flex justify-between items-center px-4 py-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full w-full md:w-3/4 mx-auto shadow-lg">
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
            <main className="flex-1 min-h-0 flex flex-col px-4 pb-4 w-full md:w-3/4 mx-auto relative gap-3">

                {/* TIMER OVERLAY */}
                {gameState.phase === 'DECISION' && gameState.timer > 0 && (
                    <div className="absolute top-0 right-4 -mt-2 z-20">
                        <span className="bg-red-600/90 text-white text-xs px-2 py-1 rounded-b-lg animate-pulse font-mono shadow-lg border border-red-400/50">
                            ⏱ {gameState.timer}s
                        </span>
                    </div>
                )}

                {/* SCENARIO: LOBBY */}
                {gameState.phase === 'LOBBY' && (
                    <GlassCard className="flex-1 flex flex-col items-center justify-center text-center">
                        <h1 className="text-3xl font-bold mb-2" style={{ color: teamColorHex }}>{myTeamData.name}</h1>
                        <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">{myTeamData.type}</div>
                        <div className="bg-black/30 p-4 rounded-xl mb-6 text-left border-l-4 border-gray-500 overflow-y-auto max-h-[40vh]">
                            <p className="text-sm leading-relaxed text-gray-200">{myTeamData.briefing}</p>
                        </div>
                        <div className="text-yellow-400 animate-pulse font-bold">Warte auf Start...</div>
                    </GlassCard>
                )}

                {/* SCENARIO: EVENT & DECISION (Split Screen - No Scroll) */}
                {(gameState.phase === 'EVENT' || gameState.phase === 'DECISION') && (
                    <>
                        {/* Top: News Card (Takes ~35-40%, shrinkable) */}
                        <GlassCard className="flex-none max-h-[40%] flex flex-col bg-red-900/10 border-red-500/20 p-4 rounded-2xl relative border-2 overflow-hidden shadow-lg">
                            <div className="absolute top-0 right-0 p-2 opacity-20 text-6xl rotate-12">📰</div>
                            <div className="flex-none mb-2">
                                <span className="text-[10px] font-bold bg-red-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm animate-pulse">
                                    Breaking News
                                </span>
                            </div>

                            {/* Scrollable text INSIDE the card if needed, page doesn't scroll */}
                            <div className="flex-1 overflow-y-auto min-h-0 pr-1 mask-linear-fade">
                                <h2 className="text-lg font-bold text-gray-100 leading-tight mb-2 sticky top-0 bg-[#3a0d0d]/90 backdrop-blur-sm z-10 py-1">
                                    {EVENTS.find(e => e.id === gameState.currentEvent?.id)?.title || gameState.currentEvent?.title}
                                </h2>
                                <p className="text-sm text-gray-300 leading-snug">
                                    {EVENTS.find(e => e.id === gameState.currentEvent?.id)?.description || gameState.currentEvent?.description}
                                </p>
                            </div>
                        </GlassCard>

                        {/* Bottom: Options (Takes Remaining Space - Flex 1) */}
                        <div className="flex-1 min-h-0 flex flex-col justify-end gap-2">
                            {gameState.phase === 'EVENT' ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-500 animate-pulse gap-2">
                                    <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                                    <span className="text-xs uppercase tracking-widest">Lade Optionen...</span>
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
                                            className={`flex-1 flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 border shadow-md
                                                ${hasVoted
                                                    ? 'opacity-40 grayscale bg-gray-800 border-gray-700'
                                                    : 'bg-gradient-to-r from-white/10 to-white/5 border-white/10 hover:border-yellow-400/50 active:scale-[0.98]'
                                                }
                                            `}
                                        >
                                            <div className="text-[10px] font-bold text-yellow-500 mb-0.5 uppercase tracking-wider border border-yellow-500/30 px-1.5 rounded bg-yellow-500/10">
                                                Option {opt.id}
                                            </div>
                                            <div className="text-sm md:text-base text-gray-100 font-medium leading-tight text-center px-2 line-clamp-3">
                                                {displayText}
                                            </div>
                                        </button>
                                    );
                                })
                            )}
                        </div>
                    </>
                )}

                {/* SCENARIO: RESULT */}
                {gameState.phase === 'RESULT' && (
                    <GlassCard className="flex-1 flex flex-col items-center justify-center text-center">
                        <div className="text-6xl mb-4 animate-bounce">⏳</div>
                        <h2 className="text-xl font-bold text-gray-200 mb-2">Auswertung läuft...</h2>
                        <p className="text-sm text-gray-400">Ergebnisse auf dem Whiteboard</p>
                    </GlassCard>
                )}
            </main>
        </div>
    );
}
