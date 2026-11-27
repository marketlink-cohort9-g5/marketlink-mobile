import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
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

/**
 * Reset PIN OTP verification screen matching Figma Reset Check your Phone frame.
 */
export default function ResetPinOtpScreen() {
  const params = useLocalSearchParams<{ phone?: string }>();
  const phone = params.phone || "+234 8145232323";

  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(45);

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
    router.replace("/(auth)/reset-pin-new");
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
          <OnboardingHeader showBack logoHeight={115} />

          <Text style={styles.title}>Check Your Phone</Text>

          <Text style={styles.subtitle}>
            We sent a 6-digit code to {phone}. Enter it to continue.
          </Text>

          <CodeBoxInput length={6} value={otp} onChangeText={setOtp} spread />

          <View style={styles.resendRow}>
            <Text style={styles.resendText}>Didn&apos;t receive a code? </Text>
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={handleResend}
              disabled={countdown > 0}
            >
              <Text
                style={[styles.resendLink, countdown > 0 && styles.disabledLink]}
              >
                Resend code
              </Text>
            </TouchableOpacity>
          </View>

          {countdown > 0 && (
            <Text style={styles.countdownText}>
              Resend code in  {formatTime(countdown)}
            </Text>
          )}

          <View style={styles.bottomSection}>
            <AppButton
              title="Continue"
              variant="secondary"
              onPress={handleContinue}
            />
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
    gap: spacing.xl,
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
  resendRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  resendText: {
    fontSize: typography.fontSize.body,
    color: colors.textLight,
  },
  resendLink: {
    fontSize: typography.fontSize.body,
    color: colors.primary,
  },
  disabledLink: {
    opacity: 0.6,
  },
  countdownText: {
    fontSize: typography.fontSize.caption,
    color: colors.text,
  },
  bottomSection: {
    width: "100%",
    marginTop: "auto",
    paddingTop: spacing.xl,
  },
});
