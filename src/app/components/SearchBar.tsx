import { Search, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { useStore } from '../store/useStore';

export function SearchBar() {
  const { setSearchQuery, searchQuery } = useStore();
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localQuery);
    navigate(`/search?q=${encodeURIComponent(localQuery)}`);
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <form onSubmit={handleSearch} className="flex items-center gap-4 sm:gap-6">
          <div className="flex-shrink-0">
            <Link to="/">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">SHILOH</h1>
            </Link>
          </div>
          <div className="flex-1 flex items-stretch gap-0 max-w-4xl">
            <button type="button" className="hidden sm:flex items-center gap-2 px-4 border border-gray-300 rounded-l-md bg-white hover:bg-gray-50 whitespace-nowrap text-sm">
              Shop by category
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="flex-1 relative flex items-center">
              <input
                type="text"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                placeholder="Search for anything"
                className="w-full h-10 sm:h-full px-4 border-y border-l sm:border-l-0 sm:border-y border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:rounded-none rounded-l-md"
              />
            </div>
            <select className="hidden lg:block px-4 border-y border-l border-gray-300 bg-white hover:bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[140px]">
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Watches</option>
              <option>Laptops</option>
              <option>Smartphones</option>
              <option>Tablets</option>
            </select>
            <button type="submit" className="px-6 sm:px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-r-md flex items-center justify-center gap-2 transition-colors">
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline text-sm font-medium">Search</span>
            </button>
          </div>
          <button type="button" className="hidden lg:inline text-blue-600 hover:text-blue-700 text-sm whitespace-nowrap">
            Advanced
          </button>
        </form>
      </div>
    </div>
  );
}
