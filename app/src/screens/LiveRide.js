import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import {
  Navigation,
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Map as MapIcon,
} from "lucide-react-native";

export default function DriverLiveRideScreen({ navigation }) {
  const [currentStep, setCurrentStep] = useState("going-pickup");
  const [estimatedTime, setEstimatedTime] = useState(12);
  const [distanceRemaining, setDistanceRemaining] = useState(5.2);


  useEffect(() => {
    const interval = setInterval(() => {
      setEstimatedTime((prev) => Math.max(0, prev - 0.5));
      setDistanceRemaining((prev) => Math.max(0, prev - 0.1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const rideData = {
    passenger: {
      name: "Sarah Johnson",
      phone: "+1 555-0789",
      rating: 4.8,
      photo:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    pickup: {
      location: "Hotel Le Meurice",
      address: "228 Rue de Rivoli, Paris",
      time: "10:00 AM",
    },
    dropoff: {
      location: "CDG Airport - Terminal 2",
      address: "95700 Roissy-en-France",
      time: "10:45 AM",
    },
    fare: 65,
    distance: "28 km",
  };

  const handlePickedUp = () => {
    setCurrentStep("going-dropoff");
    setEstimatedTime(35);
    setDistanceRemaining(28);
  };

  const handleCompleteRide = () => {
    setCurrentStep("completed");
  };

  const handleEmergency = () => {
    alert("🚨 Emergency alert sent to authorities!");
  };

  return (
    <View className="flex-1 bg-white">


      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 px-4 pt-4"
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {/* Progress */}
        <View className="bg-gray-50 rounded-3xl p-4 border border-gray-200 mb-3">
          <View className="flex-row justify-between mb-2">
            <Text className="text-sm text-gray-500">Ride Progress</Text>
            <Text className="text-sm text-gray-600">
              {currentStep === "going-pickup"
                ? "25%"
                : currentStep === "going-dropoff"
                ? "75%"
                : currentStep === "completed"
                ? "100%"
                : "50%"}
            </Text>
          </View>
          <View className="w-full h-2 bg-gray-200 rounded-full mb-3">
            <View
              className={`h-2 rounded-full ${
                currentStep === "going-pickup"
                  ? "bg-primary w-1/2"
                  : currentStep === "going-dropoff"
                  ? "bg-primary w-10/12"
                  : currentStep === "completed"
                  ? "bg-green-500 w-full"
                  : "bg-primary/20 w-4"
              }`}
            />
          </View>
          <View className="flex-row justify-between">
            <View className="flex-row items-center">
              <Clock size={16} color="#4a9eff" />
              <Text className="ml-1 text-sm text-gray-700">
                ETA: {Math.ceil(estimatedTime)} min
              </Text>
            </View>
            <View className="flex-row items-center">
              <Navigation size={16} color="#6b7280" />
              <Text className="ml-1 text-sm text-gray-700">
                {distanceRemaining.toFixed(1)} km
              </Text>
            </View>
          </View>
        </View>

        {/* Ride Route */}
        <View className="bg-white rounded-3xl border border-gray-200 p-4 mb-3 shadow-sm">
          <View className="flex-row items-center mb-3">
            <MapIcon size={20} color="#4a9eff" />
            <Text className="text-base font-semibold text-gray-800 ml-2">
              {currentStep === "going-pickup"
                ? "Going to Pickup"
                : currentStep === "going-dropoff"
                ? "Going to Dropoff"
                : currentStep === "completed"
                ? "Ride Completed"
                : "Passenger Picked Up"}
            </Text>
          </View>

          <View className="gap-3">
            {/* Pickup */}
            <View
              className={`p-3 rounded-2xl ${
                currentStep === "going-pickup"
                  ? "bg-primary/10"
                  : "bg-gray-50"
              }`}
            >
              <View className="flex-row items-start">
                <View
                  className={`w-8 h-8 rounded-full items-center justify-center mr-3 ${
                    currentStep === "going-pickup"
                      ? "bg-primary/10"
                      : "bg-gray-200"
                  }`}
                >
                  <MapPin size={18} color="#4a9eff" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-semibold">Pickup</Text>
                  <Text className="text-xs text-gray-500">
                    {rideData.pickup.location}
                  </Text>
                  <Text className="text-xs text-gray-400">
                    {rideData.pickup.address}
                  </Text>
                </View>
              </View>
            </View>

            <View className="items-center">
              <ArrowRight size={20} color="#9ca3af" />
            </View>

            {/* Dropoff */}
            <View
              className={`p-3 rounded-xl ${
                currentStep === "going-dropoff"
                  ? "bg-red-50 border border-red-200"
                  : "bg-gray-50"
              }`}
            >
              <View className="flex-row items-start">
                <View
                  className={`w-8 h-8 rounded-full items-center justify-center mr-3 ${
                    currentStep === "going-dropoff"
                      ? "bg-red-100"
                      : "bg-gray-200"
                  }`}
                >
                  <MapPin size={18} color="#dc2626" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-semibold">Dropoff</Text>
                  <Text className="text-xs text-gray-500">
                    {rideData.dropoff.location}
                  </Text>
                  <Text className="text-xs text-gray-400">
                    {rideData.dropoff.address}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Passenger Info */}
        <View className="bg-white rounded-3xl border border-gray-200 p-4 mb-3">
          <Text className="font-semibold mb-3">Passenger</Text>
          <View className="flex-row items-center mb-3">
            <Image
              source={{ uri: rideData.passenger.photo }}
              className="w-12 h-12 rounded-full mr-3"
            />
            <View className="flex-1">
              <Text className="font-semibold text-gray-800">
                {rideData.passenger.name}
              </Text>
              <Text className="text-xs text-gray-500">
                {rideData.passenger.phone}
              </Text>
            </View>
            <Text className="text-xs">⭐ {rideData.passenger.rating}</Text>
          </View>

          <View className="flex-row gap-2">
            <TouchableOpacity className="flex-1 border border-gray-300 rounded-xl py-2 items-center">
              <Phone size={18} color="green" />
              <Text className="text-xs mt-1">Call</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 border border-gray-300 rounded-xl py-2 items-center">
              <MessageCircle size={18} color="orange" />
              <Text className="text-xs mt-1">Message</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Fare Info */}
        <View className="bg-white rounded-2xl border border-gray-200 p-4 mb-3">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-xs text-gray-500 mb-1">Fare</Text>
              <Text className="text-2xl font-semibold text-green-600">
                ${rideData.fare}
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-xs text-gray-500 mb-1">Distance</Text>
              <Text className="text-base">{rideData.distance}</Text>
            </View>
          </View>
        </View>

        {/* Buttons */}
        {currentStep === "going-pickup" && (
          <TouchableOpacity
            onPress={handlePickedUp}
            className="bg-primary py-3 rounded-3xl items-center flex-row justify-center"
          >
            <CheckCircle size={18} color="#fff" />
            <Text className="text-white text-base font-semibold ml-2">
              Confirm Pickup
            </Text>
          </TouchableOpacity>
        )}

        {currentStep === "going-dropoff" && (
          <TouchableOpacity
            onPress={handleCompleteRide}
            className="bg-green-600 py-3 rounded-3xl items-center flex-row justify-center"
          >
            <CheckCircle size={18} color="#fff" />
            <Text className="text-white text-base font-semibold ml-2">
              Complete Ride
            </Text>
          </TouchableOpacity>
        )}

        {currentStep === "completed" && (
          <View className="bg-green-50 rounded-3xl p-6 items-center mt-3">
            <CheckCircle size={40} color="#16a34a" />
            <Text className="text-lg font-semibold mt-2">Ride Completed!</Text>
            <Text className="text-sm text-gray-500 mt-1">
              Payment of ${rideData.fare} received
            </Text>
          </View>
        )}

        <TouchableOpacity
          onPress={handleEmergency}
          className="border border-red-500 py-3 rounded-3xl flex-row justify-center items-center mt-4"
        >
          <AlertCircle size={18} color="#dc2626" />
          <Text className="text-red-600 text-base font-semibold ml-2">
            Emergency SOS
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
