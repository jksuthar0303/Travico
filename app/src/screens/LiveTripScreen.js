import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
  ScrollView,
  Pressable,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import LinearGradient from "react-native-linear-gradient";
import { Car, MapPin, Clock, Navigation, Hotel, User } from "lucide-react-native";

export default function OngoingTripScreen({navigation}) {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const watchId = useRef(null);
  const mapRef = useRef(null);

  const tripDetails = {
    driver: "Rohit Sharma",
    vehicle: "Maruti Swift - RJ14 AB 2345",
    destination: "Jaipur Railway Station",
    startTime: "10:15 AM",
  };

  const hotel = { name: "Hotel Taj Palace", status: "Checked-In", room: "305" };
  const guide = { name: "Ankit Verma", status: "Available" };
  const todaySchedule = [
    {
      time: "09:00 AM",
      title: "Breakfast at Hotel",
      status: "Completed",
      color: "bg-green-500",
    },
    {
      time: "11:00 AM",
      title: "Visit Hawa Mahal",
      status: "In Progress",
      color: "bg-blue-500",
    },
    {
      time: "02:00 PM",
      title: "Lunch at Café Amber",
      status: "Upcoming",
      color: "bg-gray-400",
    },
    {
      time: "04:30 PM",
      title: "Explore City Palace",
      status: "Upcoming",
      color: "bg-gray-400",
    },
  ];


  const requestLocationPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "App needs access to your location for live tracking",
          buttonPositive: "OK",
          buttonNegative: "Cancel",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn("Permission error:", err);
      return false;
    }
  };

  const ensurePermission = async () => {
    if (Platform.OS === "android") {
      return await requestLocationPermissionAndroid();
    } else {
      try {
        const auth = await Geolocation.requestAuthorization("whenInUse");
        return auth === "granted" || auth === "always";
      } catch (e) {
        console.warn("iOS permission error", e);
        return false;
      }
    }
  };

  useEffect(() => {
    let mounted = true;

    const startWatching = async () => {
      const ok = await ensurePermission();
      if (!ok) {
        Alert.alert("Permission Denied", "Location permission is required for live tracking.");
        if (mounted) setLoading(false);
        return;
      }

      Geolocation.getCurrentPosition(
        (pos) => {
          if (!mounted) return;
          setLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
          setLoading(false);
        },
        (err) => {
          console.warn("getCurrentPosition error:", err);
          if (mounted) setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 5000,
          forceRequestLocation: true,
          showLocationDialog: true,
        }
      );

      watchId.current = Geolocation.watchPosition(
        (pos) => {
          if (!mounted) return;
          setLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        },
        (err) => console.warn("watchPosition error:", err),
        {
          enableHighAccuracy: true,
          distanceFilter: 5,
          interval: 4000,
          fastestInterval: 2000,
          forceRequestLocation: true,
          showLocationDialog: true,
        }
      );
    };

    startWatching();

    return () => {
      mounted = false;
      if (watchId.current !== null) {
        Geolocation.clearWatch(watchId.current);
        watchId.current = null;
      }
    };
  }, []);

  const handleCenterMap = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000
      );
    }
  };

  if (loading && !location) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#4a9eff" />
        <Text className="mt-3 text-gray-600">Fetching your location...</Text>
      </View>
    );
  }

  const region = location
    ? {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }
    : {
        latitude: 26.9124,
        longitude: 75.7873,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      };

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <LinearGradient colors={["#4a9eff", "#a8d5ba"]} className="px-4 pt-6 pb-4">
        <Text className="text-white text-lg font-semibold">Paris, France</Text>

        <View className="mt-4 bg-white/10 p-4 rounded-2xl">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-white/90 text-sm">Trip Progress</Text>
            <Text className="text-white text-sm">Day 2 of 5</Text>
          </View>

          <View className="w-full h-2 bg-white/30 rounded-full overflow-hidden mb-3">
            <View className="h-2 bg-green-400" style={{ width: `${(2 / 5) * 100}%` }} />
          </View>

          <View className="flex-row justify-around">
            <View className="items-center">
              <Text className="text-2xl text-white">3</Text>
              <Text className="text-xs text-white/80">Places Visited</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl text-white">3</Text>
              <Text className="text-xs text-white/80">Upcoming</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Map */}
      <View className="m-4 rounded-3xl overflow-hidden border border-gray-200 shadow">
        <MapView
          ref={mapRef}
          style={{ width: "100%", height: 250 }}
          region={region}
          showsUserLocation={!!location}
        >
          {location && (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="You are here"
              description="Live location"
            />
          )}
        </MapView>

        <TouchableOpacity
          onPress={handleCenterMap}
          activeOpacity={0.8}
          className="absolute bottom-4 right-4 bg-white rounded-full p-3 shadow-lg border border-gray-200"
        >
          <Navigation color="#4a9eff" size={22} />
        </TouchableOpacity>
      </View>

      <View className="px-4 mb-8">
        <Text className="text-lg font-bold mb-3 text-gray-800">Your Bookings</Text>

        {/* Hotel Card */}
        <Pressable
          onPress={() => navigation.navigate("Hotel-Detail")}
          className="bg-white rounded-3xl p-4 mb-3 border border-gray-200 shadow-sm flex-row items-center"
        >
          <View className="w-14 h-14 bg-blue-50 rounded-xl items-center justify-center">
            <Hotel color="#4a9eff" size={24} />
          </View>
          <View className="ml-3 flex-1">
            <Text className="text-base font-medium">Hotel</Text>
            <Text className="text-gray-600 text-sm">{hotel.name}</Text>
            <Text className="text-xs text-green-600 mt-1">{hotel.status} - Room {hotel.room}</Text>
          </View>
          <Text className="text-primary font-bold">View</Text>
        </Pressable>

        {/* Vehicle Card */}
        <Pressable
          onPress={() => navigation.navigate("Vehicle-Detail")}
          className="bg-white rounded-3xl p-4 mb-3 border border-gray-200 shadow-sm flex-row items-center"
        >
          <View className="w-14 h-14 bg-green-50 rounded-xl items-center justify-center">
            <Car color="#22c55e" size={24} />
          </View>
          <View className="ml-3 flex-1">
            <Text className="text-base font-medium">Vehicle</Text>
            <Text className="text-gray-600 text-sm">{tripDetails.vehicle}</Text>
            <Text className="text-xs text-green-600 mt-1">Driver: {tripDetails.driver}</Text>
          </View>
          <Text className="text-primary font-bold">View</Text>
        </Pressable>

        {/* Guide Card */}
        <Pressable
          onPress={() => navigation.navigate("Guide-Detail")}
          className="bg-white rounded-3xl p-4 border border-gray-200 shadow-sm flex-row items-center"
        >
          <View className="w-14 h-14 bg-purple-50 rounded-xl items-center justify-center">
            <User color="#8b5cf6" size={24} />
          </View>
          <View className="ml-3 flex-1">
            <Text className="text-base font-medium">Tour Guide</Text>
            <Text className="text-gray-600 text-sm">{guide.name}</Text>
            <Text className="text-xs text-green-600 mt-1">{guide.status}</Text>
          </View>
          <Text className="text-primary font-bold">View</Text>
        </Pressable>
      </View>
      <View className="px-4 mb-8">
        <Text className="text-lg font-semibold mb-3 text-gray-800">Today's Schedule</Text>

        {todaySchedule.map((item, index) => (
          <View
            key={index}
            className="bg-white rounded-3xl border border-gray-200 p-4 mb-3 flex-row items-center shadow-sm"
          >
            <View className={`w-12 h-12 rounded-full ${item.color} items-center justify-center`}>
              <Clock color="#fff" size={20} />
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-base font-medium">{item.title}</Text>
              <Text className="text-xs text-gray-600 mt-1">{item.time}</Text>
            </View>
            <Text
              className={`font-bold ${
                item.status === "Completed"
                  ? "text-green-600"
                  : item.status === "In Progress"
                  ? "text-primary"
                  : "text-gray-500"
              }`}
            >
              {item.status}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
