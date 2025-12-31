import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import type { Product } from "../types/Product";
import { useCart } from "../context/Cart/CartContext";


function ProductCard(product: Product) {
  const { addItemToCart } = useCart();

  const handleAddToCart = () => {
    addItemToCart(product._id);
  };

  return (
    <Card sx={{ height: "100%" }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.title}
      />

      <CardContent>
        <Typography gutterBottom variant="h6">
          {product.title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          ${product.price}
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          variant="contained"
          size="small"
          onClick={handleAddToCart}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;

