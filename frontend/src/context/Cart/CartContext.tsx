import { createContext, useContext } from "react";
import type { CartItem } from "../../types/CartItem";

export interface CartContextType {
  cartItems: CartItem[];
  total: number;
  addItemToCart: (productId: string) => void;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  total: 0,
  addItemToCart: () => {},
});

export const useCart = () => useContext(CartContext);
