import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { MapPin } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const dummyTrips = [
  {
    id: 1,
    destination: "Bali, Indonesia",
    date: "Nov 10 - Nov 15, 2025",
    travelers: 2,
    total: 24500,
    status: "Approved",
    guide: {
      name: "Ketut Arya",
      costPerDay: 1500,
      contact: "+62 812 3456 7890",
    },
    hotel: {
      name: "Ocean View Resort",
      perNight: 3500,
      location: "Jl. Pantai Kuta, Bali",
      rating: 4.6,
    },
    transport: {
      vehicle: "Toyota Innova",
      driver: "Made Wijaya",
      ratePerDay: 2000,
      number: "DK 2345 AB",
    },
  },
  {
    id: 2,
    destination: "Jaipur, India",
    date: "Dec 1 - Dec 3, 2025",
    travelers: 4,
    total: 7800,
    status: "Pending",
    guide: {
      name: "Ravi Sharma",
      costPerDay: 800,
      contact: "+91 98765 43210",
    },
    hotel: {
      name: "Royal Heritage Palace",
      perNight: 2500,
      location: "Amber Fort Road, Jaipur",
      rating: 4.4,
    },
    transport: {
      vehicle: "Suzuki Ertiga",
      driver: "Suresh Kumar",
      ratePerDay: 1200,
      number: "RJ14 CX 9087",
    },
  },
];

export default function Trip({ navigation }) {
  return (
    <View className="flex-1 bg-white p-4">
      {dummyTrips.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <MapPin size={64} color="#a8d5ba" />
          <Text className="text-xl font-bold text-gray-700 mt-4">No Trips Available</Text>
          <Text className="text-gray-400 text-center mt-2">
            You haven’t added any trips yet. Start exploring and plan your next adventure!
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Create-Trip")}
            className="bg-blue-500 px-6 py-3 rounded-full mt-6"
          >
            <Text className="text-white font-bold text-lg">Add Trip</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={dummyTrips}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                if (item.status === "Approved") {
                  navigation.navigate("Summary", { trip: item });
                } else {
                  alert("This trip is not approved yet 🚫");
                }
              }}
              className="p-4 mb-3 border border-gray-200 rounded-3xl bg-white shadow"
            >
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-lg font-semibold text-gray-700">
                    {item.destination}
                  </Text>
                  <Text className="text-sm text-gray-500">{item.date}</Text>
                  <Text className="text-sm text-gray-500">
                    Travelers: {item.travelers}
                  </Text>
                  <Text className="text-primary font-bold mt-1">
                    ₹{item.total.toLocaleString()}
                  </Text>
                </View>

                <View
                  className={`px-3 py-1 rounded-full ${
                    item.status === "Approved"
                      ? "bg-green-100"
                      : "bg-yellow-100"
                  }`}
                >
                  <Text
                    className={`font-semibold ${
                      item.status === "Approved"
                        ? "text-green-700"
                        : "text-yellow-700"
                    }`}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
