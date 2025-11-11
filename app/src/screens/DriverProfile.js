import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  Car,
  Star,
  Award,
  Navigation,
  DollarSign,
  MapPin,
  Edit,
  Shield,
  CheckCircle,
} from "lucide-react-native";

export default function DriverProfileScreen({ navigation }) {
  const driverProfile = {
    name: "Jacques Martin",
    photo:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop",
    title: "Professional Driver",
    location: "Paris, France",
    memberSince: "2020",
    verified: true,
    rating: 4.8,
    totalReviews: 92,
    totalRides: 1245,
    totalDistance: "45,678 km",
    responseTime: "< 2 mins",
    acceptanceRate: 95,
    completionRate: 99,
  };

  const stats = [
    { label: "Total Rides", value: driverProfile.totalRides, icon: Navigation, color: "#4a9eff" },
    { label: "Distance", value: driverProfile.totalDistance, icon: Car, color: "#10b981" },
    { label: "Avg Rating", value: driverProfile.rating, icon: Star, color: "#facc15" },
    { label: "Reviews", value: driverProfile.totalReviews, icon: Award, color: "#f97316" },
  ];

  const achievements = [
    { title: "Top Rated Driver", desc: "Maintained 4.7+ rating", icon: Star, color: "bg-yellow-100 text-yellow-600" },
    { title: "Safe Driver", desc: "Zero incidents", icon: Shield, color: "bg-green-100 text-green-600" },
    { title: "Quick Responder", desc: "95% acceptance rate", icon: CheckCircle, color: "bg-blue-100 text-blue-600" },
    { title: "Long Hauler", desc: "40,000+ km driven", icon: Navigation, color: "bg-purple-100 text-purple-600" },
  ];

  const recentReviews = [
    {
      name: "Sarah Johnson",
      rating: 5,
      date: "1 day ago",
      comment:
        "Very professional and safe driver. Car was clean and comfortable!",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    {
      name: "Mike Davis",
      rating: 5,
      date: "3 days ago",
      comment:
        "Great service! Jacques was on time and very friendly. Will book again!",
      avatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
    },
  ];

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* Header */}
        <View className="flex-row items-center p-4">
            <View className="relative">
              <Image
                source={{ uri: driverProfile.photo }}
                className="w-32 h-32 rounded-full border-4 border-white"
              />
              {driverProfile.verified && (
                <View className="absolute bottom-1 right-1 bg-green-500 rounded-full p-1 border-2 border-white">
                  <CheckCircle size={18} color="white" />
                </View>
              )}
            </View>
           <View className="items-start ml-2">
           <Text className="text-2xl font-bold  mt-3">
              {driverProfile.name}
            </Text>
            <Text className=" text-sm">{driverProfile.title}</Text>
            <View className="flex-row items-center justify-center mt-2">
              <MapPin size={16} color="white" />
              <Text className=" ml-1 text-sm text-gray-500 ">
                {driverProfile.location}
              </Text>
            </View>
            <View className="bg-primary/20 rounded-2xl px-3 py-1 mt-3">
              <Text className=" text-xs  text-gray-600">
                Member since {driverProfile.memberSince}
              </Text>
            </View>
           </View>
            <TouchableOpacity className="flex-1 items-center py-3" onPress={()=>navigation.navigate("Earnings")}>
              <DollarSign size={28} color="#10b981" />
            </TouchableOpacity>
          </View>

        {/* Stats Grid */}
        <View className="px-4 mt-4 flex-row flex-wrap w-full gap-3">
          {stats.map((s, i) => (
            <View
              key={i}
              className="bg-gray-50 border border-gray-200 w-[48%] rounded-3xl p-4 items-start"
            >
              <View className="flex-row items-center mb-2">
                <s.icon size={18} color={s.color} />
                <Text className="ml-2 text-gray-500 text-xs">{s.label}</Text>
              </View>
              <Text className="text-lg font-semibold text-gray-800">
                {s.value}
              </Text>
            </View>
          ))}
        </View>

        {/* Performance */}
        <View className="bg-white rounded-3xl border border-gray-200 mx-4 mt-4 p-4">
          <Text className="text-base font-semibold mb-3">
            Performance Metrics
          </Text>
          <View className="mb-3">
            <Text className="text-sm text-gray-500 mb-1">
              Acceptance Rate: {driverProfile.acceptanceRate}%
            </Text>
            <View className="w-full h-2 bg-gray-200 rounded-full">
              <View
                className="h-2 bg-blue-500 rounded-full"
                style={{ width: `${driverProfile.acceptanceRate}%` }}
              />
            </View>
          </View>

          <View className="mb-3">
            <Text className="text-sm text-gray-500 mb-1">
              Completion Rate: {driverProfile.completionRate}%
            </Text>
            <View className="w-full h-2 bg-gray-200 rounded-full">
              <View
                className="h-2 bg-green-500 rounded-full"
                style={{ width: `${driverProfile.completionRate}%` }}
              />
            </View>
          </View>

          <View className="flex-row justify-between items-center mt-2">
            <Text className="text-sm text-gray-500">Response Time</Text>
            <Text className="text-sm text-blue-500">
              {driverProfile.responseTime}
            </Text>
          </View>
        </View>

        {/* Achievements */}
        {/* <View className="bg-white rounded-2xl border border-gray-200 mx-4 mt-4 p-4">
          <Text className="text-base font-semibold mb-3">Achievements</Text>
          <View className="flex-row flex-wrap justify-between">
            {achievements.map((a, i) => (
              <View
                key={i}
                className={`w-[48%] p-3 mb-3 rounded-xl ${a.color}`}
              >
                <a.icon size={20} color="black" />
                <Text className="text-sm font-semibold mt-2">{a.title}</Text>
                <Text className="text-xs opacity-70">{a.desc}</Text>
              </View>
            ))}
          </View>
        </View> */}

        {/* Reviews */}
        <View className="bg-white rounded-3xl border border-gray-200 mx-4 mt-4 p-4">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-base font-semibold">Recent Reviews</Text>
            <TouchableOpacity onPress={()=>navigation.navigate("Reviews")}>
              <Text className="text-blue-500 text-sm font-semibold">
                View All
              </Text>
            </TouchableOpacity>
          </View>

          {recentReviews.map((r, i) => (
            <View key={i} className="mb-3 border-b border-gray-100 pb-3">
              <View className="flex-row items-start">
                <Image
                  source={{ uri: r.avatar }}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <View className="flex-1">
                  <View className="flex-row justify-between mb-1">
                    <Text className="text-sm font-medium text-gray-800">
                      {r.name}
                    </Text>
                    <Text className="text-xs text-gray-400">{r.date}</Text>
                  </View>
                  <View className="flex-row mb-1">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star key={j} size={12} color="#facc15" fill="#facc15" />
                    ))}
                  </View>
                  <Text className="text-xs text-gray-600">{r.comment}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
