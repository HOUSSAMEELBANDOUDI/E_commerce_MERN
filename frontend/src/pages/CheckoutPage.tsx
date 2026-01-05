import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart/CartContext";

function CheckoutPage() {
  const { cartItems, total, checkout } = useCart();
  const addressRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handlePayNow = async () => {
    const address = addressRef.current?.value;
    if (!address) return;

     const ok: unknown =  checkout(address);
    if (!ok) return;

    navigate("/order");
  };

  return (
    <Container
      fixed
      sx={{
        mt: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h4">Checkout</Typography>

      <TextField
        inputRef={addressRef}
        label="Delivery Address"
        fullWidth
      />

      <Box
        sx={{
          border: "1px solid #ddd",
          borderRadius: 2,
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        {cartItems.map((item) => (
          <Box
            key={item.productId}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <img
                src={item.image}
                alt={item.title}
                width={50}
                height={50}
                style={{ objectFit: "contain" }}
              />
              <Typography>
                {item.title} × {item.quantity}
              </Typography>
            </Box>

            <Typography>
              {(item.price * item.quantity).toLocaleString()}$
            </Typography>
          </Box>
        ))}

        <Typography textAlign="right" mt={1}>
          Total: {total.toLocaleString()}$
        </Typography>
      </Box>

      <Button
        variant="contained"
        size="large"
        onClick={handlePayNow}
        disabled={!cartItems.length}
      >
        Pay Now
      </Button>
    </Container>
  );
}

export default CheckoutPage;


