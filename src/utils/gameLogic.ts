export enum GameState {
  Ready,
  Playing,
  Won,
  Lost,
}

export const generateBoard = (rows: number, cols: number, mines: number): [number[][], boolean[][]] => {
  const board: number[][] = Array(rows).fill(null).map(() => Array(cols).fill(0));
  const revealed: boolean[][] = Array(rows).fill(null).map(() => Array(cols).fill(false));

  // Place mines
  let minesPlaced = 0;
  while (minesPlaced < mines) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    if (board[row][col] !== -1) {
      board[row][col] = -1;
      minesPlaced++;
    }
  }

  // Calculate numbers
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (board[row][col] === -1) continue;
      board[row][col] = countAdjacentMines(board, row, col);
    }
  }

  return [board, revealed];
};

const countAdjacentMines = (board: number[][], row: number, col: number): number => {
  let count = 0;
  for (let r = -1; r <= 1; r++) {
    for (let c = -1; c <= 1; c++) {
      const newRow = row + r;
      const newCol = col + c;
      if (newRow >= 0 && newRow < board.length && newCol >= 0 && newCol < board[0].length) {
        if (board[newRow][newCol] === -1) count++;
      }
    }
  }
  return count;
};

export const revealCell = (board: number[][], revealed: boolean[][], row: number, col: number): [boolean[][], GameState] => {
  if (revealed[row][col]) return [revealed, GameState.Playing];

  const newRevealed = revealed.map(row => [...row]);
  newRevealed[row][col] = true;

  if (board[row][col] === -1) {
    return [newRevealed, GameState.Lost];
  }

  if (board[row][col] === 0) {
    revealAdjacentCells(board, newRevealed, row, col);
  }

  if (checkWin(board, newRevealed)) {
    return [newRevealed, GameState.Won];
  }

  return [newRevealed, GameState.Playing];
};

const revealAdjacentCells = (board: number[][], revealed: boolean[][], row: number, col: number) => {
  for (let r = -1; r <= 1; r++) {
    for (let c = -1; c <= 1; c++) {
      const newRow = row + r;
      const newCol = col + c;
      if (newRow >= 0 && newRow < board.length && newCol >= 0 && newCol < board[0].length) {
        if (!revealed[newRow][newCol]) {
          revealed[newRow][newCol] = true;
          if (board[newRow][newCol] === 0) {
            revealAdjacentCells(board, revealed, newRow, newCol);
          }
        }
      }
    }
  }
};

const checkWin = (board: number[][], revealed: boolean[][]): boolean => {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      if (board[row][col] !== -1 && !revealed[row][col]) {
        return false;
      }
    }
  }
  return true;
};