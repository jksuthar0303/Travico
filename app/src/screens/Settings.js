import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import SwitchToggle from "react-native-switch-toggle";
import { useAuthStore } from "../../store/useAuthStore";

import {
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  Moon,
  Bell,
  Lock,
  HelpCircle,
  LogOut,
  Shield,
  ChevronRight,
  NotepadText,
} from "lucide-react-native";
import { CustomConfirmAlert } from "../components/Alert";

export default function Settings({ navigation }) {
  const { logout } = useAuthStore();

  const [trip, setTrip] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [promotions, setPromotions] = useState(false);
  const [reminders, setReminders] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);

  const handleLogout = () => {
    CustomConfirmAlert({
      title: "Logout",
      message: "Are you sure you want to log out?",
      confirmText: "Logout",
      cancelText: "Cancel",
      onConfirm: async () => {
        await logout();
        console.log("✅ Logged out successfully!");
      },
    });
  };

  return (
    <ScrollView className="p-4 bg-white flex-1">
      {/* Account Section */}
      <Section title="Account">
        <SettingItem
          icon={<User size={20} color="#4a9eff" />}
          title="Personal Information"
          subtitle="Name, email, phone"
          onPress={() => navigation.navigate("Personal-Info")}
          showArrow
        />
        <SettingItem
          icon={<Mail size={20} color="#4a9eff" />}
          title="Email Address"
          subtitle="jhondoe@gmail.com"
        />
        <SettingItem
          icon={<Phone size={20} color="orange" />}
          title="Phone Number"
          subtitle="+91 999990000"
        />
      </Section>

      {/* Preferences Section */}
      <Section title="Preferences">
        <SettingItem
          icon={<Globe size={20} color="#4a9eff" />}
          title="Language"
          subtitle="English (US)"
        />
        <SettingItem
          icon={<MapPin size={20} color="#a8d5ba" />}
          title="Currency"
          subtitle="USD ($)"
        />
        <ToggleItem
          icon={<Moon size={20} color="orange" />}
          title="Dark Mode"
          value={darkMode}
          onToggle={() => setDarkMode(!darkMode)}
        />
      </Section>

      {/* Notifications Section */}
      <Section title="Notifications" icon={<Bell size={20} color="#4a9eff" />}>
        <ToggleItem
          title="Trip Updates"
          subtitle="Get notified about your trips"
          value={trip}
          onToggle={() => setTrip(!trip)}
        />
        <ToggleItem
          title="Promotions"
          subtitle="Special offers and deals"
          value={promotions}
          onToggle={() => setPromotions(!promotions)}
        />
        <ToggleItem
          title="Reminders"
          subtitle="Trip reminders and alerts"
          value={reminders}
          onToggle={() => setReminders(!reminders)}
        />
      </Section>

      {/* Security Section */}
      <Section title="Security" icon={<Lock size={20} color="#4a9eff" />}>
        <SettingItem
          icon={<Shield size={20} color="#4a9eff" />}
          title="Change Password"
          subtitle="Update your password"
          onPress={()=> navigation.navigate("Change-Password")}
          showArrow
        />
        <ToggleItem
          title="Two-Factor Authentication"
          subtitle="Extra security for your account"
          value={twoFactor}
          onToggle={() => setTwoFactor(!twoFactor)}
        />
      </Section>

      {/* Support Section */}
      <Section title="Support">
        <SettingItem
          icon={<HelpCircle size={20} color="green" />}
          title="Help Center"
          showArrow
        />
        <SettingItem
          icon={<Mail size={20} color="orange" />}
          title="Contact Support"
          onPress={() => navigation.navigate("Contact")}
          showArrow
        />
      </Section>

      <Section title="Legal">
        <SettingItem
          icon={<Shield size={20} color="#4a9eff" />}
          title="Privacy Policy"
          onPress={()=>navigation.navigate("Privacy-Policy")}
          showArrow
        />
        <SettingItem
          icon={<NotepadText size={20} color="green" />}
          title="Terms of Service"
          onPress={()=>navigation.navigate("Terms")}
          showArrow
        />
        <Text className="text-center font-bold text-gray-500">Travico Version 1.0.0</Text>
      </Section>

      {/* Logout */}
      <TouchableOpacity
        onPress={handleLogout}
        className="bg-red-500 h-16 mb-10 rounded-3xl items-center justify-center"
      >
        <View className="flex-row items-center gap-2">
          <LogOut size={24} color="white" />
          <Text className="text-white text-lg font-bold">Logout</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

// 🔹 Reusable Section Wrapper
const Section = ({ title, icon, children }) => (
  <View
    className="border border-gray-300 mb-6 bg-white rounded-3xl p-4 items-start"
    style={styles.shadow}
  >
    <View className="flex-row items-center gap-2 mb-2">
      {icon}
      <Text className="text-lg font-semibold">{title}</Text>
    </View>
    <View className="w-full gap-3">{children}</View>
  </View>
);

const SettingItem = ({ icon, title, subtitle, onPress, showArrow = false }) => {
  const Content = () => (
    <View className="w-full flex-row items-center justify-between border-b border-gray-300 pb-3 mb-2">
      <View className="flex-row items-center gap-3 flex-1">
        <View className="w-10 h-10 rounded-full items-center justify-center bg-primary/10">
          {icon}
        </View>
        <View>
          <Text className="font-medium">{title}</Text>
          {subtitle && <Text className="text-sm text-gray-500">{subtitle}</Text>}
        </View>
      </View>
      {showArrow && <ChevronRight size={18} color="black" />}
    </View>
  );

  if (showArrow) {
    return (
      <Pressable onPress={onPress} android_ripple={{ color: "#e5e7eb" }}>
        <Content />
      </Pressable>
    );
  }

  return <Content />;
};


// 🔹 Toggle Item
const ToggleItem = ({ icon, title, subtitle, value, onToggle }) => (
  <View className="w-full bg-gray-200 rounded-3xl flex-row items-center justify-between p-4">
    <View className="flex-row items-center gap-2 flex-1">
      {icon && <View>{icon}</View>}
      <View>
        <Text>{title}</Text>
        {subtitle && <Text className="text-gray-500 text-sm">{subtitle}</Text>}
      </View>
    </View>
    <SwitchToggle
      switchOn={value}
      onPress={onToggle}
      circleColorOff="white"
      circleColorOn="white"
      backgroundColorOn="#007aff"
      backgroundColorOff="#d1d5db"
      containerStyle={{
        width: 45,
        height: 25,
        borderRadius: 25,
        padding: 5,
      }}
      circleStyle={{
        width: 20,
        height: 20,
        borderRadius: 10,
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  shadow: {
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
