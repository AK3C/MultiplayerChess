import { User, Clock, BarChart3 } from 'lucide-react';
import { PlayerColor } from '../components/PlayerSelect';

interface RightSidebarProps {
  player: PlayerColor;
  currentPlayer: { label: string; color: string; shadow: string };
  playersConfig: Record<PlayerColor, { label: string; color: string; shadow: string }>;
  onOpenProfileSelect: () => void;
}

export default function RightSidebar({ player, currentPlayer, playersConfig, onOpenProfileSelect }: RightSidebarProps) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '280px', maxWidth: '340px' }}>
      {/* Bouton de profil / Switcher */}
      <button
        onClick={onOpenProfileSelect}
        style={{
          width: '100%',
          backgroundColor: currentPlayer.color,
          color: '#ffffff',
          border: 'none',
          borderRadius: '10px',
          padding: '14px 16px',
          fontSize: '15px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          cursor: 'pointer',
          boxShadow: `0 4px 0 ${currentPlayer.shadow}`,
          transition: 'all 0.1s ease',
          userSelect: 'none',
        }}
      >
        <span>{currentPlayer.label}</span>
      </button>

      {/* Joueur en ligne */}
      <div style={{ backgroundColor: '#302e2b', borderRadius: '16px', border: '1px solid #3d3a36', padding: '20px' }}>
        <h3 style={{ margin: '0 0 14px', fontSize: '14px', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <User size={14} color="#8b8987" />
          Joueurs en ligne
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {Object.entries(playersConfig)
            .filter(([key]) => key === player)
            .map(([key, p]) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff' }}>
                    {p.label} <span style={{ fontSize: '10px', color: '#8b8987', fontWeight: 400 }}>(vous)</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Activité récente */}
      <div style={{ backgroundColor: '#302e2b', borderRadius: '16px', border: '1px solid #3d3a36', padding: '20px' }}>
        <h3 style={{ margin: '0 0 14px', fontSize: '14px', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={14} color="#8b8987" />
          Activité récente
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0', gap: '8px' }}>
          <BarChart3 size={28} color="#3d3a36" />
          <p style={{ color: '#6b6966', fontSize: '13px', margin: 0, textAlign: 'center' }}>Aucune activité récente</p>
        </div>
      </div>
    </div>
  );
}