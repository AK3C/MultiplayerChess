interface TimerSetupSectionProps {
  timerEnabled: boolean;
  onToggleTimer: () => void;
  selectedTime: number;
  onSelectTime: (time: number) => void;
}

export default function TimerSetupSection({
  timerEnabled,
  onToggleTimer,
  selectedTime,
  onSelectTime,
}: TimerSetupSectionProps) {
  const timePresets = [
    { label: '1 min', value: 1 },
    { label: '3 min', value: 3 },
    { label: '5 min', value: 5 },
    { label: '10 min', value: 10 },
    { label: '15 min', value: 15 },
  ];

  return (
    <div style={{
      padding: '16px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff' }}>Timer</span>
        <div 
          onClick={onToggleTimer}
          style={{
            width: '50px',
            height: '28px',
            backgroundColor: timerEnabled ? '#703abb' : '#55524e',
            borderRadius: '14px',
            position: 'relative',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          <div style={{
            width: '24px',
            height: '24px',
            backgroundColor: '#ffffff',
            borderRadius: '50%',
            position: 'absolute',
            top: '2px',
            left: timerEnabled ? '24px' : '2px',
            transition: 'left 0.2s'
          }} />
        </div>
      </div>

      {timerEnabled && (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gridAutoRows: '50px',
          gap: '12px 8px', 
          marginTop: '8px',
          alignItems: 'start' 
        }}>
          {timePresets.map((preset) => {
            const isSelected = selectedTime === preset.value;

            const bgColor = isSelected ? '#703abb' : '#363431';
            const textColor = isSelected ? '#ffffff' : '#c3beb5';
            const borderColor = isSelected ? '#552890' : '#262421';

            return (
              <button
                key={preset.value}
                onClick={() => onSelectTime(preset.value)}
                style={{
                  backgroundColor: bgColor,
                  color: textColor,
                  border: `2px solid ${borderColor}`,
                  borderRadius: '8px',
                  height: isSelected ? '50px' : '46px',
                  padding: isSelected ? '0 16px 4px 16px' : '0 16px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  outline: 'none',
                  boxShadow: isSelected ? 'none' : '0 4px 0 #262421',
                  transform: 'none',            // plus de translateY sur le sélectionné
                  boxSizing: 'border-box',
                  transition: 'all 0.1s ease',
                  userSelect: 'none',
                  width: '100%',
                }}
                onMouseDown={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = 'translateY(2px)';
                    e.currentTarget.style.boxShadow = '0 2px 0 #262421';
                  }
                }}
                onMouseUp={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = 'translateY(0px)';
                    e.currentTarget.style.boxShadow = '0 4px 0 #262421';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = 'translateY(0px)';
                    e.currentTarget.style.boxShadow = '0 4px 0 #262421';
                  }
                }}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}