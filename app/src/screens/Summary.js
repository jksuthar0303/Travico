import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Alert,
  Platform,
} from "react-native";
import {
  Calendar,
  Users,
  DollarSign,
  MapPin,
  Hotel,
  Phone,
  Star,
  Car,
  User,
  CheckCircle,
  XCircle,
} from "lucide-react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { useToastStore } from "../../store/useToastStore";

export default function Summary({ route, navigation }) {
  const { trip } = route.params;
  const showToast = useToastStore((state) => state.showToast);

  const [showModal, setShowModal] = useState(false);
  const [arrivalDetails, setArrivalDetails] = useState({
    date: "",
    time: "",
    location: "",
    note: "",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  const handleAgree = () => {
    if (!arrivalDetails.date || !arrivalDetails.time || !arrivalDetails.location) {
      Alert.alert("Missing Info", "Please fill all required fields.");
      return;
    }
    showToast("Trip Confirmed ! Your arrival details have been sent successfully!","success")
    setShowModal(false);
    navigation.goBack();
  };

  const handleReject = () => {
    showToast("Trip Rejected, You have declined this trip. The admin will be notified.","error")
    navigation.goBack();
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setTempDate(selectedDate);
      setArrivalDetails({
        ...arrivalDetails,
        date: moment(selectedDate).format("MMM D, YYYY"),
      });
    }
  };

  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTempDate(selectedTime);
      setArrivalDetails({
        ...arrivalDetails,
        time: moment(selectedTime).format("hh:mm A"),
      });
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      {/* Destination Info */}
      <View className="bg-gray-50 rounded-3xl shadow p-4 mb-5">
        <Text className="text-lg font-semibold text-gray-700 mb-1">
          {trip.destination}
        </Text>
        <View className="flex-row items-center mb-2">
          <Calendar size={18} color="gray" />
          <Text className="text-gray-600 ml-2">{trip.date}</Text>
        </View>
        <View className="flex-row items-center mb-2">
          <Users size={18} color="gray" />
          <Text className="text-gray-600 ml-2">{trip.travelers} Travelers</Text>
        </View>
        <View className="flex-row items-center">
          <DollarSign size={18} color="gray" />
          <Text className="text-gray-600 ml-2">
            Total: ₹{trip.total.toLocaleString()}
          </Text>
        </View>
      </View>

      {/* Guide Info */}
      <View className="bg-blue-50 rounded-3xl shadow p-4 mb-5">
        <Text className="text-lg font-bold text-blue-700 mb-2">Guide Details</Text>
        <View className="flex-row items-center mb-1">
          <User size={18} color="#2563eb" />
          <Text className="ml-2 text-gray-700">Name: {trip.guide.name}</Text>
        </View>
        <Text className="text-gray-700">Cost per day: ₹{trip.guide.costPerDay}</Text>
        <View className="flex-row items-center mt-1">
          <Phone size={18} color="#2563eb" />
          <Text className="ml-2 text-gray-700">Contact: {trip.guide.contact}</Text>
        </View>
      </View>

      {/* Hotel Info */}
      <View className="bg-green-50 rounded-3xl shadow p-4 mb-5">
        <Text className="text-lg font-bold text-green-700 mb-2">Hotel Details</Text>
        <View className="flex-row items-center mb-1">
          <Hotel size={18} color="#16a34a" />
          <Text className="ml-2 text-gray-700">Name: {trip.hotel.name}</Text>
        </View>
        <Text className="text-gray-700">Per Night: ₹{trip.hotel.perNight}</Text>
        <View className="flex-row items-center mt-1">
          <MapPin size={18} color="#16a34a" />
          <Text className="ml-2 text-gray-700">Location: {trip.hotel.location}</Text>
        </View>
        <View className="flex-row items-center mt-1">
          <Star size={18} color="#facc15" />
          <Text className="ml-1 text-gray-700">{trip.hotel.rating} / 5</Text>
        </View>
      </View>

      {/* Transport Info */}
      <View className="bg-yellow-50 rounded-3xl shadow p-4 mb-5">
        <Text className="text-lg font-bold text-yellow-700 mb-2">Transport Details</Text>
        <View className="flex-row items-center mb-1">
          <Car size={18} color="#ca8a04" />
          <Text className="ml-2 text-gray-700">Vehicle: {trip.transport.vehicle}</Text>
        </View>
        <Text className="text-gray-700">Driver: {trip.transport.driver}</Text>
        <Text className="text-gray-700">Rate per day: ₹{trip.transport.ratePerDay}</Text>
        <Text className="text-gray-700">Vehicle No: {trip.transport.number}</Text>
      </View>

      {/* Action Buttons */}
      {trip.status === "Approved" && (
        <View className="flex-row justify-between mb-10">
          <TouchableOpacity
            onPress={() => setShowModal(true)}
            className="bg-green-500 p-3 flex-1 rounded-3xl mr-2 flex-row items-center justify-center"
          >
            <CheckCircle size={20} color="white" />
            <Text className="text-white font-semibold ml-2">Agree & Confirm</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleReject}
            className="bg-red-500 p-3 flex-1 rounded-3xl flex-row items-center justify-center"
          >
            <XCircle size={20} color="white" />
            <Text className="text-white font-semibold ml-2">Reject</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Modal for arrival info */}
      <Modal visible={showModal} transparent animationType="slide">
        <View className="flex-1 bg-black/40 justify-center items-center">
          <View className="bg-white w-11/12 rounded-3xl p-5">
            <Text className="text-lg font-bold mb-3 text-gray-800">
              Provide Arrival Details
            </Text>

            {/* Date Picker Button */}
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              className="border border-gray-300 rounded-xl p-3 mb-3"
            >
              <Text className="text-gray-700">
                {arrivalDetails.date
                  ? `Arrival Date: ${arrivalDetails.date}`
                  : "Select Arrival Date"}
              </Text>
            </TouchableOpacity>

            {/* Time Picker Button */}
            <TouchableOpacity
              onPress={() => setShowTimePicker(true)}
              className="border border-gray-300 rounded-xl p-3 mb-3"
            >
              <Text className="text-gray-700">
                {arrivalDetails.time
                  ? `Arrival Time: ${arrivalDetails.time}`
                  : "Select Arrival Time"}
              </Text>
            </TouchableOpacity>

            {/* Location Input */}
            <TextInput
              placeholder="Arrival Location (Airport / Railway Station)"
              className="border border-gray-300 rounded-xl p-3 mb-3"
              value={arrivalDetails.location}
              onChangeText={(text) =>
                setArrivalDetails({ ...arrivalDetails, location: text })
              }
            />

            {/* Note */}
            <TextInput
              placeholder="Additional Note (optional)"
              className="border border-gray-300 rounded-xl p-3 mb-4"
              multiline
              value={arrivalDetails.note}
              onChangeText={(text) =>
                setArrivalDetails({ ...arrivalDetails, note: text })
              }
            />

            {/* Submit */}
            <TouchableOpacity
              onPress={handleAgree}
              className="bg-green-500 p-3 rounded-2xl mb-2"
            >
              <Text className="text-white font-semibold text-center">
                Submit Details
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowModal(false)}
              className="bg-gray-200 p-3 rounded-2xl"
            >
              <Text className="text-center text-gray-700 font-semibold">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Date Picker */}
        {showDatePicker && (
          <DateTimePicker
            value={tempDate}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onDateChange}
          />
        )}

        {/* Time Picker */}
        {showTimePicker && (
          <DateTimePicker
            value={tempDate}
            mode="time"
            is24Hour={false}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onTimeChange}
          />
        )}
      </Modal>
    </ScrollView>
  );
}
