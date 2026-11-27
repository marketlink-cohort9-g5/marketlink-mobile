import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

interface FileUploadRowProps {
  fileLabel?: string;
  placeholder: string;
  actionLabel: string;
  onPress: () => void;
}

/**
 * Reusable file/photo upload row displaying the current file label and an action button.
 */
export function FileUploadRow({
  fileLabel,
  placeholder,
  actionLabel,
  onPress,
}: FileUploadRowProps) {
  const hasFile = Boolean(fileLabel);

  return (
    <View style={styles.container}>
      <Text
        style={[styles.fileText, !hasFile && styles.placeholderText]}
        numberOfLines={1}
      >
        {fileLabel || placeholder}
      </Text>

      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.actionButton, pressed && styles.pressed]}
      >
        <Text style={styles.actionText}>{actionLabel}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 52,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingLeft: spacing.md,
    paddingRight: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  fileText: {
    flex: 1,
    fontSize: typography.fontSize.caption,
    color: colors.text,
  },
  placeholderText: {
    color: colors.textLight,
  },
  actionButton: {
    height: 38,
    paddingHorizontal: spacing.md,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  actionText: {
    fontSize: typography.fontSize.caption,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.text,
  },
  pressed: {
    opacity: 0.75,
  },
});
