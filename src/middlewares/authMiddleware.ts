import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { JWT_SECRET } from "../config/dotenv";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET || "") as any;
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Not authorized" });
  }
};

export const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "Admin access only" });
  }
  next();
};
