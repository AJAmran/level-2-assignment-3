"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const validators_1 = require("../utils/validators");
const user_model_1 = __importDefault(require("../models/user.model"));
const responseHandler_1 = require("../utils/responseHandler");
// Register User
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsed = validators_1.signupSchema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json({ error: parsed.error.errors });
    const { name, email, password, phone, address, role } = req.body;
    try {
        const userExists = yield user_model_1.default.findOne({ email });
        if (userExists) {
            return (0, responseHandler_1.errorResponse)(res, "User already exists", [], 400);
        }
        const user = yield user_model_1.default.create({
            name,
            email,
            password,
            phone,
            address,
            role,
        });
        return (0, responseHandler_1.successResponse)(res, "User registered successfully", {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            address: user.address,
        }, 201);
    }
    catch (error) {
        return (0, responseHandler_1.errorResponse)(res, error.message);
    }
});
exports.registerUser = registerUser;
// Login User
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsed = validators_1.loginSchema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json({ error: parsed.error.errors });
    const { email, password } = req.body;
    try {
        const user = yield user_model_1.default.findOne({ email });
        if (!user || !(yield user.comparePassword(password))) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid credentials" });
        }
        const token = user.getSignedJwtToken();
        return (0, responseHandler_1.successResponse)(res, "User logged in successfully", {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            address: user.address,
            token,
        }, 200);
    }
    catch (error) {
        return (0, responseHandler_1.errorResponse)(res, error.message);
    }
});
exports.loginUser = loginUser;
