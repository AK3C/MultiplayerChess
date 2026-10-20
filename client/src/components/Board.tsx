// client/src/components/Board.tsx
import React from 'react';

interface BoardProps {
  fen: string;
  onSquareClick?: (square: string) => void;
  selectedSquare?: string | null;
  possibleMoves?: string[]; 
  isMobile?: boolean;
  darkSquareColor?: string;
  lightSquareColor?: string;
}

const pieceDimensions: Record<string, { width: string; height: string }> = {
  P: { width: '80%', height: '80%' },
  R: { width: '80%', height: '80%' },
  N: { width: '80%', height: '80%' },
  B: { width: '80%', height: '80%' },
  Q: { width: '80%', height: '80%' },
  K: { width: '80%', height: '80%' },
};

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

export default function Board({ 
  fen, 
  onSquareClick,
  selectedSquare,
  possibleMoves = [],
  isMobile = false,
  darkSquareColor = '#b58863',
  lightSquareColor = '#f0d9b5' 
}: BoardProps) {
  const boardMatrix = fenToBoard(fen);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div 
        className="relative shadow-2xl rounded-md overflow-hidden select-none border border-neutral-800"
        style={{ 
          backgroundColor: '#262421',
          width: isMobile ? 'min(85vw, 380px)' : 'min(85vh, 720px)',
          height: isMobile ? 'min(85vw, 380px)' : 'min(85vh, 720px)',
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
              const currentSquare = `${files[colIndex]}${ranks[rowIndex]}`;
              const isDark = (rowIndex + colIndex) % 2 !== 0;
              let backgroundColor = isDark ? darkSquareColor : lightSquareColor;

              const isSelected = selectedSquare === currentSquare;
              const isPossibleMove = possibleMoves.includes(currentSquare);

              // Surlignage de la case sélectionnée
              if (isSelected) {
                backgroundColor = isDark ? '#baca44' : '#f7f769';
              }

              const pieceType = piece ? piece.charAt(1) : null;
              const dim = pieceType ? pieceDimensions[pieceType] : null;

              return (
                <div
                  key={currentSquare}
                  onClick={() => onSquareClick && onSquareClick(currentSquare)}
                  style={{
                    backgroundColor: backgroundColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    cursor: 'pointer',
                  }}
                >
                  {/* Coordonnées */}
                  {colIndex === 0 && (
                    <span 
                      style={{
                        position: 'absolute',
                        top: '2px',
                        left: '4px',
                        fontSize: isMobile ? '9px' : '11px',
                        fontWeight: 'bold',
                        color: isDark ? lightSquareColor : darkSquareColor,
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
                        fontSize: isMobile ? '9px' : '11px',
                        fontWeight: 'bold',
                        color: isDark ? lightSquareColor : darkSquareColor,
                        pointerEvents: 'none',
                        lineHeight: 1,
                      }}
                    >
                      {files[colIndex]}
                    </span>
                  )}

                  {isPossibleMove && (
                    <div 
                      style={{
                        position: 'absolute',
                        width: piece ? '85%' : '32%',
                        height: piece ? '85%' : '32%',
                        borderRadius: piece ? '50%' : '50%',
                        backgroundColor: piece ? 'transparent' : 'rgba(0, 0, 0, 0.2)',
                        border: piece ? '4px solid rgba(0, 0, 0, 0.2)' : 'none',
                        zIndex: 15,
                        pointerEvents: 'none',
                      }}
                    />
                  )}

                  {/* Image de la pièce */}
                  {piece && dim && (
                    <img
                      src={`/images/${piece}.png`}
                      alt={piece}
                      style={{
                        width: dim.width,
                        height: dim.height,
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

// --- Fonctions utilitaires ---
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