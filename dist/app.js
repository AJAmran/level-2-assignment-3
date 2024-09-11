"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const room_routes_1 = __importDefault(require("./routes/room.routes"));
const slot_routes_1 = __importDefault(require("./routes/slot.routes"));
const booking_routes_1 = __importDefault(require("./routes/booking.routes"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const notFound_1 = require("./middlewares/notFound");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, express_mongo_sanitize_1.default)());
app.use(express_1.default.json());
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
}));
app.use;
//Routes
app.use("/api/auth", auth_routes_1.default);
app.use("/api/rooms", room_routes_1.default);
app.use("/api/slots", slot_routes_1.default);
app.use("/api", booking_routes_1.default);
app.get("/", (req, res) => {
    res.send(`
    <h1>Welcome to Meeting Room Booking System</h1>
    <p>Book your meeting rooms with ease and manage your reservations efficiently.</p>
  `);
});
// 404 Handler
app.use(notFound_1.notFoundHandler);
// Global Error Handler
app.use(errorHandler_1.default);
exports.default = app;
