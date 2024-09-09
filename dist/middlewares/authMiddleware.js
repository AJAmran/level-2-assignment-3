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
exports.admin = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const dotenv_1 = require("../config/dotenv");
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token)
        return res
            .status(401)
            .json({ success: false, message: "No token provided" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, dotenv_1.JWT_SECRET || "");
        const user = yield user_model_1.default.findById(decoded.id);
        if (!user) {
            return res
                .status(401)
                .json({ success: false, message: "User not found" });
        }
        req.user = user; // This should be correct with updated type
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            statusCode: 401,
            message: "You have no access to this route",
        });
    }
});
exports.protect = protect;
const admin = (req, res, next) => {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== "admin") {
        return res
            .status(403)
            .json({ success: false, message: "Admin access only" });
    }
    next();
};
exports.admin = admin;
