// models/orderModel.ts
import mongoose, { Schema, model, Document } from "mongoose";

export interface IOrderItem {
  productTitle: string;
  productImage: string;
  unitPrice: number;
  quantity: number;
}

export interface IOrder {
  orderItems: IOrderItem[];
  total: number;
  address: string;
  user: mongoose.Types.ObjectId;
}

const orderItemSchema = new Schema<IOrderItem>({
  productTitle: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new Schema<IOrder>({
  orderItems: [orderItemSchema],
  total: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const OrderModel = mongoose.model<IOrder>("Order", orderSchema);
