import { Schema, model } from 'mongoose';

type User = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: 'user' | 'admin';
};

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, required: true, enum: ['user', 'admin'] }
});

export default model<User>('User', userSchema);
