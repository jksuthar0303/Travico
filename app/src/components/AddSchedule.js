import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { Plus, Clock } from "lucide-react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export function AddScheduleModal({ visible, onClose, tripId }) {
  const [schedule, setSchedule] = useState({
    time: "",
    location: "",
    activity: "",
    duration: "",
    notes: "",
  });

  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleAdd = () => {
    if (!schedule.time || !schedule.location || !schedule.activity) {
      alert("Please fill all required fields");
      return;
    }

    console.log("Added Schedule:", { tripId, ...schedule });
    alert("Schedule added successfully!");
    onClose();
    setSchedule({
      time: "",
      location: "",
      activity: "",
      duration: "",
      notes: "",
    });
  };

  const handleTimeChange = (event, selectedDate) => {
    setShowTimePicker(false);
    if (selectedDate) {
      const hours = selectedDate.getHours();
      const minutes = selectedDate.getMinutes();
      const formattedTime = new Date(
        0,
        0,
        0,
        hours,
        minutes
      ).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setSchedule({ ...schedule, time: formattedTime });
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white p-4 rounded-t-3xl max-h-[90%]">
          <Text className="text-xl font-bold text-primary mb-3">
            Add Activity
          </Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* 🕓 Time (uses community picker) */}
            <Text className="font-medium mb-1">Time *</Text>
            <TouchableOpacity
              onPress={() => setShowTimePicker(true)}
              className="border border-gray-300 rounded-xl px-3 py-2 mb-3 flex-row items-center justify-between"
            >
              <Text
                className={`${
                  schedule.time ? "text-gray-800" : "text-gray-400"
                }`}
              >
                {schedule.time || "Select time"}
              </Text>
              <Clock size={18} color="#4a9eff" />
            </TouchableOpacity>

            {/* ⏰ Show DateTimePicker */}
            {showTimePicker && (
              <DateTimePicker
                mode="time"
                value={new Date()}
                is24Hour={false}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={handleTimeChange}
              />
            )}

            {/* 📍 Location */}
            <Text className="font-medium mb-1">Location *</Text>
            <TextInput
              className="border border-gray-300 rounded-xl px-3 py-2 mb-3"
              placeholder="Eiffel Tower"
              value={schedule.location}
              onChangeText={(t) => setSchedule({ ...schedule, location: t })}
            />

            {/* 🧭 Activity */}
            <Text className="font-medium mb-1">Activity *</Text>
            <TextInput
              className="border border-gray-300 rounded-xl px-3 py-2 mb-3"
              placeholder="Tour guide intro"
              value={schedule.activity}
              onChangeText={(t) => setSchedule({ ...schedule, activity: t })}
            />

            {/* ⏳ Duration */}
            <Text className="font-medium mb-1">Duration</Text>
            <TextInput
              className="border border-gray-300 rounded-xl px-3 py-2 mb-3"
              placeholder="30 mins"
              value={schedule.duration}
              onChangeText={(t) => setSchedule({ ...schedule, duration: t })}
            />

            {/* 📝 Notes */}
            <Text className="font-medium mb-1">Notes</Text>
            <TextInput
              className="border border-gray-300 rounded-xl px-3 py-2 mb-4 h-24 text-start"
              placeholder="Add notes..."
              multiline
              value={schedule.notes}
              onChangeText={(t) => setSchedule({ ...schedule, notes: t })}
            />
          </ScrollView>

          {/* Buttons */}
          <View className="flex-row justify-between mt-4">
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 border border-gray-300 rounded-3xl py-3 mr-2 items-center"
            >
              <Text className="text-gray-600 font-medium">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleAdd}
              className="flex-1 bg-primary rounded-3xl py-3 items-center flex-row justify-center"
            >
              <Plus size={18} color="#fff" />
              <Text className="text-white font-semibold ml-2">Add Activity</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
