import React from 'react';
import { Home, Search, Library, PlusSquare } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-black p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Minesweeper</h1>
      </div>
      <nav>
        <ul className="space-y-4">
          <li>
            <a href="#" className="flex items-center text-gray-300 hover:text-white">
              <Home className="w-6 h-6 mr-4" />
              Home
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center text-gray-300 hover:text-white">
              <Search className="w-6 h-6 mr-4" />
              Search
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center text-gray-300 hover:text-white">
              <Library className="w-6 h-6 mr-4" />
              Your Library
            </a>
          </li>
        </ul>
      </nav>
      <div className="mt-8">
        <button className="flex items-center text-gray-300 hover:text-white">
          <PlusSquare className="w-6 h-6 mr-4" />
          Create Playlist
        </button>
      </div>
    </div>
  );
};

export default Sidebar;