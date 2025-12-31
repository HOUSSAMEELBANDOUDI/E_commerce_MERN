import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useAuth } from "../context/auth/AuthContext";
import { BASE_URL } from "../constants/api";

function Cart() {
  const { token } = useAuth();
  const [cart, setCart] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;

    const fetchCart = async () => {
      try {
        const response = await fetch(`${BASE_URL}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("TOKEN:", token);

        if (!response.ok) {
          throw new Error("Failed to fetch cart");
        }

        const data = await response.json();
        console.log("TOKEN:", token);
        console.log("Data:", data);


        setCart(data);
      } catch  {
        setError("Error loading user cart");
      }
    };

    fetchCart();
  }, [token]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" mb={2}>
        Cart
      </Typography>

      {error && <Typography color="error">{error}</Typography>}

      {cart && (
        <pre>{JSON.stringify(cart, null, 2)}</pre>
      )}
    </Container>
  );
}

export default Cart;