import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import Home from './pages/Home';
import Lobby from './pages/Lobby';
import PlayerGame from './pages/PlayerGame';
import Admin from './pages/Admin';
import Whiteboard from './pages/Whiteboard';

import CyberpunkBackground from './components/ui/CyberpunkBackground';
import Footer from './components/layout/Footer';

export default function App() {
  return (
    <GameProvider>
      <Router>
        <CyberpunkBackground>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lobby" element={<Lobby />} />
            <Route path="/game" element={<PlayerGame />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/whiteboard" element={<Whiteboard />} />
          </Routes>
          <Footer />
        </CyberpunkBackground>
      </Router>
    </GameProvider>
  );
}
