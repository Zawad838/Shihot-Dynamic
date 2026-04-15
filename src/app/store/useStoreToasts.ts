import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { useToast } from '../components/Toast';

// Drop this hook in the root of your app to wire up cart/wishlist toasts
export function useStoreToasts() {
  const { setCartAddCallback, setWishlistCallback } = useStore();
  const { showToast } = useToast();

  useEffect(() => {
    setCartAddCallback((title: string) => {
      const short = title.length > 40 ? title.slice(0, 40) + '…' : title;
      showToast(`Added to cart: ${short}`, 'cart');
    });
    setWishlistCallback((_title: string, added: boolean) => {
      showToast(added ? 'Saved to watchlist' : 'Removed from watchlist', 'wishlist');
    });
  }, [setCartAddCallback, setWishlistCallback, showToast]);
}
