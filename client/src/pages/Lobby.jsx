import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { GlassCard } from '../components/ui/GlassCard';
import InfoModal from '../components/ui/InfoModal';
import { TEAMS } from '../data/initialData';

export default function Lobby() {
    const { myTeam, gameState } = useGame();
    const navigate = useNavigate();

    // Find team details
    const teamData = TEAMS.find(t => t.id === myTeam);

    // Auto-redirect if game starts
    useEffect(() => {
        if (gameState && gameState.phase !== 'LOBBY') {
            navigate('/game');
        }
    }, [gameState, navigate]);

    const formatNumber = (num) => {
        if (num === undefined || num === null) return "0";
        return num.toString().replace('.', ',');
    };

    // Live stats from game state if available (for capital/market)
    const liveTeamStats = gameState && gameState.teamStats ? (gameState.teamStats.find(t => t.id === myTeam) || teamData) : teamData;

    // State for Info Modal
    const [showInfo, setShowInfo] = React.useState(true);

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <InfoModal isOpen={showInfo} onClose={() => setShowInfo(false)} />
            <GlassCard className="w-full max-w-lg text-center animate-fade-in">

                {teamData ? (
                    <div>
                        <h1 className="text-5xl font-extrabold mb-2" style={{
                            color: {
                                'blue': '#60a5fa', 'pink': '#f472b6', 'green': '#4ade80', 'orange': '#fb923c'
                            }[teamData.color] || '#ffffff'
                        }}>
                            <span className="mr-4 filter drop-shadow-lg inline-block">{teamData.icon}</span>
                            {teamData.name}
                        </h1>
                        <div className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">{teamData.type}</div>

                        <div className="bg-black/30 p-6 rounded-xl mb-6 text-left border-l-4 border-gray-500">
                            <p className="text-lg leading-relaxed text-gray-200">{teamData.briefing}</p>
                        </div>

                        {liveTeamStats && (
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-white/5 p-4 rounded text-center">
                                    <div className="text-gray-400 text-xs uppercase">Startkapital</div>
                                    <div className="text-2xl font-mono text-green-400">€ {formatNumber(liveTeamStats.capital)} {liveTeamStats.capitalSuffix || "Mrd."}</div>
                                </div>
                                <div className="bg-white/5 p-4 rounded text-center">
                                    <div className="text-gray-400 text-xs uppercase">Marktanteil</div>
                                    <div className="text-2xl font-mono text-blue-400">{formatNumber(liveTeamStats.marketShare)}%</div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <p>Lade Team-Daten...</p>
                )}

                <div className="mt-8 pt-4 border-t border-white/10">
                    <p className="text-yellow-400 animate-pulse font-bold text-lg">Warte auf Spielstart durch Admin...</p>
                    <p className="text-gray-500 text-xs mt-2">Schau auf das Whiteboard für Instruktionen.</p>
                </div>
            </GlassCard>
        </div>
    );
}
