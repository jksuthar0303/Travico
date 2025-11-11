import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import {
  MapPin,
  Users,
  Clock,
  Navigation,
  Phone,
  MessageCircle,
  CheckCircle,
  Circle,
  AlertCircle,
  Plus,
} from "lucide-react-native";

export default function GuideLiveTripScreen({ navigation }) {
  const [showAdd, setShowAdd] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [newActivity, setNewActivity] = useState({
    time: "",
    location: "",
    description: "",
  });

  const tourInfo = {
    name: "Eiffel Tower & Seine River Tour",
    tourists: ["Sarah", "Mark", "Emily", "Tom"],
    touristCount: 4,
    startTime: "10:00 AM",
    endTime: "1:00 PM",
    date: "Today, Nov 10",
    currentLocation: "Eiffel Tower",
    progress: 40,
  };

  const schedule = [
    {
      id: 1,
      time: "10:00 AM",
      location: "Hotel Le Meurice",
      activity: "Pick up tourists",
      status: "completed",
      duration: "15 mins",
    },
    {
      id: 2,
      time: "10:20 AM",
      location: "Eiffel Tower",
      activity: "Tower visit & history lesson",
      status: "in-progress",
      duration: "45 mins",
    },
    {
      id: 3,
      time: "11:15 AM",
      location: "Trocadéro Gardens",
      activity: "Photo session",
      status: "upcoming",
      duration: "20 mins",
    },
  ];

  const handleCompleteStep = (id) => {
    setCurrentStep(id + 1);
    Alert.alert("Activity Completed", "This step has been marked as complete!");
  };


  const handleEmergency = () => {
    Alert.alert("⚠️ Emergency", "SOS alert sent to admin and nearby guides!");
  };

  return (
    <View className="flex-1 bg-white">
    
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="p-4"
      >
        {/* Tour Info */}
        <View className="bg-white rounded-3xl border border-primary/20 p-4 mb-4">
          <Text className="text-lg font-bold mb-1">{tourInfo.name}</Text>
          <Text className="text-gray-500 text-sm mb-2">
            {tourInfo.startTime} - {tourInfo.endTime}
          </Text>
          <View className="flex-row items-center mb-2">
            <MapPin size={18} color="#4a9eff" />
            <Text className="ml-2 text-gray-600">
              {tourInfo.currentLocation}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Users size={18} color="#6b7280" />
            <Text className="ml-2 text-gray-600">
              {tourInfo.touristCount} Tourists
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="bg-white rounded-3xl border border-gray-200 p-4 mb-4">
          <Text className="font-semibold mb-3">Quick Actions</Text>
          <View className="flex-row justify-between">
            <TouchableOpacity className="items-center flex-1 p-3 border border-gray-300 rounded-3xl mx-1">
              <Navigation size={22} color="#4a9eff" />
              <Text className="text-xs mt-1">Navigate</Text>
            </TouchableOpacity>

            <TouchableOpacity className="items-center flex-1 p-3 border border-gray-300 rounded-3xl mx-1">
              <Phone size={22} color="#16a34a" />
              <Text className="text-xs mt-1">Call</Text>
            </TouchableOpacity>

            <TouchableOpacity className="items-center flex-1 p-3 border border-gray-300 rounded-3xl mx-1">
              <MessageCircle size={22} color="#ea580c" />
              <Text className="text-xs mt-1">Message</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleEmergency}
              className="items-center flex-1 p-3 border border-red-500 rounded-3xl mx-1"
            >
              <AlertCircle size={22} color="#dc2626" />
              <Text className="text-xs text-red-600 mt-1">SOS</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tour Schedule */}
        <View className="bg-white rounded-3xl border border-gray-200 p-4 mb-4">
            <Text className="font-bold text-base mb-2">Tour Schedule</Text>
     

          {schedule.map((item) => (
            <View
              key={item.id}
              className={`flex-row items-start p-3 rounded-3xl mb-3 border ${
                item.status === "completed"
                  ? "bg-gray-100 border-gray-300"
                  : item.status === "in-progress"
                  ? "bg-primary/10 border-primary/30"
                  : "bg-white border-gray-200"
              }`}
            >
              <View className="w-8 h-8 rounded-full items-center justify-center bg-primary/20 mr-3 mt-1">
                {item.status === "completed" ? (
                  <CheckCircle size={18} color="#16a34a" />
                ) : item.status === "in-progress" ? (
                  <Clock size={18} color="#4a9eff" />
                ) : (
                  <Circle size={18} color="#9ca3af" />
                )}
              </View>

              <View className="flex-1">
                <Text className="font-medium text-sm">{item.activity}</Text>
                <View className="flex-row items-center mt-1">
                  <Clock size={12} color="#9ca3af" />
                  <Text className="ml-1 text-xs text-gray-500">
                    {item.time} • {item.duration}
                  </Text>
                </View>
                <View className="flex-row items-center mt-1">
                  <MapPin size={12} color="#9ca3af" />
                  <Text className="ml-1 text-xs text-gray-500">
                    {item.location}
                  </Text>
                </View>

                {item.status === "in-progress" && (
                  <TouchableOpacity
                    onPress={() => handleCompleteStep(item.id)}
                    className="mt-3 bg-primary rounded-3xl py-2 items-center"
                  >
                    <Text className="text-white font-semibold text-sm">
                      Complete Activity
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Tourist List */}
        <View className="bg-white rounded-3xl border border-gray-200 p-4">
          <Text className="font-semibold mb-3">
            Tourists ({tourInfo.touristCount})
          </Text>
          {tourInfo.tourists.map((tourist, i) => (
            <View
              key={i}
              className="flex-row justify-between items-center p-3 bg-gray-50 rounded-xl mb-2"
            >
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-full bg-primary/20 items-center justify-center mr-3">
                  <Users size={20} color="#4a9eff" />
                </View>
                <Text>{tourist}</Text>
              </View>
              <CheckCircle size={18} color="#16a34a" />
            </View>
          ))}
        </View>
      </ScrollView>

    </View>
  );
}
