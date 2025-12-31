import { BASE_URL } from "../../constants/api";

export async function addToCart(
  productId: string,
  token: string
) {
  const res = await fetch(`${BASE_URL}/cart/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      product:productId,
      quantity: 1, // ثابتة زي ما اتفقنا
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Failed to add to cart");
  }

  return data; // <-- cart كامل
}
