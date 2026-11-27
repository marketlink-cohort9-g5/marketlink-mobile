import { Alert, Pressable, StyleSheet, Text } from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

/**
 * Shared outlined Contact Support button used on Wholesaler verification screens.
 */
export function ContactSupportButton() {
  const handleSupport = () => {
    Alert.alert(
      "Contact Support",
      "Reach MarketLink Wholesaler Support at support@marketlink.ng.",
    );
  };

  return (
    <Pressable
      onPress={handleSupport}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Text style={styles.label}>Contact Support</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    minWidth: 180,
    height: 42,
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.text,
  },
  pressed: {
    opacity: 0.8,
  },
});
