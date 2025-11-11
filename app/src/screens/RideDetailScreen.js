import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import {
    MapPin,
    Clock,
    Calendar,
    Navigation,
    DollarSign,
    Phone,
    MessageCircle,
    Info,
    Mail,
    Star,
} from "lucide-react-native";

export default function DriverRideDetailScreen({ navigation }) {
    const [activeTab, setActiveTab] = useState("details");

    const rideData = {
        status: "scheduled",
        passenger: {
            name: "John Smith",
            email: "john.smith@email.com",
            phone: "+1 555-0792",
            photo:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
            rating: 4.8,
            totalRides: 45,
        },
        pickup: {
            location: "CDG Airport - Terminal 2",
            address: "95700 Roissy-en-France",
            time: "9:00 AM",
            notes: "Terminal 2E, Gate K",
        },
        dropoff: {
            location: "Hotel Ritz Paris",
            address: "15 Place Vendôme, 75001 Paris",
            time: "10:00 AM",
            notes: "Main entrance",
        },
        date: "Nov 10, 2025",
        fare: 85,
        earnings: 68,
        distance: "32 km",
        duration: "60 mins",
        paymentMethod: "Credit Card",
        bookingId: "BK-2025-1110-001",
        specialRequests: "Please help with 2 large suitcases",
    };

    return (
        <View className="flex-1 bg-white">

            <ScrollView
                className="p-4"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 70 }}
            >
                {/* Ride Summary Header */}
                <View className="bg-primary/10 rounded-3xl p-4 mb-4">
                    <View className="flex-row justify-between items-start mb-3">
                        <View>
                            <View className="flex-row items-center mb-1">
                                <Text className="text-lg font-semibold mr-2">
                                    {rideData.passenger.name}
                                </Text>
                                <View className="bg-purple-100 px-2 py-0.5 rounded-full">
                                    <Text className="text-xs text-purple-600">
                                        {rideData.status === "scheduled"
                                            ? "Scheduled"
                                            : "In Progress"}
                                    </Text>
                                </View>
                            </View>
                            <View className="flex-row items-center">
                                <Calendar size={14} color="#6b7280" />
                                <Text className="ml-1 text-sm text-gray-600">
                                    {rideData.date}
                                </Text>
                            </View>
                            <View className="flex-row items-center mt-1">
                                <Clock size={14} color="#6b7280" />
                                <Text className="ml-1 text-sm text-gray-600">
                                    {rideData.pickup.time} - {rideData.dropoff.time}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View className="flex-row justify-between">
                        <View className="bg-white border border-gray-200 rounded-2xl p-3 flex-1 mr-2">
                            <View className="flex-row items-center mb-1">
                                <DollarSign size={14} color="#22c55e" />
                                <Text className="ml-1 text-xs text-gray-500">Earnings</Text>
                            </View>
                            <Text className="text-lg font-semibold text-green-600">
                                ${rideData.earnings}
                            </Text>
                        </View>
                        <View className="bg-white border border-gray-200 rounded-2xl p-3 flex-1">
                            <View className="flex-row items-center mb-1">
                                <Navigation size={14} color="#4a9eff" />
                                <Text className="ml-1 text-xs text-gray-500">Distance</Text>
                            </View>
                            <Text className="text-lg font-semibold">{rideData.distance}</Text>
                        </View>
                    </View>
                </View>

                {/* Start Ride Button */}
                {rideData.status === "scheduled" && (
                    <TouchableOpacity
                        onPress={()=> navigation.navigate("LiveRide")}
                        className="bg-primary py-3 rounded-3xl mb-5 flex-row items-center justify-center"
                    >
                        <Navigation size={18} color="#fff" />
                        <Text className="text-white text-base font-semibold ml-2">
                            Start Ride
                        </Text>
                    </TouchableOpacity>
                )}

                {/* Tabs */}
                <View className="bg-gray-100 rounded-3xl p-1 flex-row justify-between mb-4">
                    {["details", "passenger", "route"].map((tab) => {
                        const isActive = activeTab === tab;
                        return (
                            <TouchableOpacity
                                key={tab}
                                onPress={() => setActiveTab(tab)}
                                className="flex-1 py-2 rounded-3xl"
                                style={{
                                    backgroundColor: isActive ? "#fff" : "transparent",
                                    shadowOpacity: isActive ? 0.15 : 0,
                                    shadowRadius: isActive ? 3 : 0,
                                }}
                            >
                                <Text
                                    className={`text-center capitalize ${isActive ? "font-semibold text-gray-800" : "text-gray-500"
                                        }`}
                                >
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>


                {/* Tab Content */}
                {activeTab === "details" && (
                    <View>
                        <Text className="text-base font-semibold mb-2">
                            Ride Information
                        </Text>
                        <View className="gap-2 mb-4">
                            {[
                                ["Booking ID", rideData.bookingId],
                                ["Date", rideData.date],
                                ["Duration", rideData.duration],
                                ["Distance", rideData.distance],
                            ].map(([label, value]) => (
                                <View
                                    key={label}
                                    className="flex-row justify-between bg-gray-50 rounded-xl p-3"
                                >
                                    <Text className="text-gray-500 text-sm">{label}</Text>
                                    <Text className="text-gray-800 text-sm">{value}</Text>
                                </View>
                            ))}
                        </View>

                        <Text className="text-base font-semibold mb-2">
                            Payment Details
                        </Text>
                        <View className="gap-2 mb-4">
                            <View className="flex-row justify-between bg-gray-50 rounded-xl p-3">
                                <Text className="text-gray-500 text-sm">Total Fare</Text>
                                <Text className="text-gray-800 text-sm">${rideData.fare}</Text>
                            </View>
                            <View className="flex-row justify-between bg-green-50 rounded-xl p-3">
                                <Text className="text-gray-500 text-sm">
                                    Your Earnings (80%)
                                </Text>
                                <Text className="text-green-600 text-base font-semibold">
                                    ${rideData.earnings}
                                </Text>
                            </View>
                            <View className="flex-row justify-between bg-gray-50 rounded-xl p-3">
                                <Text className="text-gray-500 text-sm">Payment Method</Text>
                                <Text className="text-gray-800 text-sm">
                                    {rideData.paymentMethod}
                                </Text>
                            </View>
                        </View>

                        {rideData.specialRequests && (
                            <View className="bg-primary/10 rounded-3xl p-3 flex-row items-start">
                                <Info size={18} color="#4a9eff" />
                                <Text className="ml-2 text-gray-700 text-sm">
                                    {rideData.specialRequests}
                                </Text>
                            </View>
                        )}
                    </View>
                )}

                {activeTab === "passenger" && (
                    <View className="border border-primary rounded-3xl p-4">
                        <View className="flex-row items-center mb-3">
                            <Image
                                source={{ uri: rideData.passenger.photo }}
                                className="w-16 h-16 rounded-full mr-3"
                            />
                            <View>
                                <Text className="text-lg font-semibold">
                                    {rideData.passenger.name}
                                </Text>
                                <View className="flex-row items-center mt-1">
                                    <Star size={14} color="#facc15" />
                                    <Text className="ml-1 text-sm text-gray-700">
                                        {rideData.passenger.rating}
                                    </Text>
                                    <Text className="ml-1 text-xs text-gray-500">
                                        ({rideData.passenger.totalRides} rides)
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View className="bg-gray-50 rounded-2xl p-3 flex-row items-center mb-2">
                            <Mail size={18} color="orange" />
                            <View className="ml-3">
                                <Text className="text-xs text-gray-500">Email</Text>
                                <Text className="text-sm">{rideData.passenger.email}</Text>
                            </View>
                        </View>

                        <View className="bg-gray-50 rounded-2xl p-3 flex-row items-center mb-4">
                            <Phone size={18} color="green" />
                            <View className="ml-3 ">
                                <Text className="text-xs text-gray-500">Phone</Text>
                                <Text className="text-sm">{rideData.passenger.phone}</Text>
                            </View>
                        </View>

                        <View className="flex-row justify-between">
                            <TouchableOpacity className="flex-1 border border-gray-300 py-3 rounded-3xl items-center mr-2">
                                <Phone size={16} color="green" />
                                <Text className="text-gray-700 text-sm mt-1">Call</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="flex-1 border border-gray-300 py-3 rounded-3xl items-center">
                                <MessageCircle size={16} color="orange" />
                                <Text className="text-gray-700 text-sm mt-1">Message</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {activeTab === "route" && (
                    <View>
                        <View className="bg-green-50  rounded-3xl p-3 shadow mb-4">
                            <View className="flex-row items-start">
                                <MapPin size={20} color="#16a34a" />
                                <View className="ml-3 flex-1">
                                    <Text className="text-xs text-gray-500">Pickup Location</Text>
                                    <Text className="text-sm font-medium">
                                        {rideData.pickup.location}
                                    </Text>
                                    <Text className="text-xs text-gray-500 mb-1">
                                        {rideData.pickup.address}
                                    </Text>
                                    <Text className="text-xs text-gray-400">
                                        ⏰ {rideData.pickup.time}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <Text className="text-center text-gray-500 text-xl font-bold">
                            To
                        </Text>

                        <View className="bg-red-50 rounded-3xl p-3 shadow mt-4">
                            <View className="flex-row items-start">
                                <MapPin size={20} color="#dc2626" />
                                <View className="ml-3 flex-1">
                                    <Text className="text-xs text-gray-500">Dropoff Location</Text>
                                    <Text className="text-sm font-medium">
                                        {rideData.dropoff.location}
                                    </Text>
                                    <Text className="text-xs text-gray-500 mb-1">
                                        {rideData.dropoff.address}
                                    </Text>
                                    <Text className="text-xs text-gray-400">
                                        ⏰ {rideData.dropoff.time}
                                    </Text>
                                </View>
                            </View>
                        </View>
{/* 
                        <TouchableOpacity className="bg-primary py-3 rounded-3xl flex-row justify-center items-center mt-5">
                            <Navigation size={18} color="#fff" />
                            <Text className="text-white text-base font-semibold ml-2">
                                Open in Maps
                            </Text>
                        </TouchableOpacity> */}
                    </View>
                )}
            </ScrollView>
        </View>
    );
}
