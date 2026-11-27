import { Ionicons } from "@react-native-vector-icons/ionicons/static";
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
 * Interactive 28x28 rounded checkbox row built with native styling and vector check icon.
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
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked && (
          <Ionicons name="checkmark" size={18} color={colors.white} />
        )}
      </View>

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
  box: {
    width: 28,
    height: 28,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.textSecondary,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  boxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
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
