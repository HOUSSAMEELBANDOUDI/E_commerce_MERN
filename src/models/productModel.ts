import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  image: string;
  price: number;
  stock: number;
}

const productSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true, // URL للصورة
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      default: 0, // لو ما دخلتش ستوك يبقى 0
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model<IProduct>("Product", productSchema);

export default ProductModel;
