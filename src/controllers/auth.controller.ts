import { Request, Response } from "express";
import { loginSchema, signupSchema } from "../utils/validators";
import User from "../models/user.model";

// Register User
export const registerUser = async (req: Request, res: Response) => {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.errors });

  const { name, email, password, phone, address, role } = req.body;

  try {
    const user = await User.create({
      name,
      email,
      password,
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
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Login User
export const loginUser = async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: parsed.error.errors });

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = user.getSignedJwtToken();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User logged in successfully",
      token: token,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        address: user.address,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
