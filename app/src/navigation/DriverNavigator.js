import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from "../../store/useAuthStore";

const Stack = createNativeStackNavigator();

// 🧱 Placeholder Screens
function DriverHome({ navigation }) {
    const { logout } = useAuthStore();
    
    const handleLogout = async () => {
      Alert.alert("Logout", "Are you sure you want to log out?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await logout();
          },
        },
      ]);
    };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚗 Driver Home</Text>
      <Text style={styles.subtitle}>
        Welcome, Driver! View your assigned trips here.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("TripHistory")}
      >
        <Text style={styles.buttonText}>📜 View Trip History</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
        </TouchableOpacity>
    </View>
  );
}

function TripHistory({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📜 Trip History</Text>
      <Text style={styles.subtitle}>Your past trips will appear here.</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>⬅️ Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

// 🧭 Driver Navigator
export default function DriverNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DriverHome"
        component={DriverHome}
        options={{ title: "Driver Dashboard" }}
      />
      <Stack.Screen
        name="TripHistory"
        component={TripHistory}
        options={{ title: "Trip History" }}
      />
    </Stack.Navigator>
  );
}

// 💅 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
