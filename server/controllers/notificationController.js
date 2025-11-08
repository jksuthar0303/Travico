import { sendPushNotification } from "../utils/sendNotification.js";

export const send = async (req, res) => {
    try {
        const { token, data } = req.body;

        if (!token) return res.status(400).json({ success: false, message: "Missing FCM token" });

        const result = await sendPushNotification(token, data);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}