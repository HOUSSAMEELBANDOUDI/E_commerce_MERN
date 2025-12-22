import express, { Request, Response } from "express";
import { getAllProducts } from "../services/productService";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const result = await getAllProducts();
  res.status(result.statusCode).send(result.data);
});

export default router;
