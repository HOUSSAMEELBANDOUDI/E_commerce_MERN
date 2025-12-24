import express, { Response } from "express";
import { getActiveCartForUser } from "../services/cartService";
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


export default router;

