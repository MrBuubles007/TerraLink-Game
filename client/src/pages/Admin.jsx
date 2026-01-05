import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { GlassCard } from '../components/ui/GlassCard';
import { TEAMS } from '../data/initialData';

export default function Admin() {
    const { loginAdmin, isAdmin, sendAdminAction } = useGame();
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    if (!isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <GlassCard className="w-full max-w-sm">
                    <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
                    <input
                        type="password"
                        className="w-full bg-white/10 border border-white/20 p-2 rounded mb-4"
                        placeholder="Passwort"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={() => loginAdmin(password)} className="w-full bg-red-600 p-2 rounded font-bold hover:bg-red-700">Login</button>
                </GlassCard>
            </div>
        )
    }

    // Admin Controls
    return (
        <div className="min-h-screen p-6 text-white">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-red-500">ADMIN CONTROL CENTER</h1>
                <button
                    onClick={() => navigate('/whiteboard')}
                    className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 font-bold border border-gray-500"
                >
                    Whiteboard öffnen (Safe)
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Game Flow */}
                <GlassCard>
                    <h3 className="text-xl font-bold mb-4 border-b border-white/10 pb-2">Spielsteuerung</h3>
                    <div className="space-y-3">
                        <button onClick={() => sendAdminAction({ type: 'START_GAME' })} className="w-full bg-green-600 py-3 rounded font-bold hover:bg-green-700">SPIEL STARTEN</button>
                        <button onClick={() => sendAdminAction({ type: 'NEXT_PHASE' })} className="w-full bg-blue-600 py-3 rounded font-bold hover:bg-blue-700">NÄCHSTE PHASE</button>
                    </div>
                </GlassCard>

                {/* UN Actions */}
                <GlassCard>
                    <h3 className="text-xl font-bold mb-4 border-b border-white/10 pb-2">UN Sanktionen</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {TEAMS.map(team => (
                            <button
                                key={team.id}
                                onClick={() => sendAdminAction({ type: 'SANCTION', targetTeamId: team.id })}
                                className="text-xs bg-indigo-900 border border-indigo-500 p-2 rounded hover:bg-indigo-800"
                            >
                                Sanktion vs. {team.icon} {team.name}
                            </button>
                        ))}
                    </div>
                </GlassCard>

                {/* NGO Actions */}
                <GlassCard>
                    <h3 className="text-xl font-bold mb-4 border-b border-white/10 pb-2">NGO Klagen</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {TEAMS.map(team => (
                            <button
                                key={team.id}
                                onClick={() => sendAdminAction({ type: 'LAWSUIT', targetTeamId: team.id })}
                                className="text-xs bg-green-900 border border-green-500 p-2 rounded hover:bg-green-800"
                            >
                                Klage vs. {team.icon} {team.name}
                            </button>
                        ))}
                    </div>
                </GlassCard>

                {/* Civil Society */}
                <GlassCard>
                    <h3 className="text-xl font-bold mb-4 border-b border-white/10 pb-2">Streik / Zivil</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {TEAMS.map(team => (
                            <button
                                key={team.id}
                                onClick={() => sendAdminAction({ type: 'STRIKE', targetTeamId: team.id })}
                                className="text-xs bg-orange-900 border border-orange-500 p-2 rounded hover:bg-orange-800"
                            >
                                Streik bei {team.icon} {team.name}
                            </button>
                        ))}
                    </div>
                </GlassCard>

            </div>
        </div>
    );
}
