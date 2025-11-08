import express from "express";
import  { uploadUserProfile } from "../middlewares/uploadMiddleware.js";
import {
    loginUser,
  registerUser,
  storeFcmToken,
  updateUserProfile,
} from "../controllers/usersController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/fcm-token", storeFcmToken);

router.put("/profile/:id", uploadUserProfile, updateUserProfile);

export default router;
