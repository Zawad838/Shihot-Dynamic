import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import { Heart, Share2, Flag, Shield, Truck, ChevronRight, Star } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useStoreToasts } from '../store/useStoreToasts';
import { ALL_PRODUCTS } from '../data/products';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';

export function ProductDetailPage() {
  useStoreToasts();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const product = ALL_PRODUCTS.find(p => p.id === Number(id)) ?? ALL_PRODUCTS[1];

  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 12, seconds: 55 });
  const [selectedImage, setSelectedImage] = useState(0);
  const [bidAmount, setBidAmount] = useState('1,460.00');
  const [addedToCart, setAddedToCart] = useState(false);

  const thumbnails = [product.image, product.image, product.image, product.image];
  const isWishlisted = wishlist.includes(product.id);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = () => {
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <SearchBar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">HOME</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/search" className="hover:text-blue-600">{product.category?.toUpperCase() ?? 'SHOP'}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium truncate max-w-xs">{product.title.slice(0, 40)}...</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Images */}
          <div>
            <div className="bg-white rounded-2xl overflow-hidden mb-4 relative aspect-square border border-gray-200">
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 bg-white rounded-full px-3 py-1.5 flex items-center gap-1 text-sm font-semibold z-10 shadow border border-gray-200"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                {isWishlisted ? 'Saved' : 'Save'}
              </button>
              <img src={thumbnails[selectedImage]} alt="Product" className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-4 mb-4">
              {thumbnails.map((thumb, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${selectedImage === index ? 'border-blue-600' : 'border-gray-200'}`}
                >
                  <img src={thumb} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
              <button className="w-20 h-20 rounded-lg border-2 border-gray-200 flex items-center justify-center bg-gray-50 hover:bg-gray-100">
                <span className="text-xs text-gray-600">+8 MORE</span>
              </button>
            </div>
            <div className="bg-white rounded-lg p-6 mb-4 border border-gray-200">
              <h3 className="font-bold text-lg mb-4">ITEM DESCRIPTION</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                This product represents outstanding quality and value. Expertly crafted with premium materials and meticulous attention to detail, it delivers exceptional performance for both professional and personal use. Comes with full manufacturer warranty.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-bold text-lg mb-4">SPECIFICATIONS</h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600 text-sm">Condition</span>
                  <span className="font-medium text-sm">{product.condition ?? 'New'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600 text-sm">Category</span>
                  <span className="font-medium text-sm">{product.category}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600 text-sm">Seller</span>
                  <span className="font-medium text-sm">{product.seller}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600 text-sm">Shipping</span>
                  <span className="font-medium text-sm">{product.shipping}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Purchase */}
          <div>
            <div className="bg-white rounded-lg p-6 mb-4 border border-gray-200">
              <span className="inline-block bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded mb-4">
                ENDING SOON
              </span>
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-900 leading-tight pr-4">{product.title}</h1>
                <div className="flex gap-2 flex-shrink-0">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Flag className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className={`w-4 h-4 ${s <= Math.round(product.rating!) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{product.rating} ({product.reviewCount?.toLocaleString()} reviews)</span>
                </div>
              )}

              <p className="text-sm text-gray-600 mb-6">Condition: <strong>{product.condition ?? 'New'}</strong></p>

              {/* Auction */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">CURRENT BID</p>
                    <p className="text-4xl font-bold text-gray-900">${product.price.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-red-600 font-semibold mb-1">TIME LEFT</p>
                    <p className="text-2xl font-bold text-gray-900 tabular-nums">
                      {String(timeLeft.hours).padStart(2,'0')}h{' '}
                      {String(timeLeft.minutes).padStart(2,'0')}m{' '}
                      {String(timeLeft.seconds).padStart(2,'0')}s
                    </p>
                  </div>
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    value={`$ ${bidAmount} or more`}
                    onChange={(e) => setBidAmount(e.target.value.replace(/[^0-9.,]/g, ''))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm mb-2"
                  />
                  <p className="text-xs text-gray-600">18 bids placed • Reserve price met</p>
                </div>
                <button
                  onClick={handleAddToCart}
                  className={`w-full font-semibold py-4 rounded-lg transition-colors mb-2 ${addedToCart ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                >
                  {addedToCart ? '✓ Added to Cart!' : 'Place Bid / Add to Cart'}
                </button>
              </div>

              {/* Buy Now */}
              <div className="border-t border-gray-200 pt-6">
                <p className="text-xs text-gray-600 mb-2">BUY IT NOW</p>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-3xl font-bold text-gray-900">
                    ${product.originalPrice ? product.originalPrice.toLocaleString() : (product.price * 1.3).toFixed(0)}
                  </p>
                  <button
                    onClick={handleBuyNow}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold px-8 py-3 rounded-lg transition-colors"
                  >
                    Buy It Now
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm text-gray-900">Fast Shipping</p>
                    <p className="text-xs text-gray-600">{product.shipping}. Ships within 24 hours of payment.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm text-gray-900">Buyer Protection</p>
                    <p className="text-xs text-gray-600">Full refund if item doesn't arrive or match description.</p>
                  </div>
                </div>
              </div>

              {/* Seller */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {product.seller?.slice(0,2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{product.seller}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{product.rating}</span>
                        <span>({product.reviewCount?.toLocaleString()} sales)</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">CONTACT</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">You might also like</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {ALL_PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0,4).concat(
            ALL_PRODUCTS.filter(p => p.id !== product.id).slice(0,4)
          ).slice(0,4).map(p => (
            <Link key={p.id} to={`/product/${p.id}`} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow group">
              <div className="aspect-square bg-gray-100">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">{p.title}</p>
                <p className="text-sm font-bold">${p.price.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
