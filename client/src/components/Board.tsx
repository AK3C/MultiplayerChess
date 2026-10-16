import React from 'react';

interface BoardProps {
  fen: string;
}

const pieceDimensions: Record<string, { width: string; height: string }> = {
  P: { width: '17px', height: '28px' },
  R: { width: '21px', height: '36px' },
  N: { width: '23px', height: '41px' },
  B: { width: '21px', height: '47px' },
  Q: { width: '25px', height: '69px' },
  K: { width: '25px', height: '63px' },
};

export default function Board({ fen }: BoardProps) {
  const boardMatrix = fenToBoard(fen);
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div 
        className="relative shadow-2xl rounded-md overflow-hidden select-none border border-neutral-800"
        style={{ 
          backgroundColor: '#262421',
          width: 'min(90vw, 480px)',
          height: 'min(90vw, 480px)',
        }}
      >
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gridTemplateRows: 'repeat(8, 1fr)',
            width: '100%',
            height: '100%',
          }}
        >
          {boardMatrix.map((row, rowIndex) =>
            row.map((piece, colIndex) => {
              const isDark = (rowIndex + colIndex) % 2 !== 0;
              const backgroundColor = isDark ? '#b58863' : '#f0d9b5';

              const pieceType = piece ? piece.charAt(1) : null;
              const dim = pieceType ? pieceDimensions[pieceType] : null;

              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  style={{
                    backgroundColor: backgroundColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  {colIndex === 0 && (
                    <span 
                      style={{
                        position: 'absolute',
                        top: '2px',
                        left: '4px',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        color: isDark ? '#f0d9b5' : '#b58863',
                        pointerEvents: 'none',
                        lineHeight: 1,
                      }}
                    >
                      {ranks[rowIndex]}
                    </span>
                  )}

                  {rowIndex === 7 && (
                    <span 
                      style={{
                        position: 'absolute',
                        bottom: '2px',
                        right: '4px',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        color: isDark ? '#f0d9b5' : '#b58863',
                        pointerEvents: 'none',
                        lineHeight: 1,
                      }}
                    >
                      {files[colIndex]}
                    </span>
                  )}

                  {/* La pièce */}
                  {piece && dim && (
                    <img
                      src={`/images/${piece}.png`}
                      alt={piece}
                      style={{
                        width: dim.width,
                        height: dim.height,
                        maxWidth: '85%',
                        maxHeight: '85%',
                        objectFit: 'contain',
                        pointerEvents: 'none',
                        zIndex: 10,
                      }}
                    />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
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