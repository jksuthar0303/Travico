import React from "react";
import { View, Text, ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  Shield,
  Lock,
  Eye,
  Database,
  Bell,
  Globe,
  FileText,
} from "lucide-react-native";

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: FileText,
      title: "1. Information We Collect",
      content: [
        "We collect information you provide directly to us when you create an account, plan trips, make bookings, or contact our support team.",
        "Personal information may include your name, email address, phone number, date of birth, payment information, and travel preferences.",
        "We automatically collect certain information about your device and how you interact with our services, including IP address, browser type, and usage data.",
      ],
    },
    {
      icon: Database,
      title: "2. How We Use Your Information",
      content: [
        "To provide, maintain, and improve our travel planning and booking services.",
        "To process your bookings and transactions, and send you related information including confirmations and invoices.",
        "To send you technical notices, updates, security alerts, and support messages.",
        "To respond to your comments, questions, and customer service requests.",
        "To personalize your experience and provide content and features that match your preferences.",
      ],
    },
    {
      icon: Lock,
      title: "3. Information Sharing and Disclosure",
      content: [
        "We do not sell, trade, or rent your personal information to third parties.",
        "We may share your information with service providers who perform services on our behalf, such as hotels, transportation providers, and tour guides.",
        "We may disclose your information if required by law or to protect our rights, property, or safety.",
        "With your consent, we may share information with partners for promotional purposes.",
      ],
    },
    {
      icon: Shield,
      title: "4. Data Security",
      content: [
        "We implement appropriate technical and organizational measures to protect your personal information.",
        "All payment transactions are encrypted using SSL technology.",
        "We regularly monitor our systems for vulnerabilities and attacks.",
        "However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
      ],
    },
    {
      icon: Eye,
      title: "5. Your Rights and Choices",
      content: [
        "You can access, update, or delete your personal information through your account settings.",
        "You may opt-out of promotional communications at any time by following the unsubscribe instructions.",
        "You can request a copy of your personal data or request that we delete your account.",
        "If you have concerns about how we handle your data, you can contact our privacy team.",
      ],
    },
    {
      icon: Bell,
      title: "6. Cookies and Tracking",
      content: [
        "We use cookies and similar tracking technologies to enhance your experience and analyze usage patterns.",
        "You can control cookie preferences through your browser settings.",
        "Some features may not function properly if you disable cookies.",
        "We use analytics services to understand how users interact with our platform.",
      ],
    },
    {
      icon: Globe,
      title: "7. International Data Transfers",
      content: [
        "Your information may be transferred to and processed in countries other than your own.",
        "We ensure appropriate safeguards are in place to protect your information when transferred internationally.",
        "By using our services, you consent to the transfer of your information to our facilities and service providers worldwide.",
      ],
    },
    {
      icon: FileText,
      title: "8. Children's Privacy",
      content: [
        "Our services are not directed to children under 13 years of age.",
        "We do not knowingly collect personal information from children under 13.",
        "If we learn we have collected information from a child under 13, we will delete that information promptly.",
        "Parents can add children as travelers on trips, but the account holder must be 18 or older.",
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
        
            <Shield size={30} color="#4a9eff" />
          </View>
          <Text className="text-black text-xl font-semibold">
            Privacy Policy
          </Text>
          <Text className="text-gray-500 text-sm">
            Last updated: November 3, 2025
          </Text>
        </View>

        {/* Introduction */}
        <View className="bg-white border border-gray-200 rounded-3xl p-4 shadow-sm mb-4">
          <Text className="text-gray-700 text-sm leading-relaxed">
            At Travico, we take your privacy seriously. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your
            information when you use our travel management application. Please
            read this policy carefully to understand our practices regarding
            your personal data.
          </Text>
        </View>

        {/* Policy Sections */}
        {sections.map((section, index) => (
          <View
            key={index}
            className="bg-white border border-gray-200 rounded-3xl p-4 shadow-sm mb-4"
          >
            <View className="flex-row items-start gap-3 mb-2">
              <View className="w-10 h-10 rounded-xl bg-primary/20 items-center justify-center">
                <section.icon size={20} color="#4a9eff" />
              </View>
              <Text className="text-lg font-semibold flex-1 text-gray-800">
                {section.title}
              </Text>
            </View>

            <View className="border-b border-gray-200 mb-3" />

            {section.content.map((text, i) => (
              <Text
                key={i}
                className="text-gray-600 text-sm leading-relaxed mb-2"
              >
                {text}
              </Text>
            ))}
          </View>
        ))}

        {/* Changes Section */}
        <View className="bg-white border border-gray-200 rounded-3xl p-4 shadow-sm mb-4">
          <Text className="text-lg font-semibold mb-2 text-gray-800">
            9. Changes to This Privacy Policy
          </Text>
          <Text className="text-sm text-gray-600 leading-relaxed mb-2">
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "Last updated" date.
          </Text>
          <Text className="text-sm text-gray-600 leading-relaxed">
            You are advised to review this Privacy Policy periodically for any
            changes. Changes to this Privacy Policy are effective when they are
            posted on this page.
          </Text>
        </View>

        {/* Contact Section */}
        <View
          className="rounded-3xl p-4 border border-gray-200 shadow bg-white"
        >
          <Text className="text-lg font-semibold mb-2 text-gray-800">
            10. Contact Us
          </Text>
          <Text className="text-sm text-gray-600 leading-relaxed mb-3">
            If you have any questions about this Privacy Policy or our data
            practices, please contact us:
          </Text>

          <View className="flex-row items-center gap-2 mb-2">
            <Globe size={16} color="#4a9eff" />
            <Text className="text-sm text-gray-700">privacy@travico.com</Text>
          </View>

          <View className="flex-row items-center gap-2">
            <Shield size={16} color="#4a9eff" />
            <Text className="text-sm text-gray-700">
              Data Protection Officer: privacy-dpo@travico.com
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
