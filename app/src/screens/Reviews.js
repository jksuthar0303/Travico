import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  Star,
  Filter,
  ThumbsUp,
} from "lucide-react-native";

export default function Reviews() {
  const [filter, setFilter] = useState("all");

  const reviewStats = {
    average: 4.9,
    total: 127,
    breakdown: {
      5: 98,
      4: 22,
      3: 5,
      2: 1,
      1: 1,
    },
  };

  const allReviews = [
    {
      id: "1",
      name: "Sarah Johnson",
      rating: 5,
      date: "2 days ago",
      tourName: "Eiffel Tower Historical Tour",
      comment:
        "Pierre was absolutely amazing! His knowledge of Paris history is incredible. He made the tour engaging and fun for everyone in our group. Highly recommend!",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      helpful: 12,
    },
    {
      id: "2",
      name: "Mike Davis",
      rating: 5,
      date: "5 days ago",
      tourName: "Louvre Museum Art Tour",
      comment:
        "Best tour guide ever! Made our trip unforgettable. Very professional and friendly. Pierre knows how to bring art to life!",
      avatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
      helpful: 8,
    },
    {
      id: "3",
      name: "Emma Wilson",
      rating: 4,
      date: "1 week ago",
      tourName: "Paris Food & Wine Tour",
      comment:
        "Great experience! Pierre knows all the hidden gems in Paris. The food was amazing and he was very knowledgeable. Would book again!",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      helpful: 15,
    },
    {
      id: "4",
      name: "John Smith",
      rating: 5,
      date: "2 weeks ago",
      tourName: "Notre Dame & Latin Quarter",
      comment:
        "Outstanding guide! Pierre's passion for Paris shines through. He was patient with all our questions and went above and beyond.",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      helpful: 20,
    },
    {
      id: "5",
      name: "Lisa Anderson",
      rating: 5,
      date: "3 weeks ago",
      tourName: "Versailles Palace Tour",
      comment:
        "Pierre made the history of Versailles come alive! His storytelling ability is exceptional. One of the best tours we've ever taken.",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      helpful: 18,
    },
  ];

  const filteredReviews =
    filter === "all"
      ? allReviews
      : allReviews.filter(
          (review) => review.rating === parseInt(filter)
        );

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        className="p-4"
      >
        {/* Overview */}
        <View className="bg-blue-50 border border-blue-100 rounded-3xl p-6 mb-4">
          <View className="items-center mb-6">
            <Text className="text-5xl font-bold text-gray-800 mb-2">
              {reviewStats.average}
            </Text>
            <View className="flex-row mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  color={i < Math.floor(reviewStats.average) ? "#facc15" : "#d1d5db"}
                  fill={i < Math.floor(reviewStats.average) ? "#facc15" : "none"}
                />
              ))}
            </View>
            <Text className="text-sm text-gray-500">
              Based on {reviewStats.total} reviews
            </Text>
          </View>

          {/* Rating Breakdown */}
          <View>
            {[5, 4, 3, 2, 1].map((rating) => {
              const count =
                reviewStats.breakdown[rating];
              const percentage = (count / reviewStats.total) * 100;
              return (
                <TouchableOpacity
                  key={rating}
                  onPress={() => setFilter(rating.toString())}
                  className={`flex-row items-center mb-2 rounded-xl p-2 ${
                    filter === rating.toString()
                      ? "bg-gray-100"
                      : "bg-transparent"
                  }`}
                >
                  <View className="flex-row items-center w-12">
                    <Text className="text-sm text-gray-700 mr-1">
                      {rating}
                    </Text>
                    <Star size={12} color="#facc15" fill="#facc15" />
                  </View>
                  <View className="flex-1 bg-gray-200 h-2 rounded-full mr-2 overflow-hidden">
                    <View
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </View>
                  <Text className="text-xs text-gray-500 w-6 text-right">
                    {count}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Filter Buttons */}
        <View className="flex-row mb-4">
          {["all", "5", "4", "3"].map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setFilter(f)}
              className={`px-4 py-2 rounded-full mr-2 border ${
                filter === f
                  ? "bg-blue-500 border-blue-500"
                  : "bg-white border-gray-300"
              }`}
            >
              <Text
                className={`text-sm ${
                  filter === f ? "text-white" : "text-gray-700"
                }`}
              >
                {f === "all" ? "All Reviews" : `${f} Stars`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Reviews Header */}
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-lg font-semibold">
            {filteredReviews.length} Reviews
          </Text>
        </View>

        {/* Reviews List */}
        {filteredReviews.map((review) => (
          <View
            key={review.id}
            className="bg-white border border-gray-200 rounded-3xl p-4 mb-3 shadow-sm"
          >
            <View className="flex-row mb-3">
              <Image
                source={{ uri: review.avatar }}
                className="w-12 h-12 rounded-full mr-3"
              />
              <View className="flex-1">
                <View className="flex-row justify-between mb-1">
                  <Text className="font-medium text-sm text-gray-800">
                    {review.name}
                  </Text>
                  <Text className="text-xs text-gray-500">
                    {review.date}
                  </Text>
                </View>
                <View className="flex-row mb-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={14} color="#facc15" fill="#facc15" />
                  ))}
                </View>
                <View className="bg-gray-100 px-2 py-1 rounded-full w-fit">
                  <Text className="text-xs text-gray-600">
                    {review.tourName}
                  </Text>
                </View>
              </View>
            </View>

            <Text className="text-gray-600 text-sm mb-3">
              {review.comment}
            </Text>

            <View className="h-[1px] bg-gray-200 mb-3" />

            {/* <TouchableOpacity className="flex-row items-center">
              <ThumbsUp size={18} color="#6b7280" />
              <Text className="text-sm text-gray-600 ml-2">
                Helpful ({review.helpful})
              </Text>
            </TouchableOpacity> */}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
