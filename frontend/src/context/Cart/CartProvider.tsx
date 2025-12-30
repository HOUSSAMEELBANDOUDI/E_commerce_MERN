import { useState } from "react";
import { CartContext } from "./CartContext";
import type { CartItem } from "../../types/CartItem";

function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);

  const addItemToCart = (productId: string) => {
    console.log("ADD TO CART:", productId);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        total,
        addItemToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
