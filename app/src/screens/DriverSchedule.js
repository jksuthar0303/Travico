import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import {
  Calendar,
  Clock,
  MapPin,
  Navigation,
  DollarSign,
  User,
} from "lucide-react-native";

export default function DriverScheduleScreen({ navigation }) {
  const activeRide = {
    id: "ride-123",
    passenger: "Sarah Johnson",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    pickup: "Hotel Le Meurice",
    pickupAddress: "228 Rue de Rivoli, 75001 Paris",
    dropoff: "CDG Airport - Terminal 2",
    dropoffAddress: "95700 Roissy-en-France",
    time: "10:00 AM",
    fare: 65,
    distance: "28 km",
  };

  const upcomingRides = [
    {
      id: "ride-124",
      passenger: "Mike Davis",
      photo:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
      pickup: "Hotel Plaza Athénée",
      dropoff: "Louvre Museum",
      time: "Today, 3:00 PM",
      fare: 25,
      distance: "5 km",
    },
    {
      id: "ride-125",
      passenger: "Emma Wilson",
      photo:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      pickup: "Eiffel Tower",
      dropoff: "Versailles Palace",
      time: "Tomorrow, 11:00 AM",
      fare: 55,
      distance: "22 km",
    },
  ];

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="p-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >

        {/* Active Ride Section */}
        {activeRide && (
          <View className="mb-8">
            {/* Active Ride Card */}
            <View className="bg-white rounded-3xl border border-primary shadow-md p-4">
              {/* Passenger Info */}
              <View className="flex-row items-center mb-3">
                <Image
                  source={{ uri: activeRide.photo }}
                  className="w-12 h-12 rounded-full mr-3"
                />
                <View className="flex-1">
                  <View className="flex-row items-center">
                    <Text className="font-semibold text-sm">
                      {activeRide.passenger}
                    </Text>
                    <View className="bg-blue-100 px-2 py-0.5 rounded-full ml-2">
                      <Text className="text-primary text-xs">Live</Text>
                    </View>
                  </View>
                  <View className="flex-row items-center mt-1">
                    <Clock size={14} color="#6b7280" />
                    <Text className="text-xs text-gray-500 ml-1">
                      {activeRide.time}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Pickup / Dropoff */}
              <View className="gap-2 mb-3">
                <View className="flex-row p-3 bg-green-50 rounded-xl">
                  <MapPin size={16} color="#16a34a" />
                  <View className="ml-2 flex-1">
                    <Text className="text-xs text-gray-500">Pickup</Text>
                    <Text className="text-sm font-medium">
                      {activeRide.pickup}
                    </Text>
                    <Text className="text-xs text-gray-400">
                      {activeRide.pickupAddress}
                    </Text>
                  </View>
                </View>

                <View className="flex-row p-3 bg-red-50 rounded-xl">
                  <MapPin size={16} color="#dc2626" />
                  <View className="ml-2 flex-1">
                    <Text className="text-xs text-gray-500">Dropoff</Text>
                    <Text className="text-sm font-medium">
                      {activeRide.dropoff}
                    </Text>
                    <Text className="text-xs text-gray-400">
                      {activeRide.dropoffAddress}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Ride Info */}
              <View className="flex-row justify-between bg-gray-100 rounded-xl p-3 mb-3">
                <View className="flex-row items-center">
                  <DollarSign size={16} color="#16a34a" />
                  <Text className="text-green-600 font-semibold ml-1">
                    ${activeRide.fare}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Navigation size={16} color="#6b7280" />
                  <Text className="text-sm text-gray-600 ml-1">
                    {activeRide.distance}
                  </Text>
                </View>
              </View>

              {/* Action Buttons */}
              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={() => navigation.navigate("RideDetail")}
                  className="flex-1 border border-gray-300 py-2 rounded-3xl items-center"
                >
                  <Text className="text-sm text-gray-700">View Details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={()=> navigation.navigate("LiveRide")}
                  className="flex-1 bg-primary py-2 rounded-3xl items-center flex-row justify-center"
                >
                  <Navigation size={16} color="#fff" />
                  <Text className="text-white ml-1 text-sm">Navigate</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* Upcoming Rides */}
        <View className="mb-8">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-base font-semibold">Upcoming Rides</Text>
            <Text className="bg-gray-200 px-3 py-1 rounded-full text-xs">
              {upcomingRides.length}
            </Text>
          </View>

          {upcomingRides.map((ride) => (
            <View
              key={ride.id}
              className="bg-white border border-gray-200 rounded-3xl shadow-sm p-4 mb-3"
            >
              <View className="flex-row items-center mb-3">
                <Image
                  source={{ uri: ride.photo }}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <View className="flex-1">
                  <Text className="font-semibold text-sm">{ride.passenger}</Text>
                  <View className="flex-row items-center mt-1">
                    <Clock size={14} color="#6b7280" />
                    <Text className="text-xs text-gray-500 ml-1">
                      {ride.time}
                    </Text>
                  </View>
                </View>
                <View className="bg-purple-100 px-2 py-0.5 rounded-full">
                  <Text className="text-purple-600 text-xs">Scheduled</Text>
                </View>
              </View>

              <View className="gap-2 mb-3">
                <View className="flex-row items-center">
                  <MapPin size={14} color="#16a34a" />
                  <Text className="text-sm text-gray-700 ml-2">
                    Pickup: {ride.pickup}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <MapPin size={14} color="#dc2626" />
                  <Text className="text-sm text-gray-700 ml-2">
                    Dropoff: {ride.dropoff}
                  </Text>
                </View>
              </View>

              <View className="flex-row justify-between bg-gray-100 p-3 rounded-2xl mb-3">
                <View className="flex-row items-center">
                  <DollarSign size={14} color="#16a34a" />
                  <Text className="text-green-600 font-semibold ml-1">
                    ${ride.fare}
                  </Text>
                </View>
                <Text className="text-gray-500 text-sm">{ride.distance}</Text>
              </View>

              <TouchableOpacity
                onPress={() => onViewRideDetail(ride.id)}
                className="border border-gray-300 py-2 rounded-3xl items-center"
              >
                <Text className="text-sm text-gray-700">View Details</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Empty State */}
        {!activeRide && upcomingRides.length === 0 && (
          <View className="bg-gray-50 rounded-2xl border border-gray-200 p-8 items-center justify-center">
            <Calendar size={40} color="#9ca3af" />
            <Text className="text-gray-500 text-base mt-2">
              No scheduled rides
            </Text>
            <Text className="text-gray-400 text-sm">
              Your upcoming rides will appear here
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
