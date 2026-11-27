import { router, useLocalSearchParams } from "expo-router";
import type { ComponentRef } from "react";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { colors } from "../../src/theme/colors";
import { spacing } from "../../src/theme/spacing";

export default function ResetPinOtpScreen() {
  const params = useLocalSearchParams<{ phone?: string }>();

  const phone = params.phone || "+234 8145232323";

  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(45);

  const inputRef = useRef<ComponentRef<typeof TextInput>>(null);

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleResend = () => {
    if (countdown > 0) return;

    setCountdown(45);
    setOtp("");

    // Resend OTP API integration will be added here.
    Alert.alert(
      "Code Requested",
      "Your new verification code has been requested.",
    );
  };

  const handleContinue = () => {
    if (otp.length !== 6) {
      Alert.alert(
        "Incomplete Code",
        "Please enter the complete 6-digit verification code.",
      );
      return;
    }

    Keyboard.dismiss();

    // OTP verification API integration will be added here.
    router.replace("/(auth)/reset-pin-new" as any);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      {/* Back Button */}
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>‹ Back</Text>
      </Pressable>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Check Your Phone</Text>

        <Text style={styles.subtitle}>
          We sent a 6-digit code to {phone}. Enter it to continue.
        </Text>
      </View>

      {/* OTP Input */}
      <Pressable
        style={styles.otpContainer}
        onPress={() => inputRef.current?.focus()}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <View
            key={index}
            style={[styles.otpBox, otp.length === index && styles.activeOtpBox]}
          >
            <Text style={styles.otpText}>{otp[index] || ""}</Text>
          </View>
        ))}

        <TextInput
          ref={inputRef}
          value={otp}
          onChangeText={(value) =>
            setOtp(value.replace(/[^0-9]/g, "").slice(0, 6))
          }
          keyboardType="number-pad"
          maxLength={6}
          style={styles.hiddenInput}
          caretHidden
          autoFocus={false}
        />
      </Pressable>

      {/* Resend Code */}
      <View style={styles.resendContainer}>
        <View style={styles.resendRow}>
          <Text style={styles.resendText}>Didn't receive a code? </Text>

          <Pressable onPress={handleResend} disabled={countdown > 0}>
            <Text
              style={[styles.resendLink, countdown > 0 && styles.disabledLink]}
            >
              Resend code
            </Text>
          </Pressable>
        </View>

        {countdown > 0 && (
          <Text style={styles.countdownText}>
            Resend code in {formatTime(countdown)}
          </Text>
        )}
      </View>

      {/* Continue Button */}
      <Pressable
        style={[
          styles.continueButton,
          otp.length !== 6 && styles.disabledButton,
        ]}
        onPress={handleContinue}
        disabled={otp.length !== 6}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </Pressable>
    </ScrollView>
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
    gap: 24,
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
    fontSize: 28,
    fontWeight: "700",
    color: colors.text,
  },

  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textSecondary,
  },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginTop: spacing.xl,
    position: "relative",
  },

  otpBox: {
    flex: 1,
    height: 58,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },

  activeOtpBox: {
    borderColor: colors.primary,
    borderWidth: 2,
  },

  otpText: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
  },

  hiddenInput: {
    position: "absolute",
    width: "100%",
    height: 58,
    opacity: 0,
  },

  resendContainer: {
    gap: spacing.sm,
    marginTop: spacing.md,
  },

  resendRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },

  resendText: {
    fontSize: 14,
    color: colors.textSecondary,
  },

  resendLink: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primary,
  },

  disabledLink: {
    color: colors.textLight,
  },

  countdownText: {
    fontSize: 14,
    color: colors.textSecondary,
  },

  continueButton: {
    height: 54,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.xl,
  },

  disabledButton: {
    opacity: 0.5,
  },

  continueButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.white,
  },
});
