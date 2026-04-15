import { useNavigate } from 'react-router';
import { useStore } from '../store/useStore';

const categories = [
  { name: 'Home', path: '/' },
  { name: 'Saved', path: null },
  { name: 'Electronics', path: '/search?q=electronics' },
  { name: 'Motors', path: '/search?q=motors' },
  { name: 'Fashion', path: '/search?q=fashion' },
  { name: 'Collectibles and Art', path: '/search?q=collectibles' },
  { name: 'Sports', path: '/search?q=sports' },
  { name: 'Health & Beauty', path: '/search?q=health' },
  { name: 'Industrial equipment', path: '/search?q=industrial' },
  { name: 'Home & Garden', path: '/search?q=home' },
  { name: 'Deals', path: '/search' },
  { name: 'Sell', path: '/sell' },
];

export function NavigationMenu() {
  const navigate = useNavigate();
  const { setSearchQuery } = useStore();

  const handleCategory = (cat: typeof categories[0]) => {
    if (!cat.path) return;
    if (cat.path.includes('?q=')) {
      const q = new URLSearchParams(cat.path.split('?')[1]).get('q') || '';
      setSearchQuery(q);
    }
    navigate(cat.path);
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 overflow-x-auto scrollbar-hide py-3">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => handleCategory(cat)}
              className="text-sm text-gray-700 hover:text-blue-600 whitespace-nowrap transition-colors font-medium"
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
