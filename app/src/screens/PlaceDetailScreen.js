import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    Modal,
    TextInput,
} from "react-native";
import {
    Star,
    Edit3,
} from "lucide-react-native";
import MapView, { Marker } from "react-native-maps";
import LinearGradient from "react-native-linear-gradient";

export default function PlaceDetails() {
    const [modalVisible, setModalVisible] = useState(false);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");

    const place = {
        name: "Santorini, Greece",
        type: "Beach Paradise",
        price: "$1,299",
        rating: 4.8,
        openHours: "8:00 AM – 7:00 PM",
        description:
            "Santorini is known for its stunning sunsets, whitewashed houses, and beautiful beaches. Explore the caldera, enjoy romantic dinners by the sea, and capture the breathtaking views.",
        images: [
            "https://www.onthegotours.com/repository/Santorini--Greece-Tours--On-The-Go-Tours-391091501770178.jpg",
            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/81/30/3f/caption.jpg?w=1400&h=1400&s=1",
            "https://images.saymedia-content.com/.image/t_share/MjA0MjExMDI2MjY5MzE2NzQ4/what-to-see-in-santorini.jpg",
        ],
        location: {
            latitude: 36.3932,
            longitude: 25.4615,
            address: "Santorini Island, Greece",
        },
        bestTime: "April to October (pleasant weather and festivals)",
        reviews: [
            { id: 1, user: "Aarav Sharma", comment: "Absolutely magical! ❤️", stars: 5 },
            { id: 2, user: "Sophia Patel", comment: "Perfect honeymoon destination!", stars: 4.5 },
        ],
    };

    return (
        <ScrollView className="flex-1 bg-white">
            {/* 🏖 Header Image */}
            <View className="relative w-full h-64">
                <ImageBackground
                    source={{ uri: place.images[0] }}
                    className="w-full h-64"
                    resizeMode="cover"
                >
                    <LinearGradient
                        colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.6)"]}
                        style={{ flex: 1, justifyContent: "flex-end", padding: 16 }}
                    >
                        <View className="flex-row justify-between items-center">
                            {/* ⭐ Rating */}
                            <View className="flex-row items-center">
                                <Star size={20} color="#facc15" fill="#facc15" />
                                <Text className="text-white ml-1 font-semibold text-base">
                                    {place.rating} / 5
                                </Text>
                            </View>

                            {/* ✏️ Add Review */}
                            <TouchableOpacity
                                className="bg-white/90 px-4 py-2 rounded-full flex-row items-center"
                                onPress={() => setModalVisible(true)}
                            >
                                <Edit3 size={16} color="#4a9eff" />
                                <Text className="ml-2 text-primary font-semibold text-sm">
                                    Add Your Review
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </View>

            {/* 💬 Review Modal */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 bg-black/50 justify-center items-center">
                    <View className="w-11/12 bg-white p-5 rounded-2xl shadow-lg">
                        <Text className="text-lg font-bold text-gray-800 mb-3">
                            Add Your Review
                        </Text>

                        {/* ⭐ Rating Input */}
                        <View className="flex-row mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <TouchableOpacity
                                    key={star}
                                    onPress={() => setRating(star)}
                                    className="mr-2"
                                >
                                    <Star
                                        size={30}
                                        color={star <= rating ? "#facc15" : "#d1d5db"}
                                        fill={star <= rating ? "#facc15" : "none"}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* 📝 Review Text */}
                        <TextInput
                            className="border border-gray-300 rounded-3xl p-3 h-24 text-gray-700"
                            placeholder="Write your review here..."
                            multiline
                            value={review}
                            onChangeText={setReview}
                            style={{ textAlignVertical: "top" }}
                        />

                        {/* Buttons */}
                        <View className="flex-row justify-end mt-4">
                            <TouchableOpacity
                                className="px-4 py-2 rounded-2xl bg-gray-200 mr-2"
                                onPress={() => setModalVisible(false)}
                            >
                                <Text className="text-gray-700 font-semibold">Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                className="px-4 py-2 rounded-2xl bg-primary"
                                onPress={() => {
                                    console.log("⭐ Rating:", rating);
                                    console.log("📝 Review:", review);
                                    setModalVisible(false);
                                    setRating(0);
                                    setReview("");
                                }}
                            >
                                <Text className="text-white font-semibold">Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* 🏝 Content */}
            <View className="p-4">
                <Text className="text-2xl font-bold text-gray-800">{place.name}</Text>
                <Text className="text-blue-500 mt-1 text-sm mb-2">{place.type}</Text>
                <Text className="text-lg font-bold text-green-600">{place.price}</Text>

                <Text className="mt-4 text-gray-600 leading-6">{place.description}</Text>

                {/* Visiting Hours */}
                <View className="mt-6">
                    <Text className="text-lg font-bold text-gray-800 mb-1">
                        Visiting Hours
                    </Text>
                    <Text className="text-gray-600">{place.openHours}</Text>
                </View>

                {/* 📍 Location Map */}
                <View className="mt-6">
                    <Text className="text-lg font-bold text-gray-800 mb-2">Location</Text>
                    <Text className="text-gray-600 mb-3">{place.location.address}</Text>

                    <View className="overflow-hidden rounded-2xl shadow-md">
  <MapView
    style={{ width: "100%", height: 200 }}
    initialRegion={{
      latitude: place.location.latitude,
      longitude: place.location.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }}
  >
    <Marker
      coordinate={{
        latitude: place.location.latitude,
        longitude: place.location.longitude,
      }}
      title={place.name}
      description={place.location.address}
    />
  </MapView>
</View>

                </View>



                {/* 💬 Reviews */}
                <View className="mt-6">
                    <View className="flex-row items-center justify-between">
                        <Text className="text-lg font-bold text-gray-800 mb-2">Reviews</Text>
                        <TouchableOpacity>
                            <Text className="font-bold text-primary mb-2">View All</Text>
                        </TouchableOpacity>
                    </View>

                    {place.reviews.map((review) => (
                        <View key={review.id} className="mb-3 p-3 bg-gray-50 rounded-xl">
                            <View className="flex-row justify-between">
                                <Text className="font-semibold text-gray-700">{review.user}</Text>
                                <View className="flex-row items-center">
                                    <Star size={16} color="#facc15" fill="#facc15" />
                                    <Text className="ml-1 text-gray-600">{review.stars}</Text>
                                </View>
                            </View>
                            <Text className="text-gray-500 mt-1">{review.comment}</Text>
                        </View>
                    ))}
                </View>

                {/* 🖼 Gallery */}
                <Text className="text-lg font-semibold mt-6 mb-2 text-gray-800">
                    Gallery
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {place.images.map((img, i) => (
                        <Image
                            key={i}
                            source={{ uri: img }}
                            className="w-40 h-40 mr-3 rounded-xl"
                            resizeMode="cover"
                        />
                    ))}
                </ScrollView>
            </View>
        </ScrollView>
    );
}
