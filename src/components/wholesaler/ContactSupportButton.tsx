import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";

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
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleSupport}
      style={styles.button}
    >
      <Text style={styles.label}>Contact Support</Text>
    </TouchableOpacity>
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
});
