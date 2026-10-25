import { useState } from 'react';

export type PlayerColor = 'red' | 'blue' | 'yellow' | 'green';

interface PlayerSelectProps {
  onSelect: (player: PlayerColor) => void;
  onBack: () => void;
}

const PLAYERS: { id: PlayerColor; label: string; color: string; shadow: string }[] = [
  { id: 'red', label: 'Nath', color: '#D94A4A', shadow: '#b83a3a' },
  { id: 'blue', label: 'Max', color: '#4A7DD9', shadow: '#3a64b3' },
  { id: 'yellow', label: 'Tristan', color: '#D9B84A', shadow: '#b39a3a' },
  { id: 'green', label: 'Antoine', color: '#4AD97A', shadow: '#3ab363' },
];

export default function PlayerSelect({ onSelect }: PlayerSelectProps) {
  const [pressed, setPressed] = useState<PlayerColor | null>(null);

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

      {/* Main container */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        width: '100%',
        maxWidth: '480px',
        backgroundColor: '#363431',
        padding: '36px 28px',
        borderRadius: '16px',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.6)',
        border: '1px solid #484541'
      }}>

        {/* Grille 2x2 des joueurs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
          width: '100%'
        }}>
          {PLAYERS.map((p) => {
            const isDown = pressed === p.id;
            return (
              <button
                key={p.id}
                onClick={() => onSelect(p.id)}
                onMouseDown={() => setPressed(p.id)}
                onMouseUp={() => setPressed(null)}
                onMouseLeave={() => setPressed(null)}
                style={{
                  width: '100%',
                  height: '64px',
                  backgroundColor: p.color,
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
                  boxShadow: isDown ? `0 2px 0 ${p.shadow}` : `0 5px 0 ${p.shadow}`,
                  transform: isDown ? 'translateY(3px)' : 'translateY(0px)',
                  transition: 'all 0.1s ease',
                  userSelect: 'none',
                }}
              >
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}