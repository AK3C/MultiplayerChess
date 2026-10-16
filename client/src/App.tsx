import React, { useState } from 'react';
import Board from './components/Board';

export default function App() {
  const [fen] = useState<string>('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-6 text-emerald-400">♟️ Mon Jeu d'Échecs (TSX)</h1>
      
      <Board fen={fen} />

      <p className="mt-6 text-xs text-neutral-500">Composant Board en .tsx avec typage.</p>
    </div>
  );
}