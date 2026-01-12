const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const cors = require('cors');
const { TEAMS, EVENTS } = require('./data/initialData.js');

const app = express();
app.use(cors());

// Serve static files from React app (Production)
app.use(express.static(path.join(__dirname, '../client/dist')));

// Handle SPA routing (send index.html for unknown routes)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all for now (local dev)
        methods: ["GET", "POST"]
    }
});

// --- Game State ---
// --- Game State ---
let players = {}; // socket.id -> { name, teamId }
let currentRoundVotes = {};

let gameState = {
    phase: 'LOBBY', // LOBBY, EVENT, DECISION, RESULT, END
    round: 0,
    currentEvent: null,
    teamStats: JSON.parse(JSON.stringify(TEAMS)), // Deep copy initial stats
    displayNews: null, // Global message for whiteboard
    timer: 0 // Seconds remaining
};

let timerInterval = null;

function startTimer(seconds) {
    if (timerInterval) clearInterval(timerInterval);
    gameState.timer = seconds;
    io.emit('timer_update', gameState.timer);

    timerInterval = setInterval(() => {
        gameState.timer--;
        io.emit('timer_update', gameState.timer);

        if (gameState.timer <= 0) {
            clearInterval(timerInterval);
            // Auto-advance if in decision phase
            if (gameState.phase === 'DECISION') {
                gameLoopNext();
            }
        }
    }, 1000);
}

// --- Helper Functions ---
function getBalancedTeam() {
    const counts = { megalogistics: 0, fastfash: 0, heidehof: 0, techsolutions: 0 };
    Object.values(players).forEach(p => counts[p.teamId]++);

    // Find teams with min players
    let min = Infinity;
    let candidates = [];

    for (const [id, count] of Object.entries(counts)) {
        if (count < min) {
            min = count;
            candidates = [id];
        } else if (count === min) {
            candidates.push(id);
        }
    }

    // Randomly pick one of the least populated teams
    return candidates[Math.floor(Math.random() * candidates.length)];
}

function calculateTeamDecision(teamId) {
    const teamVotes = currentRoundVotes[teamId] || {};
    let winner = null;
    let maxVotes = -1;

    // Find option with most votes
    for (const [optionId, count] of Object.entries(teamVotes)) {
        if (count > maxVotes) {
            maxVotes = count;
            winner = optionId;
        } else if (count === maxVotes) {
            if (Math.random() > 0.5) winner = optionId;
        }
    }

    // Return winner or null if no votes
    return winner || null;
}

