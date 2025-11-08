import React from "react";
import { View, Text } from "react-native";
import * as Animatable from "react-native-animatable";
import { useToastStore } from "../../store/useToastStore";

export default function Toast() {
  const { message, type, visible } = useToastStore();

  if (!visible) return null;

  const backgroundColor =
    type === "success"
      ? "#22c55e"
      : type === "error"
      ? "#ef4444" 
      : "#4a9eff"; 

  return (
    <Animatable.View
      animation="fadeInDown"
      duration={300}
      easing="ease-out"
      style={{
        position: "absolute",
        top: 50,
        left: 20,
        right: 20,
        padding: 14,
        borderRadius: 12,
        backgroundColor,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 5,
        zIndex: 9999,
      }}
    >
      <Text
        style={{
          color: "white",
          fontWeight: "600",
          textAlign: "center",
          fontSize: 15,
        }}
      >
        {message}
      </Text>
    </Animatable.View>
  );
}
