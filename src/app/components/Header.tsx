import { ChevronDown, ShoppingCart, Bell, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useStore } from '../store/useStore';

export function Header() {
  const { user, signOut, cartCount, wishlist } = useStore();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-9 text-xs">
            <div className="flex items-center gap-4">
              {user ? (
                <span className="text-gray-700">Hi, <strong>{user.name.split(' ')[0]}</strong></span>
              ) : (
                <span className="text-gray-700">
                  Hi{' '}
                  <Link to="/signin" className="text-blue-600 hover:text-blue-700">Sign in</Link>{' '}
                  or{' '}
                  <Link to="/signup" className="text-blue-600 hover:text-blue-700">register</Link>
                </span>
              )}
              <Link to="/search" className="text-gray-700 hover:text-gray-900 hidden sm:inline">Daily Deals</Link>
              <button className="text-gray-700 hover:text-gray-900 hidden sm:inline">Brand Outlet</button>
              <button className="text-gray-700 hover:text-gray-900 hidden sm:inline">Help & Contact</button>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-gray-700 hover:text-gray-900 hidden sm:inline">Ship to</button>
              <button className="flex items-center gap-1 text-gray-700 hover:text-gray-900">
                <span className="hidden sm:inline">English</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              <Link to="/sell" className="text-gray-700 hover:text-gray-900 hidden sm:inline">Sell</Link>
              <button className="relative flex items-center gap-1 text-gray-700 hover:text-gray-900">
                <Heart className="w-4 h-4" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
                <span className="hidden sm:inline text-xs ml-1">Watchlist</span>
              </button>
              {user ? (
                <div className="flex items-center gap-3">
                  <Link to="/account" className="text-gray-700 hover:text-gray-900 hidden sm:inline">My Account</Link>
                  <button onClick={handleSignOut} className="text-gray-700 hover:text-red-600 hidden sm:inline">Sign Out</button>
                </div>
              ) : (
                <Link to="/account" className="flex items-center gap-1 text-gray-700 hover:text-gray-900">
                  <span className="hidden sm:inline">My eBay</span>
                  <Bell className="w-4 h-4 sm:hidden" />
                </Link>
              )}
              <Link to="/checkout" className="relative flex items-center text-gray-700 hover:text-gray-900">
                <ShoppingCart className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
