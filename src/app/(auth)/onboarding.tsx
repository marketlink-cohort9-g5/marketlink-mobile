import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, spacing, typography } from "@/theme";

/**
 * Placeholder onboarding screen linking Welcome / Login to Shop Setup.
 */
export default function OnboardingScreen() {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>‹ Back</Text>
      </Pressable>

      <View style={styles.body}>
        <Text style={styles.title}>Create Your Account</Text>
        <Text style={styles.subtitle}>
          Account type selection and registration screens from the Figma Project
          Page will connect here.
        </Text>

        <Pressable
          style={styles.primaryButton}
          onPress={() => router.push("/(auth)/shop-setup")}
        >
          <Text style={styles.primaryButtonText}>Continue to Shop Setup</Text>
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={() => router.replace("/(auth)/login")}
        >
          <Text style={styles.secondaryButtonText}>Already have an account? Log In</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryLight,
    padding: spacing.xl,
    paddingTop: spacing.xxxl,
  },
  backButton: {
    alignSelf: "flex-start",
    minHeight: 48,
    justifyContent: "center",
  },
  backText: {
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.primary,
  },
  body: {
    flex: 1,
    justifyContent: "center",
    gap: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  subtitle: {
    fontSize: typography.fontSize.body,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  primaryButton: {
    height: 54,
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.md,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.bold,
  },
  secondaryButton: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: typography.fontSize.caption,
    fontWeight: typography.fontWeight.semiBold,
  },
});
