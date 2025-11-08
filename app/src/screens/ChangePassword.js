import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Lock, Eye, EyeOff, Check, X } from "lucide-react-native";
import LinearGradient from "react-native-linear-gradient";

export default function ChangePassword({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Password validation rules
  const passwordRequirements = [
    { label: "At least 8 characters", test: (pwd) => pwd.length >= 8 },
    { label: "Contains uppercase letter", test: (pwd) => /[A-Z]/.test(pwd) },
    { label: "Contains lowercase letter", test: (pwd) => /[a-z]/.test(pwd) },
    { label: "Contains number", test: (pwd) => /[0-9]/.test(pwd) },
    {
      label: "Contains special character",
      test: (pwd) => /[!@#$%^&*(),.?\":{}|<>]/.test(pwd),
    },
  ];

  // Strength calculation
  const passwordStrength = (() => {
    const met = passwordRequirements.filter((req) => req.test(newPassword)).length;
    return (met / passwordRequirements.length) * 100;
  })();

  const getStrengthColor = () => {
    if (passwordStrength < 40) return "#ef4444"; // red
    if (passwordStrength < 80) return "#facc15"; // yellow
    return "#22c55e"; // green
  };

  const passwordsMatch =
    newPassword === confirmPassword && confirmPassword.length > 0;
  const allRequirementsMet = passwordRequirements.every((r) => r.test(newPassword));

  const handleSubmit = () => {
    if (currentPassword !== "password123") {
      Alert.alert("Incorrect Password", "Current password is incorrect.");
      return;
    }
    if (!allRequirementsMet) {
      Alert.alert("Weak Password", "Please meet all password requirements.");
      return;
    }
    if (!passwordsMatch) {
      Alert.alert("Mismatch", "New password and confirmation do not match.");
      return;
    }

    Alert.alert("Success", "Password changed successfully!", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} 
    >
      <ScrollView
        className="flex-1 bg-white px-4"
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >


        {/* Current Password */}
        <View className="mt-6 bg-white rounded-3xl border border-gray-200 p-4 shadow-sm">
          <Text className="text-gray-600 mb-1">Current Password</Text>
          <View className="flex-row items-center border border-gray-300 rounded-2xl px-3">
            <Lock color="#888" size={18} />
            <TextInput
              secureTextEntry={!showCurrent}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              placeholder="Enter current password"
              className="flex-1 px-2 py-3 text-gray-800"
              returnKeyType="next"
            />
            <TouchableOpacity onPress={() => setShowCurrent(!showCurrent)}>
              {showCurrent ? (
                <EyeOff color="#888" size={18} />
              ) : (
                <Eye color="#888" size={18} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* New Password */}
        <View className="mt-4 bg-white rounded-3xl border border-gray-200 p-4 shadow-sm">
          <Text className="text-gray-600 mb-1">New Password</Text>
          <View className="flex-row items-center border border-gray-300 rounded-2xl px-3">
            <Lock color="#888" size={18} />
            <TextInput
              secureTextEntry={!showNew}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Enter new password"
              className="flex-1 px-2 py-3 text-gray-800"
              returnKeyType="next"
            />
            <TouchableOpacity onPress={() => setShowNew(!showNew)}>
              {showNew ? (
                <EyeOff color="#888" size={18} />
              ) : (
                <Eye color="#888" size={18} />
              )}
            </TouchableOpacity>
          </View>

          {/* Password Strength Bar */}
          {newPassword ? (
            <View className="mt-3">
              <Text className="text-sm text-gray-600 mb-1">Password Strength</Text>
              <View className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <View
                  style={{
                    width: `${passwordStrength}%`,
                    backgroundColor: getStrengthColor(),
                  }}
                  className="h-full rounded-full"
                />
              </View>
            </View>
          ) : null}

          {/* Requirements */}
          <View className="mt-3">
            <Text className="text-gray-500 text-sm mb-1">Must contain:</Text>
            {passwordRequirements.map((req, i) => {
              const isMet = req.test(newPassword);
              return (
                <View key={i} className="flex-row items-center gap-2 my-0.5">
                  {isMet ? (
                    <View className="w-5 h-5 rounded-full bg-green-100 items-center justify-center">
                      <Check size={14} color="#22c55e" />
                    </View>
                  ) : (
                    <View className="w-5 h-5 rounded-full bg-gray-200 items-center justify-center">
                      <X size={14} color="#9ca3af" />
                    </View>
                  )}
                  <Text
                    className={`text-sm ${
                      isMet ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {req.label}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Confirm Password */}
        <View className="mt-4 bg-white rounded-3xl border border-gray-200 p-4 shadow-sm mb-6">
          <Text className="text-gray-600 mb-1">Confirm New Password</Text>
          <View className="flex-row items-center border border-gray-300 rounded-2xl px-3">
            <Lock color="#888" size={18} />
            <TextInput
              secureTextEntry={!showConfirm}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm new password"
              className="flex-1 px-2 py-3 text-gray-800"
              returnKeyType="done"
            />
            <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? (
                <EyeOff color="#888" size={18} />
              ) : (
                <Eye color="#888" size={18} />
              )}
            </TouchableOpacity>
          </View>

          {confirmPassword.length > 0 && (
            <View className="flex-row items-center gap-2 mt-2">
              {passwordsMatch ? (
                <>
                  <View className="w-5 h-5 rounded-full bg-green-100 items-center justify-center">
                    <Check size={14} color="#22c55e" />
                  </View>
                  <Text className="text-green-600 text-sm">Passwords match</Text>
                </>
              ) : (
                <>
                  <View className="w-5 h-5 rounded-full bg-red-100 items-center justify-center">
                    <X size={14} color="#ef4444" />
                  </View>
                  <Text className="text-red-500 text-sm">
                    Passwords don’t match
                  </Text>
                </>
              )}
            </View>
          )}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!currentPassword || !allRequirementsMet || !passwordsMatch}
          className={`h-14 mb-10 rounded-2xl items-center justify-center ${
            !currentPassword || !allRequirementsMet || !passwordsMatch
              ? "bg-gray-300"
              : "bg-primary"
          }`}
        >
          <View className="flex-row items-center gap-2">
            <Lock size={20} color="white" />
            <Text className="text-white text-base font-semibold">
              Change Password
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
