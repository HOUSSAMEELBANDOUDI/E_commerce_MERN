import { title } from "node:process";
import ProductModel from "../models/productModel";

// Get all products
export const getAllProducts = async () => {
  const products = await ProductModel.find();
  return { statusCode: 200, data: products };
};

export const seedProducts = async () => {
  try {
    const productsCount = await ProductModel.countDocuments();

    // لو في منتجات موجودة خلاص → اعمل exit
    if (productsCount > 0) {
      console.log("Products already exist, skipping seeding");
      return;
    }

    const products = [
      {
        title: "Laptop Dell",
        image: "https://m.media-amazon.com/images/I/61Qe0euJJZL._AC_SL1500_.jpg",
        price: 15000,
        stock: 10,
      },
      {
        title: "iPhone 14",
        image: "https://m.media-amazon.com/images/I/61cwywLZR-L._AC_SL1500_.jpg",
        price: 12000,
        stock: 5,
      },
    ];

    await ProductModel.insertMany(products);
    console.log("Products seeded successfully");
  } catch (err) {
    console.error("Error can t see database:", err);
  }
};

