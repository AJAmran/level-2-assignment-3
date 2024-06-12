import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../models/user.model";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET!;

export const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, address, role } = req.body;
    if (!name || !email || !password || !phone || !address || !role) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      role,
    });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User registered successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        address: user.address,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const logIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, {
      expiresIn: "1h",
    });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User logged in successfully",
      token: `Bearer ${token}`,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        address: user.address,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
