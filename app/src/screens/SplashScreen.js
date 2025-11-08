import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import * as Animatable from "react-native-animatable";
import { MapPin, Globe, Camera } from "lucide-react-native";
import Logo from "../../assets/logo.png";

export default function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      colors={["#3b82f6", "#a8d5ba"]}
     className="flex-1 items-center justify-center"
    >
      {/* Background icons */}
      <View className="absolute top-20 left-10 opacity-20">
        <MapPin size={50} color="white" />
      </View>

      <View className="absolute bottom-32 right-12 opacity-30">
        <Camera size={50} color="#8b5cf6" />
      </View>

      <View className="absolute right-16 top-1/3 opacity-20">
        <Globe size={50} color="#ec4899" />
      </View>

      {/* Main content */}
      <View className="items-center gap-2">
        {/* Animated Logo */}
        <Animatable.View
          animation="fadeInUp"
          duration={1000}
          className="items-center"
        >
          <Image source={Logo} className="h-40 w-40" resizeMode="cover" />
        </Animatable.View>

        {/* App Name */}
        <Animatable.View animation="fadeInDown" delay={400}>
          <Text className="font-bold text-4xl text-center text-white">
           Travico
          </Text>
          <Text className="text-muted mt-2 text-center">
            Your Journey Begins Here
          </Text>
        </Animatable.View>

        {/* Animated Dots */}
        <View  className="gap-2 mt-4 flex-row">
          {[0, 1, 2].map((i) => (
            <Animatable.View
              key={i}
              animation="pulse"
              iterationCount="infinite"
              duration={800}
              delay={i * 200}
            className="h-4 w-4 bg-primary rounded-full"
            />
          ))}
        </View>
      </View>
    </LinearGradient>
  );
}
