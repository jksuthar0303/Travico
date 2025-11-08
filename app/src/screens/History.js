import { View, Text, ScrollView, Pressable, StyleSheet, ImageBackground } from 'react-native';
import React from 'react';
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Star,
  ArrowRight,
} from 'lucide-react-native';

import swiss from '../../assets/swiss.jpg';
import japan from '../../assets/japan.jpg';
import greece from '../../assets/greece.jpg';

export default function History({navigation}) {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <View className="flex-row flex-wrap justify-between">
        {/* Stats cards */}
        {[
          { label: 'Trips', value: '3' },
          { label: 'Countries', value: '3' },
          { label: 'Cities', value: '3' },
          { label: 'Spent', value: '$7.7k' },
        ].map((item, index) => (
          <View
            key={index}
            className="w-[23%] aspect-square bg-blue-500 h-32 rounded-3xl mb-4 items-center justify-center shadow"
          >
            <Text className="text-white text-2xl font-bold">{item.value}</Text>
            <Text className="text-white font-semibold">{item.label}</Text>
          </View>
        ))}
      </View>

      {/* Trip History Cards */}
      <View className="mt-6 mb-8 gap-4">
        {[{ name: 'Santorini, Greece', image: greece },
          { name: 'Kyoto, Japan', image: japan },
          { name: 'Swiss Alps', image: swiss }].map((trip, i) => (
          <Pressable
            key={i}
            onPress={() => navigation.navigate("CompletedTrip")}
            className="w-full rounded-2xl flex-row items-center bg-white py-2"
            style={styles.shadow}
          >
            <ImageBackground
              source={trip.image}
              className="w-32 h-32 rounded-3xl overflow-hidden ml-4 p-2"
              resizeMode="cover"
            >
              <View className="bg-green-500 rounded-3xl">
                <Text className="text-white text-sm text-center font-bold">Completed</Text>
              </View>
            </ImageBackground>

            <View className="flex-1 p-4">
              <Text className="text-lg">{trip.name}</Text>

              <View className="flex-row items-center gap-2 mb-2">
                <Calendar size={15} color="gray" />
                <Text className="text-sm text-gray-500">Sep 15, 2024 - Sep 20, 2024</Text>
              </View>

              <View className="flex-row gap-2 mb-2">
                <View className="flex-row items-center gap-2">
                  <MapPin size={15} color="#4a9eff" />
                  <Text className="text-sm text-gray-500">8 places</Text>
                </View>

                <View className="flex-row items-center gap-2">
                  <Users size={15} color="green" />
                  <Text className="text-sm text-gray-500">8</Text>
                </View>

                <View className="flex-row items-center gap-2">
                  <DollarSign size={15} color="orange" />
                  <Text className="text-sm text-gray-500">2345</Text>
                </View>
              </View>

              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center gap-2">
                  <Star size={18} color="#facc15" />
                  <Text className="text-gray-500">4.5 rating</Text>
                </View>
                <ArrowRight size={14} color="black" />
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  shadow: {
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
