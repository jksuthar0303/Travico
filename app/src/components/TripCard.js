import React from "react";
import { View, Text, ImageBackground, Pressable, StyleSheet } from "react-native";
import { Calendar, ChevronRight } from "lucide-react-native"; 
import Paris from "../../assets/paris.jpg";

export default function TripCard({ onPress }) {
  return (
    <Pressable
      onPress={onPress}
      className="rounded-3xl overflow-hidden border border-primary"
      style={styles.shadow}
    >
      <ImageBackground
        source={Paris}
        className="w-full h-56"
        resizeMode="cover"
      >
        {/* Black translucent overlay */}
        <View className="absolute inset-0 bg-black/40" />

        {/* Badge */}
        <View className="absolute top-4 left-4 flex-row items-center bg-green-600 rounded-xl px-2 py-1">
          <View className="w-2 h-2 rounded-full bg-red-500 mr-1" />
          <Text className="text-white text-xs font-bold ml-1">Live Trip</Text>
        </View>

        {/* Content overlay */}
        <View className="absolute left-4 bottom-14">
          <Text className="text-white text-lg font-bold">Paris, France</Text>
          <View className="flex-row items-center mt-1">
            <Calendar size={14} color="#fff" />
            <Text className="text-white text-xs ml-1">Dec 15 - Dec 20</Text>
            <ChevronRight size={12} color="#fff" style={{ marginHorizontal: 6 }} />
            <Calendar size={14} color="#fff" />
            <Text className="text-white text-xs ml-1">Day 2 of 5</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View className="absolute left-4 right-4 bottom-8 flex-row items-center">
          <View className="h-2 rounded-full bg-green-500 flex-1" style={{ width: "40%" }} />
          <View className="h-2 rounded-full bg-white/30 flex-1" style={{ width: "60%" }} />
        </View>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  shadow: {
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
