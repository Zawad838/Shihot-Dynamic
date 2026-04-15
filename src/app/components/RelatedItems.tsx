import { Link } from 'react-router';
import { Heart } from 'lucide-react';
import { ALL_PRODUCTS } from '../data/products';
import { useStore } from '../store/useStore';

export function RelatedItems() {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const items = ALL_PRODUCTS.slice(0, 4);

  return (
    <section className="bg-white py-8 sm:py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Today's picks for you</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group">
              <Link to={`/product/${item.id}`} className="block relative aspect-square bg-gray-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={(e) => { e.preventDefault(); toggleWishlist(item.id); }}
                  className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:scale-110 transition-transform"
                >
                  <Heart className={`w-4 h-4 ${wishlist.includes(item.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                </button>
                {item.discount && (
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                    {item.discount}
                  </div>
                )}
              </Link>
              <div className="p-4">
                <Link to={`/product/${item.id}`}>
                  <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">{item.title}</h3>
                </Link>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-lg font-bold text-gray-900">${item.price.toLocaleString()}</span>
                  {item.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">${item.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mb-3">{item.shipping}</p>
                <button
                  onClick={() => addToCart(item)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-lg transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
