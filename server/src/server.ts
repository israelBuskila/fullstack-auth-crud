import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import db from "./db/db";
import { migrate } from "drizzle-orm/mysql2/migrator";
import userRouter from "./routes/user.router";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;


app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api', userRouter);


async function startServer() {
  try {
    await migrate(db, { migrationsFolder: "drizzle" });
    console.log("✅ Migrations applied successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  }
}

startServer();