import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import http from "http";
import connectDB from "./config/db.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import notificationRoutes from "./routes/notificationRoutes.js"
import userRoutes from "./routes/userRoutes.js";
import placeRoutes from "./routes/placeRoutes.js";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);


// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));


// --- Routes ---
app.use("/api/users", userRoutes);
app.use("/api/places", placeRoutes);
app.use("/api/notification",notificationRoutes)



app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

server.listen(PORT, () => console.log(`🚀 Server running at: ${BASE_URL}`));
