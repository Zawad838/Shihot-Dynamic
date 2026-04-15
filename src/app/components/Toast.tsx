import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import React from 'react';
import { CheckCircle2, X, ShoppingCart, Heart } from 'lucide-react';

type ToastType = 'cart' | 'wishlist' | 'success' | 'error';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let nextId = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = ++nextId;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  const dismiss = (id: number) => setToasts(prev => prev.filter(t => t.id !== id));

  return React.createElement(
    ToastContext.Provider,
    { value: { showToast } },
    children,
    React.createElement(
      'div',
      { className: 'fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none' },
      toasts.map(toast =>
        React.createElement(ToastItem, { key: toast.id, toast, onDismiss: dismiss })
      )
    )
  );
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: number) => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const t = setTimeout(() => setVisible(false), 2600);
    return () => clearTimeout(t);
  }, []);

  const icons: Record<ToastType, React.ReactNode> = {
    cart: <ShoppingCart className="w-4 h-4" />,
    wishlist: <Heart className="w-4 h-4" />,
    success: <CheckCircle2 className="w-4 h-4" />,
    error: <X className="w-4 h-4" />,
  };

  const colors: Record<ToastType, string> = {
    cart: 'bg-blue-600 text-white',
    wishlist: 'bg-pink-500 text-white',
    success: 'bg-green-600 text-white',
    error: 'bg-red-600 text-white',
  };

  return (
    <div
      className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg transition-all duration-300 ${colors[toast.type]} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      {icons[toast.type]}
      <span className="text-sm font-medium">{toast.message}</span>
      <button onClick={() => onDismiss(toast.id)} className="ml-2 opacity-70 hover:opacity-100">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be inside ToastProvider');
  return ctx;
}
