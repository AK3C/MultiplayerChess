import { Palette } from 'lucide-react';

interface ThemeButtonProps {
  onToggleTheme: () => void;
}

export default function ThemeButton({ onToggleTheme }: ThemeButtonProps) {
  return (
    <button
      onClick={onToggleTheme}
      style={{
        backgroundColor: '#363431',
        color: '#c5c4c2',
        border: '2px solid #262421',        
        borderRadius: '8px',
        padding: '12px 16px',
        fontSize: '14px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        cursor: 'pointer',
        boxShadow: '0 4px 0 #262421',
        transition: 'all 0.1s ease',
        userSelect: 'none',
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'translateY(2px)';
        e.currentTarget.style.boxShadow = '0 2px 0 #262421';
        e.currentTarget.style.borderBottom = '0px solid #262421';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'translateY(0px)';
        e.currentTarget.style.boxShadow = '0 4px 0 #262421';
        e.currentTarget.style.borderBottom = '2px solid #262421';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0px)';
        e.currentTarget.style.boxShadow = '0 4px 0 #262421';
        e.currentTarget.style.borderBottom = '2px solid #262421';
      }}
      title="Changer les couleurs du plateau"
    >
      <Palette size={18} />
    </button>
  );
}