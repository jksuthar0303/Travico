import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { useTripStore } from "../../store/useTripStore";
import StepProgress from "../components/StepProgress";
import { launchImageLibrary } from "react-native-image-picker";
import GenderSelect from "../components/GenderSelect";
import { User, Calendar, Phone, Camera } from "lucide-react-native";

function uid() {
  return Math.random().toString(36).substring(2, 9);
}

export default function TravelersScreen({ navigation }) {
  const { travelers, travelerCount, addTraveler, updateTraveler } = useTripStore();
  const [selectedTravelerId, setSelectedTravelerId] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isAgeFocused, setIsAgeFocused] = useState(false);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);

  const pickImage = async () => {
    const options = {
      mediaType: "photo",
      quality: 0.8,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        Alert.alert("Error", response.errorMessage || "Something went wrong");
      } else {
        const uri = response.assets?.[0]?.uri;
        if (uri) {
          setPhoto(uri);
          if (selectedTravelerId) {
            updateTraveler(selectedTravelerId, { photoUri: uri });
          }
        }
      }
    });
  };

  // Auto-create travelers
  useEffect(() => {
    if (travelerCount > 0) {
      if (travelers.length < travelerCount) {
        const missing = travelerCount - travelers.length;
        for (let i = 0; i < missing; i++) {
          addTraveler({
            id: uid(),
            name: "",
            age: "",
            gender: "",
            type: "adult",
            photoUri: "",
            phone: "",
          });
        }
      } else if (travelers.length > travelerCount) {
        useTripStore.setState({ travelers: travelers.slice(0, travelerCount) });
      }
    }
  }, [travelerCount]);

  useEffect(() => {
    if (travelers.length > 0 && !selectedTravelerId) {
      setSelectedTravelerId(travelers[0].id);
    }
  }, [travelers]);

  const selectedTraveler = travelers.find((t) => t.id === selectedTravelerId);
  const allFilled =
    travelers.length > 0 && travelers.every((t) => t.name && t.age && t.gender && t.phone);

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="p-4" contentContainerStyle={{ paddingBottom: 100 }}>
        <StepProgress currentStep={2} totalSteps={4} />

        {selectedTraveler ? (
          <View className="flex justify-center items-center mb-4">
            {/* Photo Picker */}
            <View className="relative w-28 h-28 self-center mb-8">
              <TouchableOpacity
                className="w-full h-full rounded-full border-2 border-blue-500 bg-blue-100 items-center justify-center"
                activeOpacity={0.8}
                onPress={pickImage}
              >
                {photo ? (
                  <Image source={{ uri: photo }} className="w-full h-full rounded-full" />
                ) : (
                  <User size={48} color="#4a9eff" />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={pickImage}
                className="absolute bottom-1 right-1 bg-blue-500 rounded-full p-2"
                activeOpacity={0.8}
              >
                <Camera size={16} color="white" />
              </TouchableOpacity>
              <Text className="text-gray-500 mt-2">Optional Photo</Text>
            </View>

            {/* Name Input */}
            <View className="mb-5 w-full">
              <View className="flex-row gap-2 items-center mb-2">
                <User size={20} color="#4a9eff" />
                <Text className="font-medium text-gray-700">Name</Text>
              </View>
              <View
                className={`flex-row items-center bg-gray-100 rounded-3xl h-14 border px-4 ${
                  isNameFocused ? "border-blue-500" : "border-gray-300"
                }`}
              >
                <TextInput
                  className="flex-1 text-base text-gray-900"
                  placeholder="John Doe"
                  value={selectedTraveler.name}
                  onChangeText={(v) => updateTraveler(selectedTraveler.id, { name: v })}
                  onFocus={() => setIsNameFocused(true)}
                  onBlur={() => setIsNameFocused(false)}
                />
              </View>
            </View>

            {/* Age + Gender */}
            <View className="flex-row mb-5 w-full justify-between">
              <View className="w-[48%]">
                <View className="flex-row gap-2 items-center mb-2">
                  <Calendar size={20} color="green" />
                  <Text className="font-medium text-gray-700">Age</Text>
                </View>
                <View
                  className={`flex-row items-center bg-gray-100 rounded-3xl h-14 border px-4 ${
                    isAgeFocused ? "border-blue-500" : "border-gray-300"
                  }`}
                >
                  <TextInput
                    className="flex-1 text-base text-gray-900"
                    placeholder="Age"
                    keyboardType="numeric"
                    value={selectedTraveler.age}
                    onChangeText={(v) => updateTraveler(selectedTraveler.id, { age: v })}
                    onFocus={() => setIsAgeFocused(true)}
                    onBlur={() => setIsAgeFocused(false)}
                  />
                </View>
              </View>

              <View className="w-[48%]">
                <Text className="mb-2 font-medium text-gray-700">Gender</Text>
                <GenderSelect
                  value={selectedTraveler.gender}
                  onChange={(v) => updateTraveler(selectedTraveler.id, { gender: v })}
                />
              </View>
            </View>

            {/* Phone Input */}
            <View className="mb-5 w-full">
              <View className="flex-row gap-2 items-center mb-2">
                <Phone size={20} color="orange" />
                <Text className="font-medium text-gray-700">Phone</Text>
              </View>
              <View
                className={`flex-row items-center bg-gray-100 rounded-3xl h-14 border px-4 ${
                  isPhoneFocused ? "border-blue-500" : "border-gray-300"
                }`}
              >
                <TextInput
                  className="flex-1 text-base text-gray-900"
                  placeholder="+91 9999999999"
                  keyboardType="phone-pad"
                  value={selectedTraveler.phone}
                  onChangeText={(v) => updateTraveler(selectedTraveler.id, { phone: v })}
                  onFocus={() => setIsPhoneFocused(true)}
                  onBlur={() => setIsPhoneFocused(false)}
                />
              </View>
            </View>
          </View>
        ) : (
          <Text className="text-gray-500 text-center mb-6">
            Select a traveler below to fill details
          </Text>
        )}

        {/* Traveler Cards */}
        {travelers.map((t, index) => (
          <TouchableOpacity
            key={t.id}
            className={`p-4 rounded-2xl mb-3 border-2 ${
              selectedTravelerId === t.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 bg-gray-100"
            }`}
            onPress={() => setSelectedTravelerId(t.id)}
          >
            <Text className="text-base font-semibold text-gray-800">
              Traveler {index + 1}
            </Text>
            <Text className="text-gray-600">{t.name || "Tap to fill details"}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Next Button */}
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <TouchableOpacity
          disabled={!allFilled}
          onPress={() => navigation.navigate("Options")}
          className={`py-4 rounded-3xl ${
            allFilled ? "bg-blue-500" : "bg-gray-400"
          }`}
        >
          <Text className="text-center text-white font-semibold text-base">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
