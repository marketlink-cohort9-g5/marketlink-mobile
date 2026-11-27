import { Image as ExpoImage } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
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
import { doPinsMatch, isValidPhone, isValidPin } from "@/utils/validators";

/**
 * Registration Step 1 screen matching Figma Create Account frame.
 */
export default function CreateAccountScreen() {
  const { accountType } = useLocalSearchParams<{ accountType?: string }>();
  const role = accountType === "wholesaler" ? "wholesaler" : "retailer";
  const totalSteps = role === "wholesaler" ? 4 : 3;
  const roleLabel = role === "wholesaler" ? "Wholesaler" : "Retailer";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleCreateAccount = () => {
    if (!fullName.trim()) {
      Alert.alert("Missing Name", "Please enter your full name.");
      return;
    }

    const emailTrimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
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
      Alert.alert("Invalid PIN", "Your PIN must contain exactly 4 digits.");
      return;
    }

    if (!doPinsMatch(pin, confirmPin)) {
      Alert.alert("PIN Mismatch", "Your PINs do not match.");
      return;
    }

    if (!agreedToTerms) {
      Alert.alert(
        "Terms Required",
        "Please agree to the Terms and Privacy Policy to continue.",
      );
      return;
    }

    router.push({
      pathname: "/(auth)/verify-method",
      params: {
        accountType: role,
        fullName: fullName.trim(),
        email: emailTrimmed,
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
          <OnboardingHeader showBack={false} step={1} totalSteps={totalSteps} logoHeight={100} />

          <Text style={styles.heading}>Create Your Account</Text>

          <Text style={styles.subtitle}>
            {role === "wholesaler"
              ? "Join Marketlink to connect with retailers and grow your wholesale business."
              : "Join MarketLink to connect with trusted wholesalers and retailers."}
          </Text>

          <Text style={styles.accountType}>Account type: {roleLabel}</Text>

          <View style={styles.field}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Name"
              placeholderTextColor={colors.textLight}
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Email Address"
              placeholderTextColor={colors.textLight}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Phone Number"
              placeholderTextColor={colors.textLight}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              maxLength={14}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Create a Pin</Text>
            <View style={styles.pinInputContainer}>
              <TextInput
                style={styles.pinInput}
                placeholder="Enter Your 4-digit Pin"
                placeholderTextColor={colors.textLight}
                value={pin}
                onChangeText={(value) =>
                  setPin(value.replace(/\D/g, "").slice(0, 4))
                }
                keyboardType="number-pad"
                secureTextEntry={!showPin}
                maxLength={4}
              />
              <Pressable
                onPress={() => setShowPin((prev) => !prev)}
                hitSlop={8}
                style={styles.eyeButton}
              >
                <ExpoImage
                  source={require("../../../assets/images/marketlink/eye.svg")}
                  style={[styles.eyeIcon, showPin && styles.eyeIconActive]}
                  contentFit="contain"
                />
              </Pressable>
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Confirm Your Pin</Text>
            <View style={styles.pinInputContainer}>
              <TextInput
                style={styles.pinInput}
                placeholder="Re-enter Your 4-digit Pin"
                placeholderTextColor={colors.textLight}
                value={confirmPin}
                onChangeText={(value) =>
                  setConfirmPin(value.replace(/\D/g, "").slice(0, 4))
                }
                keyboardType="number-pad"
                secureTextEntry={!showConfirmPin}
                maxLength={4}
              />
              <Pressable
                onPress={() => setShowConfirmPin((prev) => !prev)}
                hitSlop={8}
                style={styles.eyeButton}
              >
                <ExpoImage
                  source={require("../../../assets/images/marketlink/eye.svg")}
                  style={[styles.eyeIcon, showConfirmPin && styles.eyeIconActive]}
                  contentFit="contain"
                />
              </Pressable>
            </View>
          </View>

          <Pressable
            style={styles.termsRow}
            onPress={() => setAgreedToTerms((prev) => !prev)}
          >
            <View
              style={[
                styles.checkbox,
                agreedToTerms && styles.checkboxChecked,
              ]}
            >
              {agreedToTerms && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.termsText}>
              I agree to the Terms and Privacy Policy
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.submitButton,
              pressed && styles.pressed,
            ]}
            onPress={handleCreateAccount}
          >
            <Text style={styles.submitButtonText}>Create Account</Text>
          </Pressable>
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
  heading: {
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  subtitle: {
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.regular,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  accountType: {
    fontSize: typography.fontSize.subtitle,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.text,
  },
  field: {
    width: "100%",
    gap: spacing.sm,
  },
  label: {
    fontSize: typography.fontSize.subtitle,
    fontWeight: typography.fontWeight.semiBold,
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
  pinInputContainer: {
    width: "100%",
    height: 52,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    flexDirection: "row",
    alignItems: "center",
  },
  pinInput: {
    flex: 1,
    fontSize: typography.fontSize.body,
    color: colors.text,
  },
  eyeButton: {
    paddingLeft: spacing.sm,
    justifyContent: "center",
    alignItems: "center",
  },
  eyeIcon: {
    width: 20,
    height: 20,
  },
  eyeIconActive: {
    opacity: 0.5,
  },
  termsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.textLight,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkmark: {
    color: colors.white,
    fontSize: 12,
    fontWeight: typography.fontWeight.bold,
  },
  termsText: {
    fontSize: typography.fontSize.caption,
    color: colors.textSecondary,
  },
  submitButton: {
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: spacing.xl,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    color: colors.primary,
    fontSize: typography.fontSize.subtitle,
    fontWeight: typography.fontWeight.semiBold,
  },
  pressed: {
    opacity: 0.85,
  },
});
