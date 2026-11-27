import { Image as ExpoImage } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

interface CheckboxRowProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
  compactText?: boolean;
}

/**
 * Interactive 28x28 rounded checkbox row matching Figma Pickup & Delivery options.
 */
export function CheckboxRow({
  label,
  checked,
  onToggle,
  compactText = false,
}: CheckboxRowProps) {
  return (
    <Pressable
      onPress={onToggle}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      {checked ? (
        <ExpoImage
          source={require("../../../assets/images/marketlink/checkbox-checked.svg")}
          style={styles.checkboxIcon}
          contentFit="contain"
        />
      ) : (
        <View style={styles.uncheckedBox} />
      )}

      <Text style={[styles.label, compactText && styles.compactLabel]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xl,
  },
  checkboxIcon: {
    width: 28,
    height: 28,
  },
  uncheckedBox: {
    width: 28,
    height: 28,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.textSecondary,
    backgroundColor: colors.white,
  },
  label: {
    flex: 1,
    fontSize: typography.fontSize.subtitle,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.text,
  },
  compactLabel: {
    fontSize: 18,
  },
  pressed: {
    opacity: 0.75,
  },
});
