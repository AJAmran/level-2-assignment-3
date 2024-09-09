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
exports.getAvailableSlots = exports.createSlots = void 0;
const slot_model_1 = __importDefault(require("../models/slot.model"));
const responseHandler_1 = require("../utils/responseHandler");
// Create Slots (Admin Only)
const createSlots = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { room, date, startTime, endTime } = req.body;
    try {
        // Slot duration in minutes
        const slotDuration = 60;
        const startMinutes = parseInt(startTime.split(":")[0]) * 60 +
            parseInt(startTime.split(":")[1]);
        const endMinutes = parseInt(endTime.split(":")[0]) * 60 + parseInt(endTime.split(":")[1]);
        const totalDuration = endMinutes - startMinutes;
        const numberOfSlots = totalDuration / slotDuration;
        const slots = [];
        for (let i = 0; i < numberOfSlots; i++) {
            const slotStart = new Date(date);
            slotStart.setMinutes(startMinutes + i * slotDuration);
            const slotEnd = new Date(slotStart);
            slotEnd.setMinutes(slotStart.getMinutes() + slotDuration);
            const slot = yield slot_model_1.default.create({
                room,
                date,
                startTime: slotStart.toLocaleTimeString("en-US", { hour12: false }),
                endTime: slotEnd.toLocaleTimeString("en-US", { hour12: false }),
                isBooked: false, // Ensure the new slots are unbooked
            });
            slots.push(slot);
        }
        return (0, responseHandler_1.successResponse)(res, "Slots created successfully", slots, 201);
    }
    catch (error) {
        return (0, responseHandler_1.errorResponse)(res, error.message);
    }
});
exports.createSlots = createSlots;
// Get Available Slots
const getAvailableSlots = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, roomId } = req.query;
    try {
        // Construct the query
        const query = { isBooked: false };
        if (date)
            query.date = date;
        if (roomId)
            query.room = roomId;
        const slots = yield slot_model_1.default.find(query).populate("room");
        if (slots.length === 0) {
            return (0, responseHandler_1.errorResponse)(res, "No Data Found", [], 404);
        }
        return (0, responseHandler_1.successResponse)(res, "Available slots retrieved successfully", slots);
    }
    catch (error) {
        return (0, responseHandler_1.errorResponse)(res, error.message);
    }
});
exports.getAvailableSlots = getAvailableSlots;
