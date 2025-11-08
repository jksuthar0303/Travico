import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native";
import { ChevronDown } from "lucide-react-native";

const CustomSelect = ({
  label,
  options,
  value,
  onChange,
  placeholder,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {label && <Text className="text-sm text-gray-600 mb-2 ml-1">{label}</Text>}

      <TouchableOpacity
        activeOpacity={disabled ? 1 : 0.8}
        onPress={() => !disabled && setIsOpen(true)}
        className={`flex-row items-center justify-between bg-gray-100 rounded-2xl h-12 border px-4 ${
          disabled ? "border-gray-200 opacity-60" : "border-gray-300"
        }`}
      >
        <Text
          className={`text-base ${
            value ? "text-gray-900" : "text-gray-500"
          }`}
        >
          {value || placeholder}
        </Text>
        <ChevronDown size={20} color="#888" />
      </TouchableOpacity>

      {!disabled && (
        <Modal visible={isOpen} transparent animationType="fade">
          <TouchableOpacity
            className="flex-1 bg-black/30 justify-center px-6"
            onPress={() => setIsOpen(false)}
            activeOpacity={1}
          >
            <View className="bg-white rounded-2xl p-4">
              <Text className="text-lg font-semibold mb-3">{label}</Text>
              <FlatList
                data={options}
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
      )}
    </>
  );
};

export default CustomSelect;
