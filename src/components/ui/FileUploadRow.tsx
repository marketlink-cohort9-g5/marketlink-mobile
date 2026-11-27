import { Ionicons } from "@react-native-vector-icons/ionicons/static";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

interface FileUploadRowProps {
  fileLabel?: string;
  previewUri?: string;
  isDocument?: boolean;
  emptyIcon?: "cloud-upload-outline" | "camera-outline";
  placeholder: string;
  actionLabel: string;
  loading?: boolean;
  error?: string | null;
  onPress: () => void;
}

/**
 * Reusable file/photo upload row showing an optional preview/icon, file label, inline error, and action pill.
 */
export function FileUploadRow({
  fileLabel,
  previewUri,
  isDocument = false,
  emptyIcon,
  placeholder,
  actionLabel,
  loading = false,
  error,
  onPress,
}: FileUploadRowProps) {
  const hasFile = Boolean(fileLabel);

  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={onPress}
        disabled={loading}
        accessibilityRole="button"
        accessibilityLabel={`${actionLabel}: ${fileLabel || placeholder}`}
        style={({ pressed }) => [
          styles.container,
          Boolean(error) && styles.containerError,
          pressed && styles.pressed,
        ]}
      >
        <View style={styles.leftContent}>
          {previewUri ? (
            <Image source={{ uri: previewUri }} style={styles.thumbnail} />
          ) : isDocument ? (
            <View style={styles.iconBadge}>
              <Ionicons
                name="document-text-outline"
                size={18}
                color={colors.primary}
              />
            </View>
          ) : emptyIcon ? (
            <Ionicons
              name={emptyIcon}
              size={18}
              color={colors.textLight}
            />
          ) : null}

          <Text
            style={[styles.fileText, !hasFile && styles.placeholderText]}
            numberOfLines={1}
          >
            {fileLabel || placeholder}
          </Text>
        </View>

        <View style={styles.actionButton}>
          <Text style={styles.actionText}>
            {loading ? "Opening..." : actionLabel}
          </Text>
        </View>
      </Pressable>

      {error ? (
        <View style={styles.errorRow}>
          <Ionicons
            name="alert-circle-outline"
            size={15}
            color={colors.error}
          />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    gap: spacing.xs,
  },
  container: {
    width: "100%",
    minHeight: 52,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingLeft: spacing.md,
    paddingRight: 6,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  containerError: {
    borderColor: colors.error,
  },
  leftContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  thumbnail: {
    width: 34,
    height: 34,
    borderRadius: 6,
    backgroundColor: colors.surface,
  },
  iconBadge: {
    width: 34,
    height: 34,
    borderRadius: 6,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
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
  errorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  errorText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    color: colors.error,
  },
  pressed: {
    opacity: 0.85,
  },
});
