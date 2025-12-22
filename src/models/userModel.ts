import mongoose, { Schema, Document } from "mongoose";

/**
 * Interface
 * ده بيعرّف شكل اليوزر في TypeScript
 */
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

/**
 * Schema
 * ده الشكل الحقيقي اللي بيتخزن في MongoDB
 */
const UserSchema: Schema<IUser> = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Model
 * ده اللي هتستخدمه تعمل save / find / update
 */
const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
