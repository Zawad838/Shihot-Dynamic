import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useStore } from '../store/useStore';

const categories = [
  { name: 'Laptops', image: 'https://images.unsplash.com/photo-1759668358660-0d06064f0f84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { name: 'Smartphones', image: 'https://images.unsplash.com/photo-1646719223599-9864b351e242?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { name: 'Electronics', image: 'https://images.unsplash.com/photo-1610642436394-81749134ffe8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { name: 'Tablets', image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { name: 'Fashion', image: 'https://images.unsplash.com/photo-1767440557855-79d85bd685ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { name: 'Watches', image: 'https://images.unsplash.com/photo-1719744755507-a4c856c57cf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
];

export function CategoryBrowser() {
  const navigate = useNavigate();
  const { setSearchQuery } = useStore();

  const handleClick = (name: string) => {
    setSearchQuery(name);
    navigate(`/search?q=${encodeURIComponent(name)}`);
  };

  return (
    <section className="bg-white py-8 sm:py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Browse by category</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-6">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleClick(category.name)}
              className="flex flex-col items-center gap-3 sm:gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
            >
              <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-sm sm:text-base font-medium text-gray-900">{category.name}</span>
            </button>
          ))}
          <button
            onClick={() => navigate('/search')}
            className="flex flex-col items-center justify-center gap-3 sm:gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
          >
            <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
              <ArrowRight className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
            </div>
            <span className="text-sm sm:text-base font-medium text-gray-900">See all</span>
          </button>
        </div>
      </div>
    </section>
  );
}
