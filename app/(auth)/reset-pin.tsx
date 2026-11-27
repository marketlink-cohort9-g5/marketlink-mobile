import React, { useState } from "react";
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
import { router } from "expo-router";
import { colors } from "../../src/theme/colors";
import { spacing } from "../../src/theme/spacing";
import { isValidPhone } from "../../src/utils/validators";

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

    // Password reset API integration will be added here.
    router.push({
      pathname: "/(auth)/reset-pin-otp",
      params: {
        phone: phone.trim(),
      },
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Back to Login */}
        <Pressable
          onPress={() => router.replace("/(auth)/login" as any)}
          style={styles.backButton}
        >
          <Text style={styles.backText}>‹ Back to log in</Text>
        </Pressable>

        {/* Heading */}
        <View style={styles.header}>
          <Text style={styles.title}>Reset Your Pin</Text>

          <Text style={styles.subtitle}>
            Enter the Phone number you signed up with. We will send you a code
            to reset your pin
          </Text>
        </View>

        {/* Phone Number */}
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
          />
        </View>

        {/* Information */}
        <Text style={styles.infoText}>
          If an account exists for this number, the code will arrive in a few
          minutes.
        </Text>

        {/* Send Reset Code */}
        <Pressable style={styles.primaryButton} onPress={handleSendCode}>
          <Text style={styles.primaryButtonText}>Send Reset Code</Text>
        </Pressable>

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Remembered it? </Text>

          <Pressable onPress={() => router.replace("/(auth)/login" as any)}>
            <Text style={styles.loginLink}>Log In</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  content: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 32,
    gap: spacing.xl,
  },

  backButton: {
    minHeight: 48,
    justifyContent: "center",
    alignSelf: "flex-start",
  },

  backText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
  },

  header: {
    gap: spacing.md,
    marginTop: spacing.xl,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: colors.text,
  },

  subtitle: {
    fontSize: 16,
    lineHeight: 25,
    color: colors.textSecondary,
  },

  field: {
    gap: spacing.sm,
    marginTop: spacing.md,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },

  input: {
    height: 54,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.white,
  },

  infoText: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSecondary,
  },

  primaryButton: {
    height: 54,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.md,
  },

  primaryButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.white,
  },

  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: spacing.md,
  },

  loginText: {
    fontSize: 15,
    color: colors.textSecondary,
  },

  loginLink: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.primary,
  },
});
