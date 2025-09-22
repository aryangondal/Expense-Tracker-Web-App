import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { expensesRouter } from "./routes/expenses.js";
import { categoriesRouter } from "./routes/categories.js";
import { statsRouter } from "./routes/stats.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/expense_tracker";

// Health check
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// Routers
app.use("/api/expenses", expensesRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/stats", statsRouter);

// Error handling
app.use(errorHandler);

app.listen(PORT, async () => {
  await connectDB(MONGODB_URI);
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});
