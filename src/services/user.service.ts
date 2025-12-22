import UserModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface RegisterParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export const register = async ({ firstName, lastName, email, password }: RegisterParams) => {
  // اتأكد لو اليوزر موجود بالفعل
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return { statusCode: 400, data: "User already exists" };
  }

   const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // كرييت يوزر جديد
  const newUser = new UserModel({
    firstName,
    lastName,
    email,
    password : hashedPassword,// ممكن تعمل هنا تشفير بالـ bcrypt
  });

  // احفظه في الداتا بيز
  await newUser.save();

  return { statusCode: 200, data: generateToken({firstName, lastName, email}) };
};

export const login = async ({ email, password }: LoginParams) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    return { statusCode: 400, data: "Email or password is incorrect" };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { statusCode: 400, data: "Email or password is incorrect" };
  }

  return { statusCode: 200, data: generateToken({email, firstName: user.firstName, lastName: user.lastName}) };
};

const JWT_SECRET = "your_super_secret_key_here";
const generateToken = (data: any) => {
  return jwt.sign(data, JWT_SECRET); // التوكن صلاحيتها 24 ساعة
};