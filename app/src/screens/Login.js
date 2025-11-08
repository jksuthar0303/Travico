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
import LinearGradient from "react-native-linear-gradient";
import { Mail, Lock, Eye, EyeOff } from "lucide-react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthStore } from "../../store/useAuthStore";
import { useToastStore } from "../../store/useToastStore";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../assets/logo.png";
import Google from "../../assets/google.png";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const login = useAuthStore((state) => state.login);
  const showToast = useToastStore((state) => state.showToast);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await login(data);
      showToast(res.message || "Login Successful!", "success");
  
    } catch (err) {
      console.log("Login error:", err);
      showToast(err.message || "Login failed. Please try again.", "error");
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
              <Text className="text-white text-2xl font-semibold">Travico</Text>
              <Text className="text-gray-200">
                Your Complete Travel Companion
              </Text>
            </View>

            {/* Form */}
            <View className="bg-white rounded-3xl p-6 shadow-md">
              <Text className="text-center text-lg mb-4">Welcome Back</Text>

              {/* Email Field */}
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <View className="mb-4">
                    <Text className="text-gray-700 mb-1">Email</Text>
                    <View
                      className={`flex-row items-center bg-gray-100 rounded-full border px-3 h-14 ${
                        errors.email
                          ? "border-red-500"
                          : isEmailFocused
                          ? "border-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      <Mail size={20} color="#999" />
                      <TextInput
                        className="flex-1 ml-2 text-base text-gray-900"
                        placeholder="you@example.com"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        onFocus={() => setIsEmailFocused(true)}
                        onBlur={() => setIsEmailFocused(false)}
                        onChangeText={onChange}
                        value={value}
                      />
                    </View>
                    {errors.email && (
                      <Text className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              {/* Password Field */}
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <View className="mb-3">
                    <Text className="text-gray-700 mb-1">Password</Text>
                    <View
                      className={`flex-row items-center bg-gray-100 rounded-full border px-3 h-14 ${
                        errors.password
                          ? "border-red-500"
                          : isPasswordFocused
                          ? "border-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      <Lock size={20} color="#999" />
                      <TextInput
                        className="flex-1 ml-2 text-base text-gray-900"
                        placeholder="••••••••"
                        secureTextEntry={!showPassword}
                        onFocus={() => setIsPasswordFocused(true)}
                        onBlur={() => setIsPasswordFocused(false)}
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
                      <Text className="text-red-500 text-sm mt-1">
                        {errors.password.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              {/* Forgot Password */}
              <TouchableOpacity>
                <Text className="text-blue-500 text-right mb-4">
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              {/* Login Button */}
              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                disabled={loading}
                className="bg-blue-500 rounded-full h-12 items-center justify-center mb-4"
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text className="text-white text-base font-medium">Login</Text>
                )}
              </TouchableOpacity>

              {/* Social Buttons */}
              <Text className="text-gray-400 text-center mb-2">
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

              {/* Sign Up Link */}
              <View className="flex-row justify-center mt-4">
                <Text className="text-gray-400 mr-1">
                  Don't have an account?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                  <Text className="text-blue-500 font-semibold">Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* Footer */}
      <Text className="text-gray-300 text-sm text-center mt-2">
        By continuing, you agree to our Terms & Privacy Policy
      </Text>
    </LinearGradient>
  );
}
