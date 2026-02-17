import React, { createContext, useContext, useMemo, useState } from "react";

export type CartItemType = {
  id: string;
  name: string;
  price: string;      // keep string
  option?: string;
  image?: string;
  quantity: number;
};

type CartContextType = {
  items: CartItemType[];
  addToCart: (item: CartItemType) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItemType[]>([]);

  const addToCart = (item: CartItemType) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === item.id && p.option === item.option);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + item.quantity };
        return copy;
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: Math.max(1, quantity) } : p))
    );
  };

  const clearCart = () => setItems([]);

  const totalPrice = useMemo(() => {
    return items.reduce((sum, it) => {
      const price = Number(it.price || 0);
      return sum + price * (it.quantity || 1);
    }, 0);
  }, [items]);

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}