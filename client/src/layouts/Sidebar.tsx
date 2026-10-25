import { Swords, BarChart3, Clock, Crown, User } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'play', icon: Swords, label: 'Jouer' },
 // { id: 'stats', icon: BarChart3, label: 'Stats' },
 // { id: 'history', icon: Clock, label: 'Historique' },
];

interface SidebarProps {
  activeNav: string;
  setActiveNav: (id: string) => void;
  currentPlayer: { label: string; color: string; shadow: string };
  onOpenProfileSelect: () => void;
}

export default function Sidebar({ activeNav, setActiveNav, currentPlayer, onOpenProfileSelect }: SidebarProps) {
  return (
    <nav style={{
      width: '72px',
      backgroundColor: '#1a1816',
      borderRight: '1px solid #302e2b',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '20px',
      gap: '4px',
      flexShrink: 0,
    }}>
      {/* Logo / Crown */}
      <div style={{
        width: '42px',
        height: '42px',
        borderRadius: '12px',
        background: 'linear-gradient(135deg, #703abb 0%, #552890 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '24px',
        boxShadow: '0 4px 12px rgba(112, 58, 187, 0.4)',
      }}>
        <Crown size={22} color="#ffffff" />
      </div>

      {/* Nav Items */}
      {NAV_ITEMS.map((item) => {
        const isActive = activeNav === item.id;
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => setActiveNav(item.id)}
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: isActive ? '#302e2b' : 'transparent',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3px',
              cursor: 'pointer',
              position: 'relative',
            }}
          >
            {isActive && (
              <div style={{
                position: 'absolute',
                left: '-10px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '3px',
                height: '24px',
                borderRadius: '0 3px 3px 0',
                backgroundColor: '#703abb',
              }} />
            )}
            <Icon size={20} color={isActive ? '#ffffff' : '#8b8987'} />
            <span style={{ fontSize: '9px', fontWeight: 600, color: isActive ? '#ffffff' : '#8b8987' }}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}