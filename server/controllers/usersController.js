import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { compressToWebp, ensureDir } from "../utils/fileHelper.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields (name, email, password) are required",
            });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User with this email already exists",
            });
        }

        const user = await User.create({ name, email, password });

        const userResponse = user.toObject();
        delete userResponse.password;

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                user: userResponse,
                token,
            },
        });
    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while registering user",
            error: error.message,
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found with this email",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );

        const userResponse = user.toObject();
        delete userResponse.password;

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: { user: userResponse, token },
        });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while logging in",
            error: error.message,
        });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // 📸 If a new profile image is uploaded
        if (req.file) {
            const usersDir = path.join(process.cwd(), "uploads", "users");
            ensureDir(usersDir);

            // 🧹 Delete old image if it exists
            if (user.profilePic) {
                const oldPath = path.join(process.cwd(), user.profilePic);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }

            // 🧩 Create image name using user's name
            const safeName = user.name.replace(/\s+/g, "_");
            const webpFilename = `profilePic_${safeName}.webp`;
            const outputPath = path.join(usersDir, webpFilename);

            // 🗜️ Compress and save as WebP
            await compressToWebp(req.file.path, outputPath);

            // 💾 Save path in DB (relative path for API)
            user.profilePic = `/uploads/users/${webpFilename}`;
        }

        await user.save();

        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(200).json({
            success: true,
            message: "Profile picture updated successfully",
            data: { user: userResponse },
        });
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while updating profile picture",
            error: error.message,
        });
    }
};

export const storeFcmToken = async (req, res) => {
    try {
        const { userId, fcmToken } = req.body;
        if (!userId || !fcmToken)
            return res.status(400).json({ success: false, message: "Missing userId or token" });

        await User.findByIdAndUpdate(userId, { fcmToken });
        return res.json({ success: true, message: "FCM token stored successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}