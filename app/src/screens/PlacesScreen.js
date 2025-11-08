import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    TextInput,
    Pressable,
    Image,
    ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function PlacesScreen() {
    const navigation = useNavigation();
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);


    // 🧭 Dummy Places Data
    const places = [
        {
            id: 1,
            name: "Junagarh Fort",
            city: "Bikaner",
            tag: "Historic Fort",
            price: 499,
            image: {
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuC6tyza_6hgnpavWSXRXmrT73eyAKHaHZTg&s",
            },
        },
        {
            id: 2,
            name: "Lalgarh Palace",
            city: "Bikaner",
            tag: "Royal Palace",
            price: 699,
            image: {
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWVNm11eO_R8BepDNVxX90xvLjFyzpFUuaVg&s",
            },
        },
        {
            id: 3,
            name: "Jaisalmer Fort",
            city: "Jaisalmer",
            tag: "Golden City Fort",
            price: 999,
            image: {
                uri: "https://wanderon-images.gumlet.io/gallery/new/2025/08/29/1756412178572-jaisalmer-fort-timings-and-ticket-price.jpg",
            },
        },
        {
            id: 4,
            name: "Hawa Mahal",
            city: "Jaipur",
            tag: "Pink City Palace",
            price: 799,
            image: {
                uri: "https://cdn.britannica.com/25/242225-050-72142DF7/Front-facade-of-Palace-of-the-Winds-Hawa-Mahal-Jaipur-Rajasthan-India.jpg",
            },
        },
    ];

    // 🔍 Filter logic for local dummy places
    const filteredPlaces = places.filter(
        (p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.city.toLowerCase().includes(search.toLowerCase())
    );

    // 🌍 Fetch from OpenStreetMap Nominatim API
    useEffect(() => {
        if (search.length < 3) {
            setSuggestions([]);
            return;
        }

        const delayDebounce = setTimeout(async () => {
            try {
                setLoading(true);
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(search)}`,
                    {
                        headers: {
                            "User-Agent": "MyTravelApp/1.0 (contact@example.com)",
                            "Accept-Language": "en",
                        },
                    }
                );
                const data = await res.json();
                setSuggestions(data.slice(0, 5));
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            } finally {
                setLoading(false);
            }
        }, 600);

        return () => clearTimeout(delayDebounce);
    }, [search]);


    return (
        <ScrollView
            className="flex-1 bg-white p-4"
            contentContainerStyle={{ paddingBottom: 60 }}
            keyboardShouldPersistTaps="handled"
        >
            {/* 🔍 Search Bar */}
            <TextInput
                value={search}
                onChangeText={setSearch}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Search place or city..."
                className={`border border-gray-300 rounded-2xl p-3 mb-4 text-base ${isFocused ? 'border-primary' : 'border-gray-300'}`}
            />

            {/* 🌍 Show Suggestions from OpenStreetMap */}
            {loading && (
                <ActivityIndicator size="small" color="#007AFF" className="mb-2" />
            )}

            {suggestions.length > 0 && (
                <View className="mb-4 bg-white shadow rounded-2xl">
                    {suggestions.map((item, index) => (
                        <Pressable
                            key={index}
                            onPress={() => {
                                setSearch(item.display_name);
                                setSuggestions([]);
                            }}
                            className="p-3 border-b border-gray-200"
                        >
                            <Text className="text-gray-700">{item.display_name}</Text>
                        </Pressable>
                    ))}
                </View>
            )}

            {/* 🏝️ List of Local Dummy Places */}
            {filteredPlaces.map((item) => (
                <Pressable
                    key={item.id}
                    onPress={() => navigation.navigate("PlaceDetail", { place: item })}
                    className="w-full rounded-3xl h-36 flex-row items-center bg-white mb-4 shadow-lg"
                >
                    <Image
                        source={item.image}
                        className="w-28 h-28 rounded-3xl ml-4"
                        resizeMode="cover"
                    />

                    <View className="flex-1 p-4">
                        <Text className="text-lg font-bold">
                            {item.name}, {item.city}
                        </Text>
                        <Text className="bg-secondary text-center rounded-2xl text-sm px-3 py-1 my-2">
                            {item.tag}
                        </Text>

                        <View className="mt-4 flex-row justify-between items-center">
                            <Text className="text-gray-400">Starting from:</Text>
                            <Text className="text-end text-primary text-lg font-semibold">
                                ₹{item.price}
                            </Text>
                        </View>
                    </View>
                </Pressable>
            ))}

            {/* ⚠️ No Results */}
            {filteredPlaces.length === 0 && !loading && (
                <Text className="text-center text-gray-400 mt-10">
                    No places found for "{search}"
                </Text>
            )}
        </ScrollView>
    );
}
