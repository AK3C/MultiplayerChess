// client/src/Game.tsx
import { useState, useEffect } from 'react';
import Board from './components/Game/Board';
import Timer from './components/Game/Timer';
import DrawButton from './components/Game/DrawButton';
import ResignButton from './components/Game/ResignButton';
import ThemeButton from './components/Game/ThemeButton';
import { socket } from './socket';
import { Chess } from 'chess.js';

// Thèmes de quadrillage
const THEMES = [
  { name: 'Classique', dark: '#b58863', light: '#f0d9b5' },
  { name: 'Night', dark: '#3C235E', light: '#E2D9F3' },
  { name: 'Gem', dark: '#2E5A44', light: '#E4E9E2' },
  { name: 'Arctic', dark: '#3A4F6C', light: '#E1E6EB' },
  { name: 'Wood', dark: '#6E472E', light: '#F2E7DC' },
  { name: 'Obsidian', dark: '#383838', light: '#DCDCDC' }
];

interface GameProps {
  onBackToLobby?: () => void;
  settings?: {
    timerEnabled: boolean;
    timeControl: number;
    color: 'white' | 'random' | 'black';
    isCompetitive: boolean;
  };
}

export default function Game({ onBackToLobby, settings }: GameProps) {
  const [fen, setFen] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  const [isWhiteTurn, setIsWhiteTurn] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [themeIndex, setThemeIndex] = useState(0);
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<string[]>([]);
  const localGame = new Chess(fen);
  const currentTheme = THEMES[themeIndex];

  const initialTimeSeconds = settings?.timerEnabled 
    ? settings.timeControl * 60 
    : 600;
  // Écoute des mises à jour du serveur WebSocket
  useEffect(() => {
    socket.on('gameStateUpdate', (data: { fen: string; turn: string; isGameOver: boolean }) => {
      setFen(data.fen);
      setIsWhiteTurn(data.turn === 'w');

      if (data.isGameOver) {
        alert('La partie est terminée !');
      }
    });

    socket.on('invalid_move', () => {
      console.log('Coup illégal refusé par le serveur');
    });

    return () => {
      socket.off('gameStateUpdate');
      socket.off('invalid_move');
    };
  }, []);

  // Gestion des clics sur les cases de l'échiquier
  const handleSquareClick = (square: string) => {
    console.log("Clic sur la case :", square, "| Case sélectionnée actuelle :", selectedSquare);

    if (!selectedSquare) {
      const piece = localGame.get(square as any);
      if (piece) {
        setSelectedSquare(square);
        const moves = localGame.moves({ square: square as any, verbose: true });
        setPossibleMoves(moves.map(m => m.to));
        console.log("Pièce sélectionnée. Coups possibles :", moves.map(m => m.to));
      } else {
        console.log("Clic sur une case vide sans sélection préalable.");
      }
    } else {
      if (selectedSquare === square) {
        console.log("Désélection de la case.");
        setSelectedSquare(null);
        setPossibleMoves([]);
        return;
      }

      const piece = localGame.get(square as any);
      if (piece && piece.color === localGame.get(selectedSquare as any)?.color) {
        console.log("Changement de sélection vers une autre pièce.");
        setSelectedSquare(square);
        const moves = localGame.moves({ square: square as any, verbose: true });
        setPossibleMoves(moves.map(m => m.to));
        return;
      }

      // 🔴 ICI : Le deuxième clic sur la case d'arrivée
      console.log(`➡️ ENVOI DU COUP AU SERVEUR : ${selectedSquare} -> ${square}`);
      socket.emit('make_move', {
        from: selectedSquare,
        to: square,
      });
      setSelectedSquare(null);
      setPossibleMoves([]);
    }
  };

  const toggleTheme = () => {
    setThemeIndex((prev) => (prev + 1) % THEMES.length);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 1. VUE MOBILE
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
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: 'min(92vw, 480px)',
          gap: '8px'
        }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ width: '130px' }}>
              <Timer 
                playerName="Adversaire" 
                initialTime={initialTimeSeconds} 
                isActive={!isWhiteTurn} 
                onTimeOut={() => alert('Temps écoulé ! Victoire des Blancs.')} 
              />
            </div>
          </div>

          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Board 
              fen={fen} 
              onSquareClick={handleSquareClick}
              selectedSquare={selectedSquare}
              possibleMoves={possibleMoves}
              isMobile={true} 
              darkSquareColor={currentTheme.dark}
              lightSquareColor={currentTheme.light}
            />
          </div>

          <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ width: '130px' }}>
              <Timer 
                playerName="Moi" 
                initialTime={initialTimeSeconds} 
                isActive={isWhiteTurn} 
                onTimeOut={() => alert('Temps écoulé ! Victoire des Noirs.')} 
              />
            </div>

            <div style={{
              backgroundColor: '#363431',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: '6px 10px',
              borderRadius: '10px',
              gap: '8px'
            }}>
              <ThemeButton onToggleTheme={toggleTheme} />
              <DrawButton onDrawClick={() => alert('Proposition de nulle envoyée')} />
              <ResignButton onResign={() => onBackToLobby ? onBackToLobby() : alert('Abandon.')} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. VUE PC
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
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '32px',
        width: '100%',
        maxWidth: '1500px'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: 'min(85vh, 720px)',
          width: '180px',
          flexShrink: 0
        }}>
          <Timer 
            playerName="Adversaire" 
            initialTime={initialTimeSeconds} 
            isActive={!isWhiteTurn} 
            onTimeOut={() => alert('Temps écoulé ! Victoire des Blancs.')} 
          />
          <Timer 
            playerName="Moi" 
            initialTime={initialTimeSeconds} 
            isActive={isWhiteTurn} 
            onTimeOut={() => alert('Temps écoulé ! Victoire des Noirs.')} 
          />
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: 0
        }}>
          <Board 
            fen={fen} 
            onSquareClick={handleSquareClick}
            selectedSquare={selectedSquare}
            possibleMoves={possibleMoves}
            isMobile={false} 
            darkSquareColor={currentTheme.dark}
            lightSquareColor={currentTheme.light}
          />    
        </div>

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
          <ThemeButton onToggleTheme={toggleTheme} />
          <DrawButton onDrawClick={() => alert('Proposition de nulle envoyée')} />
          <ResignButton onResign={() => onBackToLobby ? onBackToLobby() : alert('Abandon.')} />
        </div>
      </div>
    </div>
  );
}