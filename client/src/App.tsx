import { useState } from 'react';
import Game from './Game';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  // Si le joueur lance la partie, on affiche l'interface de jeu
  if (isPlaying) {
    return <Game onBackToLobby={() => setIsPlaying(false)} />;
  }

  // Écran du Lobby / Lanceur de partie
  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      backgroundColor: '#272522',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 0,
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      
      {/* Conteneur principal du Lobby */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        width: '100%',
        maxWidth: '440px',
        backgroundColor: '#363431',
        padding: '36px 28px',
        borderRadius: '16px',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.6)',
        border: '1px solid #484541'
      }}>
        
        {/* Titre / Logo */}
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '26px', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>
            Chess
          </h1>
        </div>

        {/* Bouton de lancement de partie*/}
        <button
          onClick={() => setIsPlaying(true)}
          style={{
            width: '100%',
            backgroundColor: '#854AD9',
            color: '#ffffff',
            border: 'none',
            borderRadius: '10px',
            padding: '16px',
            fontSize: '16px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            cursor: 'pointer',
            boxShadow: '0 5px 0 #703abb',
            transition: 'all 0.1s ease',
            userSelect: 'none',
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translateY(3px)';
            e.currentTarget.style.boxShadow = '0 2px 0 #703abb';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'translateY(0px)';
            e.currentTarget.style.boxShadow = '0 5px 0 #703abb';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0px)';
            e.currentTarget.style.boxShadow = '0 5px 0 #703abb';
          }}
        >
          <span>Play</span>
        </button>

      </div>
    </div>
  );
}