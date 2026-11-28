import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";

/**
 * Shared support prompt footer for verification screens.
 */
export function SupportFooter() {
  const handleSupport = () => {
    Alert.alert(
      "Contact Support",
      "Support can be reached at support@marketlink.ng.",
    );
  };

  return (
    <View style={styles.supportRow}>
      <Text style={styles.supportText}>Having trouble? </Text>
      <TouchableOpacity activeOpacity={0.75} onPress={handleSupport}>
        <Text style={styles.supportLink}>Contact support</Text>
      </TouchableOpacity>
      <Text style={styles.supportText}>.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  supportRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  supportText: {
    fontSize: typography.fontSize.caption,
    color: colors.textLight,
  },
  supportLink: {
    fontSize: typography.fontSize.caption,
    color: colors.primary,
  },
});
