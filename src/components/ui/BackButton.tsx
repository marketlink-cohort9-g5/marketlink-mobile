import { Ionicons } from "@react-native-vector-icons/ionicons/static";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

interface BackButtonProps {
  label?: string;
  onPress?: () => void;
}

/**
 * Shared navigation back button with vector arrow icon and label.
 */
export function BackButton({ label = "Back", onPress }: BackButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress ?? (() => router.back())}
      style={styles.button}
      hitSlop={8}
    >
      <Ionicons name="arrow-back" size={20} color={colors.text} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: spacing.sm,
    minHeight: 32,
  },
  label: {
    fontSize: typography.fontSize.subtitle,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.text,
  },
});
