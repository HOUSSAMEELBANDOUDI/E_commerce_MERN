import express, { Response } from "express";
import {
  getActiveCartForUser,
  addItemToCart,
  updateItemInCart,
  deleteItemFromCart,
  ClearCart,
  checkout,
} from "../services/cartService";
import jwtMiddleware, { AuthRequest } from "../middlewares/validateJWT";

const router = express.Router();

/**
 * GET /
 * Get active cart for logged-in user
 */
router.get("/", jwtMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user._id;

    const cart = await getActiveCartForUser({ user,populateProduct:true });

    res.status(200).send(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to get cart" });
  }
});

router.post("/items", jwtMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const { product, quantity } = req.body;

    const response = await addItemToCart({
      user: userId,
      product,
      quantity,
    });

    res.status(response.statusCode).send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to add item to cart" });
  }
});

router.put("/items", jwtMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const { product, quantity } = req.body;

    const response = await updateItemInCart({
      user: userId,
      product,
      quantity,
    });

    res.status(response.statusCode).send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to update cart item" });
  }
});

router.delete(
  "/items/:product",
  jwtMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user._id;
      const productId = req.params.product;

      const response = await deleteItemFromCart({
        user: userId,
        product: productId,
      });

      res.status(response.statusCode).send(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Failed to delete cart item" });
    }
  }
);

router.delete("/", jwtMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user._id;

    const response = await ClearCart({ user });

    res.status(response.statusCode).send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to clear cart" });
  }
});

router.post("/checkout", jwtMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const { address } = req.body;

    const response = await checkout({
      user: userId,
      address,
    });

    res.status(response.statusCode).send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Checkout failed" });
  }
});

export default router;


