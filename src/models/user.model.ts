import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export type UserType = {
  _id: mongoose.Types.ObjectId; // Add this line
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: "user" | "admin";
  comparePassword: (password: string) => Promise<boolean>;
  getSignedJwtToken: () => string;
};

const userSchema = new mongoose.Schema<UserType>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET || "", {
    expiresIn: "30d",
  });
};

const User = mongoose.model("User", userSchema);
export default User;
