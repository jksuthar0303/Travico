import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from "../../store/useAuthStore";
import AppNavigator from "./AppNavigator";
import DriverHomeScreen from "../screens/DriverHome";
import Notifications from "../screens/Notifications";
import PersonalInfo from "../screens/PersonalInfo";
import ChangePassword from "../screens/ChangePassword";
import PrivacyPolicy from "../screens/PrivacyPolicy";
import TermsOfService from "../screens/TermsOfService";
import Earnings from "../screens/Earnings";
import Reviews from "../screens/Reviews";
import Settings from "../screens/Settings";
import DriverRideDetailScreen from "../screens/RideDetailScreen";
import DriverLiveRideScreen from "../screens/LiveRide";

const Stack = createNativeStackNavigator();


export default function DriverNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={AppNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Home"
        component={DriverHomeScreen}
      />
       <Stack.Screen
        name="Settings"
        component={Settings}
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
      <Stack.Screen name="LiveRide" component={DriverLiveRideScreen} options={{ title: "Live Ride" }} />
      <Stack.Screen name="Terms" component={TermsOfService} options={{ title: "Terms of Service" }} />
      <Stack.Screen name="Earnings" component={Earnings} options={{ title: "Earnings & Payments" }} />
      <Stack.Screen name="RideDetail" component={DriverRideDetailScreen} options={{ title: "Ride Details" }} />
      <Stack.Screen name="Reviews" component={Reviews} options={{ title: "Reviews" }} />
    </Stack.Navigator>
  );
}

