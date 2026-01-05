import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const GameContext = createContext();

// Determine URL dynamically:
// 1. If we are in production (hosted), use the relative path or specific ENV.
// 2. If locally, use window.location.hostname to support LAN access (e.g. 192.168.x.x)
const isProduction = import.meta.env.MODE === 'production';
const SOCKET_URL = isProduction
    ? '/' // In production, frontend & backend are usually same origin or handled by proxy
    : `http://${window.location.hostname}:3000`; // Local dev: preserve hostname (localhost or IP) but force port 3000

export const GameProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [gameState, setGameState] = useState(null);
    const [playerCount, setPlayerCount] = useState(0);
    const [myTeam, setMyTeam] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const newSocket = io(SOCKET_URL);
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Connected to server');
        });

        newSocket.on('game_state_update', (state) => {
            setGameState(state);
        });

        newSocket.on('timer_update', (timer) => {
            setGameState(prev => prev ? ({ ...prev, timer }) : prev);
        });

        newSocket.on('player_update', (count) => {
            setPlayerCount(count);
        });

        newSocket.on('joined', ({ teamId }) => {
            setMyTeam(teamId);
        });

        newSocket.on('admin_success', (success) => {
            setIsAdmin(success);
        });

        return () => newSocket.close();
    }, []);

    const loginAdmin = (password) => {
        socket?.emit('admin_login', password);
    };

    const joinGame = (name) => {
        socket?.emit('join_game', name);
    };

    const sendAdminAction = (action) => {
        socket?.emit('admin_action', action);
    };

    const submitVote = (voteId) => {
        socket?.emit('submit_vote', voteId);
    }

    return (
        <GameContext.Provider value={{
            socket,
            gameState,
            playerCount,
            myTeam,
            joinGame,
            isAdmin,
            loginAdmin,
            sendAdminAction,
            submitVote
        }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => useContext(GameContext);
