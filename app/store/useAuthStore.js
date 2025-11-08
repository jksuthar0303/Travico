import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiRequest } from "../utils/api";

// 🔹 Enable this ONLY for testing/demo builds
const ENABLE_LOCAL_LOGIN = false; // ⬅️ set to false before production release

export const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  role: null,
  isLoading: false,

  // ✅ Check login state
  checkLogin: async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      const storedToken = await AsyncStorage.getItem("token");

      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      set({
        user: parsedUser,
        token: storedToken,
        role: parsedUser?.role || null,
        isLoading: false,
      });
    } catch (error) {
      console.error("Check login error:", error);
      set({ user: null, token: null, role: null, isLoading: false });
    }
  },

  // ✅ Login
  login: async (credentials) => {
    try {
      set({ isLoading: true });

      if (ENABLE_LOCAL_LOGIN) {
        const devUser = {
          id: "local-001",
          name: "Demo User",
          email: "test@demo.com",
          role: "tester",
        };
        await AsyncStorage.setItem("user", JSON.stringify(devUser));
        await AsyncStorage.setItem("token", "LOCAL_TOKEN");
        set({ user: devUser, token: "LOCAL_TOKEN", role: devUser.role, isLoading: false });
        return { success: true, message: "Logged in locally" };
      }

      // 🌐 Real API
      const res = await apiRequest("POST", "/users/login", credentials);
      if (!res.success) throw new Error(res.message);

      const { user, token } = res.data;

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));

      set({ user, token, role: user.role, isLoading: false });
      return { success: true, message: res.message };
    } catch (err) {
      console.log("Login error:", err.message);
      set({ isLoading: false });
      throw new Error(err.message || "Login failed");
    }
  },


  // ✅ SIGNUP
  signup: async (data) => {
    try {
      set({ isLoading: true });

      const res = await apiRequest("POST", "/users/register", data);
      if (!res.success) throw new Error(res.message);

      const { user, token } = res.data;
      if (token) await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));

      set({ user, role: user.role, isLoading: false });
      return { success: true, message: res.message };
    } catch (err) {
      set({ isLoading: false });
      throw new Error(err.message || "Signup failed");
    }
  },

  // ✅ UPDATE PROFILE
  updateProfile: async (id, data) => {
    try {
      set({ isLoading: true });

      const currentUser = get().user;
      let formData;

      if (data.profilePic) {
        formData = new FormData();
        formData.append("profilePic", {
          uri: data.profilePic.uri,
          name: data.profilePic.fileName || "profile.jpg",
          type: data.profilePic.type || "image/jpeg",
        });
      }

      const res = await apiRequest(
        "PUT",
        `/users/profile/${id}`,
        formData || data,
        {
          headers: {
            "Content-Type": formData ? "multipart/form-data" : "application/json",
          },
        }
      );

      if (!res.success) throw new Error(res.message);

      const updatedUser = {
        ...currentUser,
        ...res.data.user,
      };

      await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
      set({ user: updatedUser, isLoading: false });

      return { success: true, message: res.message };
    } catch (err) {
      console.log("Update profile error:", err.message);
      set({ isLoading: false });
      throw new Error(err.message || "Profile update failed");
    }
  },

  // ✅ LOGOUT
  logout: async () => {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");
    set({ user: null, token: null, role: null });
  },
}));
