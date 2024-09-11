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
exports.deleteBooking = exports.updateBooking = exports.getUserBookings = exports.getAllBookings = exports.createBooking = void 0;
const slot_model_1 = __importDefault(require("../models/slot.model"));
const room_model_1 = __importDefault(require("../models/room.model"));
const booking_model_1 = __importDefault(require("../models/booking.model"));
const responseHandler_1 = require("../utils/responseHandler");
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, slots, room, user } = req.body;
    try {
        // Fetch slots and room details in parallel
        const [selectedSlots, selectedRoom] = yield Promise.all([
            slot_model_1.default.find({
                _id: { $in: slots },
                isBooked: false,
            }),
            room_model_1.default.findById(room),
        ]);
        // Check if the room exists
        if (!selectedRoom) {
            return (0, responseHandler_1.errorResponse)(res, "Room not found", [], 404);
        }
        // Check if all selected slots are available
        if (selectedSlots.length !== slots.length) {
            return (0, responseHandler_1.errorResponse)(res, "Some slots are already booked", [], 400);
        }
        // Calculate the total amount
        const totalAmount = selectedSlots.length * selectedRoom.pricePerSlot;
        // Create a new booking
        const booking = yield booking_model_1.default.create({
            room,
            slots,
            user,
            date,
            totalAmount,
        });
        // Mark the slots as booked
        yield slot_model_1.default.updateMany({ _id: { $in: slots } }, { isBooked: true });
        // Populate the booking with detailed room, slots, and user info
        const populatedBooking = yield booking_model_1.default.findById(booking._id)
            .populate({
            path: "room",
            select: "name roomNo floorNo capacity pricePerSlot amenities isDeleted",
        })
            .populate({
            path: "slots",
            select: "room date startTime endTime isBooked",
        })
            .populate({
            path: "user",
            select: "name email phone address role",
        });
        if (!populatedBooking) {
            return (0, responseHandler_1.errorResponse)(res, "Booking not found", [], 404);
        }
        return (0, responseHandler_1.successResponse)(res, "Booking created successfully", populatedBooking, 201);
    }
    catch (error) {
        return (0, responseHandler_1.errorResponse)(res, error.message);
    }
});
exports.createBooking = createBooking;
// Get All Bookings (Only Accessible by Admin)
const getAllBookings = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield booking_model_1.default.find().populate("room user slots").exec();
        if (bookings.length === 0) {
            return (0, responseHandler_1.errorResponse)(res, "No Data Found", [], 404);
        }
        return (0, responseHandler_1.successResponse)(res, "All bookings retrieved successfully", bookings);
    }
    catch (error) {
        return (0, responseHandler_1.errorResponse)(res, error.message);
    }
});
exports.getAllBookings = getAllBookings;
// Get User's Bookings (Only Accessible by Authenticated User)
const getUserBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.user._id) {
        return (0, responseHandler_1.errorResponse)(res, "User not authenticated", [], 401);
    }
    try {
        const bookings = yield booking_model_1.default.find({ user: req.user._id })
            .populate("room slots")
            .exec();
        if (bookings.length === 0) {
            return (0, responseHandler_1.errorResponse)(res, "No Data Found", [], 404);
        }
        return (0, responseHandler_1.successResponse)(res, "User bookings retrieved successfully", bookings);
    }
    catch (error) {
        return (0, responseHandler_1.errorResponse)(res, error.message);
    }
});
exports.getUserBookings = getUserBookings;
// Update Booking (Only Accessible by Admin)
const updateBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { isConfirmed } = req.body;
    try {
        const booking = yield booking_model_1.default.findByIdAndUpdate(req.params.id, { isConfirmed }, { new: true });
        if (!booking) {
            return (0, responseHandler_1.errorResponse)(res, "Booking not found", [], 404);
        }
        return (0, responseHandler_1.successResponse)(res, "Booking updated successfully", booking);
    }
    catch (error) {
        return (0, responseHandler_1.errorResponse)(res, error.message);
    }
});
exports.updateBooking = updateBooking;
// Delete Booking (Soft Delete, Only Accessible by Admin)
const deleteBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const booking = yield booking_model_1.default.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
        if (!booking) {
            return (0, responseHandler_1.errorResponse)(res, "Booking not found", [], 404);
        }
        return (0, responseHandler_1.successResponse)(res, "Booking deleted successfully", booking);
    }
    catch (error) {
        return (0, responseHandler_1.errorResponse)(res, error.message);
    }
});
exports.deleteBooking = deleteBooking;
