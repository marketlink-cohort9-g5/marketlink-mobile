import { Image, StyleSheet, Text, View } from "react-native";

import { BackButton } from "@/components/ui/BackButton";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

interface OnboardingHeaderProps {
  showBack?: boolean;
  backLabel?: string;
  onBackPress?: () => void;
  step?: number;
  totalSteps?: number;
  logoHeight?: number;
}

/**
 * Shared MarketLink header with logo, optional back navigation, and step progress bar.
 */
export function OnboardingHeader({
  showBack = true,
  backLabel = "Back",
  onBackPress,
  step,
  totalSteps,
  logoHeight = 100,
}: OnboardingHeaderProps) {
  const hasProgress =
    typeof step === "number" && typeof totalSteps === "number" && totalSteps > 0;
  const progressPercent = hasProgress
    ? Math.min(100, Math.max(0, (step / totalSteps) * 100))
    : 0;

  return (
    <View style={styles.wrapper}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../assets/images/marketlink/logo.png")}
          style={[styles.logo, { height: logoHeight }]}
          resizeMode="contain"
        />
      </View>

      {showBack && <BackButton label={backLabel} onPress={onBackPress} />}

      {hasProgress && (
        <View style={styles.progressSection}>
          <View style={styles.progressTrack}>
            <View
              style={[styles.progressFill, { width: `${progressPercent}%` }]}
            />
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
});
