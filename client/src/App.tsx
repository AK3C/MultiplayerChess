import React from 'react';
import Board from './components/Board';

export default function App() {
  // Position de départ standard des échecs
  const startFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-6 text-emerald-400">♟️ Plateau d'Échecs</h1>
      
      <Board fen={startFen} />

      <p className="mt-6 text-xs text-neutral-500">Affichage statique des pièces via FEN.</p>
    </div>
  );
}