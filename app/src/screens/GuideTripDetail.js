import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import {
  MapPin,
  Users,
  Clock,
  Calendar,
  Phone,
  MessageCircle,
  Navigation,
  DollarSign,
  Edit,
} from "lucide-react-native";

export default function GuideTripDetailScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("schedule");

  const tripData = {
    name: "Versailles Palace Tour",
    status: "scheduled",
    date: "Nov 10, 2025",
    startTime: "9:00 AM",
    endTime: "5:00 PM",
    pickupLocation: "Hotel Ritz Paris, 15 Place Vendôme",
    dropoffLocation: "Hotel Ritz Paris",
    price: 250,
    commission: 200,
    tourists: [
      {
        id: "1",
        name: "Lisa Anderson",
        email: "lisa.anderson@email.com",
        phone: "+1 555-0789",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
        age: "Adult",
        specialRequests: "Vegetarian meal",
      },
      {
        id: "2",
        name: "Robert Anderson",
        email: "robert.anderson@email.com",
        phone: "+1 555-0790",
        avatar:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
        age: "Adult",
      },
    ],
    schedule: [
      {
        id: 1,
        time: "9:00 AM",
        location: "Hotel Ritz Paris",
        activity: "Pick up tourists",
        duration: "15 mins",
        notes: "Meet at hotel lobby",
      },
      {
        id: 2,
        time: "10:15 AM",
        location: "Versailles Palace",
        activity: "Main Palace tour",
        duration: "90 mins",
        notes: "Explain history of Louis XIV",
      },
    ],
    includesTransport: true,
    includesMeals: true,
    maxGroupSize: 5,
    specialNotes:
      "Family trip with children. Vegetarian meal and wheelchair access required.",
  };

  const handleStartTrip = () => Alert.alert("Trip Started", "Navigation started!");
  const handleCall = (phone) => Alert.alert("Calling", phone);
  const handleMessage = (name) => Alert.alert("Messaging", `Chatting with ${name}`);

  return (
    <View className="flex-1 bg-white">

      <ScrollView
        className="p-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {/* Trip Summary */}
        <View className="bg-white border border-gray-200 rounded-3xl p-4 mb-4">
          <Text className="text-lg font-bold mb-1">{tripData.name}</Text>
          <View className="flex-row items-center mb-1">
            <Calendar size={16} color="#6b7280" />
            <Text className="ml-2 text-gray-600">{tripData.date}</Text>
          </View>
          <View className="flex-row items-center mb-2">
            <Clock size={16} color="#6b7280" />
            <Text className="ml-2 text-gray-600">
              {tripData.startTime} - {tripData.endTime}
            </Text>
          </View>

          <View className="flex-row justify-between mt-3">
            <View className="flex-1 items-center border-r border-gray-300">
              <Users size={20} color="#4a9eff" />
              <Text className="text-gray-700 mt-1">
                {tripData.tourists.length} Tourists
              </Text>
            </View>
            <View className="flex-1 items-center">
              <DollarSign size={20} color="#16a34a" />
              <Text className="text-gray-700 mt-1">${tripData.commission}</Text>
            </View>
          </View>
        </View>

        {/* Start Trip Button */}
        {tripData.status === "scheduled" && (
          <TouchableOpacity
            onPress={handleStartTrip}
            className="bg-primary rounded-3xl py-3 items-center mb-4"
          >
            <View className="flex-row items-center">
              <Navigation size={20} color="#fff" />
              <Text className="text-white font-semibold ml-2">Start Trip</Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Tabs */}
        <View className="bg-white border border-gray-200 rounded-3xl">
          <View className="flex-row border-b border-gray-200">
            {["schedule", "tourists", "info"].map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                className={`flex-1 py-3 rounded-3xl items-center ${
                  activeTab === tab ? "bg-primary/10" : ""
                }`}
              >
                <Text
                  className={`font-semibold ${
                    activeTab === tab ? "text-primary" : "text-gray-600"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Schedule Tab */}
          {activeTab === "schedule" && (
            <View className="p-4 gap-3">
                <Text className="font-bold text-base ,b-2">Schedule</Text>

              {tripData.schedule.map((item) => (
                <View
                  key={item.id}
                  className="border border-gray-200 rounded-3xl p-3 bg-gray-50"
                >
                  <Text className="font-semibold text-sm mb-1">
                    {item.activity}
                  </Text>
                  <View className="flex-row items-center mb-1">
                    <Clock size={12} color="#6b7280" />
                    <Text className="ml-1 text-xs text-gray-500">
                      {item.time} • {item.duration}
                    </Text>
                  </View>
                  <View className="flex-row items-center mb-1">
                    <MapPin size={12} color="#6b7280" />
                    <Text className="ml-1 text-xs text-gray-500">
                      {item.location}
                    </Text>
                  </View>
                  {item.notes && (
                    <Text className="text-xs text-gray-500 bg-gray-100 p-2 rounded-lg mt-1">
                      {item.notes}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Tourists Tab */}
          {activeTab === "tourists" && (
            <View className="p-4 gap-3">
              <Text className="font-semibold text-base mb-2">
                Tourists ({tripData.tourists.length})
              </Text>
              {tripData.tourists.map((t) => (
                <View
                  key={t.id}
                  className="flex-row bg-gray-50 p-3 rounded-3xl border border-gray-200"
                >
                  <Image
                    source={{ uri: t.avatar }}
                    className="w-12 h-12 rounded-full"
                  />
                  <View className="flex-1 ml-3">
                    <Text className="font-medium">{t.name}</Text>
                    <Text className="text-xs text-gray-500">{t.email}</Text>
                    <Text className="text-xs text-gray-500">{t.phone}</Text>
                    {t.specialRequests && (
                      <Text className="text-xs text-accent mt-1">
                        • {t.specialRequests}
                      </Text>
                    )}
                    <View className="flex-row mt-2">
                      <TouchableOpacity
                        onPress={() => handleCall(t.phone)}
                        className="flex-1 py-2 border border-gray-300 rounded-3xl mr-2 items-center"
                      >
                        <Phone size={16} color="#4a9eff" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleMessage(t.name)}
                        className="flex-1 py-2 border border-gray-300 rounded-3xl items-center"
                      >
                        <MessageCircle size={16} color="#16a34a" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Info Tab */}
          {activeTab === "info" && (
            <View className="p-4 gap-3">
              <View className="bg-gray-50 p-3 rounded-3xl">
                <Text className="font-semibold text-sm mb-1">
                  Pickup Location
                </Text>
                <Text className="text-xs text-gray-600">
                  {tripData.pickupLocation}
                </Text>
              </View>
              <View className="bg-gray-50 p-3 rounded-3xl">
                <Text className="font-semibold text-sm mb-1">
                  Dropoff Location
                </Text>
                <Text className="text-xs text-gray-600">
                  {tripData.dropoffLocation}
                </Text>
              </View>

              <View className="bg-gray-50 p-3 rounded-3xl">
                <Text className="font-semibold text-sm mb-1">Payment</Text>
                <Text className="text-xs text-gray-600">
                  Total: ${tripData.price} | You Earn: ${tripData.commission}
                </Text>
              </View>

              <View className="bg-gray-50 p-3 rounded-3xl">
                <Text className="font-semibold text-sm mb-1">
                  Included Services
                </Text>
                <Text className="text-xs text-gray-600">
                  ✓ Guide service
                  {tripData.includesTransport && " • Transport included"}
                  {tripData.includesMeals && " • Meals included"}
                  {" • Group size: " + tripData.maxGroupSize}
                </Text>
              </View>

              {tripData.specialNotes && (
                <View className="bg-yellow-50 p-3 rounded-3xl border border-yellow-200">
                  <Text className="font-semibold text-sm mb-1">
                    Special Notes
                  </Text>
                  <Text className="text-xs text-gray-700">
                    {tripData.specialNotes}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
