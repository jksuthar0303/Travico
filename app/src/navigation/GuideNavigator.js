import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Notifications from "../screens/Notifications";
import Settings from "../screens/Settings";
import PersonalInfo from "../screens/PersonalInfo";
import ChangePassword from "../screens/ChangePassword";
import PrivacyPolicy from "../screens/PrivacyPolicy";
import TermsOfService from "../screens/TermsOfService";
import Contact from "../screens/Contact";
import GuideHomeScreen from "../screens/GuideHome";
import AppNavigator from "./AppNavigator";
import GuideLiveTripScreen from "../screens/GuideLiveTrip";
import GuideTripDetailScreen from "../screens/GuideTripDetail";
import Earnings from "../screens/Earnings";
import Reviews from "../screens/Reviews";

const Stack = createNativeStackNavigator();

export default function GuideNavigator() {
  return (
    <Stack.Navigator>
        <Stack.Screen
                name="Tabs"
                component={AppNavigator}
                options={{ headerShown: false }}
            />

      <Stack.Screen
        name="GuideHome"
        component={GuideHomeScreen}
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
      <Stack.Screen name="Terms" component={TermsOfService} options={{ title: "Terms of Service" }} />
      <Stack.Screen name="LiveTrip" component={GuideLiveTripScreen} options={{ title: "Live Trip" }} />
      <Stack.Screen name="TripDetail" component={GuideTripDetailScreen} options={{ title: "Trip Details" }} />
      <Stack.Screen name="Earnings" component={Earnings} options={{ title: "Earnings & Payments" }} />
      <Stack.Screen name="Reviews" component={Reviews} options={{ title: "Reviews" }} />



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
