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
        <div className="min-h-screen pt-4 px-4 pb-20 text-white font-sans">
            <div className="flex flex-col gap-4">

                {/* HEADER / STATUS CARD */}
                <GlassCard className="flex justify-between items-center sticky top-2 z-30 backdrop-blur-md bg-black/40">
                    <div>
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <span className="text-3xl">{myTeamData.icon}</span>
                            {myTeamData.name}
                        </h2>
                        <div className="text-xs text-gray-400 flex items-center gap-2">
                            Runde {gameState.round}
                            {gameState.phase === 'DECISION' && gameState.timer > 0 && (
                                <span className="bg-red-600 text-white px-2 rounded animate-pulse font-mono">{gameState.timer}s</span>
                            )}
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-xl font-mono text-green-400">€ {formatNumber(liveTeamStats.capital)} {liveTeamStats.capitalSuffix || "Mrd."}</div>
                        <div className="text-xs text-gray-400">Marktanteil: {formatNumber(liveTeamStats.marketShare)}%</div>
                    </div>
                </GlassCard>

                {/* Main Content Area */}
                <div className="max-w-2xl mx-auto">

                    {/* ENHANCED BRIEFING / LOBBY */}
                    {gameState.phase === 'LOBBY' && (
                        <GlassCard className="animate-fade-in text-center">
                            <h1 className="text-4xl font-bold mb-2" style={{ color: teamColorHex }}>{myTeamData.name}</h1>
                            <div className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">{myTeamData.type}</div>

                            <div className="bg-black/30 p-6 rounded-xl mb-6 text-left border-l-4 border-gray-500">
                                <p className="text-lg leading-relaxed text-gray-200">{myTeamData.briefing}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-white/5 p-4 rounded">
                                    <div className="text-gray-400 text-xs uppercase">Startkapital</div>
                                    <div className="text-2xl font-mono text-green-400">€ {formatNumber(liveTeamStats.capital)} {liveTeamStats.capitalSuffix || "Mrd."}</div>
                                </div>
                                <div className="bg-white/5 p-4 rounded">
                                    <div className="text-gray-400 text-xs uppercase">Marktanteil</div>
                                    <div className="text-2xl font-mono text-blue-400">{formatNumber(liveTeamStats.marketShare)}%</div>
                                </div>
                            </div>

                            <div className="text-yellow-400 animate-pulse font-bold">
                                Warte auf Spielstart durch Admin...
                            </div>
                        </GlassCard>
                    )}

                    {gameState.phase === 'EVENT' && (
                        <GlassCard className="animate-fade-in-up">
                            <div className="bg-red-500/20 text-red-200 px-3 py-1 rounded inline-block text-sm mb-4 font-bold tracking-wider">BREAKING NEWS</div>
                            {/* Force Client-Side Text Update (HMR) for Title/Desc */}
                            <h2 className="text-3xl font-bold mb-4">
                                {EVENTS.find(e => e.id === gameState.currentEvent?.id)?.title || gameState.currentEvent?.title}
                            </h2>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                {EVENTS.find(e => e.id === gameState.currentEvent?.id)?.description || gameState.currentEvent?.description}
                            </p>
                            <div className="mt-8 text-center text-gray-400 animate-pulse">
                                Warte auf Entscheidungsmöglichkeiten...
                            </div>
                        </GlassCard>
                    )}

                    {gameState.phase === 'DECISION' && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold mb-4 text-center">Entscheide jetzt!</h2>
                            {gameState.currentEvent?.options.map((opt) => {
                                // Force Client-Side Text Update (HMR)
                                // Look up the option in the local EVENTS array to get the simplified text
                                // This fixes the "Server Stale State" issue without restart
                                const localEvent = EVENTS.find(e => e.id === gameState.currentEvent.id);
                                const localOption = localEvent?.options.find(o => o.id === opt.id);
                                const displayText = localOption ? localOption.text : opt.text;

                                return (
                                    <button
                                        key={opt.id}
                                        disabled={hasVoted}
                                        onClick={() => handleVote(opt.id)}
                                        className={`w-full text-left p-4 rounded-xl transition-all duration-200 border border-white/10
                                    ${hasVoted ? 'opacity-50 cursor-not-allowed bg-gray-800' : 'bg-white/5 hover:bg-white/10 hover:border-white/30 active:scale-[0.98]'}
                                `}
                                    >
                                        <span className="font-bold text-lg text-yellow-400 mr-3">{opt.id}</span>
                                        <span className="text-gray-200">{displayText}</span>
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {gameState.phase === 'RESULT' && (
                        <GlassCard className="text-center py-10">
                            <h2 className="text-2xl font-bold text-gray-200 mb-2">Auswertung läuft...</h2>
                            <p className="text-gray-400">Bitte schaue auf das Whiteboard.</p>
                        </GlassCard>
                    )}

                </div>
            </div>
        </div>
    );
}
