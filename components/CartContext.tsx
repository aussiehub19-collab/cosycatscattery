'use client';

import React, { createContext, useContext, useState, useEffect, useSyncExternalStore } from 'react';
import CartDrawer, { CartItem } from './CartDrawer';
import Nav from './Nav';
import Footer from './Footer';
import AnnouncementBar from './AnnouncementBar';
import ChatHub from './ChatHub';
import CookieBanner from './CookieBanner';
import { SITE } from '@/config/site';

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, delta: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(SITE.cartKey || 'mm-cart');
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(SITE.cartKey || 'mm-cart', JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to save cart to localStorage:', e);
    }
  }, [items]);

  const addItem = (product: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.slug === product.slug);
      if (existing) {
        return prev.map(i =>
          i.slug === product.slug ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (slug: string) => {
    setItems(prev => prev.filter(i => i.slug !== slug));
  };

  const updateQuantity = (slug: string, delta: number) => {
    setItems(prev =>
      prev
        .map(i => {
          if (i.slug === slug) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
      }}
    >
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <AnnouncementBar />
      <Nav cartCount={totalCount} onOpenCart={() => setIsCartOpen(true)} />
      <main id="main" tabIndex={-1} className="min-h-screen focus:outline-none">
        {children}
      </main>
      <Footer />
      <ChatHub />
      <CookieBanner />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={items}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onClearCart={clearCart}
      />
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
