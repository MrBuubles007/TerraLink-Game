import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { GlassCard } from '../components/ui/GlassCard';

import AnimatedLogo from '../components/ui/AnimatedLogo';

export default function Home() {
    const [name, setName] = useState('');
    const { joinGame } = useGame();
    const navigate = useNavigate();

    const handleJoin = (e) => {
        e.preventDefault();
        if (name.trim()) {
            joinGame(name);
            navigate('/lobby');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <GlassCard className="w-full max-w-md text-center">
                <AnimatedLogo className="mb-4" />
                <p className="text-gray-300 mb-8">Interactive Global Simulation</p>

                <form onSubmit={handleJoin} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Dein Name"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-lg shadow-indigo-500/30"
                    >
                        Spiel Beitreten
                    </button>
                </form>

                <div className="mt-8 border-t border-white/10 pt-4">
                    <Link to="/admin" className="text-xs text-gray-500 hover:text-gray-300">Admin Login</Link>
                </div>
            </GlassCard>
        </div>
    );
}
