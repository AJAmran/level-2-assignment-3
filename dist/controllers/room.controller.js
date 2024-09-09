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
exports.deleteRoom = exports.updateRoom = exports.getSingleRoom = exports.getAllRooms = exports.createRoom = void 0;
const room_model_1 = __importDefault(require("../models/room.model"));
const responseHandler_1 = require("../utils/responseHandler");
//create room (Admin only)
const createRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, roomNo, floorNo, capacity, pricePerSlot, amenities } = req.body;
    try {
        const room = yield room_model_1.default.create({
            name,
            roomNo,
            floorNo,
            capacity,
            pricePerSlot,
            amenities,
        });
        return (0, responseHandler_1.successResponse)(res, "Room added successfully", room, 201);
    }
    catch (error) {
        return (0, responseHandler_1.errorResponse)(res, error.message);
    }
});
exports.createRoom = createRoom;
//get All Rooms
const getAllRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rooms = yield room_model_1.default.find({ isDeleted: false });
        if (rooms.length === 0) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "No Data Found",
                data: [],
            });
        }
        return (0, responseHandler_1.successResponse)(res, "Rooms retrieved successfully", rooms);
    }
    catch (error) {
        return (0, responseHandler_1.errorResponse)(res, error.message);
    }
});
exports.getAllRooms = getAllRooms;
//get single room
const getSingleRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const room = yield room_model_1.default.findById(req.params.id);
        if (!room)
            return res
                .status(404)
                .json({ success: false, message: "Room not found" });
        return (0, responseHandler_1.successResponse)(res, "Room retrieved successfully", room);
    }
    catch (error) {
        return (0, responseHandler_1.errorResponse)(res, error.message);
    }
});
exports.getSingleRoom = getSingleRoom;
// update room (admin only)
const updateRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const room = yield room_model_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!room)
            return res
                .status(404)
                .json({ success: false, message: "Room not found" });
        return (0, responseHandler_1.successResponse)(res, "Room updated successfully", room);
    }
    catch (error) {
        return (0, responseHandler_1.errorResponse)(res, error.message);
    }
});
exports.updateRoom = updateRoom;
//delete room (soft delete, admin only)
const deleteRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const room = yield room_model_1.default.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
        if (!room)
            return res
                .status(404)
                .json({ success: false, message: "Room not found" });
        return (0, responseHandler_1.successResponse)(res, "Room deleted successfully", room);
    }
    catch (error) {
        return (0, responseHandler_1.errorResponse)(res, error.message);
    }
});
exports.deleteRoom = deleteRoom;
