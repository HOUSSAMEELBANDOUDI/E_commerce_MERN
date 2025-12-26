import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel";

interface JwtPayload {
  email: string;
}

export interface AuthRequest extends Request {
  user?: any;
}

const jwtMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).send("Header wasn't provided");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).send("Bearer token wasn't provided");
  }

  jwt.verify(
    token,
    "your_super_secret_key_here",
    async (err, payload) => {
      if (err) {
        return res.status(403).send("Invalid token");
      }

      const userPayload = payload as JwtPayload;

      if (!userPayload || !userPayload.email) {
        return res.status(403).send("Token payload is invalid");
      }

      const user = await UserModel.findOne({ email: userPayload.email });

      if (!user) {
        return res.status(403).send("User not found");
      }

      req.user = user;
      next();
    }
  );
};

export default jwtMiddleware;
