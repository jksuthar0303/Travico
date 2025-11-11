import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  Navigation,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  CheckCircle,
  XCircle,
} from "lucide-react-native";

export default function DriverRidesScreen({ navigation }) {
  const [filter, setFilter] = useState("all");

  const allRides = [
    {
      id: "ride-123",
      passenger: "Sarah Johnson",
      photo:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      status: "in-progress",
      date: "Today, Nov 7",
      time: "10:00 AM",
      pickup: "Hotel Le Meurice",
      dropoff: "CDG Airport",
      fare: 65,
      distance: "28 km",
    },
    {
      id: "ride-124",
      passenger: "Mike Davis",
      photo:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
      status: "scheduled",
      date: "Today",
      time: "3:00 PM",
      pickup: "Hotel Plaza Athénée",
      dropoff: "Louvre Museum",
      fare: 25,
      distance: "5 km",
    },
    {
      id: "ride-127",
      passenger: "Lisa Anderson",
      photo:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      status: "completed",
      date: "Nov 5, 2025",
      time: "2:00 PM",
      pickup: "Montmartre",
      dropoff: "Latin Quarter",
      fare: 20,
      distance: "8 km",
      rating: 5,
    },
    {
      id: "ride-130",
      passenger: "Anna Martinez",
      photo:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop",
      status: "cancelled",
      date: "Nov 2, 2025",
      time: "4:00 PM",
      pickup: "Champs-Élysées",
      dropoff: "La Défense",
      fare: 0,
      distance: "10 km",
      cancelReason: "Passenger cancelled",
    },
  ];

  const filteredRides =
    filter === "all"
      ? allRides
      : allRides.filter((ride) => {
          if (filter === "scheduled")
            return ride.status === "scheduled" || ride.status === "in-progress";
          return ride.status === filter;
        });

  const getStatusIcon = (status) => {
    switch (status) {
      case "in-progress":
        return <View className="w-2 h-2 rounded-full bg-primary" />;
      case "scheduled":
        return <Clock size={16} color="#a855f7" />;
      case "completed":
        return <CheckCircle size={16} color="#22c55e" />;
      case "cancelled":
        return <XCircle size={16} color="#ef4444" />;
      default:
        return null;
    }
  };

  const getBadgeClass = (status) => {
    switch (status) {
      case "in-progress":
        return "bg-blue-100 text-blue-600";
      case "scheduled":
        return "bg-purple-100 text-purple-600";
      case "completed":
        return "bg-green-100 text-green-600";
      case "cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="p-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Filter Buttons */}
        <View className="flex-row flex-wrap mb-4">
          {["all", "scheduled", "completed", "cancelled"].map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setFilter(f)}
              className={`px-4 py-2 mr-1 mb-2 rounded-full border ${
                filter === f
                  ? "bg-primary border-primary"
                  : "border-gray-300 bg-white"
              }`}
            >
              <Text
                className={`text-sm ${
                  filter === f ? "text-white" : "text-gray-700"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Rides Count */}
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-base font-semibold">
            {filteredRides.length} Rides
          </Text>
        </View>

        {/* Ride Cards */}
        {filteredRides.map((ride) => (
          <View
            key={ride.id}
            className={`rounded-3xl p-4 mb-3 border ${
              ride.status === "in-progress"
                ? "border-primary shadow-md bg-white"
                : "border-gray-200"
            }`}
          >
            {/* Top Section */}
            <View className="flex-row items-start mb-3">
              <View
                className={`w-10 h-10 rounded-xl items-center justify-center mr-3 ${
                  ride.status === "in-progress"
                    ? "bg-primary/20"
                    : ride.status === "scheduled"
                    ? "bg-purple-100"
                    : ride.status === "completed"
                    ? "bg-green-100"
                    : "bg-red-100"
                }`}
              >
                {getStatusIcon(ride.status)}
              </View>

              <View className="flex-1">
                <View className="flex-row justify-between items-center mb-2">
                  <View className="flex-row items-center">
                    <Image
                      source={{ uri: ride.photo }}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <Text className="text-sm font-medium">{ride.passenger}</Text>
                  </View>
                  <Text
                    className={`text-xs px-2 py-0.5 rounded-full ${getBadgeClass(
                      ride.status
                    )}`}
                  >
                    {ride.status === "in-progress"
                      ? "In Progress"
                      : ride.status.charAt(0).toUpperCase() +
                        ride.status.slice(1)}
                  </Text>
                </View>

                {/* Ride Info */}
                <View className="gap-2 mb-2">
                  <View className="flex-row items-center">
                    <Calendar size={14} color="#6b7280" />
                    <Text className="text-xs text-gray-500 ml-2">
                      {ride.date} • {ride.time}
                    </Text>
                  </View>

                  <View className="flex-row items-center">
                    <MapPin size={14} color="#16a34a" />
                    <Text className="text-xs text-gray-600 ml-2">
                      Pickup: {ride.pickup}
                    </Text>
                  </View>

                  <View className="flex-row items-center">
                    <MapPin size={14} color="#dc2626" />
                    <Text className="text-xs text-gray-600 ml-2">
                      Dropoff: {ride.dropoff}
                    </Text>
                  </View>
                </View>

                {/* Cancel Reason */}
                {ride.cancelReason && (
                  <View className="bg-red-50 rounded-lg p-2 mb-2">
                    <Text className="text-xs text-red-600">
                      {ride.cancelReason}
                    </Text>
                  </View>
                )}

                {/* Fare & Distance */}
                <View className="flex-row justify-between bg-gray-50 p-3 rounded-xl mb-3">
                  <View>
                    <Text className="text-xs text-gray-400">Fare</Text>
                    <Text className="text-green-600 font-semibold text-base">
                      ${ride.fare}
                    </Text>
                  </View>
                  <View>
                    <Text className="text-xs text-gray-400">Distance</Text>
                    <Text className="text-sm text-gray-700">
                      {ride.distance}
                    </Text>
                  </View>
                  {ride.rating && (
                    <View className="items-center">
                      <Text className="text-xs text-gray-400">Rating</Text>
                      <Text className="text-yellow-500 text-base">
                        ⭐ {ride.rating}.0
                      </Text>
                    </View>
                  )}
                </View>

                {/* Button */}
                <TouchableOpacity
                  onPress={() => navigation.navigate("RideDetail")}
                  className={`py-2 rounded-3xl items-center ${
                    ride.status === "in-progress"
                      ? "bg-primary"
                      : "border border-gray-300"
                  }`}
                >
                  <Text
                    className={`text-sm ${
                      ride.status === "in-progress"
                        ? "text-white"
                        : "text-gray-700"
                    }`}
                  >
                    View Details
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {/* Empty State */}
        {filteredRides.length === 0 && (
          <View className="bg-gray-50 border border-gray-200 rounded-2xl p-10 items-center justify-center">
            <Navigation size={40} color="#9ca3af" />
            <Text className="text-gray-600 text-base mt-3">
              No rides found
            </Text>
            <Text className="text-gray-400 text-sm mt-1">
              {filter === "all"
                ? "You don't have any rides yet"
                : `No ${filter} rides`}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
