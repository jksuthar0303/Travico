import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { CheckCircle, AlertTriangle, Info } from 'lucide-react-native' // Lucide icons

const dummyNotifications = [
  { id: 1, type: 'info', title: 'Welcome to WanderWise!', message: 'Thank you for joining us.', time: '2h ago' },
  { id: 2, type: 'success', title: 'Trip Booked', message: 'Your trip to Goa is confirmed.', time: '1d ago' },
  { id: 3, type: 'warning', title: 'Payment Pending', message: 'Please complete your payment for the upcoming trip.', time: '3d ago' },
  { id: 4, type: 'info', title: 'New Feature', message: 'Check out our new live chat support!', time: '5d ago' },
];

export default function Notifications() {
  const getIconColor = (type) => {
    switch (type) {
      case 'success':
        return '#34D399'; // green
      case 'warning':
        return '#FBBF24'; // orange
      case 'info':
        return '#4A9EFF'; // blue
      default:
        return '#4A9EFF';
    }
  };

  const renderIcon = (type, color) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={22} color="white" />;
      case 'warning':
        return <AlertTriangle size={22} color="white" />;
      case 'info':
      default:
        return <Info size={22} color="white" />;
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      {dummyNotifications.map((notif) => (
        <TouchableOpacity
          key={notif.id}
          className="bg-gray-50 shadow-lg rounded-2xl p-4 mb-4 flex-row items-start gap-3"
          activeOpacity={0.8}
        >
          {/* Dynamic icon background */}
          <View
            style={{ backgroundColor: getIconColor(notif.type) }}
            className="w-10 h-10 rounded-full justify-center items-center"
          >
            {renderIcon(notif.type, getIconColor(notif.type))}
          </View>

          <View className="flex-1">
            <Text className="font-bold text-gray-800">{notif.title}</Text>
            <Text className="text-gray-600 mt-1">{notif.message}</Text>
            <Text className="text-gray-400 text-sm mt-1">{notif.time}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
