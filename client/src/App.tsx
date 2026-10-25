import { useState } from 'react';
import Launcher from './components/Launcher';
import Game from './Game';
import PlayerSelect, { type PlayerColor } from './components/PlayerSelect';
import Sidebar from './layouts/Sidebar';
import Lobby from './layouts/Lobby';
import Infos from './layouts/Infos';

const PLAYERS: Record<PlayerColor, { label: string; color: string; shadow: string }> = {
  red: { label: 'Nath', color: '#D94A4A', shadow: '#b83a3a' },
  blue: { label: 'Max', color: '#4A7DD9', shadow: '#3a64b3' },
  yellow: { label: 'Tristan', color: '#D9B84A', shadow: '#b39a3a' },
  green: { label: 'Antoine', color: '#4AD97A', shadow: '#3ab363' },
};

export default function App() {
  const [player, setPlayer] = useState<PlayerColor | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameSettings, setGameSettings] = useState<any>(null);
  const [activeNav, setActiveNav] = useState('play');
  const [showLauncher, setShowLauncher] = useState(false);
  const [showPlayerSelectModal, setShowPlayerSelectModal] = useState(false);

  const handleStartGame = (settings: any) => {
    setGameSettings(settings);
    setIsPlaying(true);
  };

  const handleQuickPlay = (time: number) => {
    handleStartGame({
      timerEnabled: true,
      timeControl: time,
      color: 'random' as const,
      isCompetitive: false,
    });
  };

  if (isPlaying) {
    return (
      <Game 
        onBackToLobby={() => {
          setIsPlaying(false);
          setGameSettings(null);
          setShowLauncher(false);
        }} 
        settings={gameSettings} 
      />
    );
  }

  if (!player) {
    return (
      <div style={{ minHeight: '100vh', width: '100vw', backgroundColor: '#272522', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', boxSizing: 'border-box' }}>
        <PlayerSelect onSelect={(selectedPlayer) => setPlayer(selectedPlayer)} />
      </div>
    );
  }

  const currentPlayer = PLAYERS[player];

  return (
    <div style={{ minHeight: '100vh', width: '100vw', backgroundColor: '#272522', display: 'flex', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', overflow: 'hidden' }}>
      
      {/* Modal Changement de profil */}
      {showPlayerSelectModal && (
        <PlayerSelect
          onSelect={(selectedPlayer) => {
            setPlayer(selectedPlayer);
            setShowPlayerSelectModal(false);
          }}
          onBack={() => setShowPlayerSelectModal(false)}
        />
      )}

      {/* Modal Launcher */}
      {showLauncher && (
        <div style={{ minHeight: '100vh', width: '100vw', backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', top: 0, left: 0, zIndex: 100 }}>
          <div style={{ backgroundColor: '#302e2b', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '500px', border: '1px solid #484541', boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)', position: 'relative' }}>
            <button onClick={() => setShowLauncher(false)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#a5a29e', fontSize: '24px', cursor: 'pointer' }}>✕</button>
            <h2 style={{ color: '#ffffff', fontSize: '20px', fontWeight: 700, marginBottom: '20px', marginTop: 0 }}>Partie personnalisée</h2>
            <Launcher onStartGame={handleStartGame} />
          </div>
        </div>
      )}

      {/* Barre latérale */}
      <Sidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        currentPlayer={currentPlayer}
        onOpenProfileSelect={() => setShowPlayerSelectModal(true)}
      />

      {/* Contenu principal */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        <div style={{ flex: 1, display: 'flex', gap: '24px', marginTop: '50px', padding: '28px 32px', alignItems: 'flex-start' }}>
          
          <Lobby
            onQuickPlay={handleQuickPlay}
            onOpenLauncher={() => setShowLauncher(true)}
          />

          <Infos
            player={player}
            currentPlayer={currentPlayer}
            playersConfig={PLAYERS}
            onOpenProfileSelect={() => setShowPlayerSelectModal(true)}
          />

        </div>
      </div>
    </div>
  );
}