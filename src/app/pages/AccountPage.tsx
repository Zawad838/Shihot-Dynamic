import { useState, useEffect } from 'react';
import { useStoreToasts } from '../store/useStoreToasts';
import { Link, useNavigate } from 'react-router';
import { ShoppingBag, Heart, Settings, LogOut, Package, Star, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { ALL_PRODUCTS } from '../data/products';

type Tab = 'overview' | 'orders' | 'watchlist' | 'settings';

export function AccountPage() {
  useStoreToasts();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);
  const { user, signOut, wishlist, cart, toggleWishlist, addToCart } = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <SearchBar />
        <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Settings className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign in to view your account</h2>
          <p className="text-gray-500 mb-6">Manage your orders, wishlist, and settings.</p>
          <div className="flex gap-4">
            <Link to="/signin" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">Sign In</Link>
            <Link to="/signup" className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-lg transition-colors">Create Account</Link>
          </div>
        </div>
      </div>
    );
  }

  const wishlistProducts = ALL_PRODUCTS.filter(p => wishlist.includes(p.id));
  const initials = user.name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase();

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'overview', label: 'Overview', icon: <Package className="w-4 h-4" /> },
    { key: 'orders', label: 'Orders', icon: <ShoppingBag className="w-4 h-4" /> },
    { key: 'watchlist', label: `Watchlist (${wishlist.length})`, icon: <Heart className="w-4 h-4" /> },
    { key: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <SearchBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Banner */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {initials}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>
            <button
              onClick={() => { signOut(); navigate('/'); }}
              className="ml-auto flex items-center gap-2 text-gray-500 hover:text-red-600 text-sm font-medium transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium border-b border-gray-100 last:border-0 transition-colors ${activeTab === tab.key ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  {tab.icon}
                  {tab.label}
                  <ChevronRight className="w-4 h-4 ml-auto opacity-40" />
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                    <p className="text-3xl font-bold text-gray-900">0</p>
                    <p className="text-sm text-gray-500 mt-1">Active Orders</p>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                    <p className="text-3xl font-bold text-gray-900">{wishlist.length}</p>
                    <p className="text-sm text-gray-500 mt-1">Watchlist Items</p>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                    <p className="text-3xl font-bold text-gray-900">{cart.length}</p>
                    <p className="text-sm text-gray-500 mt-1">Cart Items</p>
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-4">Recent Activity</h3>
                  <div className="flex flex-col items-center justify-center py-8 text-center text-gray-400">
                    <Package className="w-10 h-10 mb-3 opacity-40" />
                    <p className="text-sm">No recent activity yet.</p>
                    <Link to="/search" className="mt-3 text-blue-600 hover:underline text-sm">Start shopping</Link>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-6">Your Orders</h3>
                <div className="flex flex-col items-center justify-center py-10 text-center text-gray-400">
                  <ShoppingBag className="w-12 h-12 mb-3 opacity-30" />
                  <p className="text-gray-600 font-medium mb-1">No orders yet</p>
                  <p className="text-sm mb-4">Your order history will appear here.</p>
                  <Link to="/search" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors">
                    Browse Products
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'watchlist' && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-6">Watchlist ({wishlist.length})</h3>
                {wishlistProducts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <Heart className="w-12 h-12 mb-3 text-gray-200" />
                    <p className="text-gray-600 font-medium mb-1">No saved items</p>
                    <p className="text-sm text-gray-400 mb-4">Items you save will appear here.</p>
                    <Link to="/search" className="text-blue-600 hover:underline text-sm">Find items to save</Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlistProducts.map(p => (
                      <div key={p.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                        <Link to={`/product/${p.id}`} className="block aspect-video bg-gray-100">
                          <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                        </Link>
                        <div className="p-3">
                          <Link to={`/product/${p.id}`}>
                            <p className="font-medium text-sm text-gray-900 line-clamp-1 hover:text-blue-600">{p.title}</p>
                          </Link>
                          <p className="text-sm font-bold mt-1">${p.price.toLocaleString()}</p>
                          <div className="flex gap-2 mt-3">
                            <button onClick={() => addToCart(p)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 rounded-lg transition-colors">Add to Cart</button>
                            <button onClick={() => toggleWishlist(p.id)} className="px-3 py-2 border border-gray-200 rounded-lg hover:border-red-300 hover:text-red-500 text-xs transition-colors">Remove</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                <h3 className="font-bold text-lg text-gray-900">Account Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">FULL NAME</label>
                    <input defaultValue={user.name} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">EMAIL</label>
                    <input defaultValue={user.email} type="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="flex items-center justify-between py-3 border-t border-gray-100">
                    <div>
                      <p className="font-medium text-sm text-gray-900">Email Notifications</p>
                      <p className="text-xs text-gray-500">Receive order updates and deals</p>
                    </div>
                    <div className="w-11 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                      <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-3 border-t border-gray-100">
                    <div>
                      <p className="font-medium text-sm text-gray-900">Two-Factor Auth</p>
                      <p className="text-xs text-gray-500">Add extra security to your account</p>
                    </div>
                    <div className="w-11 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                      <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 shadow"></div>
                    </div>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors">
                    Save Changes
                  </button>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={() => { signOut(); navigate('/'); }}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out of all devices
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
