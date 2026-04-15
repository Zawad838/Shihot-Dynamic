import { useState, useCallback, createContext, useContext } from 'react';
import React from 'react';

export interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
  shipping: string;
  badge?: string;
  discount?: string;
  condition?: string;
  category?: string;
  seller?: string;
  rating?: number;
  reviewCount?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  name: string;
  email: string;
}

export interface StoreState {
  cart: CartItem[];
  wishlist: number[];
  user: User | null;
  searchQuery: string;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: number) => void;
  signIn: (email: string, name: string) => void;
  signOut: () => void;
  setSearchQuery: (q: string) => void;
  cartCount: number;
  cartTotal: number;
  onCartAdd?: (title: string) => void;
  onWishlistToggle?: (title: string, added: boolean) => void;
  setCartAddCallback: (fn: (title: string) => void) => void;
  setWishlistCallback: (fn: (title: string, added: boolean) => void) => void;
}

const StoreContext = createContext<StoreState | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartAddCb, setCartAddCb] = useState<((t: string) => void) | null>(null);
  const [wishlistCb, setWishlistCb] = useState<((t: string, a: boolean) => void) | null>(null);

  const setCartAddCallback = useCallback((fn: (t: string) => void) => setCartAddCb(() => fn), []);
  const setWishlistCallback = useCallback((fn: (t: string, a: boolean) => void) => setWishlistCb(() => fn), []);

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...product, quantity: 1 }];
    });
    cartAddCb?.(product.title);
  }, [cartAddCb]);

  const removeFromCart = useCallback((id: number) => setCart(prev => prev.filter(i => i.id !== id)), []);

  const updateQuantity = useCallback((id: number, qty: number) => {
    if (qty <= 0) { setCart(prev => prev.filter(i => i.id !== id)); return; }
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((id: number) => {
    setWishlist(prev => {
      const added = !prev.includes(id);
      wishlistCb?.('item', added);
      return added ? [...prev, id] : prev.filter(i => i !== id);
    });
  }, [wishlistCb]);

  const signIn = useCallback((email: string, name: string) => setUser({ email, name }), []);
  const signOut = useCallback(() => { setUser(null); setCart([]); }, []);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  return React.createElement(StoreContext.Provider, {
    value: {
      cart, wishlist, user, searchQuery,
      addToCart, removeFromCart, updateQuantity, clearCart,
      toggleWishlist, signIn, signOut, setSearchQuery,
      cartCount, cartTotal,
      setCartAddCallback, setWishlistCallback,
    }
  }, children);
}

export function useStore(): StoreState {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
}
