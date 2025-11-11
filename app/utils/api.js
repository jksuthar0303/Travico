import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 🌐 Backend Base URL
const BASE_URL = "http://192.168.68.129:5000/api";

// 🧩 Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// 🔐 Automatically attach JWT token from AsyncStorage to every request
api.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Token fetch error:", error);
  }
  return config;
});

// 🚀 Reusable API Request Function
export const apiRequest = async (method, url, data = null, config = {}) => {
  try {
    const response = await api.request({ method, url, data, ...config });
    const res = response.data;

    return {
      success: res.success ?? true,
      message: res.message ?? "Success",
      data: res.data ?? {},
    };
  } catch (error) {
    console.log("API Error:", error?.response?.data || error.message);
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Something went wrong, please try again.",
      status: error?.response?.status || 500,
    };
  }
};

export default api;
