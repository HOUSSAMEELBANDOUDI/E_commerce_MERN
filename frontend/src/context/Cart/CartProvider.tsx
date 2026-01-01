/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import { addToCart } from "./Cart.service";
import { useAuth } from "../auth/AuthContext";
import type { CartItem } from "../../types/CartItem";
import { BASE_URL } from "../../constants/api";

function CartProvider({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState("");

  // ✅ mapper واحد فقط
  const mapCart = (cart: any) => {
    const items: CartItem[] = cart.items.map((item: any) => ({
      _id: item._id,
      productId: item.product._id,
      title: item.product.title,
      image: item.product.image,
      price: item.unitPrice, // ✅ صح
      quantity: item.quantity,
    }));

    setCartItems(items);
    setTotal(cart.total);
  };

  // ✅ fetch cart
  useEffect(() => {
    if (!token) {
      setCartItems([]);
      setTotal(0);
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await fetch(`${BASE_URL}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error();

        const cart = await res.json();
        mapCart(cart);
        setError("");
      } catch {
        setError("Error loading user cart");
      }
    };

    fetchCart();
  }, [token]);

  // ✅ add item
  const addItemToCart = async (productId: string) => {
    try {
      if (!token) return;

      const cart = await addToCart(productId, token);
      mapCart(cart);
      setError("");
    } catch {
      setError("Failed to add to cart");
    }
  };

  // ✅ update item
  const updateItemInCart = async (productId: string, quantity: number) => {
    if (!token) return;

    // ⛔ guard
    if (quantity <= 0) return;

    try {
      const res = await fetch(`${BASE_URL}/cart/items`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product: productId,
          quantity,
        }),
      });

      if (!res.ok) throw new Error();

      const cart = await res.json();
      mapCart(cart);
      setError("");
    } catch {
      setError("Failed to update cart item");
    }
  };

  // ✅ remove item
  const removeItemFromCart = async (productId: string) => {
    if (!token) return;

    try {
      const res = await fetch(`${BASE_URL}/cart/items/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error();

      const cart = await res.json(); // ✅ active cart
      mapCart(cart);                // ✅ مهم جدًا
      setError("");
    } catch {
      setError("Failed to remove item from cart");
    }
  };

  // CartProvider.tsx
const clearCart = async () => {
  if (!token) return;

  try {
    const res = await fetch(`${BASE_URL}/cart`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error();
    }

    // 👇 بما إن الكارت اتفضت خلاص
    setCartItems([]);
    setTotal(0);
    setError("");
  } catch {
    setError("Failed to clear cart");
  }
};


  return (
    <CartContext.Provider
      value={{
        cartItems,
        total,
        addItemToCart,
        updateItemInCart,
        removeItemFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;


