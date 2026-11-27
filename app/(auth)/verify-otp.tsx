import { useLocalSearchParams, useRouter } from "expo-router";
import type { ComponentRef } from "react";
import { useRef, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { colors } from "../../src/theme/colors";

export default function VerifyOTPScreen() {
  const router = useRouter();

  const params = useLocalSearchParams<{
    method?: string;
    destination?: string;
    fullName?: string;
    email?: string;
    phone?: string;
    role?: string;
  }>();

  const [otp, setOtp] = useState("");
  const [isResending, setIsResending] = useState(false);

  const inputRef = useRef<ComponentRef<typeof TextInput>>(null);

  const handleOTPChange = (value: string) => {
    setOtp(value.replace(/\D/g, "").slice(0, 6));
  };

  const handleVerify = () => {
    if (otp.length !== 6) {
      Alert.alert("Invalid Code", "Please enter the 6-digit code.");
      return;
    }

    router.push("/(auth)/shop-setup" as any);
  };

  const handleResend = () => {
    if (isResending) return;

    setIsResending(true);

    Alert.alert(
      "Resend Code",
      "We'll connect this option to the email and SMS delivery service next.",
      [
        {
          text: "OK",
          onPress: () => setIsResending(false),
        },
      ],
    );
  };

  const maskedDestination = () => {
    const destination = params.destination || "";

    if (params.method === "email") {
      const [name, domain] = destination.split("@");

      if (!domain) return destination;

      return `${name.slice(0, 2)}***@${domain}`;
    }

    if (destination.length > 4) {
      return `******${destination.slice(-4)}`;
    }

    return destination;
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>‹ Back</Text>
      </Pressable>

      <View style={styles.progressContainer}>
        <Text style={styles.stepText}>Step 3 of 3</Text>

        <View style={styles.progressTrack}>
          <View style={styles.progressFill} />
        </View>
      </View>

      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Enter verification code</Text>

        <Text style={styles.description}>
          We've sent a 6-digit code to your selected{" "}
          {params.method === "email" ? "email address" : "phone number"}. Enter
          the code below to verify your account.
        </Text>

        {!!params.destination && (
          <Text style={styles.destination}>{maskedDestination()}</Text>
        )}
      </View>

      <Pressable
        style={styles.otpContainer}
        onPress={() => inputRef.current?.focus()}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <View
            key={index}
            style={[styles.otpBox, otp.length === index && styles.activeOtpBox]}
          >
            <Text style={styles.otpDigit}>{otp[index] || ""}</Text>
          </View>
        ))}

        <TextInput
          ref={inputRef}
          value={otp}
          onChangeText={handleOTPChange}
          keyboardType="number-pad"
          maxLength={6}
          autoFocus={false}
          style={styles.hiddenInput}
          caretHidden
        />
      </Pressable>

      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Didn't receive a code? </Text>

        <Pressable onPress={handleResend} disabled={isResending}>
          <Text style={styles.resendLink}>Resend code</Text>
        </Pressable>
      </View>

      <Pressable
        style={[styles.verifyButton, otp.length !== 6 && styles.disabledButton]}
        onPress={handleVerify}
        disabled={otp.length !== 6}
      >
        <Text style={styles.verifyButtonText}>Verify & Continue</Text>
      </Pressable>

      <View style={styles.securityContainer}>
        <Text style={styles.securityIcon}>✓</Text>
        <Text style={styles.securityText}>
          Your information is safe and secure with MarketLink.
        </Text>
      </View>

      <View style={styles.supportContainer}>
        <Text style={styles.supportText}>Having trouble? </Text>

        <Pressable
          onPress={() =>
            Alert.alert(
              "Contact Support",
              "Our support contact details will be added here.",
            )
          }
        >
          <Text style={styles.supportLink}>Contact support</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 20,
  },
  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 4,
  },
  backText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "600",
  },
  progressContainer: {
    gap: 8,
  },
  stepText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
  },
  progressTrack: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 10,
    overflow: "hidden",
  },
  progressFill: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  headingContainer: {
    gap: 12,
  },
  heading: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.text,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textSecondary,
  },
  destination: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.primary,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 20,
    position: "relative",
  },
  otpBox: {
    flex: 1,
    height: 58,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  activeOtpBox: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  otpDigit: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
  },
  hiddenInput: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0,
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  resendText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  resendLink: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "700",
  },
  verifyButton: {
    height: 54,
    backgroundColor: colors.primary,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  disabledButton: {
    opacity: 0.5,
  },
  verifyButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
  securityContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
  },
  securityIcon: {
    color: colors.success,
    fontSize: 18,
    fontWeight: "700",
  },
  securityText: {
    fontSize: 13,
    color: colors.textSecondary,
    flexShrink: 1,
    textAlign: "center",
  },
  supportContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  supportText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  supportLink: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "600",
  },
});
