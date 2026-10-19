import { useState, useEffect } from 'react';
import Board from './components/Board';
import Timer from './components/Timer';
import DrawButton from './components/DrawButton';
import ResignButton from './components/ResignButton';

export default function App() {
  const [fen] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
  const [isWhiteTurn] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Détection dynamique de la taille d'écran (Phone vs PC)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile(); // Vérification au chargement
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // =========================================================================
  // 1. DISPOSITION MOBILE (Board au centre, Timers au-dessus/en dessous alignés)
  // =========================================================================
  if (isMobile) {
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
        padding: '12px',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}>
        {/* Conteneur Mobile bridé à la largeur exacte du plateau */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 'min(92vw, 480px)',
          margin:'2px',
          gap: '8px'
        }}>
          
          {/* HAUT : Timer Adversaire en haut à gauche (pile au-dessus du plateau) */}
          <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start'
          }}>
            <div style={{ width: '130px' }}>
              <Timer 
                playerName="Adversaire" 
                initialTime={60} 
                isActive={!isWhiteTurn} 
                onTimeOut={() => alert('Temps écoulé ! Victoire des Blancs.')} 
              />
            </div>
          </div>

          {/* CENTRE : L'Échiquier */}
          <Board fen={fen} isMobile={true} />

          {/* BAS : Timer Soi à gauche (pile en dessous) + Boutons à droite */}
          <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            {/* Timer Joueur (en bas à gauche) */}
            <div style={{ width: '130px' }}>
              <Timer 
                playerName="Moi" 
                initialTime={60} 
                isActive={isWhiteTurn} 
                onTimeOut={() => alert('Temps écoulé ! Victoire des Noirs.')} 
              />
            </div>

            {/* Boutons d'action (en bas à droite) */}
            <div style={{
              backgroundColor: '#363431',
              display: 'flex',
              flexDirection: 'row',
              padding: '6px 10px 10px 10px',
              borderRadius: '10px',
              gap: '8px'
            }}>
              <DrawButton onDrawClick={() => alert('Proposition de nulle envoyée')} />
              <ResignButton onResign={() => alert('Vous avez abandonné la partie.')} />
            </div>
          </div>

        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. DISPOSITION PC (Ton layout d'origine inchangé)
  // =========================================================================
  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      backgroundColor: '#272522',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 0,
      padding: '20px',
      boxSizing: 'border-box',
      overflow: 'auto'
    }}>
      
      {/* Conteneur global centré adapté au plateau grand format (910px max) */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '32px',
        width: '100%',
        maxWidth: '1500px'
      }}>
        
        {/* 1. GAUCHE : LES TIMERS */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: 'min(85vh, 910px)',
          width: '180px',
          flexShrink: 0
        }}>
          <Timer 
            playerName="Adversaire" 
            initialTime={60} 
            isActive={!isWhiteTurn} 
            onTimeOut={() => alert('Temps écoulé ! Victoire des Blancs.')} 
          />

          <Timer 
            playerName="Moi" 
            initialTime={60} 
            isActive={isWhiteTurn} 
            onTimeOut={() => alert('Temps écoulé ! Victoire des Noirs.')} 
          />
        </div>

        {/* 2. CENTRE : L'ÉCHIQUIER */}
          <Board fen={fen} isMobile={false}/>


        {/* 3. DROITE : LES ACTIONS */}
        <div style={{
          backgroundColor: '#363431',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '15px',
          borderRadius: '15px',
          gap: '16px',
          flexShrink: 0
        }}>
          <DrawButton onDrawClick={() => alert('Proposition de nulle envoyée')} />
          <ResignButton onResign={() => alert('Vous avez abandonné la partie.')} />
        </div>

      </div>
    </div>
  );
}