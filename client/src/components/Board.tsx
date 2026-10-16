import React from 'react';

interface BoardProps {
  fen: string;
}

export default function Board({ fen }: BoardProps) {
  const boardMatrix = fenToBoard(fen);

  return (
    <div className="aspect-square w-full max-w-md grid grid-cols-8 border-4 border-neutral-700 shadow-2xl rounded-lg overflow-hidden">
      {boardMatrix.map((row, rowIndex) =>
        row.map((piece, colIndex) => {
          const isDark = (rowIndex + colIndex) % 2 !== 0;
          const bgClass = isDark ? 'bg-neutral-600' : 'bg-neutral-300';

          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`${bgClass} flex items-center justify-center`}
            >
              {piece && (
                <img
                  src={`/images/${piece}.png`}
                  alt={piece}
                  className="w-[80%] h-[80%] object-contain pointer-events-none"
                />
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

// --- Fonctions utilitaires FEN ---

function fenToBoard(fen: string): (string | null)[][] {
  const rows = fen.split(' ')[0].split('/');
  const resultBoard: (string | null)[][] = [];

  for (let row of rows) {
    const boardRow: (string | null)[] = [];
    for (let char of row) {
      if (isNaN(Number(char))) {
        boardRow.push(mapFenCharToImage(char));
      } else {
        for (let i = 0; i < parseInt(char); i++) {
          boardRow.push(null);
        }
      }
    }
    resultBoard.push(boardRow);
  }
  return resultBoard;
}

function mapFenCharToImage(char: string): string {
  const color = char === char.toUpperCase() ? 'w' : 'b';
  const type = char.toUpperCase();
  return `${color}${type}`;
}