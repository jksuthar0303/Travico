import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  MapPin,
  Star,
  Award,
  Users,
  DollarSign,
  Calendar,
  Edit,
  CheckCircle,
  Languages,
  Globe,
} from "lucide-react-native";

export default function GuideProfile({ navigation }) {
  const guideProfile = {
    name: "Pierre Dubois",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    title: "Professional Tour Guide",
    location: "Paris, France",
    memberSince: "2019",
    verified: true,
    languages: ["English", "French", "Spanish", "Italian"],
    specializations: [
      "Historical Tours",
      "Art & Culture",
      "Food Tours",
      "Architecture",
    ],
    rating: 4.9,
    totalReviews: 127,
    totalTours: 456,
    totalTourists: 1834,
    responseTime: "< 1 hour",
    responseRate: 98,
  };

  const stats = [
    { label: "Total Tours", value: guideProfile.totalTours, icon: Calendar,color: "#4a9eff" },
    { label: "Happy Tourists", value: guideProfile.totalTourists, icon: Users,color:"#994FB2" },
    { label: "Avg Rating", value: guideProfile.rating, icon: Star,color: "#FBB149" },
    { label: "Reviews", value: guideProfile.totalReviews, icon: Award,color: "#3fa62c" },
  ];

  const achievements = [
    {
      title: "Top Rated Guide",
      description: "Maintained 4.8+ rating for 1 year",
      icon: Star,
      color: "bg-amber-100 text-amber-700",
    },
    {
      title: "Super Host",
      description: "100+ completed tours",
      icon: Award,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Quick Responder",
      description: "98% response rate",
      icon: CheckCircle,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Tourist Favorite",
      description: "1000+ satisfied tourists",
      icon: Users,
      color: "bg-purple-100 text-purple-700",
    },
  ];

  const recentReviews = [
    {
      name: "Sarah Johnson",
      rating: 5,
      date: "2 days ago",
      comment:
        "Pierre was absolutely amazing! His knowledge of Paris history is incredible. Highly recommend!",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    {
      name: "Mike Davis",
      rating: 5,
      date: "5 days ago",
      comment:
        "Best tour guide ever! Made our trip unforgettable. Very professional and friendly.",
      avatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
    },
  ];

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        {/* Header */}
          <View className="flex-row items-center p-4">
            <View className="relative">
              <Image
                source={{ uri: guideProfile.photo }}
                className="w-32 h-32 rounded-full border-4 border-white"
              />
              {guideProfile.verified && (
                <View className="absolute bottom-1 right-1 bg-green-500 rounded-full p-1 border-2 border-white">
                  <CheckCircle size={18} color="white" />
                </View>
              )}
            </View>
           <View className="items-start ml-2">
           <Text className="text-2xl font-bold  mt-3">
              {guideProfile.name}
            </Text>
            <Text className=" text-sm">{guideProfile.title}</Text>
            <View className="flex-row items-center justify-center mt-2">
              <MapPin size={16} color="white" />
              <Text className=" ml-1 text-sm text-gray-500 ">
                {guideProfile.location}
              </Text>
            </View>
            <View className="bg-primary/20 rounded-2xl px-3 py-1 mt-3">
              <Text className=" text-xs  text-gray-600">
                Member since {guideProfile.memberSince}
              </Text>
            </View>
           </View>
            <TouchableOpacity className="flex-1 items-center py-3" onPress={()=>navigation.navigate("Earnings")}>
              <DollarSign size={28} color="#10b981" />
            </TouchableOpacity>
          </View>

        {/* Stats */}
        <View className="flex-row mx-4 mt-4 flex-wrap gap-3">
          {stats.map((s, i) => (
            <View
              key={i}
              className="bg-gray-50 border w-[48%] border-gray-200 rounded-3xl p-4"
            >
              <View className="flex-row items-center mb-1">
                <s.icon size={20} color={s.color} />
                <Text className="text-xs text-gray-500 ml-2">{s.label}</Text>
              </View>
              <Text className="text-xl font-semibold text-gray-800">
                {s.value}
              </Text>
            </View>
          ))}
        </View>

        {/* Response Metrics */}
        <View className="mx-4 mt-4 bg-white border border-gray-200 rounded-3xl p-4">
          <Text className="text-base font-semibold mb-3">
            Response Metrics
          </Text>
          <View className="flex-row justify-between mb-2">
            <Text className="text-sm text-gray-500">Response Rate</Text>
            <Text className="text-sm font-semibold">
              {guideProfile.responseRate}%
            </Text>
          </View>
          <View className="w-full h-2 bg-gray-200 rounded-full mb-3">
            <View
              className="h-2 bg-green-500 rounded-full"
              style={{ width: `${guideProfile.responseRate}%` }}
            />
          </View>
          <View className="flex-row justify-between">
            <Text className="text-sm text-gray-500">Response Time</Text>
            <View className="bg-gray-100 px-3 py-1 rounded-full">
              <Text className="text-xs text-gray-700">
                {guideProfile.responseTime}
              </Text>
            </View>
          </View>
        </View>

        {/* Languages */}
        <View className="mx-4 mt-4 bg-white border border-gray-200 rounded-3xl p-4">
          <View className="flex-row items-center mb-3">
            <Languages size={18} color="#4a9eff" />
            <Text className="ml-2 text-base font-semibold">Languages</Text>
          </View>
          <View className="flex-row flex-wrap gap-2">
            {guideProfile.languages.map((lang, index) => (
              <View
                key={index}
                className="bg-blue-100 px-3 py-1 rounded-full"
              >
                <Text className="text-sm text-primary">{lang}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Specializations */}
        <View className="mx-4 mt-4 bg-white border border-gray-200 rounded-3xl p-4">
          <View className="flex-row items-center mb-3">
            <Globe size={18} color="#9333ea" />
            <Text className="ml-2 text-base font-semibold">
              Specializations
            </Text>
          </View>
          <View className="flex-row flex-wrap gap-2">
            {guideProfile.specializations.map((spec, index) => (
              <View
                key={index}
                className="bg-purple-100 px-3 py-1 rounded-full"
              >
                <Text className="text-sm text-purple-700">{spec}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Achievements */}
        {/* <View className="mx-4 mt-4 bg-white border border-gray-200 rounded-3xl p-4">
          <Text className="text-base font-semibold mb-3">Achievements</Text>
          <View className="flex-row flex-wrap justify-between">
            {achievements.map((ach, index) => (
              <View
                key={index}
                className={`w-[48%] mb-3 rounded-2xl p-3 ${ach.color}`}
              >
                <ach.icon size={22} color="black" />
                <Text className="text-sm font-semibold mt-2">
                  {ach.title}
                </Text>
                <Text className="text-xs mt-1">{ach.description}</Text>
              </View>
            ))}
          </View>
        </View> */}

        {/* Reviews */}
        <View className="mx-4 mt-4 bg-white border border-gray-200 rounded-3xl p-4 mb-8">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-base font-semibold">Recent Reviews</Text>
            <TouchableOpacity onPress={()=>navigation.navigate("Reviews")}>
              <Text className="text-primary text-sm">View All</Text>
            </TouchableOpacity>
          </View>
          {recentReviews.map((r, i) => (
            <View key={i} className="flex-row mb-4">
              <Image
                source={{ uri: r.avatar }}
                className="w-10 h-10 rounded-full mr-3"
              />
              <View className="flex-1">
                <View className="flex-row justify-between">
                  <Text className="font-medium text-sm">{r.name}</Text>
                  <Text className="text-xs text-gray-500">{r.date}</Text>
                </View>
                <View className="flex-row mt-1 mb-1">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} size={12} color="#facc15" fill="#facc15" />
                  ))}
                </View>
                <Text className="text-xs text-gray-600">{r.comment}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
