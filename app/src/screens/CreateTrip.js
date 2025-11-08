import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  Modal,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import {
  MapPin,
  Map,
  Calendar,
  Users,
  Minus,
  Plus,
  X,
} from "lucide-react-native";
import { useTripStore } from "../../store/useTripStore";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { useRoute } from "@react-navigation/native";
import StepProgress from "../components/StepProgress";

export default function CreateTrip({ navigation }) {
  const { setField } = useTripStore();
  const route = useRoute();

  const [destination, setDestination] = useState("");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());

  // Return from MapPicker (if needed later)
  useEffect(() => {
    if (route.params?.destinationName) {
      setDestination(route.params.destinationName);
    }
  }, [route.params]);

  const isFormValid =
    destination.trim() && startDate.trim() && endDate.trim() && travelers > 0;

  const handleNext = () => {
    if (!isFormValid) {
      Alert.alert("Please fill all fields before continuing!");
      return;
    }

    setField("destination", destination);
    setField("startDate", startDate);
    setField("endDate", endDate);
    setField("travelerCount", travelers);

    navigation.navigate("Travelers");
  };

  // 🌍 Fetch results from Nominatim (OpenStreetMap)
  const searchPlaces = async (text) => {
    setSearch(text);
    if (text.trim().length < 3) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          text
        )}`,
        {
          headers: {
            "User-Agent": "MyTravelApp/1.0 (contact@example.com)",
            "Accept-Language": "en",
          },
        }
      );

      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error("Nominatim Error:", error);
      Alert.alert("Error", "Failed to fetch locations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="p-4"
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Heading */}
        <Text className="text-xl font-bold mb-4">Let's Plan Your Adventure</Text>
        <StepProgress currentStep={1} totalSteps={4} />

        {/* Destination */}
        <View className="flex-row items-center gap-2 mb-2">
          <MapPin size={20} color="#4a9eff" />
          <Text>Where are you going?</Text>
        </View>

        <TouchableOpacity
          className="flex-row items-center mb-4 bg-gray-100 rounded-3xl h-14 border border-gray-300 px-4"
          activeOpacity={0.7}
          onPress={() => setIsModalVisible(true)}
        >
          <Map size={20} color="#4a9eff" />
          <Text className="flex-1 text-base text-gray-900 ml-2">
            {destination || "Search destination"}
          </Text>
        </TouchableOpacity>

        {/* Dates */}
        <View className="flex-row items-center gap-2 mb-2">
          <Calendar size={20} color="green" />
          <Text>When are you traveling?</Text>
        </View>

        <View className="flex-row justify-between gap-2 mb-4">
          {/* Start Date */}
          <View className="flex-col w-[48%]">
            <Text className="text-gray-500 font-bold mb-1">Start Date</Text>

            <TouchableOpacity
              onPress={() => setShowStartPicker(true)}
              className="flex-row items-center justify-between bg-gray-100 rounded-3xl h-14 border border-gray-300 px-4"
            >
              <Text className="ml-2 text-base text-gray-900">
                {startDate || "dd-mm-yyyy"}
              </Text>
              <Calendar size={18} color="gray" />
            </TouchableOpacity>

            {showStartPicker && (
              <DateTimePicker
                value={selectedStartDate}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(event, date) => {
                  setShowStartPicker(false);
                  if (date) {
                    setSelectedStartDate(date);
                    setStartDate(dayjs(date).format("DD-MM-YYYY"));
                  }
                }}
              />
            )}
          </View>

          {/* End Date */}
          <View className="flex-col w-[48%]">
            <Text className="text-gray-500 font-bold mb-1">End Date</Text>

            <TouchableOpacity
              onPress={() => setShowEndPicker(true)}
              className="flex-row items-center justify-between bg-gray-100 rounded-3xl h-14 border border-gray-300 px-4"
            >
              <Text className="ml-2 text-base text-gray-900">
                {endDate || "dd-mm-yyyy"}
              </Text>
              <Calendar size={18} color="gray" />
            </TouchableOpacity>

            {showEndPicker && (
              <DateTimePicker
                value={selectedEndDate}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(event, date) => {
                  setShowEndPicker(false);
                  if (date) {
                    setSelectedEndDate(date);
                    setEndDate(dayjs(date).format("DD-MM-YYYY"));
                  }
                }}
              />
            )}
          </View>
        </View>

        {/* Travelers */}
        <View className="flex-row items-center gap-2 mb-2 mt-2">
          <Users size={20} color="orange" />
          <Text>How many travelers?</Text>
        </View>

        <View className="bg-gray-50 border border-gray-200 rounded-2xl p-4 mb-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Users size={20} color="orange" />
              <Text className="font-medium text-gray-800">Travelers</Text>
            </View>

            <View className="flex-row items-center bg-gray-100 rounded-full px-3 py-1.5">
              <TouchableOpacity
                onPress={() => travelers > 1 && setTravelers(travelers - 1)}
                className="bg-gray-200 rounded-full p-1"
              >
                <Minus size={18} color="black" />
              </TouchableOpacity>

              <Text className="text-lg font-semibold mx-3">{travelers}</Text>

              <TouchableOpacity
                onPress={() => setTravelers(travelers + 1)}
                className="bg-gray-200 rounded-full p-1"
              >
                <Plus size={18} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          <Text className="text-sm text-gray-500 mt-2">
            Add total number of people traveling
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <TouchableOpacity
          disabled={!isFormValid}
          className={`py-4 rounded-3xl ${
            isFormValid ? "bg-blue-500" : "bg-gray-400"
          }`}
          onPress={handleNext}
        >
          <Text className="text-white text-center text-base font-semibold">
            Next
          </Text>
        </TouchableOpacity>
      </View>

      {/* 🗺 Destination Search Modal */}
      <Modal visible={isModalVisible} animationType="slide">
        <View style={{ flex: 1, backgroundColor: "white" }}>
          {/* Header */}
          <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
            <Text className="text-lg font-semibold">Search Destination</Text>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <X size={22} color="black" />
            </TouchableOpacity>
          </View>

          {/* Search Input */}
          <View className="p-4">
            <TextInput
              placeholder="Search for a place"
              value={search}
              onChangeText={searchPlaces}
              className="border border-gray-300 rounded-2xl px-4 py-3"
            />
          </View>

          {/* Search Results */}
          {loading ? (
            <ActivityIndicator size="large" color="#4a9eff" style={{ marginTop: 20 }} />
          ) : (
            <FlatList
              data={results}
              keyExtractor={(item) => item.place_id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setDestination(item.display_name);
                    setIsModalVisible(false);
                  }}
                  className="p-4 border-b border-gray-100"
                >
                  <Text className="font-medium text-gray-800">{item.display_name}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                search.length > 2 && (
                  <Text className="text-center text-gray-500 mt-10">
                    No results found
                  </Text>
                )
              }
            />
          )}
        </View>
      </Modal>
    </View>
  );
}
