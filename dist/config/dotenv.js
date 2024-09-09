"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.MONGODB_URI = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (!process.env.PORT || !process.env.DB_URL || !process.env.JWT_SECRET) {
    console.error('Please provide PORT, MONGODB_URI, and JWT_SECRET in the .env file');
    process.exit(1);
}
exports.PORT = process.env.PORT;
exports.MONGODB_URI = process.env.MONGODB_URI;
exports.JWT_SECRET = process.env.JWT_SECRET;