// --- Socket Logic ---
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Admin Identification
    socket.on('admin_login', (password) => {
        if (password === 'admin') {
            socket.emit('admin_success', true);
            socket.join('admin');
        } else {
            socket.emit('admin_success', false);
        }
    });

    // Player Join
    socket.on('join_game', (name) => {
        const assignedTeam = getBalancedTeam();
        players[socket.id] = { name, teamId: assignedTeam };

        socket.emit('joined', { teamId: assignedTeam });
        io.emit('player_update', Object.values(players).length); // Update player count
        console.log(`${name} joined team ${assignedTeam}`);
    });

    // Admin Actions
    socket.on('admin_action', (action) => {
        // Basic security check could go here, but omitted for school project simplicity

        switch (action.type) {
            case 'START_GAME':
                gameState.round = 1;
                gameState.phase = 'EVENT';
                gameState.currentEvent = EVENTS[0]; // Start with first event
                gameState.displayNews = "SPIEL GESTARTET! Das erste Event steht an.";
                currentRoundVotes = {};
                io.emit('game_state_update', gameState);
                break;

            case 'NEXT_PHASE':
                gameLoopNext();
                break;

            case 'SANCTION': // UN Action
                const tIdx = gameState.teamStats.findIndex(t => t.id === action.targetTeamId);
                if (tIdx !== -1) {
                    const t = gameState.teamStats[tIdx];
                    // Sanction: Lose 15% of Capital
                    let dmg = 0;
                    if (typeof t.capital === 'number') {
                        dmg = (t.capital * 15) / 100;
                        t.capital -= dmg;
                        t.capital = Math.round(t.capital * 100) / 100;
                        // Store for display
                        if (!t.lastChanges) t.lastChanges = {};
                        t.lastChanges.capital = -Math.round(dmg * 100) / 100;
                    }
                    gameState.displayNews = `UN verhängt SANKTIONEN gegen ${t.name}! (-15% Kapital)`;
                    io.emit('game_state_update', gameState);
                }
                break;

            case 'LAWSUIT': // Environmental NGO
                const tIdx2 = gameState.teamStats.findIndex(t => t.id === action.targetTeamId);
                if (tIdx2 !== -1) {
                    const t2 = gameState.teamStats[tIdx2];
                    // Lawsuit: Lose 5% Capital + CO2 Bad Press
                    let dmg2 = 0;
                    if (typeof t2.capital === 'number') {
                        dmg2 = (t2.capital * 5) / 100;
                        t2.capital -= dmg2;
                        t2.capital = Math.round(t2.capital * 100) / 100;
                    }
                    t2.co2 = "KRITISCH";
                    gameState.displayNews = `KLAGE gegen ${t2.name} eingereicht! Image-Schaden & Strafzahlung.`;
                    io.emit('game_state_update', gameState);
                }
                break;

            case 'STRIKE': // Civil Society
                const tIdx3 = gameState.teamStats.findIndex(t => t.id === action.targetTeamId);
                if (tIdx3 !== -1) {
                    const t3 = gameState.teamStats[tIdx3];
                    // Strike: Lose 10% Market Share (Production Stop)
                    // relative loss of their share!
                    let mDraw = (t3.marketShare * 10) / 100;
                    t3.marketShare -= mDraw;
                    t3.marketShare = Math.round(t3.marketShare * 10) / 10;

                    if (!t3.lastChanges) t3.lastChanges = {};
                    t3.lastChanges.marketShare = -Math.round(mDraw * 10) / 10;

                    gameState.displayNews = `GENERALSTREIK bei ${t3.name}! (-10% Marktanteil)`;
                    io.emit('game_state_update', gameState);
                }
                break;
        }
    });

    socket.on('submit_vote', (voteId) => {
        const player = players[socket.id];
        if (!player) return;

        if (gameState.phase !== 'DECISION') return;

        const teamId = player.teamId;
        if (!currentRoundVotes[teamId]) currentRoundVotes[teamId] = {};
        if (!currentRoundVotes[teamId][voteId]) currentRoundVotes[teamId][voteId] = 0;
        currentRoundVotes[teamId][voteId]++;

        console.log(`Vote ${voteId} from ${player.name} (${teamId})`);
    });

    socket.on('disconnect', () => {
        delete players[socket.id];
        io.emit('player_update', Object.values(players).length);
    });
});

