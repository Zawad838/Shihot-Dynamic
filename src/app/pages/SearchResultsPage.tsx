import { useState, useEffect } from 'react';
import { useStoreToasts } from '../store/useStoreToasts';
import { Link, useSearchParams } from 'react-router';
import { Search, SlidersHorizontal, Heart } from 'lucide-react';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { useStore } from '../store/useStore';
import { ALL_PRODUCTS, searchProducts } from '../data/products';
import type { Product } from '../store/useStore';

type SortKey = 'relevant' | 'price_asc' | 'price_desc' | 'newest';

export function SearchResultsPage() {
  useStoreToasts();
  const [searchParams] = useSearchParams();
  const urlQuery = searchParams.get('q') ?? '';
  const { addToCart, toggleWishlist, wishlist, setSearchQuery } = useStore();

  const [condition, setCondition] = useState<string>('All');
  const [format, setFormat] = useState<string>('All');
  const [freeShipping, setFreeShipping] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState<SortKey>('relevant');
  const [addedId, setAddedId] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (urlQuery) setSearchQuery(urlQuery);
  }, [urlQuery, setSearchQuery]);

  let results = searchProducts(urlQuery);

  if (condition !== 'All') results = results.filter(p => p.condition?.toLowerCase() === condition.toLowerCase());
  if (freeShipping) results = results.filter(p => p.shipping.toLowerCase().includes('free'));
  if (minPrice) results = results.filter(p => p.price >= Number(minPrice));
  if (maxPrice) results = results.filter(p => p.price <= Number(maxPrice));

  const sorted = [...results].sort((a, b) => {
    if (sort === 'price_asc') return a.price - b.price;
    if (sort === 'price_desc') return b.price - a.price;
    return 0;
  });

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const categories = [
    { name: 'Electronics', count: ALL_PRODUCTS.filter(p => p.category === 'Electronics').length },
    { name: 'Laptops', count: ALL_PRODUCTS.filter(p => p.category === 'Laptops').length },
    { name: 'Smartphones', count: ALL_PRODUCTS.filter(p => p.category === 'Smartphones').length },
    { name: 'Fashion', count: ALL_PRODUCTS.filter(p => p.category === 'Fashion').length },
    { name: 'Watches', count: ALL_PRODUCTS.filter(p => p.category === 'Watches').length },
    { name: 'Tablets', count: ALL_PRODUCTS.filter(p => p.category === 'Tablets').length },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <SearchBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className={`w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-4">
              <h3 className="font-bold text-lg text-gray-900 mb-6">Filters</h3>

              {/* Category */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h4 className="font-semibold text-sm text-gray-900 mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <label key={cat.name} className="flex items-center gap-2 text-sm cursor-pointer hover:text-blue-600">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
                      <span className="flex-1">{cat.name}</span>
                      <span className="text-gray-500">{cat.count}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h4 className="font-semibold text-sm text-gray-900 mb-3">Price Range</h4>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={e => setMinPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                  <span className="text-gray-400">to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={e => setMaxPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </div>

              {/* Condition */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h4 className="font-semibold text-sm text-gray-900 mb-3">Condition</h4>
                <div className="space-y-2">
                  {['All', 'New', 'Mint', 'Used', 'Refurbished'].map(c => (
                    <label key={c} className="flex items-center gap-2 text-sm cursor-pointer hover:text-blue-600">
                      <input
                        type="radio"
                        name="condition"
                        checked={condition === c}
                        onChange={() => setCondition(c)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span>{c}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Shipping */}
              <div>
                <h4 className="font-semibold text-sm text-gray-900 mb-3">Shipping</h4>
                <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-blue-600">
                  <input
                    type="checkbox"
                    checked={freeShipping}
                    onChange={e => setFreeShipping(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                  />
                  <span>Free Shipping Only</span>
                </label>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 min-w-0">
            <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-gray-900">
                  {urlQuery ? `"${urlQuery}" — ` : ''}{sorted.length} Results
                </h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value as SortKey)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium focus:outline-none"
                >
                  <option value="relevant">Most Relevant</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            {sorted.length === 0 ? (
              <div className="text-center py-20">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No results found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
                <button
                  onClick={() => { setCondition('All'); setFreeShipping(false); setMinPrice(''); setMaxPrice(''); }}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {sorted.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group">
                    <Link to={`/product/${product.id}`} className="block relative aspect-square bg-gray-100">
                      {product.discount && (
                        <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">{product.discount}</span>
                      )}
                      {product.badge && !product.discount && (
                        <span className="absolute top-3 left-3 bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded z-10">{product.badge}</span>
                      )}
                      <button
                        onClick={e => { e.preventDefault(); toggleWishlist(product.id); }}
                        className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow z-10 hover:scale-110 transition-transform"
                      >
                        <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                      </button>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{product.condition}</span>
                      </div>
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-semibold text-sm text-gray-900 mb-2 line-clamp-2 hover:text-blue-600">{product.title}</h3>
                      </Link>
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-lg font-bold text-gray-900">${product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-500 line-through">${product.originalPrice.toLocaleString()}</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mb-3">{product.shipping}</p>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className={`w-full font-semibold py-2 rounded-lg text-sm transition-colors ${addedId === product.id ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                      >
                        {addedId === product.id ? '✓ Added!' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
