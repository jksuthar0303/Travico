import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  MapPin,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react-native";

export default function GuideTrip({ navigation }) {
  const [filter, setFilter] = useState("all");

  const allTrips = [
    {
      id: "trip-1",
      name: "Eiffel Tower & Seine River Tour",
      status: "in-progress",
      date: "Today, Nov 7",
      tourists: 4,
      price: 180,
      earnings: 144,
      pickupLocation: "Hotel Le Meurice",
      startTime: "10:00 AM",
    },
    {
      id: "trip-2",
      name: "Louvre Museum Art Tour",
      status: "scheduled",
      date: "Today, 3:00 PM",
      tourists: 2,
      price: 200,
      earnings: 160,
      pickupLocation: "Hotel Plaza Athénée",
      startTime: "3:00 PM",
    },
    {
      id: "trip-3",
      name: "Montmartre Walking Tour",
      status: "completed",
      date: "Nov 5, 2025",
      tourists: 6,
      price: 120,
      earnings: 96,
      pickupLocation: "Metro Abbesses",
      startTime: "2:00 PM",
      rating: 5,
    },
    {
      id: "trip-4",
      name: "Orsay Museum Tour",
      status: "cancelled",
      date: "Nov 2, 2025",
      tourists: 2,
      price: 150,
      earnings: 0,
      pickupLocation: "Orsay Museum",
      startTime: "10:00 AM",
      cancelReason: "Tourist cancelled",
    },
  ];

  const filteredTrips =
    filter === "all"
      ? allTrips
      : allTrips.filter((t) => {
          if (filter === "scheduled")
            return t.status === "scheduled" || t.status === "in-progress";
          return t.status === filter;
        });

  const getStatusIcon = (status) => {
    switch (status) {
      case "in-progress":
        return (
          <View className="w-3 h-3 rounded-full bg-primary" />
        );
      case "scheduled":
        return <Clock size={20} color="#4a9eff" />;
      case "completed":
        return <CheckCircle size={20} color="#16a34a" />;
      case "cancelled":
        return <XCircle size={20} color="#dc2626" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "in-progress":
        return "bg-primary/10 border-primary/30";
      case "scheduled":
        return "bg-secondary/10 border-secondary/30";
      case "completed":
        return "bg-green-50 border-green-300";
      case "cancelled":
        return "bg-red-50 border-red-300";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const handleViewDetail = (id) =>
    Alert.alert("Trip Detail", `Viewing details for ${id}`);

  return (
    <View className="flex-1 bg-white">

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="p-4"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Filter Tabs */}
        <View className="flex-row mb-4">
          {["all", "scheduled", "completed", "cancelled"].map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setFilter(f)}
              className={`px-4 py-2 rounded-full mr-2 border ${
                filter === f
                  ? "bg-primary border-primary"
                  : "bg-white border-gray-300"
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  filter === f ? "text-white" : "text-gray-700"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Trips Count */}
        <Text className="text-gray-700 font-semibold mb-3">
          {filteredTrips.length} Trips
        </Text>

        {/* Trip List */}
        {filteredTrips.map((trip) => (
          <View
            key={trip.id}
            className={`rounded-3xl border p-4 mb-3 ${getStatusColor(
              trip.status
            )}`}
          >
            <View className="flex-row mb-3">
              <View className="w-12 h-12 rounded-xl items-center justify-center bg-white mr-3 border border-gray-200">
                {getStatusIcon(trip.status)}
              </View>

              <View className="flex-1">
                <Text className="text-base font-semibold mb-1">
                  {trip.name}
                </Text>
                <View className="flex-row items-center mb-1">
                  <Calendar size={14} color="#6b7280" />
                  <Text className="ml-1 text-gray-600 text-sm">
                    {trip.date}
                  </Text>
                  <Text className="mx-1 text-gray-400">•</Text>
                  <Clock size={14} color="#6b7280" />
                  <Text className="ml-1 text-gray-600 text-sm">
                    {trip.startTime}
                  </Text>
                </View>
                <View className="flex-row items-center mb-1">
                  <Users size={14} color="#6b7280" />
                  <Text className="ml-1 text-gray-600 text-sm">
                    {trip.tourists} tourists
                  </Text>
                  <Text className="mx-1 text-gray-400">•</Text>
                  <MapPin size={14} color="#6b7280" />
                  <Text className="ml-1 text-gray-600 text-sm">
                    {trip.pickupLocation}
                  </Text>
                </View>
              </View>
            </View>

            {trip.cancelReason && (
              <View className="p-2 bg-red-100 rounded-xl mb-3">
                <Text className="text-xs text-red-600">
                  {trip.cancelReason}
                </Text>
              </View>
            )}

            <View className="flex-row justify-between items-center bg-gray-100 p-3 rounded-3xl mb-3">
              <View>
                <Text className="text-xs text-gray-500 mb-1">
                  Your Earnings
                </Text>
                <Text className="text-lg text-green-600 font-semibold">
                  ${trip.earnings}
                </Text>
              </View>
              {trip.rating && (
                <Text className="text-yellow-500 font-semibold text-sm">
                  ⭐ {trip.rating}.0
                </Text>
              )}
            </View>

            <TouchableOpacity
              onPress={() => handleViewDetail(trip.id)}
              className={`py-3 rounded-3xl items-center ${
                trip.status === "in-progress"
                  ? "bg-primary"
                  : "border border-gray-300"
              }`}
            >
              <Text
                className={`font-semibold ${
                  trip.status === "in-progress"
                    ? "text-white"
                    : "text-gray-700"
                }`}
              >
                View Details
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Empty State */}
        {filteredTrips.length === 0 && (
          <View className="items-center justify-center p-10 bg-gray-50 rounded-2xl border border-gray-200">
            <MapPin size={48} color="#9ca3af" />
            <Text className="text-gray-500 mt-2">
              No {filter === "all" ? "trips yet" : `${filter} trips`}
            </Text>
          </View>
        )}
      </ScrollView>

    </View>
  );
}
