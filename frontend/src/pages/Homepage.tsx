import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid2 from "@mui/material/Grid"; // Import Grid2 instead
import Box from "@mui/material/Box";

import ProductCard from "../components/ProductCard";
import type { Product } from "../types/Product";
import { BASE_URL } from "../constants/api";

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/product`);
        const data = await response.json();
        //console.log(data);
        setProducts(data);
      } catch {
        setError(true);
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        something went wrong, please try again
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 2 }}>
      <Grid2 container spacing={2}>
        {products.map((product) => (
          <Grid2 size={{ xs: 12, md: 4 }} key={product._id}>
            <ProductCard {...product} />
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
}

export default HomePage;