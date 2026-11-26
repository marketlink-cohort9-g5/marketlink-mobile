import { useState } from "react";

import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { router } from "expo-router";

import { colors } from "../../src/theme/colors";
import { spacing } from "../../src/theme/spacing";
import { typography } from "../../src/theme/typography";

export default function WelcomeScreen() {
  const [hasAgreed, setHasAgreed] = useState(false);
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* MarketLink Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/marketlink/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/*Image Placeholder */}
      <View style={styles.imagePlaceholder}>
        <Image
          source={require("../../assets/images/marketlink/welcome.png")}
          style={styles.welcomeImage}
          resizeMode="cover"
        />
      </View>

      {/* Main Heading */}
      <View style={styles.textContainer}>
        <Text style={styles.heading}>Your Marketplace, Just A Tap Away!</Text>

        <Text style={styles.description}>
          Buy and sell everyday products with ease.
          {"\n\n"}
          Connect with trusted wholesalers and retailers on MarketLink.
        </Text>
      </View>

      {/* Get Started Button */}
      <Pressable
        style={[styles.primaryButton, !hasAgreed && { opacity: 0.5 }]}
        disabled={!hasAgreed}
        onPress={() => router.push("/(auth)/onboarding")}
      >
        <Text style={styles.primaryButtonText}>Get Started</Text>
      </Pressable>
      {/* Sign In Section */}
      <Text style={styles.accountText}>Already have an account?</Text>

      <Pressable
        style={styles.secondaryButton}
        onPress={() => router.push("/(auth)/login" as any)}
      >
        <Text style={styles.secondaryButtonText}>Sign In</Text>
      </Pressable>

      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          By continuing, you agree to our Terms and Conditions and Privacy
          Policy.
        </Text>

        <Pressable
          style={styles.checkboxRow}
          onPress={() => setHasAgreed(!hasAgreed)}
        >
          <View style={[styles.checkbox, hasAgreed && styles.checkboxChecked]}>
            {hasAgreed && <Text style={styles.checkmark}>✓</Text>}
          </View>

          <Text style={styles.checkboxLabel}>
            I agree to the Terms and Conditions and Privacy Policy.
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxxl,
    paddingBottom: spacing.xl,
    alignItems: "center",
  },

  logoContainer: {
    marginBottom: spacing.xxl,
  },

  logo: {
    fontSize: typography.fontSize.heading,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    width: 180,
    height: 60,
  },

  welcomeImage: {
    width: "100%",
    height: "100%",
  },

  imagePlaceholder: {
    width: "100%",
    height: 190,
    backgroundColor: colors.primaryLight,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: spacing.xxl,
  },

  placeholderTitle: {
    fontSize: typography.fontSize.subtitle,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    textAlign: "center",
    marginBottom: spacing.sm,
  },

  placeholderText: {
    fontSize: typography.fontSize.body,
    color: colors.textSecondary,
    textAlign: "center",
  },

  textContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: spacing.xxl,
  },

  heading: {
    fontSize: typography.fontSize.heading,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    textAlign: "center",
    marginBottom: spacing.lg,
  },

  description: {
    fontSize: typography.fontSize.body,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 25,
  },

  primaryButton: {
    width: "100%",
    minHeight: 52,
    backgroundColor: colors.primary,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.lg,
  },

  primaryButtonText: {
    color: colors.white,
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.semiBold,
  },

  accountText: {
    fontSize: typography.fontSize.body,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },

  secondaryButton: {
    width: "100%",
    minHeight: 52,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  secondaryButtonText: {
    color: colors.primary,
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.semiBold,
  },

  termsText: {
    fontSize: typography.fontSize.caption,
    color: colors.textLight,
    textAlign: "center",
    lineHeight: 18,
    marginTop: "auto",
    paddingTop: spacing.xxl,
  },

  termsContainer: {
    width: "100%",
    marginTop: spacing.xxl,
  },

  termsText: {
    fontSize: typography.fontSize.caption,
    color: colors.textLight,
    textAlign: "center",
    lineHeight: 18,
    marginBottom: spacing.md,
  },

  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    minHeight: 48,
  },

  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },

  checkboxChecked: {
    backgroundColor: colors.primary,
  },

  checkmark: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },

  checkboxLabel: {
    flex: 1,
    fontSize: typography.fontSize.caption,
    color: colors.textSecondary,
  },
});
