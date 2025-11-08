import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Image,
} from "react-native";
import { Mail, Lock, Eye, EyeOff } from "lucide-react-native";
import Google from "../../assets/google.png";
import LinearGradient from "react-native-linear-gradient";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthStore } from "../../store/useAuthStore";
import { useToastStore } from "../../store/useToastStore";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../assets/logo.png";

const signupSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function SignUp() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const signup = useAuthStore((state) => state.signup);
  const showToast = useToastStore((state) => state.showToast);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await signup(data);
      showToast("Signup Successful!", "success");
    } catch (err) {
      console.log(err);
      showToast(err.message || "Signup failed. Try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={["#3b82f6", "#a8d5ba"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1 p-6"
    >
      <KeyboardAvoidingView
        style={{flex:1}}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Logo Section */}
            <View className="items-center mb-6">
                <Image
                  source={Logo}
                  className="h-32 w-32 rounded-full"
                  resizeMode="cover"
                />
              <Text className="text-2xl text-white font-bold">Travico</Text>
              <Text className="text-gray-200">
                Your Complete Travel Companion
              </Text>
            </View>

            {/* Form Container */}
            <View className="bg-white p-6 rounded-3xl shadow-md">
              <Text className="text-center text-lg font-semibold mb-5">
                Create Account
              </Text>

              {/* Full Name */}
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <View className="mb-4">
                    <Text className="mb-1 text-gray-700 font-medium">
                      Full Name
                    </Text>
                    <View
                      className={`flex-row items-center bg-gray-100 rounded-full border px-4 h-14 ${errors.name
                          ? "border-red-500"
                          : focusedField === "name"
                            ? "border-blue-500"
                            : "border-gray-300"
                        }`}
                    >
                      <TextInput
                        className="flex-1 text-base text-gray-900"
                        placeholder="John Doe"
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        onChangeText={onChange}
                        value={value}
                      />
                    </View>
                    {errors.name && (
                      <Text className="text-red-500 mt-1 text-sm">
                        {errors.name.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              {/* Email */}
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <View className="mb-4">
                    <Text className="mb-1 text-gray-700 font-medium">Email</Text>
                    <View
                      className={`flex-row items-center bg-gray-100 rounded-full border px-4 h-14 ${errors.email
                          ? "border-red-500"
                          : focusedField === "email"
                            ? "border-blue-500"
                            : "border-gray-300"
                        }`}
                    >
                      <Mail size={20}
                        style={{ marginRight: 8 }}
                        color="#999" />
                      
                      <TextInput
                        className="flex-1 text-base text-gray-900"
                        placeholder="you@example.com"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        onChangeText={onChange}
                        value={value}
                      />
                    </View>
                    {errors.email && (
                      <Text className="text-red-500 mt-1 text-sm">
                        {errors.email.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              {/* Password */}
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <View className="mb-6">
                    <Text className="mb-1 text-gray-700 font-medium">
                      Password
                    </Text>
                    <View
                      className={`flex-row items-center bg-gray-100 rounded-full border px-4 h-14 ${errors.password
                          ? "border-red-500"
                          : focusedField === "password"
                            ? "border-blue-500"
                            : "border-gray-300"
                        }`}
                    >
                      <Lock  size={20}
                        color="#999"
                        style={{ marginRight: 8 }} />
                  
                      <TextInput
                        className="flex-1 text-base text-gray-900"
                        placeholder="••••••••"
                        secureTextEntry={!showPassword}
                        onFocus={() => setFocusedField("password")}
                        onBlur={() => setFocusedField(null)}
                        onChangeText={onChange}
                        value={value}
                      />
                      <TouchableOpacity
                        onPress={() => setShowPassword((prev) => !prev)}
                      >
                         {showPassword ? (
                          <EyeOff size={22} color="#999" />
                        ) : (
                          <Eye size={22} color="#999" />
                        )}
                      </TouchableOpacity>
                    </View>
                    {errors.password && (
                      <Text className="text-red-500 mt-1 text-sm">
                        {errors.password.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              {/* Submit Button */}
              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                disabled={loading}
                className="bg-blue-500 rounded-full h-12 items-center justify-center mb-5"
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text className="text-white text-lg font-medium">
                    Create Account
                  </Text>
                )}
              </TouchableOpacity>

              {/* Social Buttons */}
              <Text className="text-gray-400 text-center mb-3">
                or continue with
              </Text>
              <View className="flex-row justify-between gap-3">
                <TouchableOpacity className="flex-1 flex-row items-center justify-center bg-gray-100 h-12 rounded-full">
                  <Image
                    source={Google}
                    className="w-6 h-6"
                    resizeMode="contain"
                  />
                  <Text className="ml-2 font-medium text-gray-700">Google</Text>
                </TouchableOpacity>
              </View>

              {/* Already have account */}
              <View className="flex-row justify-center">
                <Text className="text-gray-400 mr-1">
                  Already have an account?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text className="text-blue-500 font-semibold">Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text className="text-sm text-center text-gray-300 mt-6">
              By continuing, you agree to our Terms & Privacy Policy
            </Text>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
