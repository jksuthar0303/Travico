import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import {
  Car,
  DollarSign,
  Clock,
  Navigation,
  MapPin,
  Phone,
  MessageCircle,
  CheckCircle,
  Fuel,
  User,
} from "lucide-react-native";
import SwitchToggle from "react-native-switch-toggle";

export default function DriverHomeScreen() {
  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState("active");

  const handleToggle = () => setIsOnline(!isOnline);

  const stats = [
    {
      icon: DollarSign,
      label: "Today's Earnings",
      value: "$245",
      change: "+$75 from yesterday",
      color: "#10b981",
    },
    {
      icon: Navigation,
      label: "Trips Today",
      value: "8",
      change: "2 more than yesterday",
      color: "#4a9eff",
    },
    {
      icon: Fuel,
      label: "Fuel Level",
      value: "75%",
      change: "Healthy",
      color: "#f59e0b",
    },
    {
      icon: Clock,
      label: "Online Time",
      value: "6.5h",
      change: "Today",
      color: "#8b5cf6",
    },
  ];

  const activeRides = [
    {
      id: "1",
      passenger: "Sarah Johnson",
      pickup: "Hotel Le Meurice",
      dropoff: "Charles de Gaulle Airport",
      distance: "28 km",
      time: "35 mins",
      fare: 65,
      status: "ongoing",
      phone: "+1 555-0123",
    },
  ];

  const upcomingRides = [
    {
      id: "2",
      passenger: "Mike Davis",
      pickup: "Eiffel Tower",
      dropoff: "Louvre Museum",
      time: "2:30 PM",
      fare: 25,
    },
    {
      id: "3",
      passenger: "Emma Wilson",
      pickup: "Hotel Plaza Athénée",
      dropoff: "Versailles Palace",
      time: "4:00 PM",
      fare: 55,
    },
  ];

  return (
    <ScrollView className="flex-1 bg-white p-4" showsVerticalScrollIndicator={false}>
      {/* Driver Info Card */}
      <View className="p-4 mb-4 flex-row items-center">
        <View className="w-20 h-20 bg-primary rounded-full items-center justify-center mr-3">
          <Car color="white" size={30} />
        </View>

        <View className="flex-1">
          <Text className="text-lg font-semibold">Welcome, Jacques</Text>
          <Text className="text-sm text-gray-500">Professional Driver</Text>

          <View className="mt-2 flex-row items-center justify-between pr-4">
            <Text
              className={`text-sm font-medium ${
                isOnline
                  ? "text-white bg-green-600"
                  : "text-white bg-gray-400"
              } px-3 py-1 rounded-2xl`}
            >
              {isOnline ? "Online" : "Offline"}
            </Text>
          </View>
        </View>

        <SwitchToggle
          switchOn={isOnline}
          onPress={handleToggle}
          circleColorOff="white"
          circleColorOn="white"
          backgroundColorOn="#22c55e"
          backgroundColorOff="#d1d5db"
          containerStyle={styles.switchContainer}
          circleStyle={styles.switchCircle}
        />
      </View>

      {/* Stats Cards */}
      <View className="flex-row flex-wrap -mx-1 mb-4">
        {stats.map((s, i) => (
          <View key={i} className="w-1/2 px-1 mb-3">
            <View
              className="bg-white rounded-3xl shadow-md p-4 border border-gray-200"
              style={{ borderLeftColor: s.color, borderLeftWidth: 3 }}
            >
              <View
                className="w-10 h-10 rounded-xl items-center justify-center mb-3"
                style={{ backgroundColor: `${s.color}20` }}
              >
                <s.icon size={18} color={s.color} />
              </View>
              <Text className="text-2xl mb-1">{s.value}</Text>
              <Text className="text-sm font-bold text-gray-500 mb-1">{s.label}</Text>
              <Text className="text-sm text-gray-400">{s.change}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {["active", "upcoming", "history"].map((tab) => (
          <View key={tab} style={{ flex: 1, paddingHorizontal: 4 }}>
            <TouchableOpacity
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.8}
              style={[
                styles.tabButton,
                activeTab === tab && styles.activeTabButton,
              ]}
            >
              <Text style={styles.tabText}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Active Rides */}
      {activeTab === "active" && (
        <View className="gap-2 mb-10">
          <Text className="text-lg font-semibold mb-2">Active Ride</Text>
          {activeRides.map((ride) => (
            <View
              key={ride.id}
              className="bg-white rounded-3xl shadow-md p-4 border border-gray-200"
            >
              <View className="flex-row justify-between mb-3">
                <View className="flex-row items-center">
                  <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
                    <User size={20} color="#4a9eff" />
                  </View>
                  <View>
                    <Text className="font-semibold">{ride.passenger}</Text>
                    <Text className="text-xs text-center bg-blue-50 px-2 py-1 rounded-full text-primary">
                      In Progress
                    </Text>
                  </View>
                </View>
                <Text className="text-lg text-primary">${ride.fare}</Text>
              </View>

              <View className="mb-3">
                <View className="flex-row items-center mb-2">
                  <MapPin size={14} color="#16a34a" />
                  <Text className="ml-2 text-sm text-gray-600">
                    Pickup: {ride.pickup}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <MapPin size={14} color="#dc2626" />
                  <Text className="ml-2 text-sm text-gray-600">
                    Dropoff: {ride.dropoff}
                  </Text>
                </View>
              </View>

              <View className="flex-row justify-between bg-gray-50 rounded-2xl p-3 mb-3">
                <View className="flex-row items-center">
                  <Navigation size={16} color="#6b7280" />
                  <Text className="ml-2 text-sm">{ride.distance}</Text>
                </View>
                <View className="flex-row items-center">
                  <Clock size={16} color="#6b7280" />
                  <Text className="ml-2 text-sm">{ride.time}</Text>
                </View>
              </View>

              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={() => alert("Navigating...")}
                  className="flex-1 bg-primary py-2 rounded-3xl items-center"
                >
                  <Text className="text-white">Navigate</Text>
                </TouchableOpacity>

                <TouchableOpacity className="w-10 h-10 rounded-3xl border border-gray-200 items-center justify-center">
                  <Phone size={16} color="green" />
                </TouchableOpacity>

                <TouchableOpacity className="w-10 h-10 rounded-3xl border border-gray-200 items-center justify-center">
                  <MessageCircle size={16} color="orange" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Upcoming Rides */}
      {activeTab === "upcoming" && (
        <View className="gap-2 mb-10">
          <Text className="text-lg font-semibold mb-2">Upcoming Rides</Text>
          {upcomingRides.map((r) => (
            <View
              key={r.id}
              className="bg-white shadow-md rounded-3xl p-4 border border-gray-200"
            >
              <View className="flex-row justify-between mb-3">
                <View className="flex-1">
                  <Text className="mb-1 font-semibold">{r.passenger}</Text>
                  <View className="flex-row items-center gap-2 mb-1">
                    <Clock size={14} />
                    <Text className="text-sm text-gray-500">{r.time}</Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <MapPin size={14} />
                    <Text className="text-sm text-gray-500">
                      {r.pickup} → {r.dropoff}
                    </Text>
                  </View>
                </View>
                <Text className="text-lg text-primary">${r.fare}</Text>
              </View>
              <TouchableOpacity className="bg-gray-50 border border-gray-200 rounded-3xl py-2 items-center">
                <Text>View Details</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {/* History */}
      {activeTab === "history" && (
        <View className="gap-2 mb-10">
          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-semibold">Completed Rides</Text>
            <Text className="bg-gray-200 px-3 py-1 rounded-full text-xs">
              42 this month
            </Text>
          </View>
          <View className="bg-white rounded-3xl shadow-md p-6 border border-gray-200 items-center">
            <CheckCircle size={40} color="#22c55e" />
            <Text className="text-gray-500 mt-3 text-center">
              View your ride history and earnings
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  switchContainer: {
    width: 45,
    height: 25,
    borderRadius: 25,
    padding: 5,
  },
  switchCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    padding: 4,
    borderRadius: 24,
    marginBottom: 16,
  },
  tabButton: {
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 20,
  },
  activeTabButton: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  tabText: {
    textTransform: "capitalize",
    fontSize: 14,
  },
});
