/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { CartContext } from "./CartContext";
import { addToCart } from "./Cart.service";
import { useAuth } from "../auth/AuthContext";
import type { CartItem } from "../../types/CartItem";

function CartProvider({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string>("");

  const addItemToCart = async (productId: string) => {
    try {
      if (!token) return;

      const cart = await addToCart(productId, token);

      /**
       * 🔑 Mapping الوحيد في التطبيق كله
       */
      const mappedItems: CartItem[] = cart.items.map((item: any) => ({
        _id: item._id,
        productId: item.product._id,
        title: item.product.title,
        image: item.product.image,
        price: item.unitPrice,
        quantity: item.quantity,
      }));

      setCartItems(mappedItems);
      setTotal(cart.total);
      setError("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch  {
   
      setError( "Failed to add to cart");
    }
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
