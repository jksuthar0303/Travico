import admin from "../config/firebase.js";

export async function sendPushNotification(token, data = {}) {
  try {
    const message = {
      token,
      data,
    };

    const response = await admin.messaging().send(message);
    console.log("✅ Notification sent:", response);
    return { success: true, id: response };
  } catch (error) {
    console.error("❌ Error sending notification:", error);
    return { success: false, error };
  }
}
