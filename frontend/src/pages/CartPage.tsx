import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useCart } from "../context/Cart/CartContext";

function Cart() {
  const { cartItems, total, updateItemInCart } = useCart();

  const handleUpdate = (productId: string, quantity: number) => {
    if (quantity <= 0) return; // حماية
    updateItemInCart(productId, quantity);
  };

  return (
    <Container fixed sx={{ mt: 4 }}>
      <Typography variant="h4" mb={3}>
        Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography>Your cart is empty</Typography>
      ) : (
        <>
          <Box display="flex" flexDirection="column" gap={2}>
            {cartItems.map((item) => (
              <Box
                key={item.productId}
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 3,
                  p: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {/* Left */}
                <Box display="flex" alignItems="center" gap={2}>
                  <img
                    src={item.image}
                    alt={item.title}
                    width={70}
                    height={70}
                    style={{ objectFit: "contain" }}
                  />

                  <Box>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography color="text.secondary">
                      {item.quantity} × {item.price.toLocaleString()}$
                    </Typography>
                  </Box>
                </Box>

                {/* Right */}
                <Box display="flex" alignItems="center" gap={2}>
                  <ButtonGroup size="small" variant="outlined">
                    <Button
                      onClick={() =>
                        handleUpdate(item.productId, item.quantity - 1)
                      }
                    >
                      -
                    </Button>

                    <Button disabled>{item.quantity}</Button>

                    <Button
                      onClick={() =>
                        handleUpdate(item.productId, item.quantity + 1)
                      }
                    >
                      +
                    </Button>
                  </ButtonGroup>

                  <Button
                    color="error"
                    size="small"
                    onClick={() => handleUpdate(item.productId, 0)}
                  >
                    Remove
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Total */}
          <Box
            sx={{
              mt: 4,
              p: 2,
              borderTop: "1px solid #ddd",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">Total</Typography>
            <Typography variant="h5">
              {total.toLocaleString()}$
            </Typography>
          </Box>
        </>
      )}
    </Container>
  );
}

export default Cart;
