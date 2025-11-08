import React from "react";
import { View, Text, ScrollView, Image} from "react-native";
import {  Play } from "lucide-react-native";

export default function TripGallery() {
    const media = [
        {
            type: "image",
            url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
        },
        {
            type: "image",
            url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
        },
        {
            type: "video",
            url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
        },
    ];

    return (
        <View className="flex-1 bg-white">
            {/* Gallery Grid */}
            <ScrollView contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap", padding: 8 }}>
                {media.map((item, i) => (
                    <View key={i} className="w-[87%] h-48 m-1 rounded-2xl overflow-hidden relative">
                        <Image source={{ uri: item.url }} className="w-full h-full" />
                        {item.type === "video" && (
                            <View className="absolute inset-0 bg-black/30 items-center justify-center">
                                <Play size={32} color="white" />
                            </View>
                        )}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}
