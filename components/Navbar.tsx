import React from 'react';

interface NavbarProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <nav className="bg-gray-800/80 backdrop-blur-md shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-white text-xl font-bold">Game Portfolio</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => onSelectCategory(category)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? 'bg-cyan-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                  aria-current={activeCategory === category ? 'page' : undefined}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};