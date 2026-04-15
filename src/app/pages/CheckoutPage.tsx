import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowRight, ShieldCheck, Lock, CheckCircle2, Trash2, ShoppingBag } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Header } from '../components/Header';

export function CheckoutPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, user } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState<'cart' | 'confirm' | 'success'>('cart');
  const [selectedAddress, setSelectedAddress] = useState(0);

  const shipping = cartTotal > 100 ? 0 : 12.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  const handlePlaceOrder = () => {
    setStep('success');
    clearCart();
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-10 max-w-md w-full text-center shadow-sm border border-gray-200">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-9 h-9 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h2>
          <p className="text-gray-600 mb-2">Your order has been confirmed.</p>
          <p className="text-gray-500 text-sm mb-8">Order #SH-{Math.floor(Math.random()*900000+100000)} · Estimated delivery in 3–5 business days</p>
          <button onClick={() => navigate('/')} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0 && step === 'cart') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
          <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add some items to get started.</p>
          <Link to="/search" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const addresses = [
    { label: 'Office Headquarters', lines: ['3422 Precision Way', 'Suite 100', 'New York, NY 10004'], default: true },
    { label: 'Residential', lines: ['128 Hudson Street', 'Apt 4B', 'New York, NY 10013'], default: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold tracking-tight">SHILOH</Link>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Lock className="w-4 h-4" />
              <span className="font-semibold">Secure Checkout</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Cart + Address */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cart Items */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Your Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})</h2>
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4 py-4 border-b border-gray-100 last:border-0">
                    <Link to={`/product/${item.id}`} className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item.id}`} className="font-medium text-sm text-gray-900 hover:text-blue-600 line-clamp-2">{item.title}</Link>
                      <p className="text-xs text-gray-500 mt-1">{item.shipping}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 hover:bg-gray-100 text-gray-600 font-bold">−</button>
                          <span className="px-3 py-1 text-sm font-semibold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 hover:bg-gray-100 text-gray-600 font-bold">+</button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-gray-900">${(item.price * item.quantity).toLocaleString()}</p>
                      {item.quantity > 1 && <p className="text-xs text-gray-500">${item.price.toLocaleString()} each</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Shipping Address</h2>
                {!user && (
                  <Link to="/signin" className="text-blue-600 hover:text-blue-700 text-sm font-semibold">Sign in to autofill</Link>
                )}
              </div>
              <div className="space-y-3">
                {addresses.map((addr, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedAddress(i)}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${selectedAddress === i ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-bold text-gray-900 mb-1">{addr.label}</p>
                        {addr.lines.map((l, j) => <p key={j} className="text-sm text-gray-700">{l}</p>)}
                        {addr.default && (
                          <span className="inline-block mt-2 bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded">DEFAULT</span>
                        )}
                      </div>
                      {selectedAddress === i && <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>
              <div className="border-2 border-blue-600 bg-blue-50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" defaultChecked className="w-5 h-5 text-blue-600" />
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded shadow-sm">
                      <div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-blue-400 rounded"></div>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm">Visa ending in 4242</p>
                      <p className="text-xs text-gray-600">Expires 12/26</p>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>
              <button className="mt-3 w-full border-2 border-dashed border-gray-300 rounded-lg py-3 text-sm text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors">
                + Add new payment method
              </button>
            </div>
          </div>

          {/* Right - Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm text-gray-700">
                  <span>Subtotal ({cart.reduce((s,i) => s+i.quantity,0)} items)</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-700">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span className="text-green-600 font-semibold">FREE</span> : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-700">
                  <span>Estimated Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              {cartTotal > 100 && (
                <div className="bg-green-50 text-green-700 text-xs font-semibold px-3 py-2 rounded-lg mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  You qualify for free shipping!
                </div>
              )}
              <button
                onClick={handlePlaceOrder}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                Place Order
                <ArrowRight className="w-5 h-5" />
              </button>
              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
                <ShieldCheck className="w-4 h-4" />
                <span>256-bit SSL encrypted · Buyer protection included</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
