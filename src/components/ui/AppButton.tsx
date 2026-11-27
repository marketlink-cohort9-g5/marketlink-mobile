import {
  StyleSheet,
  Text,
  TouchableOpacity,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

export type AppButtonVariant = "primary" | "secondary" | "outline";
export type AppButtonSize = "md" | "sm";

interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: AppButtonVariant;
  size?: AppButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

/**
 * Shared MarketLink button built on TouchableOpacity with consistent variants and tap feedback.
 */
export function AppButton({
  title,
  onPress,
  variant = "primary",
  size = "md",
  fullWidth = true,
  disabled = false,
  style,
  textStyle,
}: AppButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      disabled={disabled}
      accessibilityRole="button"
      onPress={onPress}
      style={[
        styles.base,
        fullWidth ? styles.fullWidth : styles.fitWidth,
        size === "sm" ? styles.sizeSm : styles.sizeMd,
        variant === "primary" && styles.primary,
        variant === "secondary" && styles.secondary,
        variant === "outline" && styles.outline,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text
        style={[
          styles.labelBase,
          size === "sm" ? styles.labelSm : styles.labelMd,
          variant === "primary" ? styles.labelLight : styles.labelPrimary,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  fullWidth: {
    width: "100%",
  },
  fitWidth: {
    alignSelf: "flex-start",
  },
  sizeMd: {
    paddingVertical: 14,
    paddingHorizontal: spacing.xl,
  },
  sizeSm: {
    paddingVertical: 12,
    paddingHorizontal: spacing.lg,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.white,
  },
  outline: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  disabled: {
    opacity: 0.5,
  },
  labelBase: {
    fontWeight: typography.fontWeight.semiBold,
  },
  labelMd: {
    fontSize: typography.fontSize.subtitle,
  },
  labelSm: {
    fontSize: typography.fontSize.body,
  },
  labelLight: {
    color: colors.white,
  },
  labelPrimary: {
    color: colors.primary,
  },
});
