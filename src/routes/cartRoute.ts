import express, { Response } from "express";
import { getActiveCartForUser, addItemToCart } from "../services/cartService";
import jwtMiddleware, { AuthRequest } from "../middlewares/validateJWT";

const router = express.Router();

/**
 * GET /
 * Get active cart for logged-in user
 */
router.get("/", jwtMiddleware, async (req: AuthRequest, res: Response) => {
  const user = req.user._id;

  const cart = await getActiveCartForUser({ user });

  res.status(200).send(cart);
});

router.post("/items", jwtMiddleware, async (req: AuthRequest, res: Response) => {
  const userId = req.user._id;
  const { product, quantity } = req.body;

  const response = await addItemToCart({
    user: userId,
    product,
    quantity,
  });

  res.status(response.statusCode).send(response.data);
});


export default router;

