import "./config/env.js";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import notesRoutes from "./routes/notesRoutes.js";

const app = express();

// ── Middleware ───────────────────────────────────────────
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // your React dev server
}));

// ── Routes ───────────────────────────────────────────────
app.use("/api/users", userRoutes);
app.use("/api/notes", notesRoutes);   // 👈 fixed from /api/n

// ── 404 Handler ──────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// ── Start only after DB connects ─────────────────────────
const port = process.env.PORT || 8000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
