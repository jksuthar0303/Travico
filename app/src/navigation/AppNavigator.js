import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/HomeScreen";
import Trip from "../screens/Trip";
import Sos from "../screens/Sos";
import Profile from "../screens/Profile";
import AnimatedTabBar from "../components/AnimatedTabBar";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Bell, Settings } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../assets/logo.png";
import { useAuthStore } from "../../store/useAuthStore";
import GuideHomeScreen from "../screens/GuideHome";
import Schedule from "../screens/Schedule";
import GuideProfile from "../screens/GuideProfile";
import GuideTrip from "../screens/GuideTrip";
import DriverHomeScreen from "../screens/DriverHome";
import DriverScheduleScreen from "../screens/DriverSchedule";
import DriverRidesScreen from "../screens/DriverRide";
import DriverProfileScreen from "../screens/DriverProfile";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const navigation = useNavigation();
  const { role } = useAuthStore();

  const roleScreens = {
    user: [
      { name: "Home", component: Home },
      { name: "Trip", component: Trip },
      { name: "SOS", component: Sos },
      { name: "Profile", component: Profile },
    ],
    driver: [
      { name: "Home", component: DriverHomeScreen },
      { name: "Schedule", component: DriverScheduleScreen },
      { name: "Trip", component: DriverRidesScreen },
      { name: "Profile", component: DriverProfileScreen }
    ],
    guide: [
      { name: "Home", component: GuideHomeScreen },
      { name: "Schedule", component: Schedule },
      { name: "Trip", component: GuideTrip },
      { name: "Profile", component: GuideProfile }

    ],
  };

  const screens = roleScreens[role] || roleScreens.user;

  return (
    <Tab.Navigator
      tabBar={(props) => <AnimatedTabBar {...props} />}
      screenOptions={({ route }) => ({
        headerShown: route.name === "Home" || route.name === "Profile",
      })}
    >
      {screens.map(({ name, component }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            headerShown: name === "Schedule" || name === "Home" || name === "Trip" || name === "Profile" ? true : false,
            headerTitle: () => {
              switch (name) {
                case "Trip":
                  return (
                    <Text className="text-xl font-extrabold text-primary">
                      {role === "driver" ? "My Rides" : "Your Trips"}
                    </Text>
                  );

                case "Schedule":
                  return (
                    <Text className="text-xl font-extrabold text-primary">
                      Schedule
                    </Text>
                  );
                case "Profile":
                  return (
                    <Text className="text-xl font-extrabold text-primary">
                      Profile
                    </Text>
                  );

                default:
                  return null;
              }
            },

            headerLeft: name === "Home"
              ? () => (
                <View className="flex-row gap-2 items-center">
                  <View className="bg-primary rounded-full p-2 ml-2">
                    <Image
                      source={Logo}
                      className="h-10 w-10"
                      resizeMode="cover"
                    />
                  </View>
                  <Text className="text-xl font-extrabold text-primary">
                    Tarvico
                  </Text>
                </View>
              )
              : undefined,

            headerRight: () => (
              <View className="flex-row gap-2 mr-4 items-center">
                <TouchableOpacity
                  onPress={() => navigation.navigate("Notifications")}
                >
                  <Bell size={22} color="#6B7280" />
                </TouchableOpacity>

                {["Home", "Profile"].includes(name) && (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Settings")}
                  >
                    <Settings size={22} color="#6B7280" />
                  </TouchableOpacity>
                )}
              </View>
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

