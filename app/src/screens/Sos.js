import React from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
import {
  AlertCircle,
  Phone,
  Shield,
  Map,
  Hotel,
  Hospital,
  Copy,
} from "lucide-react-native";

export default function Sos() {
  return (
    <ScrollView>
      <SafeAreaView className="bg-white flex-1">
        {/* Universal Emergency Card */}
        <View
          style={styles.shadow}
          className="bg-red-500 h-40 m-4 rounded-2xl p-4 flex justify-between"
        >
          <View className="flex-row items-center gap-2">
            <AlertCircle size={30} color="#fff" />
            <View>
              <Text className="text-white text-lg font-extrabold">
                Universal Emergency
              </Text>
              <Text className="text-gray-200 text-md">Works across Europe</Text>
            </View>
          </View>
          <Pressable
            onPress={() => console.log("press")}
            className="bg-white h-16 rounded-3xl justify-center items-center"
          >
            <View className="flex-row items-center gap-2">
              <Phone size={24} color="red" />
              <Text className="text-red-500 text-xl">112</Text>
            </View>
          </Pressable>
        </View>

        {/* Emergency Contacts Section */}
        <View className="mt-6 mx-4">
          <View className="flex-row items-center gap-2 mb-6">
            <Phone size={20} color="#4a9eff" />
            <Text className=" text-lg">Emergency Contacts</Text>
          </View>

          {/* Contact Cards */}
          {[
            {
              title: "Police Emergency",
              color: "#4a9eff",
              number: "112",
              border: "border-primary",
            },
            {
              title: "Ambulance",
              color: "#FF5349",
              number: "15",
              border: "border-red-500",
            },
            {
              title: "Fire Department",
              color: "#FFA500",
              number: "16",
              border: "border-orange-400",
            },
            {
              title: "Tourist Police",
              color: "#a8d5ba",
              number: "20",
              border: "border-secondary",
            },
          ].map((item, i) => (
            <View
              key={i}
              className={`rounded-3xl h-40 border ${item.border} p-4 mb-6`}
              style={{ backgroundColor: `${item.color}20` }}
            >
              <View className="flex-row items-center gap-2 mb-6">
                <View className="w-12 h-12 bg-white/50 rounded-full justify-center items-center">
                  <Shield size={25} color="black" />
                </View>
                <View>
                  <Text className="text-lg">{item.title}</Text>
                  <Text className="text-sm text-gray-500">24/7</Text>
                </View>
              </View>
              <View className="flex-row justify-center gap-2">
                <Pressable
                  onPress={() => console.log("press")}
                  className="bg-white h-14 rounded-3xl flex-1 justify-center items-center"
                >
                  <View className="flex-row items-center gap-2">
                    <Phone size={24} color={item.color} />
                    <Text style={{ color: item.color }} className="text-xl">
                      {item.number}
                    </Text>
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => console.log("copy")}
                  className="bg-white h-14 rounded-3xl justify-center p-4 items-center"
                >
                  <Copy size={20} color="black" />
                </Pressable>
              </View>
            </View>
          ))}
        </View>

        {/* Safety Tips */}
        <View className="mt-6 border border-gray-300 mx-4 rounded-3xl p-4">
          <Text className="text-lg mb-4">Safety Tips</Text>
          <View className="flex flex-row flex-wrap justify-between">
            <View className="w-[48%] bg-gray-300/30 rounded-3xl mb-4 items-start p-4 justify-center">
              <Shield size={20} color="#4a9eff" />
              <Text className="text-black font-semibold">
                Keep Emergency Numbers Saved
              </Text>
              <Text className="text-gray-500 text-sm font-semibold">
                Save local emergency numbers in your phone contacts
              </Text>
            </View>
            <View className="w-[48%] bg-gray-300/30 rounded-3xl mb-4 items-start p-4 justify-center">
              <Map size={20} color="#4a9eff" />
              <Text className="text-black font-semibold">Share Your Location</Text>
              <Text className="text-gray-500 text-sm font-semibold">
                Share your live location with family or friends
              </Text>
            </View>
            <View className="w-[48%] bg-gray-300/30 rounded-3xl mb-4 items-start p-4 justify-center">
              <Hotel size={20} color="#4a9eff" />
              <Text className="text-black font-semibold">Know Your Embassy</Text>
              <Text className="text-gray-500 text-sm font-semibold">
                Keep your embassy contact information handy
              </Text>
            </View>
            <View className="w-[48%] bg-gray-300/30 rounded-3xl mb-4 items-start p-4 justify-center">
              <Hospital size={20} color="#4a9eff" />
              <Text className="text-black font-semibold">Medical Insurance</Text>
              <Text className="text-gray-500 text-sm font-semibold">
                Always carry your travel insurance details
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
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
