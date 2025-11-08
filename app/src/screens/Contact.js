import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MessageSquare,
  Send,
  Instagram,
  Facebook,
} from 'lucide-react-native';

export default function Contact() {
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isMessageFocused, setIsMessageFocused] = useState(false);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'white' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ padding: 16, paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Contact Cards */}
          <View className="bg-blue-100 rounded-3xl border border-blue-400 p-4 justify-between mb-6">
            <View className="flex-row items-center gap-2 mb-6">
              <View className="w-12 h-12 bg-white rounded-full justify-center items-center">
                <Phone size={25} color="#4a9eff" />
              </View>
              <View>
                <Text className="text-lg">Phone</Text>
                <Text className="text-sm text-gray-500">+91 99999999</Text>
                <Text className="text-sm text-gray-500">Mon-Fri 9AM-6PM EST</Text>
              </View>
            </View>
            <TouchableOpacity className="bg-white h-14 rounded-3xl justify-center items-center">
              <Text className="text-xl">Call Us</Text>
            </TouchableOpacity>
          </View>

          <View className="bg-green-100 rounded-3xl border border-green-400 p-4 justify-between mb-6">
            <View className="flex-row items-center gap-2 mb-6">
              <View className="w-12 h-12 bg-white rounded-full justify-center items-center">
                <Mail size={25} color="#34a853" />
              </View>
              <View>
                <Text className="text-lg">Email</Text>
                <Text className="text-sm text-gray-500">support@wanderwise.com</Text>
                <Text className="text-sm text-gray-500">We reply within 24 hours</Text>
              </View>
            </View>
            <Pressable
              onPress={() => console.log('Send Email')}
              className="bg-white h-14 rounded-3xl justify-center items-center"
            >
              <Text className="text-xl">Send Email</Text>
            </Pressable>
          </View>

          <View className="bg-orange-100 rounded-3xl border border-orange-400 p-4 justify-between mb-6">
            <View className="flex-row items-center gap-2 mb-6">
              <View className="w-12 h-12 bg-white rounded-full justify-center items-center">
                <MessageSquare size={25} color="orange" />
              </View>
              <View>
                <Text className="text-lg">Live Chat</Text>
                <Text className="text-sm text-gray-500">Available Now</Text>
                <Text className="text-sm text-gray-500">Average response: 5 mins</Text>
              </View>
            </View>
            <Pressable
              onPress={() => console.log('Live Chat')}
              className="bg-white h-14 rounded-3xl justify-center items-center"
            >
              <Text className="text-xl">Live Chat</Text>
            </Pressable>
          </View>

          {/* Message Form */}
          <View className="border border-gray-300 rounded-3xl mb-6 p-4 bg-white">
            <View className="flex-row items-center gap-2 mb-4">
              <Send size={25} color="#4a9eff" />
              <Text className="text-lg font-bold">Send Us Message</Text>
            </View>

            {/* Name */}
            <View className="mb-5">
              <Text className="mb-1 font-bold text-gray-700">Name</Text>
              <View
                className={`flex-row items-center border bg-gray-100 rounded-3xl px-3 py-1 ${
                  isNameFocused ? 'border-blue-500' : 'border-gray-300'
                }`}
              >
                <TextInput
                  className="flex-1 text-base text-gray-900"
                  placeholder="Your Name"
                  onFocus={() => setIsNameFocused(true)}
                  onBlur={() => setIsNameFocused(false)}
                />
              </View>
            </View>

            {/* Email */}
            <View className="mb-5">
              <Text className="mb-1 font-bold text-gray-700">Email</Text>
              <View
                className={`flex-row items-center border bg-gray-100 rounded-3xl px-3 py-1 ${
                  isEmailFocused ? 'border-blue-500' : 'border-gray-300'
                }`}
              >
                <TextInput
                  className="flex-1 text-base text-gray-900"
                  placeholder="your@gmail.com"
                  keyboardType="email-address"
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                />
              </View>
            </View>

            {/* Message */}
            <View className="mb-5">
              <Text className="mb-1 font-bold text-gray-700">Message</Text>
              <View
                className={`flex-row border bg-gray-100 rounded-3xl px-3 h-40 ${
                  isMessageFocused ? 'border-blue-500' : 'border-gray-300'
                }`}
              >
                <TextInput
                  className="flex-1 text-base text-gray-900"
                  placeholder="Write your message here..."
                  multiline
                  numberOfLines={6}
                  textAlignVertical="top"
                  onFocus={() => setIsMessageFocused(true)}
                  onBlur={() => setIsMessageFocused(false)}
                />
              </View>
            </View>

            <TouchableOpacity className="bg-blue-500 py-3 flex-row justify-center gap-2 items-center rounded-3xl">
              <Send size={25} color="white" />
              <Text className="text-lg font-bold text-white">Send Message</Text>
            </TouchableOpacity>
          </View>

          {/* Socials */}
          <View className="border border-gray-200 rounded-3xl mb-12 p-4">
            <Text className="text-lg font-bold mb-2">Follow Us</Text>
            <View className="flex-row justify-start items-center gap-4">
              <TouchableOpacity className="p-4 bg-gray-300/30 rounded-3xl">
                <Instagram size={30} color="#D81B60" />
              </TouchableOpacity>
              <TouchableOpacity className="p-4 bg-gray-300/30 w-16 items-center rounded-3xl">
                <Facebook size={30} color="#1877F2" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
