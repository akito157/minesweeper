import React from 'react';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <button className="bg-black rounded-full p-1 mr-2">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button className="bg-black rounded-full p-1">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      <div className="flex items-center">
        <button className="bg-black rounded-full p-1 flex items-center">
          <User className="w-6 h-6 mr-2" />
          <span>Profile</span>
        </button>
      </div>
    </header>
  );
};

export default Header;