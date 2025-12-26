import mongoose, { Schema, Document, Types } from "mongoose";
import { IProduct } from "./productModel";

export enum CartStatus {
  ACTIVE = "active",
  COMPLETED = "completed",
}

export interface ICartItem  {
  product: Types.ObjectId | IProduct;  // المنتج نفسه أو مرجع له
  unitPrice: number;           // سعر الوحدة (قد يختلف عن سعر المنتج الأصلي)
  quantity: number;            // الكمية المطلوبة
}

export interface ICart extends Document{
  user: Types.ObjectId | string;
  items: ICartItem[];
  total: number;
  status: CartStatus;
}

const CartItemSchema = new Schema<ICartItem>({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const CartSchema = new Schema<ICart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: {
      type: [CartItemSchema],
      default: [],
    },
    total: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: Object.values(CartStatus),
      default: CartStatus.ACTIVE,
    },
  },
  {
    timestamps: true,
  }
);

/* =========================
   Export Cart Model
========================= */
const CartModel = mongoose.model<ICart>("Cart", CartSchema);

export default CartModel;
