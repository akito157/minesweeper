import React from 'react';
import { Flag } from 'lucide-react';

interface CellProps {
  value: number;
  revealed: boolean;
  flagged: boolean;
  onClick: () => void;
  onRightClick: (e: React.MouseEvent) => void;
}

const Cell: React.FC<CellProps> = ({ value, revealed, flagged, onClick, onRightClick }) => {
  const getCellContent = () => {
    if (flagged) return <Flag className="w-4 h-4 text-red-500" />;
    if (!revealed) return null;
    if (value === -1) return '💣';
    if (value === 0) return null;
    return value;
  };

  const getCellColor = () => {
    if (!revealed) return 'bg-gray-600 hover:bg-gray-500';
    if (value === -1) return 'bg-red-500';
    return 'bg-gray-400';
  };

  const getTextColor = () => {
    const colors = ['', 'text-blue-500', 'text-green-500', 'text-red-500', 'text-purple-500', 'text-yellow-500', 'text-pink-500', 'text-indigo-500', 'text-gray-700'];
    return colors[value] || '';
  };

  return (
    <button
      className={`w-8 h-8 flex items-center justify-center font-bold rounded ${getCellColor()} ${getTextColor()} transition-colors duration-200`}
      onClick={onClick}
      onContextMenu={onRightClick}
    >
      {getCellContent()}
    </button>
  );
};

export default Cell;