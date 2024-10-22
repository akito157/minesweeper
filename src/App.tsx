import React, { useState, useEffect } from 'react';
import { Music, Volume2, SkipForward, Pause, Play } from 'lucide-react';
import Board from './components/Board';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { generateBoard, revealCell, GameState } from './utils/gameLogic';

const App: React.FC = () => {
  const [board, setBoard] = useState<number[][]>([]);
  const [revealed, setRevealed] = useState<boolean[][]>([]);
  const [flagged, setFlagged] = useState<boolean[][]>([]);
  const [gameState, setGameState] = useState<GameState>(GameState.Ready);
  const [minesLeft, setMinesLeft] = useState(0);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const initializeGame = (rows: number, cols: number, mines: number) => {
    const [newBoard, newRevealed] = generateBoard(rows, cols, mines);
    setBoard(newBoard);
    setRevealed(newRevealed);
    setFlagged(Array(rows).fill(null).map(() => Array(cols).fill(false)));
    setGameState(GameState.Playing);
    setMinesLeft(mines);
    setTime(0);
    setIsPlaying(true);
  };

  useEffect(() => {
    initializeGame(16, 16, 40);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === GameState.Playing && isPlaying) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState, isPlaying]);

  const handleCellClick = (row: number, col: number) => {
    if (gameState !== GameState.Playing) return;

    const [newRevealed, newGameState] = revealCell(board, revealed, row, col);
    setRevealed(newRevealed);
    setGameState(newGameState);

    if (newGameState === GameState.Lost) {
      setIsPlaying(false);
    }
  };

  const handleCellRightClick = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();
    if (gameState !== GameState.Playing) return;

    const newFlagged = [...flagged];
    newFlagged[row][col] = !newFlagged[row][col];
    setFlagged(newFlagged);
    setMinesLeft(minesLeft + (newFlagged[row][col] ? -1 : 1));
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header />
        <main className="flex-grow p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Minesweeper</h1>
              <p className="text-gray-400">Clear the board without hitting any mines!</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <img
                    src="https://images.unsplash.com/photo-1611457194403-d3aca4cf9d11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
                    alt="Minesweeper"
                    className="w-16 h-16 rounded-md mr-4"
                  />
                  <div>
                    <h2 className="text-2xl font-semibold">Classic Minesweeper</h2>
                    <p className="text-gray-400">Difficulty: Medium</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full mr-4">
                    New Game
                  </button>
                  <Music className="w-6 h-6 text-gray-400" />
                </div>
              </div>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <Volume2 className="w-6 h-6 text-gray-400 mr-4" />
                  <div className="w-48 h-1 bg-gray-600 rounded-full">
                    <div className="w-3/4 h-1 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center">
                  <button className="text-gray-400 hover:text-white mr-4">
                    <SkipForward className="w-6 h-6" />
                  </button>
                  <button
                    className="bg-white rounded-full p-2 hover:scale-105 transition-transform"
                    onClick={togglePlay}
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8 text-black" />
                    ) : (
                      <Play className="w-8 h-8 text-black" />
                    )}
                  </button>
                </div>
              </div>
              <Board
                board={board}
                revealed={revealed}
                flagged={flagged}
                onCellClick={handleCellClick}
                onCellRightClick={handleCellRightClick}
              />
              <div className="flex justify-between items-center mt-6">
                <div className="text-gray-400">
                  Mines left: {minesLeft}
                </div>
                <div className="text-gray-400">
                  Time: {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;