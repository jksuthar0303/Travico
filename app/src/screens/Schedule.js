import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  Calendar,
  Plus,
  Clock,
  MapPin,
  Users,
  CheckCircle,
  Navigation,
} from "lucide-react-native";
import { AddScheduleModal } from "../components/AddSchedule";

export default function Schedule({ navigation }) {
  const [showAdd, setShowAdd] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const inProgressTrips = [
    {
      id: "trip-1",
      name: "Eiffel Tower & Seine River Tour",
      tourists: 4,
      date: "Today, Nov 10",
      schedule: [
        {
          id: "1",
          time: "10:00 AM",
          location: "Hotel Le Meurice",
          activity: "Pick up tourists",
          status: "completed",
        },
        {
          id: "2",
          time: "10:20 AM",
          location: "Eiffel Tower",
          activity: "Tower visit & history lesson",
          status: "in-progress",
        },
        {
          id: "3",
          time: "11:15 AM",
          location: "Trocadéro Gardens",
          activity: "Photo session",
          status: "upcoming",
        },
      ],
    },
  ];

  const upcomingTrips = [
    {
      id: "trip-2",
      name: "Louvre Museum Art Tour",
      tourists: 2,
      date: "Today, 3:00 PM",
      pickupLocation: "Hotel Plaza Athénée",
      scheduleCount: 5,
    },
    {
      id: "trip-3",
      name: "Seine River Cruise",
      tourists: 3,
      date: "Tomorrow, 11:00 AM",
      pickupLocation: "Port de la Bourdonnais",
      scheduleCount: 4,
    },
  ];

  return (
    <View className="flex-1 bg-white">

      {/* Scrollable content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        className="px-4"
      >
        {/* In Progress Trips */}
        {inProgressTrips.length > 0 && (
          <View className="mt-4">
            <View className="flex-row justify-between items-center mb-2">
              <View className="flex-row items-center">
                <View className="w-2 h-2 rounded-full bg-primary mr-2" />
                <Text className="font-semibold text-primary">In Progress</Text>
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate("LiveTrip")}
                className="flex-row items-center px-3 py-1.5 rounded-3xl bg-primary/10"
              >
                <Navigation size={16} color="#4a9eff" />
                <Text className="ml-2 text-primary font-medium">Live View</Text>
              </TouchableOpacity>
            </View>

            {inProgressTrips.map((trip) => (
              <View
                key={trip.id}
                className="bg-white border border-primary/20 rounded-2xl p-4 mb-4 shadow-sm"
              >
                <Text className="text-lg font-bold mb-1">{trip.name}</Text>
                <Text className="text-gray-500 text-sm mb-2">{trip.date}</Text>
                <View className="flex-row items-center mb-3">
                  <Users size={16} color="#6b7280" />
                  <Text className="ml-2 text-gray-600">{trip.tourists} tourists</Text>
                </View>

                {/* Schedule List */}
                {trip.schedule.map((item) => (
                  <View
                    key={item.id}
                    className={`flex-row items-center border border-gray-200 rounded-3xl p-3 mb-2 ${
                      item.status === "in-progress"
                        ? "bg-primary/10 border-primary/30"
                        : item.status === "completed"
                        ? "bg-gray-100"
                        : "bg-white"
                    }`}
                  >
                    <View className="w-8 h-8 rounded-full items-center justify-center bg-primary/20">
                      {item.status === "completed" ? (
                        <CheckCircle size={18} color="#16a34a" />
                      ) : (
                        <Clock size={18} color="#4a9eff" />
                      )}
                    </View>

                    <View className="ml-3 flex-1">
                      <Text className="text-sm font-medium">{item.activity}</Text>
                      <View className="flex-row items-center mt-0.5">
                        <Clock size={12} color="#9ca3af" />
                        <Text className="ml-1 text-xs text-gray-500">{item.time}</Text>
                        <Text className="mx-1 text-gray-400">•</Text>
                        <MapPin size={12} color="#9ca3af" />
                        <Text className="ml-1 text-xs text-gray-500">{item.location}</Text>
                      </View>
                    </View>
                  </View>
                ))}

                <View className="flex-row mt-2">
                  <TouchableOpacity
                    className="flex-1 border border-gray-300 rounded-3xl py-2 mr-2 items-center"
                    onPress={() => navigation.navigate("TripDetail")}
                  >
                    <Text className="text-gray-700 font-medium">View Details</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setSelectedTrip(trip.id);
                      setShowAdd(true);
                    }}
                    className="flex-row items-center bg-primary rounded-3xl px-4 py-2"
                  >
                    <Plus size={18} color="#fff" />
                    <Text className="text-white font-semibold ml-1">Add Activity</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Upcoming Trips */}
        <View className="mt-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-lg font-bold text-primary">Upcoming Trips</Text>
            <View className="bg-gray-100 px-3 py-1 rounded-xl">
              <Text className="text-gray-700 text-sm">{upcomingTrips.length}</Text>
            </View>
          </View>

          {upcomingTrips.map((trip) => (
            <View
              key={trip.id}
              className="bg-white border border-gray-200 rounded-3xl p-4 mb-3 shadow-sm"
            >
              <Text className="text-base font-bold mb-1">{trip.name}</Text>
              <Text className="text-gray-500 text-sm mb-1">{trip.date}</Text>
              <View className="flex-row items-center mb-1">
                <Users size={16} color="#6b7280" />
                <Text className="ml-2 text-gray-600">{trip.tourists} tourists</Text>
              </View>
              <View className="flex-row items-center mb-3">
                <MapPin size={16} color="#6b7280" />
                <Text className="ml-2 text-gray-600">{trip.pickupLocation}</Text>
              </View>

              <View className="flex-row">
                <TouchableOpacity
                  className="flex-1 border border-gray-300 rounded-3xl py-2 mr-2 items-center"
                  onPress={() => navigation.navigate("TripDetail")}
                >
                  <Text className="text-gray-700 font-medium">View Schedule</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="p-2 rounded-3xl border border-primary items-center justify-center"
                  onPress={() => {
                    setSelectedTrip(trip.id);
                    setShowAdd(true);
                  }}
                >
                  <Plus size={20} color="#2563eb" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Add Schedule Modal */}
      <AddScheduleModal
        visible={showAdd}
        onClose={() => setShowAdd(false)}
        tripId={selectedTrip}
      />
    </View>
  );
}
