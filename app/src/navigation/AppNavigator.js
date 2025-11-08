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

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      tabBar={(props) => <AnimatedTabBar {...props} />}
      screenOptions={({ route }) => ({
        headerShown: route.name === "Home" || route.name === "Profile",
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: () => null,
          headerLeft: () => (
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
          ),
          headerRight: () => (
            <View className="flex-row gap-2 mr-4 items-center">
              <TouchableOpacity
                onPress={() => navigation.navigate("Notifications")}
              >
                <Bell size={22} color="#6B7280" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("Settings")}
              >
                <Settings size={22} color="#6B7280" /> 
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <Tab.Screen name="Trip" component={Trip} />
      <Tab.Screen name="SOS" component={Sos} />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerRight: () => (
            <View className="flex-row gap-2 mr-4 items-center">
              <TouchableOpacity
                onPress={() => navigation.navigate("Notifications")}
              >
                <Bell size={22} color="#6B7280" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("Settings")}
              >
                <Settings size={22} color="#6B7280" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
