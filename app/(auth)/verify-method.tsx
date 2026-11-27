import { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { colors } from "../../src/theme/colors";

type VerificationMethod = "email" | "phone";

export default function VerifyMethodScreen() {
  const router = useRouter();

  const params = useLocalSearchParams<{
    role?: string;
    fullName?: string;
    email?: string;
    phone?: string;
    pin?: string;
  }>();

  const [selectedMethod, setSelectedMethod] =
    useState<VerificationMethod | null>(null);

  const handleContinue = () => {
    if (!selectedMethod) return;

    const destination =
      selectedMethod === "email" ? params.email : params.phone;

    router.push({
      pathname: "/(auth)/verify-otp",
      params: {
        role: params.role,
        fullName: params.fullName,
        email: params.email,
        phone: params.phone,
        pin: params.pin,
        method: selectedMethod,
        destination,
      },
    });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>‹ Back</Text>
      </Pressable>

      <View style={styles.progressContainer}>
        <Text style={styles.stepText}>Step 2 of 3</Text>

        <View style={styles.progressTrack}>
          <View style={styles.progressFill} />
        </View>
      </View>

      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Verify Your Account</Text>

        <Text style={styles.description}>
          Choose how you would like to receive your verification code.
        </Text>
      </View>

      <View style={styles.nameContainer}>
        <Text style={styles.nameLabel}>Full Name</Text>
        <Text style={styles.nameValue}>{params.fullName || "Your name"}</Text>
      </View>

      <Text style={styles.chooseLabel}>Choose verification method</Text>

      <Pressable
        style={[
          styles.methodCard,
          selectedMethod === "email" && styles.selectedCard,
        ]}
        onPress={() => setSelectedMethod("email")}
      >
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>✉</Text>
        </View>

        <View style={styles.methodTextContainer}>
          <Text style={styles.methodTitle}>Verify with Email</Text>
          <Text style={styles.methodDescription}>
            Receive a verification code in your email inbox.
          </Text>
          {!!params.email && (
            <Text style={styles.destinationText}>{params.email}</Text>
          )}
        </View>

        <View style={styles.radioOuter}>
          {selectedMethod === "email" && <View style={styles.radioInner} />}
        </View>
      </Pressable>

      <Pressable
        style={[
          styles.methodCard,
          selectedMethod === "phone" && styles.selectedCard,
        ]}
        onPress={() => setSelectedMethod("phone")}
      >
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>☎</Text>
        </View>

        <View style={styles.methodTextContainer}>
          <Text style={styles.methodTitle}>Verify with Phone</Text>
          <Text style={styles.methodDescription}>
            Receive a verification code by SMS.
          </Text>
          {!!params.phone && (
            <Text style={styles.destinationText}>{params.phone}</Text>
          )}
        </View>

        <View style={styles.radioOuter}>
          {selectedMethod === "phone" && <View style={styles.radioInner} />}
        </View>
      </Pressable>

      <Pressable
        style={[
          styles.continueButton,
          !selectedMethod && styles.disabledButton,
        ]}
        disabled={!selectedMethod}
        onPress={handleContinue}
      >
        <Text style={styles.continueText}>Continue</Text>
      </Pressable>

      <View style={styles.supportContainer}>
        <Text style={styles.supportText}>Having trouble? </Text>

        <Pressable onPress={() => router.push("/(auth)/welcome")}>
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
    gap: 16,
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
    width: "66.66%",
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  headingContainer: {
    gap: 8,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text,
  },
  description: {
    fontSize: 16,
    lineHeight: 23,
    color: colors.textSecondary,
  },
  nameContainer: {
    gap: 6,
  },
  nameLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
  nameValue: {
    fontSize: 15,
    color: colors.textSecondary,
  },
  chooseLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
  methodCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    gap: 12,
    minHeight: 115,
  },
  selectedCard: {
    borderColor: colors.primary,
    borderWidth: 2,
    backgroundColor: colors.primaryLight,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 22,
    color: colors.primary,
  },
  methodTextContainer: {
    flex: 1,
    gap: 5,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  methodDescription: {
    fontSize: 14,
    lineHeight: 19,
    color: colors.textSecondary,
  },
  destinationText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: "600",
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  continueButton: {
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
  continueText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
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
