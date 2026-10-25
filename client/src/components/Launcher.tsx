import { useState } from 'react';
import CompetitiveToggle from './Launcher/CompetitiveToggle';
import TimerSetupSection from './Launcher/TimerSetupSection';
import StartButton from './Launcher/StartButton';
import ColorSelector from './Launcher/ColorSelector'

interface LauncherProps {
  onStartGame: (settings: {
    timerEnabled: boolean;
    timeControl: number;
    color: 'white' | 'random' | 'black';
    isCompetitive: boolean;
  }) => void;
}

export default function Launcher({ onStartGame }: LauncherProps) {
  const [timerEnabled, setTimerEnabled] = useState(true);
  const [selectedTime, setSelectedTime] = useState<number>(3);
  const [color, setColor] = useState<'white' | 'black' | 'random'>('random');
  const [isCompetitive, setIsCompetitive] = useState(false);

  const handleStart = () => {
    onStartGame({
      timerEnabled,
      timeControl: timerEnabled ? selectedTime : 0,
      color,
      isCompetitive,
    });
  };

  return (
    <div style={{
      minHeight: 'auto',
      width: 'auto',
      backgroundColor: '#363431',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '24px 16px',
      boxSizing: 'border-box',
      overflowY: 'auto',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '480px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>  
      {/*      
        <CompetitiveToggle 
          isCompetitive={isCompetitive} 
          onToggle={() => setIsCompetitive(!isCompetitive)} 
        />*/}

        <TimerSetupSection 
          timerEnabled={timerEnabled}
          onToggleTimer={() => setTimerEnabled(!timerEnabled)}
          selectedTime={selectedTime}
          onSelectTime={setSelectedTime}
        />
        <ColorSelector 
          color={color}
          setColor={setColor}
        />
        <StartButton onStart={handleStart} />
      </div>
    </div>
  );
}