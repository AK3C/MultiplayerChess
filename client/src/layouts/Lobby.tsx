import { Swords, Trophy, Zap, Timer, Clock, Crown, ChevronRight } from 'lucide-react';
import Button from '../components/General/Button';

const QUICK_PLAY_OPTIONS = [
  { label: 'Bullet', sub: '1 min', icon: Zap, time: 1, accent: '#e8b300' },
  { label: 'Blitz', sub: '3 min', icon: Timer, time: 3, accent: '#e8b300' },
  { label: 'Rapide', sub: '10 min', icon: Clock, time: 10, accent: '#4A90D9' },
  { label: 'Classique', sub: '15 min', icon: Crown, time: 15, accent: '#4AD97A' },
];

interface PlayAreaProps {
  onQuickPlay: (time: number) => void;
  onOpenLauncher: () => void;
}

export default function PlayArea({ onQuickPlay, onOpenLauncher }: PlayAreaProps) {
  return (
    <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Hero Card */}
      <div style={{
        backgroundColor: '#302e2b',
        borderRadius: '16px',
        border: '1px solid #3d3a36',
        overflow: 'hidden',
      }}>
        <div style={{ height: '6px', background: 'linear-gradient(90deg, #703abb 0%, #552890 50%, #703abb 100%)' }} />
        <div style={{ padding: '28px 28px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '14px',
              background: 'linear-gradient(135deg, #703abb 0%, #552890 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(112, 58, 187, 0.3)',
            }}>
              <Swords size={24} color="#ffffff" />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#ffffff' }}>Jouer aux échecs</h2>
              <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#8b8987' }}>Choisissez votre cadence et lancez une partie</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '16px' }}>
            {QUICK_PLAY_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.label}
                  onClick={() => onQuickPlay(opt.time)}
                  style={{
                    backgroundColor: '#363431', border: '2px solid #262421',
                    borderRadius: '10px', padding: '16px 8px', cursor: 'pointer',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                    boxShadow: '0 4px 0 #262421', transition: 'all 0.1s ease', userSelect: 'none',
                  }}
                >
                  <Icon size={22} color={opt.accent} />
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>{opt.label}</span>
                  <span style={{ fontSize: '12px', color: '#8b8987', fontWeight: 500 }}>{opt.sub}</span>
                </button>
              );
            })}
          </div>

          <Button variant="primary" onClick={onOpenLauncher} style={{ padding: '14px 24px', fontSize: '16px', borderRadius: '10px', gap: '10px' }}>
            <Swords size={18} />
            <span>Partie personnalisée</span>
            <ChevronRight size={16} style={{ marginLeft: 'auto' }} />
          </Button>
        </div>
      </div>

      {/* Mini Board Aperçu */}
      <div style={{ backgroundColor: '#302e2b', borderRadius: '16px', border: '1px solid #3d3a36', padding: '20px' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Trophy size={16} color="#e8b300" />
          Parties en cours
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '28px', borderRadius: '10px', backgroundColor: '#272522', border: '1px solid #3d3a36' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', width: '200px', height: '200px', borderRadius: '6px', overflow: 'hidden', opacity: 0.4 }}>
            {Array.from({ length: 64 }).map((_, i) => {
              const row = Math.floor(i / 8);
              const col = i % 8;
              const isDark = (row + col) % 2 === 1;
              return <div key={i} style={{ backgroundColor: isDark ? '#b58863' : '#f0d9b5' }} />;
            })}
          </div>
        </div>
        <p style={{ textAlign: 'center', color: '#6b6966', fontSize: '13px', marginTop: '12px', marginBottom: 0 }}>Aucune partie active pour le moment</p>
      </div>
    </div>
  );
}