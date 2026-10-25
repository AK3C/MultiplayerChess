import { useState } from 'react';
import Launcher from './components/Launcher';
import Game from './Game';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameSettings, setGameSettings] = useState<any>(null);

  // Fonction appelée lorsque l'utilisateur valide ses paramètres de jeu dans le Launcher
  const handleStartGame = (settings: any) => {
    setGameSettings(settings);
    setIsPlaying(true);
    // Plus tard, c'est ici qu'on enverra les paramètres au serveur :
    // socket.emit('join_match', settings);
  };

  // Si le joueur est en partie, on affiche l'échiquier (Game)
  if (isPlaying) {
    return (
      <Game 
        onBackToLobby={() => {
          setIsPlaying(false);
          setGameSettings(null);
        }} 
        settings={gameSettings} 
      />
    );
  }

  // Sinon, on affiche le dashboard à 3 sections de taille égale
  return (
    <div style={{
      display: 'flex',
      gap: '20px',
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      {/* Section 1 : Statistiques */}
      <section style={{
        flex: 1,
        backgroundColor: '#363431',
        borderRadius: '12px',
        border: '2px solid #262421',
        boxShadow: '0 4px 0 #262421',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <h2 style={{ color: '#ffffff', fontSize: '18px', marginBottom: '12px' }}>Statistiques</h2>
        {/* Contenu stats */}
      </section>

      {/* Section 2 : See game right now (Parties en cours) */}
      <section style={{
        flex: 1,
        backgroundColor: '#363431',
        borderRadius: '12px',
        border: '2px solid #262421',
        boxShadow: '0 4px 0 #262421',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <h2 style={{ color: '#ffffff', fontSize: '18px', marginBottom: '12px' }}>Parties en cours</h2>
        {/* Contenu see game */}
      </section>

      {/* Section 3 : Launch a game */}
      <section style={{
        flex: 1,
        backgroundColor: '#363431',
        borderRadius: '12px',
        border: '2px solid #262421',
        boxShadow: '0 4px 0 #262421',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <h2 style={{ color: '#ffffff', fontSize: '18px', marginBottom: '12px' }}>Lancer une partie</h2>
        <Launcher onStartGame={handleStartGame} />
      </section>
    </div>
  );
}