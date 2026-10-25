import { useState } from 'react';

export type PlayerColor = 'red' | 'blue' | 'yellow' | 'green';

interface PlayerSelectProps {
  onSelect: (player: PlayerColor) => void;
  onBack: () => void;
}

const PLAYERS: { id: PlayerColor; label: string; color: string; shadow: string }[] = [
  { id: 'red', label: 'Player 1 · Nath', color: '#D94A4A', shadow: '#b83a3a' },
  { id: 'blue', label: 'Player 2 · Max', color: '#4A7DD9', shadow: '#3a64b3' },
  { id: 'yellow', label: 'Player 3 · Tristan', color: '#D9B84A', shadow: '#b39a3a' },
  { id: 'green', label: 'Player 4 · Antoine', color: '#4AD97A', shadow: '#3ab363' },
];

export default function PlayerSelect({ onSelect, onBack }: PlayerSelectProps) {
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
        maxWidth: '440px',
        backgroundColor: '#363431',
        padding: '36px 28px',
        borderRadius: '16px',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.6)',
        border: '1px solid #484541'
      }}>

        {/* Title */}
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '26px', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>
            Choose your side
          </h1>
          <p style={{ fontSize: '14px', color: '#a5a29e', margin: '8px 0 0 0' }}>
            Pick who you will play as
          </p>
        </div>

        {/* 4 player buttons */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
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
                <span style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  opacity: 0.85
                }} />
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>

        {/* Back link */}
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            color: '#a5a29e',
            fontSize: '14px',
            cursor: 'pointer',
            textDecoration: 'underline',
            userSelect: 'none',
          }}
        >
          ← Back to lobby
        </button>

      </div>
    </div>
  );
}
