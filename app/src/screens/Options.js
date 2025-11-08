import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import LottieView from 'lottie-react-native'
import { useTripStore } from '../../store/useTripStore'
import { fetchDestinationData } from '../data/mockdata'
import StepProgress from '../components/StepProgress'
import loadingAnimation from '../../assets/loading.json'

// 🧭 Lucide icons
import {
  Star,
  Clock,
  IndianRupee,
  Check,
  CheckCircle,
  PlusCircle,
} from 'lucide-react-native'

export default function OptionsScreen({ navigation }) {
  const { destination, setField } = useTripStore()
  const [data, setData] = useState({ places: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDestinationData('Jaipur').then((res) => {
        setData({ places: res.places })
        setField('selectedPlaces', res.places)
        setLoading(false)
      })
    }, 1500)
    return () => clearTimeout(timer)
  }, [destination])

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <LottieView
          source={loadingAnimation}
          autoPlay
          loop
          style={{ width: 220, height: 220 }}
        />
        <Text className="text-lg font-semibold text-gray-700 mt-4 text-center px-8">
          Finding amazing places for your destination...
        </Text>
        <Text className="text-sm text-gray-500 mt-2 italic">
          Please wait a moment 🌍✨
        </Text>
      </View>
    )
  }

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="p-4">
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-lg font-semibold">Select Places</Text>
          <SelectAllButton allPlaces={data.places} />
        </View>
        <StepProgress currentStep={3} totalSteps={3} />
      </View>

      {/* List */}
      <PlacesTab data={data.places} />

      {/* Footer Button */}
      <View className="p-4">
        <TouchableOpacity
          className="bg-primary py-4 rounded-3xl"
          onPress={() => navigation.navigate('Submit')}
        >
          <Text className="text-center text-white font-medium text-base">
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const SelectAllButton = ({ allPlaces }) => {
  const { selectedPlaces, setField } = useTripStore()
  const allSelected = allPlaces.length === selectedPlaces.length

  const toggleSelectAll = () => {
    if (allSelected) {
      setField('selectedPlaces', [])
    } else {
      setField('selectedPlaces', allPlaces)
    }
  }

  return (
    <TouchableOpacity
      onPress={toggleSelectAll}
      className={`px-4 py-2 rounded-full border ${
        allSelected ? 'border-red-400 bg-red-50' : 'border-green-400 bg-green-50'
      }`}
    >
      <Text
        className={`text-sm font-medium ${
          allSelected ? 'text-red-600' : 'text-green-600'
        }`}
      >
        {allSelected ? 'Deselect All' : 'Select All'}
      </Text>
    </TouchableOpacity>
  )
}

const PlacesTab = ({ data }) => {
  const { setField } = useTripStore()
  const { selectedPlaces } = useTripStore()

  const togglePlace = (place) => {
    const exists = selectedPlaces.find((p) => p.id === place.id)
    const updated = exists
      ? selectedPlaces.filter((p) => p.id !== place.id)
      : [...selectedPlaces, place]
    setField('selectedPlaces', updated)
  }

  return (
    <ScrollView className="p-3">
      {data.map((p) => {
        const isSelected = selectedPlaces.find((sp) => sp.id === p.id)
        return (
          <TouchableOpacity
            key={p.id}
            onPress={() => togglePlace(p)}
            activeOpacity={0.9}
            className={`mb-4 border rounded-3xl bg-white overflow-hidden shadow-lg ${
              isSelected ? 'border-primary' : 'border-gray-200'
            }`}
          >
            {/* ✅ Image with overlay */}
            <View className="relative w-full h-60">
              <Image source={{ uri: p.image }} className="w-full h-full" />
              <View className="absolute inset-0 bg-black/20" />
              <View className="absolute bottom-3 left-3">
                <Text className="text-white font-bold text-xl">{p.name}</Text>
              </View>
              {isSelected && (
                <View className="absolute top-3 right-3 bg-primary rounded-full p-2">
                  <Check size={18} color="white" />
                </View>
              )}
            </View>

            {/* ✅ Details */}
            <View className="p-3">
              <Text className="text-gray-500 text-sm mb-3">{p.description}</Text>

              <View className="flex-row items-center justify-between">
                {/* ⭐ Rating */}
                <View className="flex-row items-center">
                  <Star size={16} color="#facc15" fill="#facc15" />
                  <Text className="ml-1 text-gray-700 font-medium">
                    {p.rating || 4.5} / 5
                  </Text>
                </View>

                {/* ⏰ Duration */}
                <View className="flex-row items-center">
                  <Clock size={16} color="#3b82f6" />
                  <Text className="ml-1 text-gray-700 font-medium">
                    {p.duration || '2 hrs'}
                  </Text>
                </View>

                {/* 💰 Price */}
                <View className="flex-row items-center">
                  <IndianRupee size={16} color="#16a34a" />
                  <Text className="ml-1 text-gray-700 font-medium">
                    {p.price} / person
                  </Text>
                </View>
              </View>
            </View>

            {/* ✅ Button */}
            <View className="px-4 pb-4">
              <View
                className={`flex-row p-4 items-center justify-center gap-2 rounded-3xl ${
                  isSelected ? 'bg-primary' : 'bg-gray-200'
                }`}
              >
                {isSelected ? (
                  <CheckCircle size={22} color="white" />
                ) : (
                  <PlusCircle size={22} color="gray" />
                )}
                <Text
                  className={`font-bold ${
                    isSelected ? 'text-white' : 'text-gray-700'
                  }`}
                >
                  {isSelected ? 'Added to Itinerary' : 'Add to Visit'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )
      })}
    </ScrollView>
  )
}
