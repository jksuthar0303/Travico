import React from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
    Phone,
    Mail,
    MessageCircle,
    Star,
    Shield,
    Clock,
    CheckCircle2,
} from "lucide-react-native";
import { useToastStore } from "../../store/useToastStore";

export default function GuideDetailScreen() {
    const showToast = useToastStore((s) => s.showToast);

    const contactDetails = {
        phone: "+33 6 12 34 56 78",
        email: "sophie.laurent@guideparis.com",
        emergencyContact: "+33 1 23 45 67 89",
        availability: "9:00 AM - 6:00 PM",
    };


    const safetyInfo = [
        "Verified Guide",
        "Licensed Professional",
        "Background Check",
        "First Aid Certified",
        "Emergency Protocol",
        "Insurance Coverage",
    ];

    const handleCall = () => {
        showToast(`Calling guide... ${contactDetails.phone}`, "info");
    };

    const handleMessage = () => {
        showToast("Opening chat with guide...", "info");
    };

    const handleEmail = () => {
        showToast(`Opening email: ${contactDetails.email}`, "info");
    };

    return (
        <View className="flex-1 bg-white">
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <LinearGradient
                    colors={["#4a9eff", "#a8d5ba"]}
                    className="p-6 pb-10"
                >

                    <View className="flex-row items-center gap-4">
                        <View className="h-20 w-20 rounded-full bg-primary items-center justify-center border-2 border-white">
                            <Text className="text-white text-3xl font-bold">
                                G
                            </Text>
                        </View>
                        <View className="flex-1">
                            <View className="flex-row items-center gap-2 mb-1">
                                <Text className="text-xl font-bold text-gray-800">
                                    Sophie Laurent
                                </Text>
                                <View className="flex-row items-center bg-green-500 px-2 py-0.5 rounded-full">
                                    <CheckCircle2 size={14} color="#fff" />
                                    <Text className="text-white text-xs ml-1">Verified</Text>
                                </View>
                            </View>

                            <View className="flex-row items-center gap-3 mb-2">
                                <View className="flex-row items-center gap-1">
                                    <Star size={16} color="#facc15" fill="#facc15" />
                                    <Text className="text-gray-700 text-sm">
                                        4.9
                                    </Text>
                                </View>
                                <Text className="text-gray-500 text-sm">•</Text>
                                <Text className="text-gray-500 text-sm">
                                    312 reviews
                                </Text>
                            </View>
                            <View className="bg-green-100 self-start mt-1 px-3 py-1 rounded-xl">
                                <Text className="text-green-700 text-sm">Available</Text>
                            </View>
                        </View>
                    </View>
                </LinearGradient>

                {/* Contact Actions */}
                <View className="flex-row justify-between px-4 mt-4">
                    <TouchableOpacity
                        onPress={handleCall}
                        className="w-[30%] h-20 bg-gray-100 rounded-3xl justify-center items-center"
                    >
                        <Phone size={22} color="#3b82f6" />
                        <Text className="text-xs mt-1">Call</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleMessage}
                        className="w-[30%] h-20 bg-gray-100 rounded-3xl justify-center items-center"
                    >
                        <MessageCircle size={22} color="orange" />
                        <Text className="text-xs mt-1">Message</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleEmail}
                        className="w-[30%] h-20 bg-gray-100 rounded-3xl justify-center items-center"
                    >
                        <Mail size={22} color="#a8d5ba" />
                        <Text className="text-xs mt-1">Email</Text>
                    </TouchableOpacity>
                </View>

                {/* Guide Info */}
                <View className="bg-gray-50 rounded-3xl m-4 p-4 shadow">
                    <Text className="font-bold mb-3 text-lg">Guide Information</Text>
                    <Text className="text-gray-600 mb-3">

                        "Professional tour guide specializing in Paris city history and cultural tours.
                    </Text>

                    <View className="flex-row justify-between py-1 border-b border-gray-200">
                        <Text className="text-gray-500">Experience</Text>
                        <Text>6 years</Text>
                    </View>

                    <View className="flex-row justify-between py-1 border-b border-gray-200">
                        <Text className="text-gray-500">Tours Completed</Text>
                        <Text>280</Text>
                    </View>

                    <View className="mt-3">
                        <Text className="text-gray-500 mb-2">Languages</Text>
                        <View className="flex-row flex-wrap gap-2">
                            {(["English", "French"]).map((lang) => (
                                <Text
                                    key={lang}
                                    className="bg-blue-100 text-primary px-3 py-1 rounded-full text-xs"
                                >
                                    {lang}
                                </Text>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Safety & Verification */}
                <View className="bg-gray-50 rounded-3xl m-4 p-4 shadow">
                    <View className="flex-row items-center mb-3">
                        <Shield size={20} color="#22c55e" />
                        <Text className="ml-2 font-bold text-lg">Safety & Verification</Text>
                    </View>

                    <View className="flex-row flex-wrap justify-between">
                        {safetyInfo.map((info, i) => (
                            <View
                                key={i}
                                className="w-[48%] flex-row items-center bg-green-50 border border-green-100 p-3 rounded-xl mb-3"
                            >
                                <Text className="text-green-600 text-lg mr-2">✓</Text>
                                <Text className="text-gray-700 text-sm flex-shrink">{info}</Text>
                            </View>
                        ))}
                    </View>
                </View>


                {/* Contact Details */}
                <View className="bg-gray-50 rounded-3xl m-4 p-4 shadow">
                    <Text className="font-bold mb-3 text-lg">Contact Details</Text>

                    <TouchableOpacity
                        onPress={handleCall}
                        className="flex-row items-center bg-blue-50 rounded-2xl p-3 mb-2"
                    >
                        <Phone size={18} color="#3b82f6" />
                        <Text className="ml-3 text-sm text-gray-800">
                            Mobile: {contactDetails.phone}
                        </Text>
                    </TouchableOpacity>

                    <View className="flex-row items-center bg-orange-50 rounded-2xl p-3 mb-2">
                        <Mail size={18} color="orange" />
                        <Text className="ml-3 text-sm text-gray-800">
                            Email: {contactDetails.email}
                        </Text>
                    </View>

                    <View className="flex-row items-center bg-gray-100 rounded-2xl p-3 mb-2">
                        <Clock size={18} color="#64748b" />
                        <Text className="ml-3 text-sm text-gray-800">
                            Availability: {contactDetails.availability}
                        </Text>
                    </View>

                    <View className="flex-row items-center bg-red-100 rounded-2xl p-3">
                        <Shield size={18} color="#ef4444" />
                        <Text className="ml-3 text-sm text-gray-800">
                            Emergency: {contactDetails.emergencyContact}
                        </Text>
                    </View>
                </View>

                {/* Pricing */}
                <View className="m-4 rounded-3xl overflow-hidden">
                    <LinearGradient
                        colors={["#4a9eff", "#a8d5ba"]}
                        className="p-4"
                        style={{ borderRadius: 24 }}
                    >
                        <View className="flex-row justify-between items-center">
                            <View>
                                <Text className="font-bold mb-1 text-lg text-white">Service Fee</Text>
                                <Text className="text-gray-200 text-sm">per tour</Text>
                            </View>
                            <Text className="text-2xl font-bold text-white">$250</Text>
                        </View>
                    </LinearGradient>
                </View>


            </ScrollView>

        </View>
    );
}
