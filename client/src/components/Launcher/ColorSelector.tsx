interface ColorSelectorProps {
  color: 'white' | 'black' | 'random';
  setColor: (color: 'white' | 'black' | 'random') => void;
}

interface ColorOption {
  id: 'white' | 'black' | 'random';
  label: string;
  image?: string;
  images?: string[];
}

export default function ColorSelector({
  color,
  setColor,
}: ColorSelectorProps) {
  const colorOptions: ColorOption[] = [
    { id: 'white', label: 'Blancs', image: '/images/wK.png' },
    { id: 'random', label: 'Aléatoire', image: '/images/K.png' },
    { id: 'black', label: 'Noirs', image: '/images/bK.png' },
  ];

  return (
    <div style={{
      padding: '16px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    }}>
      <span style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff' }}>Color</span>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gridAutoRows: '50px',
        gap: '12px 8px', 
        marginTop: '8px',
        alignItems: 'start' 
      }}>
        {colorOptions.map((option) => {
          const isSelected = color === option.id;

          const bgColor = isSelected ? '#703abb' : '#363431';
          const textColor = isSelected ? '#ffffff' : '#c3beb5';
          const borderColor = isSelected ? '#552890' : '#262421';
          const shadowColor = isSelected ? '#552890' : '#262421';

          return (
            <button
              key={option.id}
              onClick={() => setColor(option.id)}
              style={{
                backgroundColor: bgColor,
                color: textColor,
                border: `2px solid ${borderColor}`,
                borderRadius: '8px',
                height: isSelected ? '50px' : '46px',
                padding: isSelected ? '0 8px 4px 8px' : '0 8px',
                fontSize: '14px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                cursor: 'pointer',
                outline: 'none',
                boxShadow: isSelected ? 'none' : `0 4px 0 ${shadowColor}`,
                transform: 'none',
                boxSizing: 'border-box',
                transition: 'all 0.1s ease',
                userSelect: 'none',
                width: '100%',
              }}
              onMouseDown={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.transform = 'translateY(2px)';
                  e.currentTarget.style.boxShadow = `0 2px 0 ${shadowColor}`;
                  e.currentTarget.style.borderBottom = `0px solid ${borderColor}`;
                }
              }}
              onMouseUp={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.transform = 'translateY(0px)';
                  e.currentTarget.style.boxShadow = `0 4px 0 ${shadowColor}`;
                  e.currentTarget.style.borderBottom = `2px solid ${borderColor}`;
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.transform = 'translateY(0px)';
                  e.currentTarget.style.boxShadow = `0 4px 0 ${shadowColor}`;
                  e.currentTarget.style.borderBottom = `2px solid ${borderColor}`;
                }
              }}
            >
              {option.image && (
                <img 
                  src={option.image} 
                  alt={option.label} 
                  style={{ width: '80%', height: '80%', objectFit: 'contain' }} 
                />
              )}
              {option.images && (
                <div style={{ display: 'flex', gap: '2px' }}>
                  {option.images.map((imgSrc, idx) => (
                    <img 
                      key={idx} 
                      src={imgSrc} 
                      alt="random piece" 
                      style={{ width: '80%', height: '80%', objectFit: 'contain' }} 
                    />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}