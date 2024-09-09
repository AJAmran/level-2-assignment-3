"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const room_controller_1 = require("../controllers/room.controller");
const router = express_1.default.Router();
router.route("/").post(authMiddleware_1.protect, authMiddleware_1.admin, room_controller_1.createRoom).get(room_controller_1.getAllRooms);
router
    .route("/:id")
    .get(authMiddleware_1.protect, room_controller_1.getSingleRoom)
    .put(authMiddleware_1.protect, authMiddleware_1.admin, room_controller_1.updateRoom)
    .delete(authMiddleware_1.protect, authMiddleware_1.admin, room_controller_1.deleteRoom);
exports.default = router;
