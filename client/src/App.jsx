import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import Home from './pages/Home';
import Lobby from './pages/Lobby';
import PlayerGame from './pages/PlayerGame';
import Admin from './pages/Admin';
import Whiteboard from './pages/Whiteboard';
import Brochure from './pages/Brochure';

import CyberpunkBackground from './components/ui/CyberpunkBackground';
import Footer from './components/layout/Footer';
import FullScreenButton from './components/ui/FullScreenButton';

import LandscapeGuard from './components/ui/LandscapeGuard';

// Inner component to use useLocation hook
function AppContent() {
  const location = useLocation();
  const showFullScreenButton = location.pathname !== '/whiteboard';

  return (
    <CyberpunkBackground>
      <LandscapeGuard>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/game" element={<PlayerGame />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/whiteboard" element={<Whiteboard />} />
          <Route path="/broschuere" element={<Brochure />} />
        </Routes>
      </LandscapeGuard>

      {showFullScreenButton && <FullScreenButton />}

      <Footer />
    </CyberpunkBackground>
  );
}

export default function App() {
  return (
    <GameProvider>
      <Router>
        <AppContent />
      </Router>
    </GameProvider>
  );
}
