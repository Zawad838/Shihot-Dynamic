import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import { useState } from 'react';
import { ALL_PRODUCTS } from '../data/products';

const VISIBLE = 6;

export function DailyDeals() {
  const [start, setStart] = useState(0);
  const deals = ALL_PRODUCTS.filter(p => p.discount || p.badge);
  const visible = deals.slice(start, start + VISIBLE);

  const prev = () => setStart(Math.max(0, start - VISIBLE));
  const next = () => setStart(start + VISIBLE < deals.length ? start + VISIBLE : 0);

  return (
    <section className="bg-gray-50 py-8 sm:py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Daily Deals</h2>
            <Link to="/search" className="text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base">
              See all deals
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              disabled={start === 0}
              className="p-2 rounded-full bg-white hover:bg-gray-100 border border-gray-200 transition-colors disabled:opacity-40"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="p-2 rounded-full bg-white hover:bg-gray-100 border border-gray-200 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6">
          {visible.map((deal) => (
            <Link
              key={deal.id}
              to={`/product/${deal.id}`}
              className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div className="relative aspect-square bg-gray-100">
                {deal.discount && (
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
                    {deal.discount}
                  </div>
                )}
                {deal.badge && !deal.discount && (
                  <div className="absolute top-3 left-3 bg-white text-gray-900 text-xs font-bold px-2 py-1 rounded z-10 border border-gray-200">
                    {deal.badge}
                  </div>
                )}
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 h-10">{deal.title}</h3>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-lg font-bold text-gray-900">${deal.price.toLocaleString()}</span>
                  {deal.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">${deal.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                <p className="text-xs text-gray-600">{deal.shipping}</p>
                {deal.badge === 'REFURBISHED' && (
                  <span className="inline-block mt-2 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                    REFURBISHED
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
