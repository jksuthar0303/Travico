import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useAuthStore } from "../../store/useAuthStore";
import {
  Globe,
  MapPin,
  Camera,
  Calendar,
  Star,
} from "lucide-react-native";

export default function Profile() {
  const { user } = useAuthStore();
  const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "?";

  return (
    <ScrollView className="bg-white p-4">
      {/* Profile Header */}
      <View className="flex-row items-center justify-start mb-6">
        {/* Profile Image (no upload logic) */}
        <View className="w-24 h-24 rounded-full overflow-hidden items-center justify-center bg-gray-200">
          {user?.profilePic ? (
            <Image
              source={{ uri: user.profilePic }}
              className="w-24 h-24 rounded-full"
              resizeMode="cover"
            />
          ) : (
            <Text className="text-white text-4xl font-bold bg-blue-500 w-full h-full text-center pt-6 rounded-full">
              {firstLetter}
            </Text>
          )}
        </View>

        {/* User Info */}
        <View className="ml-4">
          <Text className="text-2xl font-bold text-black">{user.name}</Text>
          <Text className="text-lg text-gray-400">Email : {user.email}</Text>
          <Text className="text-lg text-gray-400">
            Phone : {user.phone || "N/A"}
          </Text>
        </View>
      </View>

      {/* Stats Cards */}
      <View className="flex flex-row flex-wrap justify-between">
        <StatCard
          icon={<Globe size={20} color="#4a9eff" />}
          title="12"
          subtitle="Countries"
          style={styles.shadow}
        />
        <StatCard
          icon={<MapPin size={20} color="#a8d5ba" />}
          title="45"
          subtitle="Cities"
          style={styles.shadow}
        />
        <StatCard
          icon={<Camera size={20} color="orange" />}
          title="324"
          subtitle="Photos"
          style={styles.shadow}
        />
        <StatCard
          icon={<Calendar size={20} color="red" />}
          title="156"
          subtitle="Traveled"
          style={styles.shadow}
        />
      </View>

      {/* Recent Activity */}
      <View className="border border-gray-300 rounded-3xl mb-8 p-4">
        <Text className="text-lg mb-4 font-semibold">Recent Activity</Text>
        <Activity
          icon={<Camera size={20} color="#4a9eff" />}
          title="Added Photos to Paris"
          time="2 hours ago"
        />
        <Activity
          icon={<MapPin size={20} color="#4a9eff" />}
          title="Visited Tokyo, Japan"
          time="1 week ago"
        />
        <Activity
          icon={<Star size={20} color="#4a9eff" />}
          title="Earned World Explorer badge"
          time="2 weeks ago"
        />
      </View>
    </ScrollView>
  );
}

// Reusable Stat Card
const StatCard = ({ icon, title, subtitle, style }) => (
  <View
    className="w-[48%] bg-white h-36 rounded-2xl mb-4 items-start justify-center p-4"
    style={style}
  >
    <View className="bg-primary/10 rounded-full p-3 mb-2">{icon}</View>
    <Text className="text-2xl font-bold">{title}</Text>
    <Text className="text-gray-400">{subtitle}</Text>
  </View>
);

// Reusable Activity Card
const Activity = ({ icon, title, time }) => (
  <View className="bg-gray-200 rounded-3xl flex-row justify-start items-center gap-2 p-4 mb-3">
    <View className="bg-primary/10 w-12 h-12 rounded-full items-center justify-center">
      {icon}
    </View>
    <View>
      <Text className="text-lg">{title}</Text>
      <Text className="text-gray-500">{time}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  shadow: {
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
