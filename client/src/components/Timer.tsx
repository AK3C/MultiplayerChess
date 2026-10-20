import { useEffect, useState } from 'react';

interface TimerProps {
  initialTime: number;
  isActive: boolean;
  onTimeOut: () => void;
  playerName: string;
}

export default function Timer({ initialTime, isActive, onTimeOut, playerName }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, timeLeft, onTimeOut]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      width: '100%'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: isActive ? '#FFFFFE' : '#2A2925',
        borderRadius: '4px',
        padding: '8px 12px',
        transition: 'all 0.2s'
      }}>
        <span style={{
          fontFamily: 'monospace',
          fontSize: '18px',
          fontWeight: 'bold',
          color: isActive ? '#2A2925' : '#FFFFFE'
        }}>
          {formattedTime}
        </span>
      </div>
    </div>
  );
}