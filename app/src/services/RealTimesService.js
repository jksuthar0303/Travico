import io from "socket.io-client";
import axios from "axios";
import messaging from "@react-native-firebase/messaging";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

class RealtimeService {
  socket = null;
  userId = null;
  unsubscribeOnMessage = null;

  initSocket(userId) {
    if (!userId) return;

    // if socket already exists with same user → skip
    if (this.socket && this.userId === userId) return;

    // if exists but with diff user → disconnect
    if (this.socket) this.socket.disconnect();

    this.userId = userId;
    this.socket = io(BASE_URL, {
      transports: ["websocket"],
      reconnection: true,
    });

    this.socket.on("connect", () => {
      console.log("✅ Socket connected:", this.socket.id);
      this.socket.emit("register", { userId });
    });

    this.socket.on("notification", (notif) => {
      console.log("📩 Realtime notification:", notif);
      // 🔔 You can show Toast or store update here
    });

    this.socket.on("disconnect", (reason) => {
      console.log("⚠️ Socket disconnected:", reason);
    });
  }

  // ✅ Disconnect socket safely
  disconnectSocket() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.userId = null;
    }
  }

  // ✅ Register FCM Token to your server
  async registerFcmTokenToServer(userId) {
    try {
      if (!userId) return null;

      // Ask for permission
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (!enabled) {
        console.log("🚫 Push notification permission denied");
        return null;
      }

      // Get token
      const token = await messaging().getToken();
      console.log("🔑 FCM Token:", token);

      // Send to backend API
      await axios.post(`${BASE_URL}/api/notifications/register-token`, {
        userId,
        fcmToken: token,
      });

      return token;
    } catch (err) {
      console.error("🔥 registerFcmTokenToServer error:", err.message);
      return null;
    }
  }

  // ✅ Setup handlers (run once in App.js)
  setupMessageHandlers(onMessageCallback) {
    // Foreground messages
    this.unsubscribeOnMessage = messaging().onMessage(async (remoteMessage) => {
      console.log("📱 Foreground FCM message:", remoteMessage);
      if (onMessageCallback) onMessageCallback(remoteMessage);
    });

    // Background message handler
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("🌙 Background FCM message:", remoteMessage);
    });

    // App opened from background
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log("🚀 Opened from background:", remoteMessage);
      if (onMessageCallback) onMessageCallback(remoteMessage);
    });

    // App opened from quit state
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log("🕹️ Opened from quit:", remoteMessage);
          if (onMessageCallback) onMessageCallback(remoteMessage);
        }
      });
  }

  // ✅ Cleanup
  cleanupHandlers() {
    if (this.unsubscribeOnMessage) {
      this.unsubscribeOnMessage();
      this.unsubscribeOnMessage = null;
    }
  }
}

export default new RealtimeService();
