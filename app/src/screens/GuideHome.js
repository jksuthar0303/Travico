import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import {
  Users,
  DollarSign,
  Calendar,
  Star,
  Clock,
  Navigation,
  Phone,
  MessageCircle,
  CheckCircle,
  User,
} from "lucide-react-native";
import SwitchToggle from "react-native-switch-toggle";

export default function GuideHomeScreen({
  onViewBooking,
  onViewProfile,
  onViewLiveTrip,
}) {
  const [activeTab, setActiveTab] = useState("today");
  const [isOnline, setIsOnline] = useState(true);

  const handleToggle = () => {
    setIsOnline(!isOnline);
  };

  const stats = [
    { icon: Calendar, label: "Today's Tours", value: "2", change: "+1 from yesterday" },
    { icon: DollarSign, label: "Today's Earnings", value: "$380", change: "+$120" },
    { icon: Star, label: "Rating", value: "4.9", change: "127 reviews" },
    { icon: Users, label: "Total Tourists", value: "156", change: "This month" },
  ];

  const todayBookings = [
    {
      id: "1",
      tourists: ["Sarah Johnson", "Mike Davis"],
      touristCount: 4,
      destination: "Eiffel Tower Tour",
      time: "10:00 AM - 1:00 PM",
      status: "ongoing",
      price: 180,
      pickupLocation: "Hotel Le Meurice",
      phone: "+1 555-0123",
    },
    {
      id: "2",
      tourists: ["Emma Wilson"],
      touristCount: 2,
      destination: "Louvre Museum Tour",
      time: "3:00 PM - 6:00 PM",
      status: "upcoming",
      price: 200,
      pickupLocation: "Hotel Plaza Athénée",
      phone: "+1 555-0456",
    },
  ];

  const upcomingBookings = [
    {
      id: "3",
      tourists: ["John Smith"],
      touristCount: 3,
      destination: "Seine River Cruise",
      date: "Tomorrow",
      time: "11:00 AM",
      price: 150,
    },
    {
      id: "4",
      tourists: ["Lisa Anderson"],
      touristCount: 5,
      destination: "Versailles Palace Tour",
      date: "Nov 10",
      time: "9:00 AM",
      price: 250,
    },
  ];

  const BookingCard = ({ booking }) => (
    <View
      style={[
        styles.bookingCard,
        booking.status === "ongoing" && { borderColor: "#4a9eff" },
      ]}
    >
      <View className="flex-row justify-between">
        <View className="flex-1 pr-2">
          <View className="flex-row items-center mb-1">
            <Text className="text-lg font-semibold">{booking.destination}</Text>
            <Text
              className={`ml-2 text-xs px-2 py-1 rounded-full ${
                booking.status === "ongoing"
                  ? "bg-blue-100 text-primary"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {booking.status === "ongoing" ? "In Progress" : "Upcoming"}
            </Text>
          </View>

          <View className="flex-row items-center gap-2 mb-1">
            <Clock size={14} />
            <Text className="text-sm text-gray-500">{booking.time}</Text>
          </View>

          <View className="flex-row items-center gap-2">
            <Users size={14} />
            <Text className="text-sm text-gray-500">
              {booking.touristCount} tourists
            </Text>
          </View>
        </View>

        <View className="items-end justify-center">
          <Text className="text-lg text-primary">${booking.price}</Text>
        </View>
      </View>

      <View className="p-3 bg-gray-50 rounded-xl my-3">
        <Text className="text-xs text-gray-500">Pickup Location</Text>
        <Text className="text-sm">{booking.pickupLocation}</Text>
      </View>

      <View className="flex-row gap-2">
        <TouchableOpacity
          onPress={() => alert("Coming Soon")}
          className="flex-1 bg-primary/10 border border-primary/20 rounded-xl py-2 items-center"
        >
          <Text>View Details</Text>
        </TouchableOpacity>

        <TouchableOpacity className="w-10 h-10 rounded-xl border border-gray-200 items-center justify-center">
          <Phone size={16} />
        </TouchableOpacity>

        <TouchableOpacity className="w-10 h-10 rounded-xl border border-gray-200 items-center justify-center">
          <MessageCircle size={16} />
        </TouchableOpacity>

        {booking.status === "ongoing" && (
          <TouchableOpacity
            onPress={onViewLiveTrip}
            className="w-10 h-10 rounded-xl border border-gray-200 items-center justify-center"
          >
            <Navigation size={16} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <ScrollView
      className="flex-1 bg-white p-4"
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Card */}
      <View className="p-4 mb-4 flex-row items-center">
        <TouchableOpacity
          onPress={onViewProfile}
          className="w-20 h-20 items-center rounded-full bg-blue-500 justify-center mr-3"
        >
          <User color="white" size={30} />
        </TouchableOpacity>

        <View className="flex-1">
          <Text className="text-lg font-semibold">Welcome, Pierre</Text>
          <Text className="text-sm text-gray-500">Local Tour Guide</Text>

          <View className="mt-2 flex-row items-center justify-between pr-4">
            <Text
              className={`text-sm font-medium ${
                isOnline
                  ? "text-white px-2 rounded-2xl bg-green-600"
                  : "text-white bg-gray-400 px-2 rounded-2xl"
              }`}
            >
              {isOnline ? "Online" : "Offline"}
            </Text>

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
        </View>
      </View>

      {/* Stats */}
      <View className="flex-row flex-wrap -mx-1 mb-4">
        {stats.map((s, i) => (
          <View key={i} className="w-1/2 px-1 mb-3">
            <View className="bg-white rounded-3xl shadow-md p-4 border border-gray-200">
              <View className="w-10 h-10 rounded-xl bg-blue-50 items-center justify-center mb-3">
                <s.icon size={18} color="#4a9eff" />
              </View>
              <Text className="text-2xl mb-1">{s.value}</Text>
              <Text className="text-sm font-bold text-gray-500 mb-1">
                {s.label}
              </Text>
              <Text className="text-sm text-gray-400">{s.change}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {["today", "upcoming", "history"].map((tab) => (
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

      {/* Tab Content */}
      {activeTab === "today" && (
        <View className="gap-2 mb-10">
          <Text className="text-lg font-semibold mb-2">Today's Schedule</Text>
          {todayBookings.map((b) => (
            <BookingCard key={b.id} booking={b} />
          ))}
        </View>
      )}

      {activeTab === "upcoming" && (
        <View className="gap-2 mb-10">
          <Text className="text-lg font-semibold mb-2">Upcoming Tours</Text>
          {upcomingBookings.map((b) => (
            <View
              key={b.id}
              className="bg-white shadow-md rounded-3xl p-4 border border-gray-200"
            >
              <View className="flex-row justify-between mb-3">
                <View className="flex-1">
                  <Text className="mb-1 font-semibold">{b.destination}</Text>
                  <View className="flex-row items-center gap-2 mb-1">
                    <Calendar size={14} />
                    <Text className="text-sm text-gray-500">
                      {b.date} at {b.time}
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <Users size={14} />
                    <Text className="text-sm text-gray-500">
                      {b.touristCount} tourists
                    </Text>
                  </View>
                </View>
                <Text className="text-lg text-primary">${b.price}</Text>
              </View>
              <TouchableOpacity
                onPress={() => onViewBooking(b.id)}
                className="bg-gray-50 border border-gray-200 rounded-3xl py-2 items-center"
              >
                <Text>View Details</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {activeTab === "history" && (
        <View className="gap-2 mb-10">
          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-semibold">Completed Tours</Text>
            <Text className="bg-gray-200 px-3 py-1 rounded-full text-xs">
              24 this month
            </Text>
          </View>
          <View className="bg-white rounded-3xl shadow-md p-6 border border-gray-200 items-center">
            <CheckCircle size={40} color="#22c55e" />
            <Text className="text-gray-500 mt-3 text-center">
              View your completed tour history and earnings
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

/* ✅ Inline Styles for safer rendering */
const styles = StyleSheet.create({
  bookingCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
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
