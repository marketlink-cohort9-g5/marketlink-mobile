import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CodeBoxInput } from "@/components/auth/CodeBoxInput";
import { OnboardingHeader } from "@/components/auth/OnboardingHeader";
import { SupportFooter } from "@/components/auth/SupportFooter";
import { AppButton } from "@/components/ui/AppButton";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

/**
 * Registration Step 3 screen for entering the 6-digit account verification OTP.
 */
export default function VerifyOtpScreen() {
  const { accountType, destination } = useLocalSearchParams<{
    accountType?: string;
    destination?: string;
  }>();

  const role = accountType === "wholesaler" ? "wholesaler" : "retailer";
  const totalSteps = role === "wholesaler" ? 4 : 3;
  const displayStep = role === "wholesaler" ? 2 : 3;

  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleResend = () => {
    if (countdown > 0) return;

    setOtp("");
    setCountdown(45);
    Alert.alert(
      "Verification Code Sent",
      `A new 6-digit verification code has been sent to ${destination || "your contact"}.`,
    );
  };

  const handleVerify = () => {
    if (otp.length !== 6) {
      Alert.alert(
        "Incomplete Code",
        "Please enter the 6-digit verification code.",
      );
      return;
    }

    Keyboard.dismiss();

    if (role === "retailer") {
      router.replace("/(auth)/shop-setup");
      return;
    }

    router.push("/(auth)/wholesaler-business");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <OnboardingHeader
          showBack
          step={displayStep}
          totalSteps={totalSteps}
          logoHeight={115}
        />

        <Text style={styles.heading}>{"Enter\nverification\ncode"}</Text>

        <Text style={styles.subtitle}>
          We&apos;ve sent a 6-digit code to your selected email address or phone
          number. Enter the code below to verify your account.
        </Text>

        <CodeBoxInput length={6} value={otp} onChangeText={setOtp} spread />

        <View style={styles.resendRow}>
          <Text style={styles.resendText}>Didn&apos;t receive a code? </Text>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={handleResend}
            disabled={countdown > 0}
          >
            <Text style={[styles.resendLink, countdown > 0 && styles.disabledLink]}>
              {countdown > 0 ? `Resend code (${countdown}s)` : "Resend code"}
            </Text>
          </TouchableOpacity>
        </View>

        <AppButton
          title="Verify & Continue"
          variant="secondary"
          onPress={handleVerify}
        />

        <Text style={styles.securityNote}>
          Your information is safe and secure with MarketLink.
        </Text>

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
  securityNote: {
    fontSize: typography.fontSize.body,
    color: colors.textLight,
    lineHeight: 22,
  },
});
