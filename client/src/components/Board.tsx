interface BoardProps {
  fen: string;
  isMobile?: boolean;
}

const pieceDimensions: Record<string, { width: string; height: string }> = {
  P: { width: '80%', height: '80%' },
  R: { width: '80%', height: '80%' },
  N: { width: '80%', height: '80%' },
  B: { width: '80%', height: '80%' },
  Q: { width: '80%', height: '80%' },
  K: { width: '80%', height: '80%' },
};

export default function Board({ fen, isMobile = false }: BoardProps) {
  const boardMatrix = fenToBoard(fen);
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div 
        className="relative shadow-2xl rounded-md overflow-hidden select-none border border-neutral-800"
        style={{ 
          backgroundColor: '#262421',
          // Grand format confortable sur PC, taille adaptée sur mobile
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
                        fontSize: isMobile ? '9px' : '11px',
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
                        fontSize: isMobile ? '9px' : '11px',
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