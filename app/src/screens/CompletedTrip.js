import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Users,
  Hotel,
  Car,
  User,
  Star,
  ImageIcon,
} from "lucide-react-native";

export default function CompletedTripDetail({ navigation }) {
  const trip = {
    name: "Santorini, Greece",
    date: "Sep 15 - Sep 20, 2024",
    rating: 4.7,
    totalCost: "₹2,34,500",
    duration: "6 Days, 5 Nights",
    travelers: 4,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
  };

  const guides = [
    {
      name: "Alexios Dimitriou",
      phone: "+30 698 123 4567",
      rating: 4.9,
      image: "https://randomuser.me/api/portraits/men/30.jpg",
    },
  ];

  const hotels = [
    {
      name: "Astra Suites",
      location: "Imerovigli",
      duration: "3 Nights",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    },
    {
      name: "Canaves Oia Hotel",
      location: "Oia",
      duration: "2 Nights",
      image:
        "https://images.unsplash.com/photo-1590490359854-dfba19688d70?w=800",
    },
  ];

  const transportations = [
    {
      mode: "Private SUV",
      vehicle: "Mercedes Vito",
      cost: "₹35,000",
    },
    {
      mode: "Ferry Transfer",
      vehicle: "Blue Star Ferries",
      cost: "₹12,000",
    },
  ];

  const places = [
    "Oia Sunset Point",
    "Red Beach",
    "Akrotiri Ruins",
    "Fira Town",
    "Amoudi Bay",
  ];

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Trip Overview */}
      <View className="m-4 p-4 bg-gray-50 rounded-3xl shadow-md border border-gray-100">
        <Image
          source={{ uri: trip.image }}
          className="w-full h-48 rounded-2xl mb-3"
        />
        <View className="flex-row justify-between mb-2">
          <View className="flex-row items-center gap-2">
            <Calendar size={16} color="#4a9eff" />
            <Text className="text-gray-700">{trip.duration}</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Users size={16} color="green" />
            <Text className="text-gray-700">{trip.travelers} Travelers</Text>
          </View>
        </View>
        <View className="flex-row justify-between items-center">
          <Text className="text-gray-600">Total Spent:</Text>
          <Text className="text-green-600 font-bold text-lg">
            {trip.totalCost}
          </Text>
        </View>
      </View>

      {/* Guide Info */}
      <View className="m-4 p-4 bg-gray-50 rounded-3xl shadow-md border border-gray-100">
        <View className="flex-row items-center mb-3">
          <User size={20} color="#8b5cf6" />
          <Text className="ml-2 text-lg font-semibold text-gray-800">
            Tour Guide
          </Text>
        </View>
        {guides.map((guide, i) => (
          <View
            key={i}
            className="flex-row items-center justify-between bg-white rounded-2xl p-3 mb-2 shadow-sm"
          >
            <View className="flex-row items-center">
              <Image
                source={{ uri: guide.image }}
                className="h-12 w-12 rounded-full"
              />
              <View className="ml-3">
                <Text className="font-semibold text-gray-800">
                  {guide.name}
                </Text>
                <Text className="text-gray-500 text-sm">{guide.phone}</Text>
              </View>
            </View>
            <Text className="text-yellow-500 font-semibold">
              ⭐ {guide.rating}
            </Text>
          </View>
        ))}
      </View>

      {/* Hotels */}
      <View className="m-4 p-4 bg-gray-50 rounded-3xl shadow-md border border-gray-100">
        <View className="flex-row items-center mb-3">
          <Hotel size={20} color="#4a9eff" />
          <Text className="ml-2 text-lg font-semibold text-gray-800">
            Hotels Stayed
          </Text>
        </View>
        {hotels.map((hotel, i) => (
          <View
            key={i}
            className="flex-row items-center bg-white rounded-2xl p-3 mb-2 shadow-sm"
          >
            <Image
              source={{ uri: hotel.image }}
              className="h-16 w-16 rounded-xl"
            />
            <View className="ml-3 flex-1">
              <Text className="font-semibold text-gray-800">{hotel.name}</Text>
              <Text className="text-gray-500 text-sm">{hotel.location}</Text>
              <Text className="text-green-600 text-xs mt-1">
                {hotel.duration}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Transport */}
      <View className="m-4 p-4 bg-gray-50 rounded-3xl shadow-md border border-gray-100">
        <View className="flex-row items-center mb-3">
          <Car size={20} color="#22c55e" />
          <Text className="ml-2 text-lg font-semibold text-gray-800">
            Transport Used
          </Text>
        </View>
        {transportations.map((t, i) => (
          <View
            key={i}
            className="flex-row justify-between bg-white rounded-2xl p-3 mb-2 shadow-sm"
          >
            <View>
              <Text className="font-semibold text-gray-800">{t.mode}</Text>
              <Text className="text-gray-500 text-sm">{t.vehicle}</Text>
            </View>
            <Text className="text-green-600 font-semibold">{t.cost}</Text>
          </View>
        ))}
      </View>

      {/* Places Visited */}
      <View className="m-4 p-4 bg-gray-50 rounded-3xl shadow-md border border-gray-100 mb-8">
        <View className="flex-row items-center mb-3">
          <MapPin size={20} color="#f59e0b" />
          <Text className="ml-2 text-lg font-semibold text-gray-800">
            Places Visited
          </Text>
        </View>
        {places.map((place, i) => (
          <View
            key={i}
            className="flex-row items-center mb-2 bg-white rounded-xl p-2 px-3 shadow-sm"
          >
            <Text className="text-gray-700 flex-1">
              {i + 1}. {place}
            </Text>
            <Star size={16} color="#facc15" />
          </View>
        ))}

        {/* 🔹 View Gallery Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate("TripGallery")}
          className="mt-5 bg-primary rounded-2xl p-4 flex-row justify-center items-center shadow"
          activeOpacity={0.8}
        >
          <ImageIcon size={20} color="white" />
          <Text className="ml-2 text-white font-semibold text-base">
            View Trip Gallery
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
