import React, { useState } from 'react';
import { Flag } from 'lucide-react';

interface ResignButtonProps {
  onResign: () => void;
}

export default function ResignButton({ onResign }: ResignButtonProps) {
  const [confirming, setConfirming] = useState(false);

  const handleClick = () => {
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
    } else {
      onResign();
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: confirming ? '#b33939' : '#363431',
        color: '#c5c4c2',
        border: confirming ? '2px solid #7a0000' : '2px solid #262421',
        borderRadius: '8px',
        padding: '12px 16px',
        fontSize: '14px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        cursor: 'pointer',
        boxShadow: confirming ? '0 4px 0 #7a0000' : '0 4px 0 #262421',
        transition: 'all 0.1s ease',
        userSelect: 'none',
        width: '100%'
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'translateY(2px)';
        e.currentTarget.style.boxShadow = confirming ? '0 2px 0 #8b0000' : '0 2px 0 #262421';
        e.currentTarget.style.borderBottom = confirming ? '0px solid #7a0000' : '0px solid #262421';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'translateY(0px)';
        e.currentTarget.style.boxShadow = confirming ? '0 4px 0 #7a0000' : '0 4px 0 #262421';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0px)';
        e.currentTarget.style.boxShadow = confirming ? '0 4px 0 #7a0000' : '0 4px 0 #262421';
      }}
    >
      <Flag size={18} />
    </button>
  );
}