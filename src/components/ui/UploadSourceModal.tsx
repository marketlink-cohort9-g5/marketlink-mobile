import { Ionicons } from "@react-native-vector-icons/ionicons/static";
import { Modal, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

export type UploadSourceOption = "files" | "library" | "camera";

interface UploadSourceModalProps {
  visible: boolean;
  title: string;
  subtitle: string;
  onSelect: (source: UploadSourceOption) => void;
  onClose: () => void;
}

const SOURCE_ITEMS: {
  source: UploadSourceOption;
  label: string;
  description: string;
  icon: "document-text-outline" | "images-outline" | "camera-outline";
}[] = [
  {
    source: "files",
    label: "Browse Documents / Files",
    description: "Select a PDF, JPG, or PNG from device storage",
    icon: "document-text-outline",
  },
  {
    source: "library",
    label: "Choose from Photo Library",
    description: "Select a clear ID photo from your gallery",
    icon: "images-outline",
  },
  {
    source: "camera",
    label: "Take Photo with Camera",
    description: "Snap a photo of your valid ID now",
    icon: "camera-outline",
  },
];

/**
 * Cross-platform modal sheet letting users pick an upload source (documents, photo library, or camera).
 */
export function UploadSourceModal({
  visible,
  title,
  subtitle,
  onSelect,
  onClose,
}: UploadSourceModalProps) {
  const handlePickSource = (source: UploadSourceOption) => {
    onClose();
    if (Platform.OS === "web") {
      // Preserve browser transient user activation inside the click tick on Web.
      onSelect(source);
      return;
    }

    // Let RN Modal dismiss completely on iOS/Android before presenting native permission/picker UI.
    const delayMs = Platform.OS === "ios" ? 280 : 100;
    setTimeout(() => {
      onSelect(source);
    }, delayMs);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable
          style={styles.sheet}
          onPress={(event) => event.stopPropagation()}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onClose}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Close upload options"
              style={styles.closeButton}
            >
              <Ionicons name="close-outline" size={22} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>{subtitle}</Text>

          <View style={styles.optionsList}>
            {SOURCE_ITEMS.map((item) => (
              <TouchableOpacity
                key={item.source}
                activeOpacity={0.78}
                onPress={() => handlePickSource(item.source)}
                style={styles.optionRow}
              >
                <View style={styles.optionIcon}>
                  <Ionicons name={item.icon} size={20} color={colors.primary} />
                </View>

                <View style={styles.optionTextWrap}>
                  <Text style={styles.optionLabel}>{item.label}</Text>
                  <Text style={styles.optionDescription}>{item.description}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            activeOpacity={0.78}
            onPress={onClose}
            style={styles.cancelButton}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(32, 41, 35, 0.45)",
    justifyContent: "flex-end",
    padding: spacing.lg,
  },
  sheet: {
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.xl,
    gap: spacing.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: typography.fontSize.subtitle,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  closeButton: {
    padding: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.caption,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  optionsList: {
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  optionTextWrap: {
    flex: 1,
    gap: 2,
  },
  optionLabel: {
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.text,
  },
  optionDescription: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  cancelButton: {
    width: "100%",
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.xs,
  },
  cancelText: {
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textSecondary,
  },
});
