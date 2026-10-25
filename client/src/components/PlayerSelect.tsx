import { useState } from 'react';
import { X } from 'lucide-react';

export type PlayerColor = 'red' | 'blue' | 'yellow' | 'green';

interface PlayerSelectProps {
  onSelect: (player: PlayerColor) => void;
  onBack?: () => void;
}

const PLAYERS: { id: PlayerColor; label: string; color: string; shadow: string }[] = [
  { id: 'red', label: 'Nath', color: '#D94A4A', shadow: '#b83a3a' },
  { id: 'blue', label: 'Max', color: '#4A7DD9', shadow: '#3a64b3' },
  { id: 'yellow', label: 'Tristan', color: '#D9B84A', shadow: '#b39a3a' },
  { id: 'green', label: 'Antoine', color: '#4AD97A', shadow: '#3ab363' },
];

export default function PlayerSelect({ onSelect, onBack }: PlayerSelectProps) {
  const [pressed, setPressed] = useState<PlayerColor | null>(null);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Voile sombre semi-transparent qui laisse deviner le dashboard derrière
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '420px',
        backgroundColor: '#302e2b',
        borderRadius: '16px',
        border: '1px solid #3d3a36',
        overflow: 'hidden',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
      }}>
        {/* Header de la pop-up */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 24px 0 24px',
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '18px',
            fontWeight: 700,
            color: '#ffffff',
          }}>Changer de profil</h2>
          {onBack && (
            <button
              onClick={onBack}
              style={{
                background: 'none',
                border: 'none',
                color: '#8b8987',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
              }}
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Grille des joueurs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          padding: '24px',
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
                  height: '72px',
                  backgroundColor: p.color,
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '16px',
                  fontSize: '15px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  boxShadow: isDown ? `0 2px 0 ${p.shadow}` : `0 4px 0 ${p.shadow}`,
                  transform: isDown ? 'translateY(2px)' : 'translateY(0px)',
                  transition: 'all 0.12s ease',
                  userSelect: 'none',
                  letterSpacing: '0.2px',
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