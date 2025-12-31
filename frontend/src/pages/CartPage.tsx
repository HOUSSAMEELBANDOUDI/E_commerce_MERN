import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useCart } from "../context/Cart/CartContext";

function Cart() {
  const { cartItems, total } = useCart();

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" mb={2}>
        Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography>Your cart is empty</Typography>
      ) : (
        <>
          {cartItems.map((item) => (
            <Box
              key={item.productId}
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                p: 2,
                mb: 2,
              }}
            >
              <Typography variant="h6">{item.title}</Typography>
              <Typography>Quantity: {item.quantity}</Typography>
              <Typography>Price: ${item.price}</Typography>
            </Box>
          ))}

          <Typography variant="h5" mt={3}>
            Total: ${total}
          </Typography>
        </>
      )}
    </Container>
  );
}

export default Cart;