function gameLoopNext() {
    if (gameState.phase === 'EVENT') {
        gameState.phase = 'DECISION'; // Players see buttons
        gameState.displayNews = "Entscheidet euch jetzt! 5 Minuten."; // Updated text
        currentRoundVotes = {};
        startTimer(300); // 300s timer for voting
    } else if (gameState.phase === 'DECISION') {
        if (timerInterval) clearInterval(timerInterval); // Stop timer
        gameState.phase = 'RESULT';   // Show outcome

        // Initialize zero-change for everyone first (so non-voters don't keep old red/green values)
        gameState.teamStats.forEach(t => {
            t.lastChanges = { capital: 0, marketShare: 0 };
        });

        const currentEvent = gameState.currentEvent;
        if (currentEvent) {
            gameState.teamStats.forEach(team => {
                const hasPlayers = Object.values(players).some(p => p.teamId === team.id);
                // Even if no players, we need to process them to avoid stable state if we want simulation?
                // For now, only process active teams or default behavior.
                if (!hasPlayers) {
                    // Non-active teams do nothing
                    team.lastAnalysis = null;
                    return;
                }

                const winningOptionId = calculateTeamDecision(team.id);
                const option = currentEvent.options.find(o => o.id === winningOptionId);

                if (option) {
                    // Determine effect: Check for team-specific override first
                    const effect = option.customEffects?.[team.id] || option.effect;

                    // RELATIVE PERCENTAGE LOGIC
                    // We interpret 'cost' as a score where ~50 is a significant hit. 
                    // Dividing by 5 gives the percentage (e.g. 50/5 = 10%).
                    let percentageLoss = effect.cost / 5;

                    let actualCost = 0;
                    if (typeof team.capital === 'number') {
                        actualCost = (team.capital * percentageLoss) / 100;

                        // CAP LOGIC: Max +/- 20 (Unit agnostic, effectively Billion/Million based on context)
                        // User requested: "nicht mehr als ungefähr als 20 Milliarden Euro verlieren"
                        if (actualCost > 20) actualCost = 20;
                        if (actualCost < -20) actualCost = -20;

                        team.capital -= actualCost;
                        // Precision handling
                        if (team.capital < 0) team.capital = 0; // No negative capital

                        // For small numbers, keep more decimals (3 decimals)
                        team.capital = Math.round(team.capital * 1000) / 1000;
                        gameState.lastChanges = gameState.lastChanges || {}; // Ensure exists
                        team.lastChanges.capital = -Math.round(actualCost * 1000) / 1000;
                    }

                    // Organic Market Share + Randomness (Realism)
                    let marketChange = effect.market;

                    // Add "Market Noise" (-1.5 to +1.5 %) to make it not uneven numbers
                    const noise = (Math.random() * 3) - 1.5;
                    let proposedChange = marketChange + noise;

                    // Store old value to calculate ACTUAL change after clamping
                    const oldMarketShare = team.marketShare;

                    // LOGIC FIX: Cannot lose more than you have
                    // If proposedChange is -50 but share is 10, actual change is -10.
                    if (proposedChange < 0 && Math.abs(proposedChange) > team.marketShare) {
                        proposedChange = -team.marketShare;
                    }

                    // Apply
                    team.marketShare += proposedChange;

                    // Clamp Market Share (Double check) & Floor at 2% if they had >2% before
                    // User Request: Never drop below 2% (insolvency protection)
                    if (team.marketShare < 2) team.marketShare = 2;

                    // Round to 1 decimal
                    team.marketShare = Math.round(team.marketShare * 10) / 10;

                    // Calculate the EFFECTIVE change
                    const actualChange = team.marketShare - oldMarketShare;
                    team.lastChanges.marketShare = Math.round(actualChange * 10) / 10;

                    // ANALYSIS GENERATION
                    const decisionText = `Option ${winningOptionId}: ${option.text}`;
                    const explanationText = option.analysis || "Konsequenz wird spürbar.";

                    team.lastDecision = winningOptionId;
                    team.lastAnalysis = `${decisionText}\n\n${explanationText}`;
                } else {
                    team.lastAnalysis = "Keine Entscheidung getroffen.\nStillstand ist Rückschritt.";
                    // Implicit 0 change from earlier initialization
                }
            });
        }
        gameState.displayNews = "Die Ergebnisse sind da! Auswirkungen werden analysiert.";
    } else if (gameState.phase === 'RESULT') {
        gameState.round++;
        if (gameState.round > EVENTS.length) {
            gameState.phase = 'END';
            gameState.displayNews = "SPIEL VORBEI! Auswertung...";

            // Calculate Scores
            gameState.finalRanking = gameState.teamStats.map(team => {
                const initial = TEAMS.find(t => t.id === team.id);

                // Capital Growth %
                let capGrowth = 0;
                if (initial.capital > 0) {
                    capGrowth = ((team.capital - initial.capital) / initial.capital) * 100;
                }

                // Market Share Growth %
                let marketGrowth = 0;
                if (initial.marketShare > 0) {
                    marketGrowth = ((team.marketShare - initial.marketShare) / initial.marketShare) * 100;
                }

                // Total Score = Simple Sum of % Growths
                const totalScore = capGrowth + marketGrowth;

                return {
                    ...team,
                    capitalGrowth: Math.round(capGrowth * 10) / 10,
                    marketGrowth: Math.round(marketGrowth * 10) / 10,
                    totalScore: Math.round(totalScore)
                };
            }).sort((a, b) => b.totalScore - a.totalScore); // Sort descending

            gameState.displayNews = `SIEGER: ${gameState.finalRanking[0].name}`;
        } else {
            gameState.phase = 'EVENT';
            gameState.currentEvent = EVENTS[(gameState.round - 1) % EVENTS.length];
            gameState.displayNews = `RUNDE ${gameState.round}: ${gameState.currentEvent.title}`;

            // RESET LOGIC FOR NEW ROUND
            gameState.teamStats.forEach(t => {
                t.lastAnalysis = null; // Remove sticky note
                t.lastChanges = { capital: 0, marketShare: 0 }; // Clear diffs
                t.lastDecision = null;
            });
        }
    }

    io.emit('game_state_update', gameState);
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
