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
        image: "https://images-cdn.ubuy.co.in/635188ad8d2e224aff12d5c3-dell-inspiron-15-5570-15-6-laptop.jpg",
        price: 150,
        stock: 10,
      },
      {
        title: "Laptop Hp",
        image: "https://recommerceit.co.uk/cdn/shop/files/4-2_021aacd0-30e8-4648-b69b-ceb4bc770c43.jpg?v=1741019123&width=1214",
        price: 250,
        stock: 10,
      },
       {
        title: "Laptop acer",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjN89GqDWtX9p1RoRk-B32oydT-w-HnCkiVg&s",
        price: 320,
        stock: 10,
      },
    ];

    await ProductModel.insertMany(products);
    console.log("Products seeded successfully");
  } catch (err) {
    console.error("Error can t see database:", err);
  }
};

