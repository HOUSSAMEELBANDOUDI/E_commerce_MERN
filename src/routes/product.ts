import express, { Request, Response } from "express";
import { getAllProducts } from "../services/productService";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await getAllProducts();
    res.status(result.statusCode).send(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to get products" });
  }
});

export default router;
