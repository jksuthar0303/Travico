import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Bell, Settings } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../assets/logo.png";

// Screens
import Notifications from "../screens/Notifications";
import SettingsComponent from "../screens/Settings";
import PersonalInfo from "../screens/PersonalInfo";
import ChangePassword from "../screens/ChangePassword";
import PrivacyPolicy from "../screens/PrivacyPolicy";
import TermsOfService from "../screens/TermsOfService";
import Contact from "../screens/Contact";
import GuideHomeScreen from "../screens/GuideHome";

const Stack = createNativeStackNavigator();

/** ✅ Header left */
function GuideHeaderLeft() {
  return (
    <View className="flex-row gap-2 items-center">
      <View className="bg-blue-500 rounded-full p-2 ml-2">
        <Image source={Logo} className="h-10 w-10" resizeMode="cover" />
      </View>
      <Text className="text-xl font-extrabold text-blue-500">Tarvico</Text>
    </View>
  );
}

/** ✅ Header right (safe place to use navigation) */
function GuideHeaderRight() {
  const navigation = useNavigation();
  return (
    <View className="flex-row gap-2 mr-4 items-center">
      <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
        <Bell size={22} color="#6B7280" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <Settings size={22} color="#6B7280" />
      </TouchableOpacity>
    </View>
  );
}

export default function GuideNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GuideHome"
        component={GuideHomeScreen}
        options={{
          headerTitle: () => null,
          headerLeft: () => <GuideHeaderLeft />,
          headerRight: () => <GuideHeaderRight />,
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsComponent}
        options={{
          headerTitle: () => (
            <View>
              <Text className="text-xl font-bold">Settings</Text>
              <Text className="text-sm text-gray-400">Manage your account</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen name="Notifications" component={Notifications} options={{ headerTitle: "Notifications" }} />
      <Stack.Screen name="Personal-Info" component={PersonalInfo} options={{ title: "Personal Information" }} />
      <Stack.Screen name="Change-Password" component={ChangePassword} options={{ title: "Change Password" }} />
      <Stack.Screen name="Privacy-Policy" component={PrivacyPolicy} options={{ title: "Privacy Policy" }} />
      <Stack.Screen name="Terms" component={TermsOfService} options={{ title: "Terms of Service" }} />
      <Stack.Screen
        name="Contact"
        component={Contact}
        options={{
          headerTitle: () => (
            <View>
              <Text className="text-xl font-bold">Contact Us</Text>
              <Text className="text-sm text-gray-400">We're here to help you travel better</Text>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
