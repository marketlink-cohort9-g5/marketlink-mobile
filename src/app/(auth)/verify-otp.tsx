import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  type TextInputInstance,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { OnboardingHeader } from "@/components/auth/OnboardingHeader";
import { SupportFooter } from "@/components/auth/SupportFooter";
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

  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(0);
  const inputRef = useRef<TextInputInstance>(null);

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

    Alert.alert(
      "Account Verified",
      "Your wholesaler account has been verified. Please log in to continue.",
      [
        {
          text: "Continue",
          onPress: () => router.replace("/(auth)/login"),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <OnboardingHeader showBack step={3} totalSteps={totalSteps} logoHeight={115} />

        <Text style={styles.heading}>{"Enter\nverification\ncode"}</Text>

        <Text style={styles.subtitle}>
          We&apos;ve sent a 6-digit code to your selected email address or phone
          number. Enter the code below to verify your account.
        </Text>

        <Pressable
          style={styles.otpContainer}
          onPress={() => inputRef.current?.focus()}
        >
          {Array.from({ length: 6 }).map((_, index) => {
            const isActive = otp.length === index;
            return (
              <View
                key={index}
                style={[styles.otpBox, isActive && styles.otpBoxActive]}
              >
                <Text style={styles.otpDigit}>{otp[index] || ""}</Text>
              </View>
            );
          })}

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
          />
        </Pressable>

        <View style={styles.resendRow}>
          <Text style={styles.resendText}>Didn&apos;t receive a code? </Text>
          <Pressable onPress={handleResend} disabled={countdown > 0}>
            <Text style={[styles.resendLink, countdown > 0 && styles.disabledLink]}>
              {countdown > 0 ? `Resend code (${countdown}s)` : "Resend code"}
            </Text>
          </Pressable>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.verifyButton,
            pressed && styles.pressed,
          ]}
          onPress={handleVerify}
        >
          <Text style={styles.verifyButtonText}>Verify &amp; Continue</Text>
        </Pressable>

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
  otpContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.sm,
    position: "relative",
  },
  otpBox: {
    flex: 1,
    height: 52,
    maxWidth: 48,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  otpBoxActive: {
    borderColor: colors.primary,
    borderWidth: 1.5,
  },
  otpDigit: {
    fontSize: typography.fontSize.subtitle,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.text,
  },
  hiddenInput: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0,
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
  verifyButton: {
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: spacing.xl,
    alignItems: "center",
    justifyContent: "center",
  },
  verifyButtonText: {
    color: colors.primary,
    fontSize: typography.fontSize.subtitle,
    fontWeight: typography.fontWeight.semiBold,
  },
  securityNote: {
    fontSize: typography.fontSize.body,
    color: colors.textLight,
    lineHeight: 22,
  },
  pressed: {
    opacity: 0.85,
  },
});
