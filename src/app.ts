import express, { Request, Response } from "express";
import authRoutes from "./routes/auth.routes";
import roomRoutes from "./routes/room.routes";

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send(`
    <h1>Welcome to Meeting Room Booking System </h1>
    <p>This is a professional and informative landing page. Feel free to explore our features and get started.</p>
    <ul>
      <li><strong>Feature 1:</strong> [Brief description of feature 1]</li>
      <li><strong>Feature 2:</strong> [Brief description of feature 2]</li>
      <li><strong>Feature 3:</strong> [Brief description of feature 3]</li>
    </ul>
    <a href="/api/auth/login">Login</a> | <a href="/api/auth/register">Register</a>
  `);
});

// Global Error Handler
app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    res.status(500).json({
      success: false,
      message: err.message || "Server Error",
    });
  }
);

export default app;
