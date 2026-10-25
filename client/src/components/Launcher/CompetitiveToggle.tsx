interface CompetitiveToggleProps {
  isCompetitive: boolean;
  onToggle: () => void;
}

export default function CompetitiveToggle({ isCompetitive, onToggle }: CompetitiveToggleProps) {
  return (
    <div style={{
      backgroundColor: '#363431',
      padding: '16px 20px',
      borderRadius: '12px',
      border: '2px solid #262421',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 4px 0 #262421'
    }}>
      <span style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff' }}>Compétitif</span>
      <div 
        onClick={onToggle}
        style={{
          width: '50px',
          height: '28px',
          backgroundColor: isCompetitive ? '#703abb' : '#55524e',
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
          left: isCompetitive ? '24px' : '2px',
          transition: 'left 0.2s'
        }} />
      </div>
    </div>
  );
}