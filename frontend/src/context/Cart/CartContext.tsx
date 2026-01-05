// CartContext.ts
import { createContext, useContext } from "react";
import type { CartItem } from "../../types/CartItem";

export interface CartContextType {
  cartItems: CartItem[];
  total: number;
  addItemToCart: (productId: string) => void;
  updateItemInCart: (productId: string, quantity: number) => void;
  removeItemFromCart: (productId: string) => void;
  clearCart: () => void; // 👈 جديد
  checkout:(address: string) => void;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  total: 0,
  addItemToCart: () => {},
  updateItemInCart: () => {},
  removeItemFromCart: () => {},
  clearCart: () => {},
  checkout: () => {}, // 👈
});

export const useCart = () => useContext(CartContext);

