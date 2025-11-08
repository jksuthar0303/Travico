import express from "express";
import { send } from "../controllers/notificationController.js";

const router = express.Router();

router.post("/send",send)

export default router