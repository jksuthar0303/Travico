import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Compass, Plus, Clock, Shield, Users, TrendingUp } from "lucide-react-native";
import LinearGradient from "react-native-linear-gradient";
import swiss from "../../assets/swiss.jpg"
import japan from "../../assets/japan.jpg"
import greece from "../../assets/greece.jpg"
import TripCard from "../components/TripCard";

export default function Home() {
  const navigation = useNavigation();

  return (
    <ScrollView className="p-4 flex-1 bg-white">
      <TripCard onPress={() => navigation.navigate("OnGoingTrip")} />

      <View className="mt-6">
        <View className="flex-row items-center gap-2 mb-4">
        <Compass size={24} color="#4a9eff" />
          <Text className="text-lg">Quick Actions</Text>
        </View>

        <View className="flex-row flex-wrap justify-between">
          <Pressable onPress={() => navigation.navigate("Create-Trip")} className="w-[48%] h-32 rounded-2xl overflow-hidden mb-4" style={styles.shadow}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={["#3b82f6", "#a8d5ba"]}
              className="flex-1 p-4 items-center justify-center gap-2"
            >
             <Plus size={28} color="white" />
              <Text className="text-lg text-white">Plan Trip</Text>
            </LinearGradient>
          </Pressable>

          <Pressable onPress={() => navigation.navigate("History")} className="w-[48%] h-32 rounded-2xl overflow-hidden mb-4" style={styles.shadow}>
            <View

              className="flex-1 p-4 items-center justify-center gap-2 bg-yellow-500"
            >
              <Clock size={28} color="white" />
              <Text className="text-lg text-white">history</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("SOS")} className="w-[48%] h-32 rounded-2xl overflow-hidden mb-4" style={styles.shadow}>
            <View

              className="flex-1 p-4 items-center justify-center gap-2 bg-orange-600"
            >
              <Shield size={28} color="white" />
              <Text className="text-lg text-white">Safety</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Contact")} className="w-[48%] h-32 rounded-2xl overflow-hidden mb-4" style={styles.shadow}>
            <LinearGradient
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 1 }}
              colors={["#bb49f1", "#e442b7"]}
              className="flex-1 p-4 items-center justify-center gap-2"
            >
              <Users size={28} color="white" />
              <Text className="text-lg text-white">Contact</Text>
            </LinearGradient>
          </Pressable>
        </View>

      </View>

      <View className="mt-6 mb-8">
        <View className="flex-row items-center justify-between gap-2 mb-4">
          <View className="flex-row gap-2 items-center">
          <TrendingUp size={24} color="green" />
            <Text className="text-lg">Trending Destinations</Text>
          </View>
          <Pressable onPress={() => navigation.navigate("Places")}>
            <Text className="text-primary">View All</Text>
          </Pressable>
        </View>

        <View className="gap-4">
        <Pressable
          onPress={() => navigation.navigate("PlaceDetail")}
          className="w-full rounded-2xl h-36 flex-row items-center bg-white"
          style={styles.shadow}
        >
          <Image
            source={greece}
            className="w-28 h-28 rounded-2xl ml-4"
            resizeMode="cover"
          />

          <View className="flex-1 p-4">
            <Text className="text-lg">Santorini, Greece</Text>
            <Text className="bg-secondary text-center rounded-2xl text-sm px-3 py-1 my-2">
              Beach Paradise
            </Text>

            {/* This line below creates the correct gap/justified row */}
            <View className="mt-4 flex-row justify-between items-center">
              <Text className="text-gray-400">Starting from : </Text>
              <Text className="text-end text-primary text-lg font-semibold">$1,299</Text>
            </View>
          </View>
        </Pressable>

        <Pressable
          onPress={() => console.log("press")}
          className="w-full rounded-2xl h-36 flex-row items-center bg-white"
          style={styles.shadow}
        >
          <Image
            source={japan}
            className="w-28 h-28 rounded-2xl ml-4"
            resizeMode="cover"
          />

          <View className="flex-1 p-4">
            <Text className="text-lg">Kyoto, Japan</Text>
            <Text className="bg-secondary text-center rounded-2xl text-sm px-3 py-1 my-2">
            Cultural Heritage
            </Text>

            {/* This line below creates the correct gap/justified row */}
            <View className="mt-4 flex-row justify-between items-center">
              <Text className="text-gray-400">Starting from : </Text>
              <Text className="text-end text-primary text-lg font-semibold">$1,799</Text>
            </View>
          </View>
        </Pressable>
        <Pressable
          onPress={() => console.log("press")}
          className="w-full rounded-2xl h-36 flex-row items-center bg-white"
          style={styles.shadow}
        >
          <Image
            source={swiss}
            className="w-28 h-28 rounded-2xl ml-4"
            resizeMode="cover"
          />

          <View className="flex-1 p-4">
            <Text className="text-lg">Swiss Alps</Text>
            <Text className="bg-secondary text-center rounded-2xl text-sm px-3 py-1 my-2">
            Mountain Adventure
            </Text>

            {/* This line below creates the correct gap/justified row */}
            <View className="mt-4 flex-row justify-between items-center">
              <Text className="text-gray-400">Starting from : </Text>
              <Text className="text-end text-primary text-lg font-semibold">$1,899</Text>
            </View>
          </View>
        </Pressable>
        </View>

      </View>

      <View className="bg-primary/20 mb-8 h-32 rounded-3xl p-6 flex border border-primary justify-center">
      <Text className="mb-2 text-lg">💡 Travel Tip of the day</Text>
      <Text className="text-gray-400">Download offline maps before your trip to navigate without internet. It's a lifesaver in foreign countries!</Text>

      </View>
    </ScrollView>

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