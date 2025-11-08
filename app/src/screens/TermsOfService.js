import React from "react";
import { View, Text, ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle,
  Scale,
  CreditCard,
  Shield,
} from "lucide-react-native";

export default function TermsOfService() {
  const sections = [
    {
      icon: CheckCircle,
      title: "1. Acceptance of Terms",
      content: [
        "By accessing and using Travico, you accept and agree to be bound by the terms and provisions of this agreement.",
        "If you do not agree to these Terms of Service, please do not use our application.",
        "We reserve the right to modify these terms at any time. Your continued use of the service constitutes acceptance of those changes.",
      ],
    },
    {
      icon: FileText,
      title: "2. User Accounts",
      content: [
        "You must create an account to use certain features of our service.",
        "You are responsible for maintaining the confidentiality of your account credentials.",
        "You must be at least 18 years old to create an account.",
        "You agree to provide accurate, current, and complete information during registration.",
        "You are responsible for all activities that occur under your account.",
      ],
    },
    {
      icon: Shield,
      title: "3. Service Description",
      content: [
        "Travico provides a platform for planning and managing travel experiences.",
        "We facilitate bookings with third-party service providers including hotels, transportation, and tour guides.",
        "We act as an intermediary and are not directly responsible for the services provided by third parties.",
        "Service availability may vary by location and is subject to change without notice.",
      ],
    },
    {
      icon: CreditCard,
      title: "4. Bookings and Payments",
      content: [
        "All bookings are subject to availability and confirmation by the service provider.",
        "Prices are displayed in your selected currency and are subject to change.",
        "You agree to pay all charges incurred under your account.",
        "Payment processing is handled securely through our certified payment partners.",
        "Refunds are subject to the cancellation policy of each service provider.",
      ],
    },
    {
      icon: XCircle,
      title: "5. Cancellations and Refunds",
      content: [
        "Cancellation policies vary by service provider and are displayed at the time of booking.",
        "Some bookings may be non-refundable or subject to cancellation fees.",
        "Refunds will be processed according to the provider's policy and may take 5–10 business days.",
        "Travico may charge a service fee for processing cancellations.",
        "Force majeure events may affect cancellation and refund policies.",
      ],
    },
    {
      icon: AlertCircle,
      title: "6. User Conduct",
      content: [
        "You agree to use our service only for lawful purposes.",
        "You may not use the service to transmit harmful, offensive, or illegal content.",
        "You may not attempt to gain unauthorized access to our systems or other users' accounts.",
        "You may not use automated systems or software to extract data from our service.",
        "Violation of these terms may result in immediate account termination.",
      ],
    },
    {
      icon: Scale,
      title: "7. Intellectual Property",
      content: [
        "All content, features, and functionality of Travico are owned by us or our licensors.",
        "You may not copy, modify, distribute, or reverse engineer any part of our service.",
        "User-generated content remains your property, but you grant us a license to use it.",
        "Our trademarks and logos may not be used without prior written permission.",
      ],
    },
    {
      icon: Shield,
      title: "8. Limitation of Liability",
      content: [
        "Travico is provided 'as is' without warranties of any kind.",
        "We are not liable for any indirect, incidental, or consequential damages.",
        "We are not responsible for the acts or omissions of third-party service providers.",
        "Our total liability shall not exceed the amount you paid for the service in question.",
        "Some jurisdictions do not allow limitation of liability, so these limitations may not apply to you.",
      ],
    },
    {
      icon: FileText,
      title: "9. Third-Party Services",
      content: [
        "Our service may contain links to third-party websites and services.",
        "We are not responsible for the content or practices of third-party sites.",
        "Your interactions with third-party providers are solely between you and them.",
        "Third-party services have their own terms and privacy policies.",
      ],
    },
    {
      icon: AlertCircle,
      title: "10. Indemnification",
      content: [
        "You agree to indemnify and hold Travico harmless from any claims arising from your use of the service.",
        "This includes claims related to your violation of these terms or infringement of any rights.",
        "You are responsible for any damages resulting from your account being compromised.",
      ],
    },
  ];

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View
          className="flex items-center p-4"
        >
          <View className="w-16 h-16 rounded-full bg-primary/20 items-center justify-center mb-3">
          
            <FileText size={30} color="#4a9eff" />
          </View>
          <Text className="text-black text-xl font-semibold">
            Terms of Service
          </Text>
          <Text className="text-gray-500 text-sm">
            Last updated: November 3, 2025
          </Text>
        </View>

        {/* Introduction */}
        <View className="bg-white border border-gray-200 rounded-3xl p-4 shadow-sm mb-4">
          <Text className="text-gray-700 text-sm leading-relaxed">
            Welcome to Travico! These Terms of Service (“Terms”) govern your
            use of our travel management application and services. By using
            Travico, you agree to comply with and be bound by these Terms.
            Please read them carefully before using our service.
          </Text>
        </View>

        {/* Sections */}
        {sections.map((section, index) => (
          <View
            key={index}
            className="bg-white border border-gray-200 rounded-3xl p-4 shadow-sm mb-4"
          >
            <View className="flex-row items-start gap-3 mb-2">
              <View className="w-10 h-10 rounded-xl bg-blue-100 items-center justify-center">
                <section.icon size={20} color="#1b70e0" />
              </View>
              <Text className="text-lg font-semibold flex-1 text-gray-800">
                {section.title}
              </Text>
            </View>

            <View className="border-b border-gray-200 mb-3" />

            {section.content.map((line, i) => (
              <Text
                key={i}
                className="text-gray-600 text-sm leading-relaxed mb-2"
              >
                {line}
              </Text>
            ))}
          </View>
        ))}

        {/* Dispute Resolution */}
        <View className="bg-white border border-gray-200 rounded-3xl p-4 shadow-sm mb-4">
          <Text className="text-lg font-semibold mb-2 text-gray-800">
            11. Dispute Resolution
          </Text>
          <Text className="text-gray-600 text-sm leading-relaxed mb-2">
            Any disputes arising from these Terms or your use of Travico shall
            be resolved through binding arbitration, except where prohibited by
            law.
          </Text>
          <Text className="text-gray-600 text-sm leading-relaxed">
            You agree to waive your right to participate in class actions or
            class arbitrations.
          </Text>
        </View>

        {/* Governing Law */}
        <View className="bg-white border border-gray-200 rounded-3xl p-4 shadow-sm mb-4">
          <Text className="text-lg font-semibold mb-2 text-gray-800">
            12. Governing Law
          </Text>
          <Text className="text-gray-600 text-sm leading-relaxed">
            These Terms shall be governed by and construed in accordance with
            the laws of the jurisdiction in which Travico operates, without
            regard to its conflict of law provisions.
          </Text>
        </View>

        {/* Severability */}
        <View className="bg-white border border-gray-200 rounded-3xl p-4 shadow-sm mb-4">
          <Text className="text-lg font-semibold mb-2 text-gray-800">
            13. Severability
          </Text>
          <Text className="text-gray-600 text-sm leading-relaxed">
            If any provision of these Terms is found to be unenforceable or
            invalid, that provision shall be limited or eliminated to the
            minimum extent necessary so that these Terms shall otherwise remain
            in full force and effect.
          </Text>
        </View>

        {/* Contact */}
        <View
          className="rounded-3xl p-4 border bg-blue-50 border-gray-200 shadow-sm mb-4"
        >
          <Text className="text-lg font-semibold mb-2 text-gray-800">
            14. Contact Information
          </Text>
          <Text className="text-sm text-gray-600 leading-relaxed mb-3">
            If you have any questions about these Terms of Service, please
            contact us:
          </Text>
          <View className="flex-row items-center gap-2 mb-1">
            <FileText size={16} color="#4a9eff" />
            <Text className="text-sm text-gray-700">legal@travico.com</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Shield size={16} color="#4a9eff" />
            <Text className="text-sm text-gray-700">
              Support: support@travico.com
            </Text>
          </View>
        </View>

        {/* Acknowledgment */}
        <View className="bg-blue-50 rounded-3xl p-4 border border-blue-100 shadow-sm">
          <View className="flex-row items-start gap-3">
            <CheckCircle size={20} color="#4a9eff" />
            <View className="flex-1">
              <Text className="text-sm mb-2 text-gray-800">
                By using Travico, you acknowledge that:
              </Text>
              <View className="pl-2">
                <Text className="text-sm text-gray-600 mb-1">
                  • You have read and understood these Terms of Service
                </Text>
                <Text className="text-sm text-gray-600 mb-1">
                  • You agree to be bound by these Terms
                </Text>
                <Text className="text-sm text-gray-600">
                  • You meet the age requirements to use this service
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
