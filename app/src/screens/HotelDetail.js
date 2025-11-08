import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Modal,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
    Hotel,
    Phone,
    Star,
    Edit,
    MessageCircle,
    Shield,
} from "lucide-react-native";
import { useToastStore } from "../../store/useToastStore";

export default function HotelDetailScreen() {
    const [showDialog, setShowDialog] = useState(false);
    const [changeRequest, setChangeRequest] = useState("");
    const showToast = useToastStore((state) => state.showToast);

    const hotelDetails = {
        address: "123 Central Avenue, City Center, Paris",
        phone: "+33 1 23 45 67 89",
        email: "info@grandplaza.com",
        checkIn: "2:00 PM",
        checkOut: "11:00 AM",
        roomNumber: "305",
        roomType: "Deluxe King Room",
        floor: "3rd Floor",
        wifi: "GrandPlaza_Guest",
        wifiPassword: "welcome2024",
        emergencyNumber: "112",
        frontDesk: "+33 1 23 45 67 00",
    };

    const safetyFeatures = [
        "24/7 Security Staff",
        "CCTV Monitoring",
        "Safe in Room",
        "Fire Safety System",
        "Emergency Exits",
        "First Aid Available",
    ];

    const handleCall = (num) => {
        showToast(`Calling... ${num}`, "info");
    };

    const handleSubmitChange = () => {
        showToast("Request Submitted! Hotel staff will contact you shortly.", "success");
        setShowDialog(false);
        setChangeRequest("");
    };

    return (
        <View className="flex-1 bg-white">
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className="relative h-64">
                    <Image
                        source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHBC04osXmko6Gkli-uPXgZReM25KmjIAZhA&s" }}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                    <LinearGradient
                        colors={["transparent", "rgba(0,0,0,0.8)"]}
                        className="absolute inset-0"
                    />


                    {/* Hotel Info */}
                    <View className="absolute bottom-4 left-4 right-4">
                        <View className="flex-row items-center gap-2 mb-1">
                            <Hotel size={20} color="#fff" />
                            <Text className="text-white text-sm bg-primary px-2 py-1 rounded-xl">
                                {"Luxury"}
                            </Text>
                        </View>
                        <Text className="text-white text-2xl font-bold">
                            {"Grand Plaza Hotel"}
                        </Text>
                        <View className="flex-row items-center gap-2 mt-1">
                            <Star size={16} color="#FFD700" fill="#FFD700" />
                            <Text className="text-white">{4.5}</Text>
                            <Text className="text-white">• {320} reviews</Text>
                        </View>
                    </View>
                </View>

                {/* Booking Status */}
                <View className="bg-green-100 border border-green-400 rounded-2xl p-4 m-4">
                    <View className="flex-row justify-between items-center">
                        <View>
                            <Text className="font-bold text-lg">Booking Confirmed</Text>
                            <Text className="text-gray-600 text-sm">
                                Room {hotelDetails.roomNumber} • {hotelDetails.roomType}
                            </Text>
                        </View>
                        <Text className="bg-green-500 text-white px-3 py-1 rounded-full text-xs">
                            Active
                        </Text>
                    </View>
                </View>

                {/* Quick Actions */}
                <View className="flex-row justify-between px-4">
                    <TouchableOpacity
                        onPress={() => handleCall(hotelDetails.phone)}
                        className="w-[30%] h-20 bg-gray-100 rounded-2xl justify-center items-center"
                    >
                        <Phone size={22} color="#4a9eff" />
                        <Text className="text-xs mt-1">Call</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="w-[30%] h-20 bg-gray-100 rounded-2xl justify-center items-center">
                        <MessageCircle size={22} color="orange" />
                        <Text className="text-xs mt-1">Message</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setShowDialog(true)}
                        className="w-[30%] h-20 bg-gray-100 rounded-2xl justify-center items-center"
                    >
                        <Edit size={22} color="#a8d5ba" />
                        <Text className="text-xs mt-1">Request</Text>
                    </TouchableOpacity>
                </View>

                {/* Room Information */}
                <View className="bg-gray-50 rounded-3xl m-4 p-4 shadow">
                    <Text className="font-bold mb-3 text-lg">Room Information</Text>
                    {[
                        ["Room Number", hotelDetails.roomNumber],
                        ["Room Type", hotelDetails.roomType],
                        ["Floor", hotelDetails.floor],
                        ["Check-in Time", hotelDetails.checkIn],
                        ["Check-out Time", hotelDetails.checkOut],
                    ].map(([label, value], i) => (
                        <View
                            key={i}
                            className="flex-row justify-between py-1 mb-4 border-b border-gray-200"
                        >
                            <Text className="text-gray-600">{label}</Text>
                            <Text>{value}</Text>
                        </View>
                    ))}
                </View>

                {/* Safety Features */}
                <View className="bg-gray-50 rounded-3xl shadow m-4 p-4">
                    <View className="flex-row items-center gap-2 mb-4">
                        <Shield color="#22c55e" />
                        <Text className="font-bold text-lg">Safety Features</Text>
                    </View>

                    <View className="flex-row flex-wrap">
                        {safetyFeatures.map((feature, i) => (
                            <View
                                key={i}
                                className="w-1/2 mb-4 pr-3 flex-row items-center"
                            >
                                <View className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                                <Text className="text-gray-700 text-sm font-bold flex-1">{feature}</Text>
                            </View>
                        ))}
                    </View>

                </View>



                {/* Contact Info */}
                <View className="bg-gray-50 rounded-2xl m-4 p-4 shadow">
                    <Text className="font-bold mb-3 text-lg">Contact Information</Text>

                    <TouchableOpacity
                        onPress={() => handleCall(hotelDetails.frontDesk)}
                        className="flex-row items-center bg-gray-100 rounded-xl p-3 mb-2"
                    >
                        <Phone size={18} color="#4a9eff" />
                        <Text className="ml-3 text-sm">Front Desk: {hotelDetails.frontDesk}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => handleCall(hotelDetails.emergencyNumber)}
                        className="flex-row items-center bg-red-100 rounded-xl p-3 mb-2"
                    >
                        <Shield size={18} color="#ef4444" />
                        
                        <Text className="ml-3 text-sm">
                            Emergency: {hotelDetails.emergencyNumber}
                        </Text>
                    </TouchableOpacity>

                    <View className="flex-row items-center bg-gray-100 rounded-xl p-3 mb-2">
                        <Hotel size={18} color="#8b5cf6" />
                        <Text className="ml-3 text-sm">{hotelDetails.email}</Text>
                    </View>

                    <View className="flex-row items-center bg-gray-100 rounded-xl p-3">
                        <Hotel size={18} color="#ec4899" />
                        <Text className="ml-3 text-sm flex-1">{hotelDetails.address}</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Dialog Modal */}
            <Modal visible={showDialog} transparent animationType="slide">
                <View className="flex-1 bg-black/40 justify-center items-center">
                    <View className="bg-white rounded-2xl p-5 w-11/12">
                        <Text className="font-bold text-lg mb-2">Request Change</Text>
                        <Text className="text-gray-500 mb-3">
                            Send a request for room change, early check-out, or services.
                        </Text>

                        <TextInput
                            value={changeRequest}
                            onChangeText={setChangeRequest}
                            placeholder="Describe your request..."
                            multiline
                            className="border border-gray-300 rounded-xl p-3 h-24 text-gray-700"
                        />

                        <View className="flex-row justify-end gap-3 mt-4">
                            <TouchableOpacity
                                onPress={() => setShowDialog(false)}
                                className="px-4 py-2 rounded-xl bg-gray-100"
                            >
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                disabled={!changeRequest}
                                onPress={handleSubmitChange}
                                className={`px-4 py-2 rounded-xl ${changeRequest ? "bg-primary" : "bg-gray-300"
                                    }`}
                            >
                                <Text className="text-white">Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
