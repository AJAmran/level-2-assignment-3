import express, { Request, Response } from "express";
import authRoutes from "./routes/auth.routes";
import roomRoutes from "./routes/room.routes";
import slotRoutes from "./routes/slot.routes";
import bookingRoutes from "./routes/booking.routes";
import errorHandler from "./middlewares/errorHandler";
import { notFoundHandler } from "./middlewares/notFound";

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api", bookingRoutes);

app.get("/", (req: Request, res: Response) => {
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
    <a href="/api/auth/signup">Register</a>
  `);
});

// Error Handler
app.use(notFoundHandler);

// Global Error Handler
app.use(errorHandler);

export default app;
