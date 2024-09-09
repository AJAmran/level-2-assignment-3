"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const room_routes_1 = __importDefault(require("./routes/room.routes"));
const slot_routes_1 = __importDefault(require("./routes/slot.routes"));
const booking_routes_1 = __importDefault(require("./routes/booking.routes"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const notFound_1 = require("./middlewares/notFound");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/auth", auth_routes_1.default);
app.use("/api/rooms", room_routes_1.default);
app.use("/api/slots", slot_routes_1.default);
app.use("/api", booking_routes_1.default);
app.get("/", (req, res) => {
    res.send(`
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 20px;
        color: #333;
        text-align: center;
      }
      h1 {
        color: #007bff;
      }
      p {
        font-size: 18px;
        margin-bottom: 20px;
      }
      ul {
        list-style-type: none;
        padding: 0;
      }
      li {
        background: #007bff;
        color: white;
        padding: 10px;
        margin: 5px 0;
        border-radius: 5px;
      }
      a {
        display: inline-block;
        margin: 10px;
        padding: 10px 20px;
        background-color: #28a745;
        color: white;
        text-decoration: none;
        border-radius: 5px;
      }
      a:hover {
        background-color: #218838;
      }
    </style>

    <h1>Welcome to Meeting Room Booking System</h1>
    <p>Book your meeting rooms with ease and manage your reservations efficiently.</p>
    <ul>
      <li><strong>Easy Room Booking:</strong> Find and reserve meeting rooms based on your preferences.</li>
      <li><strong>Flexible Time Slots:</strong> Choose from a variety of available time slots that suit your schedule.</li>
      <li><strong>Admin Features:</strong> Manage rooms, create slots, and oversee bookings as an admin.</li>
    </ul>
    <a href="/api/auth/login">Login</a>
    <a href="/api/auth/register">Register</a>
  `);
});
// Error Handler
app.use(notFound_1.notFoundHandler);
// Global Error Handler
app.use(errorHandler_1.default);
exports.default = app;
