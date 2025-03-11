import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import db from "./db/db";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { authenticateJWT } from "./middlewares/authMiddleware";
import userRouter from './routes/user.routes'
import authRouter from './routes/auth.routes'
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests only from this origin
  // methods: 'GET, POST, PUT, DELETE', // Allowed HTTP methods
  credentials: true, // Allows the server to send cookies (important for JWT token)
};

app.use(cors(corsOptions)); 
app.use(express.json()); 
app.use(cookieParser());


app.use('/api', authRouter)
app.use('/api/users', authenticateJWT, userRouter);

app.use(errorHandler)


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