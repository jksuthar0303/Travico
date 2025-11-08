import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Camera,
} from "lucide-react-native";
import CustomSelect from "../components/CustomSelect"; 
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

export default function PersonalInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [profileImage, setProfileImage] = useState(null);


  const [formData, setFormData] = useState({
    fullName: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
    address: "123 Main St, San Francisco, CA",
    language: "English (US)",
    currency: "USD ($)",
  });

  const languages = [
    "English (US)",
    "Español (Spanish)",
    "Français (French)",
    "हिन्दी (Hindi)",
    "Deutsch (German)",
  ];

  const currencies = ["USD ($)", "EUR (€)", "INR (₹)", "GBP (£)", "JPY (¥)"];

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      const formatted = selectedDate.toISOString().split("T")[0];
      setFormData({ ...formData, dateOfBirth: formatted });
    }
    setShowDatePicker(false);
  };

 // 📸 Pick image (camera or gallery)
 const handleImagePick = () => {
    if (!isEditing) return;

    const options = {
      mediaType: "photo",
      maxWidth: 512,
      maxHeight: 512,
      quality: 0.8,
      includeBase64: false,
    };

    // Show options to choose between Camera or Gallery
    const choiceOptions = [
      { title: "Take Photo", onPress: () => openCamera(options) },
      { title: "Choose from Gallery", onPress: () => openGallery(options) },
      { title: "Cancel", onPress: () => {}, style: "cancel" },
    ];

    // For now we’ll use prompt for simplicity
    // You can replace this with ActionSheet if you prefer.
    openGallery(options);
  };

  const openCamera = async (options) => {
    const result = await launchCamera(options);
    if (result?.assets?.[0]?.uri) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const openGallery = async (options) => {
    const result = await launchImageLibrary(options);
    if (result?.assets?.[0]?.uri) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1 px-4 mt-4"
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Picture */}
        <View className="items-center mb-4">
          <View className="relative">
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                className="w-28 h-28 rounded-full border-4 border-white shadow-md"
              />
            ) : (
              <View className="w-28 h-28 rounded-full bg-primary flex items-center justify-center border-4 border-white shadow-md">
                <User color="white" size={48} />
              </View>
            )}

            {isEditing && (
              <TouchableOpacity
                onPress={handleImagePick}
                className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-primary items-center justify-center border-2 border-white"
              >
                <Camera color="white" size={18} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        {/* Edit / Save Buttons */}
        <View className="mb-6">
          {isEditing ? (
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={handleCancel}
                className="flex-1 bg-gray-100 py-3 rounded-2xl items-center"
              >
                <Text className="text-gray-700 font-medium">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSave}
                className="flex-1 bg-primary py-3 rounded-2xl items-center"
              >
                <Text className="text-white font-medium">Save Changes</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => setIsEditing(true)}
              className="w-full bg-primary py-3 rounded-2xl items-center"
            >
              <Text className="text-white font-medium">Edit Profile</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Personal Details */}
        <View className="bg-white rounded-3xl border border-gray-200 p-4 mb-4 shadow-sm">
          <Text className="text-lg font-semibold mb-4">Personal Details</Text>

          {/* Full Name */}
          <View className="mb-3">
            <Text className="text-sm text-gray-600 mb-1">Full Name</Text>
            <TextInput
              value={formData.fullName}
              onChangeText={(val) => setFormData({ ...formData, fullName: val })}
              editable={isEditing}
              className={`border border-gray-300 rounded-2xl px-3 py-3 text-gray-800 ${
                !isEditing && "opacity-70"
              }`}
            />
          </View>

          {/* Date of Birth */}
          <View>
            <Text className="text-sm text-gray-600 mb-1">Date of Birth</Text>
            <TouchableOpacity
              onPress={() => isEditing && setShowDatePicker(true)}
              activeOpacity={isEditing ? 0.7 : 1}
              className={`flex-row items-center border border-gray-300 rounded-2xl px-3 py-3 ${
                !isEditing && "opacity-70"
              }`}
            >
              <Calendar color="#888" size={18} />
              <Text className="ml-2 text-gray-800">
                {formData.dateOfBirth || "Select Date"}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={new Date(formData.dateOfBirth)}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={handleDateChange}
              />
            )}
          </View>
        </View>

        {/* Contact Info */}
        <View className="bg-white rounded-3xl border border-gray-200 p-4 mb-4 shadow-sm">
          <Text className="text-lg font-semibold mb-4">Contact Information</Text>

          {/* Email */}
          <View className="mb-3">
            <Text className="text-sm text-gray-600 mb-1">Email</Text>
            <View className="flex-row items-center border border-gray-300 rounded-2xl px-3">
              <Mail color="#888" size={18} />
              <TextInput
                value={formData.email}
                editable={isEditing}
                onChangeText={(val) => setFormData({ ...formData, email: val })}
                className={`flex-1 px-2 py-3 text-gray-800 ${
                  !isEditing && "opacity-70"
                }`}
              />
            </View>
          </View>

          {/* Phone */}
          <View className="mb-3">
            <Text className="text-sm text-gray-600 mb-1">Phone</Text>
            <View className="flex-row items-center border border-gray-300 rounded-2xl px-3">
              <Phone color="#888" size={18} />
              <TextInput
                value={formData.phone}
                editable={isEditing}
                onChangeText={(val) => setFormData({ ...formData, phone: val })}
                className={`flex-1 px-2 py-3 text-gray-800 ${
                  !isEditing && "opacity-70"
                }`}
              />
            </View>
          </View>

          {/* Address */}
          <View>
            <Text className="text-sm text-gray-600 mb-1">Address</Text>
            <View className="flex-row items-center border border-gray-300 rounded-2xl px-3">
              <MapPin color="#888" size={18} />
              <TextInput
                value={formData.address}
                editable={isEditing}
                onChangeText={(val) =>
                  setFormData({ ...formData, address: val })
                }
                className={`flex-1 px-2 py-3 text-gray-800 ${
                  !isEditing && "opacity-70"
                }`}
              />
            </View>
          </View>
        </View>

        {/* Regional Preferences */}
        <View className="bg-white rounded-3xl border border-gray-200 p-4 mb-6 shadow-sm">
          <Text className="text-lg font-semibold mb-4">
            Regional Preferences
          </Text>

          {/* Language Select */}
          <View className="mb-3">
            <CustomSelect
              label="Language"
              placeholder="Select Language"
              options={languages}
              value={formData.language}
              onChange={(val) => setFormData({ ...formData, language: val })}
              disabled={!isEditing}
            />
          </View>

          {/* Currency Select */}
          <View>
            <CustomSelect
              label="Currency"
              placeholder="Select Currency"
              options={currencies}
              value={formData.currency}
              onChange={(val) => setFormData({ ...formData, currency: val })}
              disabled={!isEditing}
            />
          </View>

        </View>
      </ScrollView>
    </View>
  );
}
