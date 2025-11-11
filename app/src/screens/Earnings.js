import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  DollarSign,
  Calendar,
  Download,
  Clock,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Search,
} from "lucide-react-native";

export default function Earnings() {
  const [searchQuery, setSearchQuery] = useState("");

  const earningsSummary = {
    total: 12450,
    pending: 1280,
    available: 11170,
    thisMonth: 3240,
    lastMonth: 2980,
    growth: 8.7,
  };

  const transactions = [
    {
      id: "1",
      type: "received",
      amount: 180,
      status: "completed",
      date: "Nov 5, 2025",
      time: "2:30 PM",
      tourName: "Eiffel Tower Tour",
      customer: "Sarah Johnson",
      transactionId: "TXN-2025-1105-001",
    },
    {
      id: "2",
      type: "pending",
      amount: 200,
      status: "pending",
      date: "Nov 5, 2025",
      time: "6:00 PM",
      tourName: "Louvre Museum Tour",
      customer: "Mike Davis",
      transactionId: "TXN-2025-1105-002",
    },
    {
      id: "3",
      type: "received",
      amount: 250,
      status: "completed",
      date: "Nov 4, 2025",
      time: "11:00 AM",
      tourName: "Versailles Palace Tour",
      customer: "Emma Wilson",
      transactionId: "TXN-2025-1104-001",
    },
    {
      id: "4",
      type: "received",
      amount: 300,
      status: "completed",
      date: "Nov 2, 2025",
      time: "10:00 AM",
      tourName: "Seine River Cruise",
      customer: "John Smith",
      transactionId: "TXN-2025-1102-001",
    },
  ];

  const upcomingPayouts = [
    { amount: 1280, date: "Nov 10, 2025", tours: 8 },
    { amount: 2100, date: "Nov 17, 2025", tours: 12 },
  ];

  // 🔍 Filtered transactions based on search query
  const filteredTransactions = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return transactions.filter(
      (t) =>
        t.tourName.toLowerCase().includes(query) ||
        t.customer.toLowerCase().includes(query) ||
        t.date.toLowerCase().includes(query)
    );
  }, [searchQuery, transactions]);

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        className="p-4"
      >
        {/* Earnings Summary */}
        <View className="bg-primary rounded-3xl p-6 mb-4">
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-white/80 text-sm mb-1">Total Earnings</Text>
              <Text className="text-white text-3xl font-bold">
                ${earningsSummary.total.toLocaleString()}
              </Text>
            </View>
            <View className="w-12 h-12 bg-white/30 rounded-full items-center justify-center">
              <DollarSign size={28} color="white" />
            </View>
          </View>

          <View className="flex-row justify-between">
            <View className="bg-white/20 rounded-xl p-3 w-[48%]">
              <Text className="text-white/80 text-xs mb-1">Pending</Text>
              <Text className="text-white text-xl font-semibold">
                ${earningsSummary.pending}
              </Text>
            </View>
            <View className="bg-white/20 rounded-xl p-3 w-[48%]">
              <Text className="text-white/80 text-xs mb-1">Available</Text>
              <Text className="text-white text-xl font-semibold">
                ${earningsSummary.available}
              </Text>
            </View>
          </View>
        </View>

        {/* This Month Stats */}
        <View className="bg-white border border-gray-200 rounded-3xl p-4 mb-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-base font-semibold">This Month</Text>
            <View
              className={`px-2 py-1 rounded-full ${
                earningsSummary.growth > 0 ? "bg-green-100" : "bg-red-100"
              }`}
            >
              <Text
                className={`text-xs font-semibold ${
                  earningsSummary.growth > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {earningsSummary.growth > 0 ? "+" : ""}
                {earningsSummary.growth}%
              </Text>
            </View>
          </View>

          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-3xl font-semibold text-gray-800 mb-1">
                ${earningsSummary.thisMonth}
              </Text>
              <Text className="text-sm text-gray-500">
                ${earningsSummary.lastMonth} last month
              </Text>
            </View>
            {earningsSummary.growth > 0 ? (
              <ArrowUpRight size={30} color="#16a34a" />
            ) : (
              <ArrowDownRight size={30} color="#dc2626" />
            )}
          </View>
        </View>

        {/* Upcoming Payouts */}
        <View className="bg-white border border-gray-200 rounded-3xl p-4 mb-4">
          <Text className="text-base font-semibold mb-3">Upcoming Payouts</Text>
          {upcomingPayouts.map((payout, index) => (
            <View
              key={index}
              className="flex-row justify-between items-center bg-blue-50 p-3 rounded-xl mb-2"
            >
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
                  <Calendar size={20} color="#4a9eff" />
                </View>
                <View>
                  <Text className="text-sm font-semibold">
                    ${payout.amount}
                  </Text>
                  <Text className="text-xs text-gray-500">
                    {payout.tours} tours
                  </Text>
                </View>
              </View>
              <Text className="text-xs text-gray-600">{payout.date}</Text>
            </View>
          ))}
        </View>

        {/* 🔍 Search Bar */}
        <View className="flex-row items-center bg-gray-100 rounded-full px-3 py-2 mb-4">
          <Search size={18} color="#6b7280" />
          <TextInput
            placeholder="Search by tour, customer, or date"
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 ml-2 text-gray-800"
          />
        </View>

        {/* Transactions */}
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-base font-semibold">Transactions</Text>
        </View>

        {filteredTransactions.length === 0 ? (
          <View className="items-center justify-center p-10 bg-gray-50 rounded-2xl border border-gray-200">
            <Clock size={40} color="#9ca3af" />
            <Text className="text-gray-500 mt-2">No transactions found</Text>
          </View>
        ) : (
          filteredTransactions.map((t) => (
            <View
              key={t.id}
              className="bg-white border border-gray-200 rounded-2xl p-4 mb-3"
            >
              <View className="flex-row justify-between items-start mb-3">
                <View className="flex-row items-start">
                  <View
                    className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${
                      t.status === "completed"
                        ? "bg-green-100"
                        : "bg-yellow-100"
                    }`}
                  >
                    {t.status === "completed" ? (
                      <CheckCircle size={20} color="#16a34a" />
                    ) : (
                      <Clock size={20} color="#f59e0b" />
                    )}
                  </View>
                  <View>
                    <Text className="text-sm font-medium">{t.tourName}</Text>
                    <Text className="text-xs text-gray-500 mb-1">
                      {t.customer}
                    </Text>
                    <View
                      className={`px-2 py-1 rounded-full ${
                        t.status === "completed"
                          ? "bg-green-100"
                          : "bg-yellow-100"
                      }`}
                    >
                      <Text
                        className={`text-xs text-center ${
                          t.status === "completed"
                            ? "text-green-700"
                            : "text-yellow-700"
                        }`}
                      >
                        {t.status === "completed" ? "Received" : "Pending"}
                      </Text>
                    </View>
                  </View>
                </View>
                <View className="items-end">
                  <Text
                    className={`text-lg font-semibold ${
                      t.status === "completed"
                        ? "text-green-600"
                        : "text-gray-700"
                    }`}
                  >
                    ${t.amount}
                  </Text>
                  <Text className="text-xs text-gray-500">{t.date}</Text>
                </View>
              </View>

              <View className="h-[1px] bg-gray-200 mb-2" />

              <View className="flex-row justify-between">
                <Text className="text-xs text-gray-500">
                  ID: {t.transactionId}
                </Text>
                <Text className="text-xs text-gray-500">{t.time}</Text>
              </View>
            </View>
          ))
        )}

        {/* Withdraw Button */}
        <TouchableOpacity className="bg-gradient-to-r from-green-500 to-blue-500 py-4 rounded-2xl items-center mt-4">
          <View className="flex-row items-center">
            <DollarSign size={20} color="white" />
            <Text className="text-white text-base font-semibold ml-2">
              Withdraw ${earningsSummary.available.toLocaleString()}
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

