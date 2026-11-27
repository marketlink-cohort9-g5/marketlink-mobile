import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { OnboardingHeader } from "@/components/auth/OnboardingHeader";
import { SupportFooter } from "@/components/auth/SupportFooter";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

type VerificationMethod = "email" | "phone";

interface MethodOption {
  id: VerificationMethod;
  title: string;
  subtitle: string;
}

const VERIFICATION_METHODS: MethodOption[] = [
  {
    id: "email",
    title: "Verify with Email",
    subtitle: "Receive a verification code in your email inbox.",
  },
  {
    id: "phone",
    title: "Verify with Phone",
    subtitle: "Receive a verification code by SMS.",
  },
];

/**
 * Registration Step 2 screen for selecting email or SMS verification.
 */
export default function VerifyMethodScreen() {
  const { accountType, fullName, email, phone } = useLocalSearchParams<{
    accountType?: string;
    fullName?: string;
    email?: string;
    phone?: string;
  }>();

  const role = accountType === "wholesaler" ? "wholesaler" : "retailer";
  const totalSteps = role === "wholesaler" ? 4 : 3;
  const [selectedMethod, setSelectedMethod] = useState<VerificationMethod>("email");

  const handleContinue = () => {
    const destination =
      selectedMethod === "email"
        ? email || "your selected email address"
        : phone || "your phone number";

    router.push({
      pathname: "/(auth)/verify-otp",
      params: {
        accountType: role,
        method: selectedMethod,
        destination,
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <OnboardingHeader showBack step={2} totalSteps={totalSteps} logoHeight={115} />

        <Text style={styles.heading}>{"Verify Your\nAccount"}</Text>

        <Text style={styles.subtitle}>
          Choose how you would like to receive your verification code.
        </Text>

        <Text style={styles.userName}>{fullName || "Full Name"}</Text>

        <View style={styles.optionsList}>
          {VERIFICATION_METHODS.map((option) => {
            const isSelected = selectedMethod === option.id;
            return (
              <Pressable
                key={option.id}
                onPress={() => setSelectedMethod(option.id)}
                style={[styles.optionCard, isSelected && styles.optionCardSelected]}
              >
                <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
                  {isSelected && <View style={styles.radioInner} />}
                </View>

                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.continueButton,
            pressed && styles.pressed,
          ]}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </Pressable>

        <SupportFooter />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primaryLight,
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.primaryLight,
  },
  container: {
    flexGrow: 1,
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
    padding: spacing.xl,
    gap: spacing.lg,
    alignItems: "flex-start",
  },
  heading: {
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  subtitle: {
    fontSize: typography.fontSize.subtitle,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textSecondary,
    lineHeight: 26,
  },
  userName: {
    fontSize: typography.fontSize.subtitle,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.text,
  },
  optionsList: {
    width: "100%",
    gap: spacing.lg,
  },
  optionCard: {
    width: "100%",
    minHeight: 80,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  optionCardSelected: {
    borderWidth: 2,
    borderColor: "#16834b",
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterSelected: {
    borderColor: "#16834b",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#16834b",
  },
  optionTextContainer: {
    flex: 1,
    gap: spacing.xs,
  },
  optionTitle: {
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.regular,
    color: colors.textSecondary,
  },
  optionSubtitle: {
    fontSize: 12,
    fontWeight: typography.fontWeight.regular,
    color: colors.textLight,
  },
  continueButton: {
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: spacing.xl,
    alignItems: "center",
    justifyContent: "center",
  },
  continueButtonText: {
    color: colors.primary,
    fontSize: typography.fontSize.subtitle,
    fontWeight: typography.fontWeight.semiBold,
  },
  pressed: {
    opacity: 0.85,
  },
});
