import React, { useRef, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions, Animated } from "react-native";
import * as Animatable from "react-native-animatable";
import { Calendar, Home, IndianRupee, Send, Shield, User } from "lucide-react-native";

const { width } = Dimensions.get("window");
const TAB_COUNT = 4;
const TAB_WIDTH = width / TAB_COUNT;

const icons = { Home, Trip: Send, SOS: Shield, Profile: User, Schedule: Calendar,Earnings: IndianRupee };

export default function AnimatedTabBar({ state, descriptors, navigation }) {
  const translateX = useRef(new Animated.Value(state.index * TAB_WIDTH)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: state.index * TAB_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [state.index]);

  return (
    <View style={styles.container}>
      {/* Moving Dot Indicator */}
      <Animated.View
        style={[
          styles.indicator,
          {
            left: TAB_WIDTH / 2 - 4,
            transform: [{ translateX }],
          },
        ]}
      />

      {/* Tabs */}
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const isFocused = state.index === index;
        const IconComponent = icons[label];

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
        };

        return (
          <TouchableOpacity key={index} onPress={onPress} activeOpacity={0.8} style={styles.tabButton}>
            <Animatable.View animation={isFocused ? "pulse" : undefined} duration={250} iterationCount={1}>
              <IconComponent size={22} color={isFocused ? "#4a9eff" : "#999"} strokeWidth={2.2} />
            </Animatable.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 75,
    backgroundColor: "#fff",
    borderTopWidth: 0,
    elevation: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
  },
  label: {
    fontSize: 12,
    textAlign: "center",
  },
  indicator: {
    position: "absolute",
    bottom: 16,
    width: 6,
    height: 6,
    borderRadius: 4,
    backgroundColor: "#4a9eff",
  },
});
