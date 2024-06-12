import mongoose, { Model, Schema } from 'mongoose';

type UserRole = 'user' | 'admin';

type User = {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: UserRole;
    address: string;
};

const UserSchema = new Schema<User>({
    name: String,
    email: { type: String, unique: true },
    password: String,
    phone: String,
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    address: String
});

const UserModel: Model<User> = mongoose.model('User', UserSchema);
export default UserModel;
