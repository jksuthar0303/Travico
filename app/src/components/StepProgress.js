import React from "react";
import { View, Text } from "react-native";

export default function StepProgress({ currentStep, totalSteps, label }) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <View className="mb-4">
      {/* Step Info */}
      <View className="flex-row justify-between mb-2 items-center">
        <Text className="text-gray-500 text-sm">
          Step {currentStep} of {totalSteps}
        </Text>
        <Text className="text-blue-600 text-sm font-semibold">{label}</Text>
      </View>

      {/* Progress Bar */}
      <View className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <View
          className="h-2 bg-blue-500"
          style={{ width: `${progress}%` }}
        />
      </View>
    </View>
  );
}
