import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuthStore } from "../../store/useAuthStore";
import AuthNavigator from "./AuthNavigator";
import SplashScreen from "../screens/SplashScreen";
import UserNavigator from "./UserNavigator";
import { requestUserPermission, createNotificationChannel, getFcmTokenAndSave } from "../notifications/fcm";
import GuideNavigator from "./GuideNavigator";
import DriverNavigator from "./DriverNavigator";

export default function RootNavigator() {
  const { user, role, checkLogin } = useAuthStore();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    checkLogin();
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (user) {
      console.log("🔔 User logged in — preparing notifications...");
      (async () => {
        await requestUserPermission();
        await createNotificationChannel();
        await getFcmTokenAndSave();
      })();
    }
  }, [user]);

  if (showSplash) return <SplashScreen />;

  return (
    <NavigationContainer>
      {!user && <AuthNavigator />}
      {user && role === "guide" && <GuideNavigator />}
      {user && role === "driver" && <DriverNavigator />}
      {user && role === "user" && <UserNavigator />}
    </NavigationContainer>
  );
}
