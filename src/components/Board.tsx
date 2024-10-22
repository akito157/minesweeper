import React from 'react';
import Cell from './Cell';

interface BoardProps {
  board: number[][];
  revealed: boolean[][];
  flagged: boolean[][];
  onCellClick: (row: number, col: number) => void;
  onCellRightClick: (e: React.MouseEvent, row: number, col: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, revealed, flagged, onCellClick, onCellRightClick }) => {
  return (
    <div className="grid grid-cols-16 gap-1 bg-gray-700 p-2 rounded-lg">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            value={cell}
            revealed={revealed[rowIndex][colIndex]}
            flagged={flagged[rowIndex][colIndex]}
            onClick={() => onCellClick(rowIndex, colIndex)}
            onRightClick={(e) => onCellRightClick(e, rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
};

export default Board;