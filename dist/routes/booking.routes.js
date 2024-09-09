"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("../controllers/booking.controller");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
// Create a booking (authenticated user only)
router.post("/bookings", authMiddleware_1.protect, booking_controller_1.createBooking);
// Get all bookings (admin only)
router.get("/bookings", authMiddleware_1.protect, authMiddleware_1.admin, booking_controller_1.getAllBookings);
// Get the current user's bookings
router.get("/my-bookings", authMiddleware_1.protect, booking_controller_1.getUserBookings);
// Update a booking (admin only)
router.put("/bookings/:id", authMiddleware_1.protect, authMiddleware_1.admin, booking_controller_1.updateBooking);
// Delete a booking (soft delete - admin only)
router.delete("/bookings/:id", authMiddleware_1.protect, authMiddleware_1.admin, booking_controller_1.deleteBooking);
exports.default = router;
