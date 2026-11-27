import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { OnboardingHeader } from "@/components/auth/OnboardingHeader";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import { isValidPhone } from "@/utils/validators";

/**
 * Reset PIN phone entry screen matching Figma Reset Password frame.
 */
export default function ResetPinScreen() {
  const [phone, setPhone] = useState("");

  const handleSendCode = () => {
    if (!phone.trim()) {
      Alert.alert("Missing Phone Number", "Please enter your phone number.");
      return;
    }

    if (!isValidPhone(phone)) {
      Alert.alert(
        "Invalid Phone Number",
        "Please enter a valid Nigerian phone number.",
      );
      return;
    }

    router.push({
      pathname: "/(auth)/reset-pin-otp",
      params: {
        phone: phone.trim(),
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <OnboardingHeader
            showBack
            backLabel="Back to log in"
            onBackPress={() => router.replace("/(auth)/login")}
            logoHeight={115}
          />

          <Text style={styles.title}>Reset Your Pin</Text>

          <Text style={styles.subtitle}>
            Enter the Phone number you signed up with. We will send you a code
            to reset your pin
          </Text>

          <View style={styles.field}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Phone Number"
              placeholderTextColor={colors.textLight}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              autoCapitalize="none"
              maxLength={14}
            />
          </View>

          <Text style={styles.infoText}>
            If an account exists for this number, the code will arrive in a few
            minutes.
          </Text>

          <View style={styles.bottomSection}>
            <Pressable
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.pressed,
              ]}
              onPress={handleSendCode}
            >
              <Text style={styles.primaryButtonText}>Send Reset Code</Text>
            </Pressable>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Remembered it? </Text>
              <Pressable onPress={() => router.replace("/(auth)/login")}>
                <Text style={styles.loginLink}>Log In</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primaryLight,
  },
  flex: {
    flex: 1,
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
  title: {
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  subtitle: {
    fontSize: typography.fontSize.body,
    lineHeight: 22,
    color: colors.text,
  },
  field: {
    width: "100%",
    gap: spacing.sm,
  },
  label: {
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  input: {
    width: "100%",
    height: 52,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    fontSize: typography.fontSize.body,
    color: colors.text,
  },
  infoText: {
    fontSize: typography.fontSize.body,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  bottomSection: {
    width: "100%",
    marginTop: "auto",
    paddingTop: spacing.xxl,
    gap: spacing.lg,
    alignItems: "center",
  },
  primaryButton: {
    width: "100%",
    borderRadius: 8,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: spacing.xl,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    fontSize: typography.fontSize.subtitle,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.white,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    fontSize: typography.fontSize.body,
    color: colors.text,
  },
  loginLink: {
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  pressed: {
    opacity: 0.85,
  },
});
