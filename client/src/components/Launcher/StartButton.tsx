interface StartButtonProps {
  onStart: () => void;
}

export default function StartButton({ onStart }: StartButtonProps) {
  return (
    <button
      onClick={onStart}
      style={{
        width: '100%',
        padding: '16px',
        backgroundColor: '#703abb',
        color: '#ffffff',
        fontSize: '18px',
        fontWeight: 'bold',
        borderRadius: '10px',
        border: '2px solid #552890',
        cursor: 'pointer',
        outline: 'none',
        boxShadow: '0 4px 0 #552890',
        marginTop: '10px',
        transition: 'all 0.1s ease',
        userSelect: 'none',
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'translateY(2px)';
        e.currentTarget.style.boxShadow = '0 2px 0 #552890';
        e.currentTarget.style.borderBottom = '0px solid #552890';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'translateY(0px)';
        e.currentTarget.style.boxShadow = '0 4px 0 #552890';
        e.currentTarget.style.borderBottom = '2px solid #552890';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0px)';
        e.currentTarget.style.boxShadow = '0 4px 0 #552890';
        e.currentTarget.style.borderBottom = '2px solid #552890';
      }}
    >
      Start
    </button>
  );
}