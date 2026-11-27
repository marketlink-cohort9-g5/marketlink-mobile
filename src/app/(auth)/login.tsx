import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CodeBoxInput } from "@/components/auth/CodeBoxInput";
import { OnboardingHeader } from "@/components/auth/OnboardingHeader";
import { AppButton } from "@/components/ui/AppButton";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import { isValidPhone, isValidPin } from "@/utils/validators";

/**
 * Sign In screen matching Figma Sign In frame.
 */
export default function LoginScreen() {
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");

  const handleLogin = () => {
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

    if (!isValidPin(pin)) {
      Alert.alert("Invalid PIN", "Please enter your 4-digit PIN.");
      return;
    }

    router.replace("/(retailer)/(tabs)/home");
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
          <OnboardingHeader showBack={false} logoHeight={115} />

          <Text style={styles.title}>Welcome Back!</Text>

          <Text style={styles.subtitle}>
            Sign in to continue managing your shop and orders
          </Text>

          <View style={styles.field}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Phone Number"
              placeholderTextColor={colors.textLight}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              maxLength={14}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Pin</Text>
            <CodeBoxInput
              length={4}
              value={pin}
              onChangeText={setPin}
              masked
              spread
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => router.push("/(auth)/reset-pin")}
          >
            <Text style={styles.forgotText}>Forgot Your Password?</Text>
          </TouchableOpacity>

          <View style={styles.bottomSection}>
            <AppButton title="Log In" onPress={handleLogin} />

            <View style={styles.footer}>
              <Text style={styles.footerText}>New to MarketLink? </Text>
              <TouchableOpacity
                activeOpacity={0.75}
                onPress={() => router.push("/(auth)/onboarding")}
              >
                <Text style={styles.createAccountText}>Create Account</Text>
              </TouchableOpacity>
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
    gap: spacing.md,
    alignItems: "flex-start",
  },
  title: {
    fontSize: typography.fontSize.heading,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    letterSpacing: 1.6,
  },
  subtitle: {
    fontSize: typography.fontSize.body,
    color: colors.text,
    lineHeight: 22,
  },
  field: {
    width: "100%",
    gap: spacing.sm,
    marginTop: spacing.xs,
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
  forgotText: {
    color: colors.primary,
    fontSize: typography.fontSize.body,
    marginTop: spacing.xs,
  },
  bottomSection: {
    width: "100%",
    marginTop: "auto",
    paddingTop: spacing.xxl,
    gap: spacing.lg,
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: colors.text,
    fontSize: typography.fontSize.body,
  },
  createAccountText: {
    color: colors.primary,
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.bold,
  },
});
