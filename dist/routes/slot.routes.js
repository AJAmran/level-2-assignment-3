"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const slot_controller_1 = require("../controllers/slot.controller");
const router = express_1.default.Router();
router.route("/").post(authMiddleware_1.protect, authMiddleware_1.admin, slot_controller_1.createSlots);
router.route("/availability").get(authMiddleware_1.protect, slot_controller_1.getAvailableSlots);
exports.default = router;
