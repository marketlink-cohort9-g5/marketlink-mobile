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

import { colors } from "../../src/theme/colors";
import { isValidPhone, isValidPin } from "../../src/utils/validators";

export default function LoginScreen() {
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);

  const handleLogin = async () => {
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

    // Temporary login test.
    // Backend authentication and dashboard routing will be connected later.
    router.replace("/(retailer)/(tabs)/search" as any);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>‹ Back</Text>
        </Pressable>

        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>
            Sign in to continue managing your shop and orders.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              placeholderTextColor={colors.textLight}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              maxLength={14}
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.pinHeader}>
              <Text style={styles.label}>PIN</Text>

              <Pressable
                onPress={() => router.push("/(auth)/reset-pin" as any)}
              >
                <Text style={styles.forgotText}>Forgot Your PIN?</Text>
              </Pressable>
            </View>

            <View style={styles.pinContainer}>
              <TextInput
                style={styles.pinInput}
                placeholder="Enter your 4-digit PIN"
                placeholderTextColor={colors.textLight}
                keyboardType="number-pad"
                secureTextEntry={!showPin}
                value={pin}
                onChangeText={(value) =>
                  setPin(value.replace(/\D/g, "").slice(0, 4))
                }
                maxLength={4}
              />

              <Pressable onPress={() => setShowPin(!showPin)}>
                <Text style={styles.showPinText}>
                  {showPin ? "Hide" : "Show"}
                </Text>
              </Pressable>
            </View>
          </View>

          <Pressable style={styles.primaryButton} onPress={handleLogin}>
            <Text style={styles.primaryButtonText}>Log In</Text>
          </Pressable>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>New to MarketLink?</Text>

          <Pressable onPress={() => router.push("/(auth)/onboarding" as any)}>
            <Text style={styles.createAccountText}>Create Account</Text>
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
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 35,
  },
  backButton: {
    marginBottom: 35,
  },
  backText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  header: {
    marginBottom: 35,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textSecondary,
  },
  form: {
    gap: 24,
  },
  inputGroup: {
    gap: 10,
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
  },
  pinHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  forgotText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "600",
  },
  pinContainer: {
    height: 54,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  pinInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  showPinText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "600",
  },
  primaryButton: {
    height: 54,
    backgroundColor: colors.primary,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    marginTop: 40,
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  createAccountText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "700",
  },
});
