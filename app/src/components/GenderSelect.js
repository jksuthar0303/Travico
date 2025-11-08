import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native";
import { ChevronDown } from "lucide-react-native"; 

const GenderSelect = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const genders = ["Male", "Female", "Other"];

  return (
    <>
      {/* Input-style button */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setIsOpen(true)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`flex-row items-center justify-between bg-gray-100 rounded-3xl h-14 border px-4 
        ${isFocused ? "border-primary" : "border-gray-300"}`}
      >
        <Text
          className={`text-base ${value ? "text-gray-900" : "text-gray-500"}`}
        >
          {value || "Select Gender"}
        </Text>
        <ChevronDown size={20} color="#888" /> 
      </TouchableOpacity>

      {/* Dropdown Modal */}
      <Modal visible={isOpen} transparent animationType="fade">
        <TouchableOpacity
          className="flex-1 bg-black/30 justify-center px-6"
          onPress={() => setIsOpen(false)}
          activeOpacity={1}
        >
          <View className="bg-white rounded-2xl p-4">
            <Text className="text-lg font-semibold mb-3">Select Gender</Text>

            <FlatList
              data={genders}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="py-3 border-b border-gray-200"
                  onPress={() => {
                    onChange(item);
                    setIsOpen(false);
                  }}
                >
                  <Text
                    className={`text-base ${
                      item === value
                        ? "text-primary font-semibold"
                        : "text-gray-800"
                    }`}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default GenderSelect;
