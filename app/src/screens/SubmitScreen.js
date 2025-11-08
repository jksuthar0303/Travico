import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, } from 'react-native'
import { useTripStore } from '../../store/useTripStore'
import StepProgress from '../components/StepProgress'
import { useToastStore } from '../../store/useToastStore'

export default function SubmitScreen({ navigation }) {
  const state = useTripStore()
  const showToast = useToastStore((state) => state.showToast);


  const sendEnquiry = async () => {
    await new Promise((r) => setTimeout(r, 700))
  
    // ✅ Step 1: Reset trip store before leaving
    useTripStore.getState().reset()
  
    // ✅ Step 2: Navigate first
    navigation.popToTop()
  
    // ✅ Step 3: After navigation, show toast
    setTimeout(() => {
      showToast(
        "🎉 Enquiry Sent Successfully!\nYour trip enquiry has been submitted.\nOur admin will review and confirm shortly.",
        "success"
      )
    }, 1500) // small delay (1500ms) ensures navigation completes
  }
  
  

  return (
    <ScrollView className="flex-1 bg-white p-5">
      <Text className="text-xl font-bold mb-3 text-gray-800">Confirm & Send</Text>
      <StepProgress currentStep={4} totalSteps={4} />

      <View className="mt-4 space-y-2">
        <Text className="text-gray-700">
          <Text className="font-semibold">Destination:</Text> {state.destination}
        </Text>
        <Text className="text-gray-700">
          <Text className="font-semibold">Dates:</Text> {state.startDate} → {state.endDate}
        </Text>
        <Text className="text-gray-700">
          <Text className="font-semibold">Travelers:</Text> {state.travelers.length}
        </Text>
        <Text className="text-gray-700">
          <Text className="font-semibold">Guide Required:</Text>{' '}
          {state.needsGuide ? 'Yes' : 'No'}
        </Text>
        <Text className="text-gray-700">
          <Text className="font-semibold">Hotel Selected:</Text>{' '}
          {state.selectedHotel ? 'Yes' : 'No'}
        </Text>
        <Text className="text-gray-700">
          <Text className="font-semibold">Transport Selected:</Text>{' '}
          {state.selectedTransport ? 'Yes' : 'No'}
        </Text>
      </View>

      <View className="mt-6 border-t border-gray-200 pt-4">
        <Text className="text-sm text-gray-500 italic">
          Once your enquiry is approved, you’ll receive a notification with the trip details and total cost.
        </Text>
      </View>

      <TouchableOpacity
        className="bg-primary py-4 rounded-2xl mt-8"
        onPress={sendEnquiry}
      >
        <Text className="text-white text-center font-medium text-base">
          Send Enquiry
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )
}
