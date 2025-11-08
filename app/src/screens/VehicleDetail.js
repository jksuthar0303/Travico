import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Car, Phone, User } from "lucide-react-native";
import { useToastStore } from "../../store/useToastStore";

export default function VehicleDetailScreen() {
    const showToast = useToastStore((s) => s.showToast);

    const vehicle = {
        model: "Toyota Innova Crysta",
        number: "DL 01 AB 1234",
        type: "AC SUV",
        color: "Silver",
        status: "On Trip",
    };

    const driver = {
        name: "Rohit Sharma",
        phone: "+91 98765 43210",
        rating: 4.8,
        license: "DL-092024-5678",
        image: "https://randomuser.me/api/portraits/men/44.jpg",
    };

    const trip = {
        from: "Delhi Airport (T3)",
        to: "Connaught Place",
        startTime: "10:45 AM",
        estimatedArrival: "11:25 AM",
        distance: "18 km",
        status: "In Progress",
    };

    const handleCall = () => {
        showToast(`Calling Driver... ${driver.phone}`, "info");
    };

    return (
        <View className="flex-1 bg-white">
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Driver Info */}
                <View className="m-4 p-5 bg-gray-50 rounded-3xl shadow-sm border border-gray-100">
                    <View className="flex-row items-center mb-3">
                        <User size={22} color="green" />
                        <Text className="ml-2 text-lg font-semibold text-gray-800">
                            Driver Information
                        </Text>
                    </View>

                    <View className="flex-row items-center mt-2">
                        <Image
                            source={{ uri: driver.image }}
                            className="h-16 w-16 rounded-full border-2 border-purple-200"
                        />
                        <View className="ml-3 flex-1">
                            <Text className="text-lg font-semibold text-gray-800">
                                {driver.name}
                            </Text>
                            <Text className="text-gray-600 text-sm mt-1">
                                ⭐ {driver.rating} Rating
                            </Text>
                            <Text className="text-gray-500 text-sm">
                                License: {driver.license}
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={handleCall}
                        className="mt-4 flex-row justify-center items-center bg-green-100 rounded-2xl py-3"
                    >
                        <Phone size={18} color="#16a34a" />
                        <Text className="ml-2 text-green-700 font-semibold">
                            Call {driver.name}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Vehicle Info */}
                <View className="m-4 p-5 bg-gray-50 rounded-3xl shadow-sm border border-gray-100">
                    <View className="flex-row items-center mb-3">
                        <Car size={22} color="#4a9eff" />
                        <Text className="ml-2 text-lg font-semibold text-gray-800">
                            Vehicle Information
                        </Text>
                    </View>

                    <View className="space-y-2">
                        <Text className="text-gray-700">Model: {vehicle.model}</Text>
                        <Text className="text-gray-700">Number: {vehicle.number}</Text>
                        <Text className="text-gray-700">Type: {vehicle.type}</Text>
                        <Text className="text-gray-700">Color: {vehicle.color}</Text>
                        <Text
                            className={`text-sm mt-2 font-semibold ${vehicle.status === "On Trip" ? "text-green-600" : "text-gray-600"
                                }`}
                        >
                            Status: {vehicle.status}
                        </Text>
                    </View>
                </View>
                {/* Status Card */}
                <LinearGradient
                    colors={["#4a9eff", "#a8d5ba"]}
                    className="m-4 p-5 shadow"
                    style={{ borderRadius: 24 }}
                >
                    {/* Top: Trip Status */}
                    <View className="flex-row justify-between items-center mb-4">
                        <View>
                            <Text className="font-bold mb-1 text-lg text-white">Trip Status</Text>
                            <Text className="text-gray-100 text-sm">{trip.status}</Text>
                        </View>
                        <Text className="text-3xl">🚗</Text>
                    </View>

                    {/* Divider */}
                    <View className="h-[1px] bg-white/30 my-2" />

                    {/* Simplified Rate Card */}
                    <Text className="text-white font-semibold text-base mb-3">Rate Card</Text>

                    <View className="bg-white/15 rounded-2xl p-4 flex-row justify-between items-center">
                        <View>
                            <Text className="text-white/90 text-sm">Fare Type</Text>
                            <Text className="text-white font-semibold mt-1">Per Km</Text>
                            {/* or use "Per Day" depending on trip type */}
                        </View>

                        <View className="items-end">
                            <Text className="text-white/90 text-sm">Rate</Text>
                            <Text className="text-white font-bold text-xl mt-1">₹25</Text>
                        </View>
                    </View>


                </LinearGradient>


            </ScrollView>
        </View>
    );
}

