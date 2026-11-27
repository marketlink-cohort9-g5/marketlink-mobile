import { Image as ExpoImage } from "expo-image";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

interface OnboardingHeaderProps {
  showBack?: boolean;
  step?: number;
  totalSteps?: number;
  logoHeight?: number;
}

/**
 * Shared MarketLink header with logo, optional back navigation, and step progress bar.
 */
export function OnboardingHeader({
  showBack = true,
  step,
  totalSteps,
  logoHeight = 100,
}: OnboardingHeaderProps) {
  const hasProgress = typeof step === "number" && typeof totalSteps === "number" && totalSteps > 0;
  const progressPercent = hasProgress ? Math.min(100, Math.max(0, (step / totalSteps) * 100)) : 0;

  return (
    <View style={styles.wrapper}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../assets/images/marketlink/logo.png")}
          style={[styles.logo, { height: logoHeight }]}
          resizeMode="contain"
        />
      </View>

      {showBack && (
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
          hitSlop={8}
        >
          <ExpoImage
            source={require("../../../assets/images/marketlink/arrow-left.svg")}
            style={styles.backArrow}
            contentFit="contain"
          />
          <Text style={styles.backText}>Back</Text>
        </Pressable>
      )}

      {hasProgress && (
        <View style={styles.progressSection}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
          </View>
          <Text style={styles.stepLabel}>
            Step {step} of {totalSteps}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    gap: spacing.lg,
  },
  logoContainer: {
    width: "100%",
    alignItems: "center",
  },
  logo: {
    width: "100%",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: spacing.sm,
    minHeight: 32,
  },
  backArrow: {
    width: 17.25,
    height: 16.69,
  },
  backText: {
    fontSize: typography.fontSize.subtitle,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.text,
  },
  progressSection: {
    width: "100%",
    gap: spacing.md,
  },
  progressTrack: {
    width: "100%",
    height: 8,
    borderRadius: 4,
    backgroundColor: "#757575",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  stepLabel: {
    fontSize: typography.fontSize.subtitle,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.primary,
  },
  pressed: {
    opacity: 0.7,
  },
});
