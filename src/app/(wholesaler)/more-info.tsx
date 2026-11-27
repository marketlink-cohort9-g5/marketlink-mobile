import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackButton } from "@/components/ui/BackButton";
import { FileUploadRow } from "@/components/ui/FileUploadRow";
import { ContactSupportButton } from "@/components/wholesaler/ContactSupportButton";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

/**
 * Wholesaler verification follow-up screen matching Figma Wholesaler More Info Needed.
 */
export default function WholesalerMoreInfoScreen() {
  const { businessName } = useLocalSearchParams<{ businessName?: string }>();
  const resolvedBusiness = businessName || "Ade Provision Store";

  const [shopPhoto, setShopPhoto] = useState("id-card.jpg · 210 KB_Unclear");
  const [hasReplaced, setHasReplaced] = useState(false);

  const handleReplacePhoto = () => {
    setShopPhoto("shop-front-clear.jpg · 420 KB");
    setHasReplaced(true);
  };

  const handleSendDetails = () => {
    if (!hasReplaced) {
      Alert.alert(
        "Replace Photo Required",
        "Please tap Replace to upload a clearer photo of your shop front.",
      );
      return;
    }

    Alert.alert(
      "Details Updated",
      "Your updated shop photo has been submitted for review.",
      [
        {
          text: "Continue",
          onPress: () =>
            router.replace({
              pathname: "/(wholesaler)/pending-verification",
              params: { businessName: resolvedBusiness },
            }),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Back to Account */}
        <BackButton label="Account" />

        {/* Application Status Header */}
        <View style={styles.card}>
          <Text style={styles.headerTitle}>Application Status</Text>
          <Text style={styles.headerSubtitle}>{resolvedBusiness}.</Text>
        </View>

        {/* Status Card */}
        <View style={styles.statusBanner}>
          <Text style={styles.statusLabel}>Status</Text>
          <Text style={styles.statusValue}>More Information Needed</Text>
        </View>

        {/* Message from MarketLink */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Message from MarketLink</Text>
          <Text style={styles.cardBody}>
            Please send a clearer photo of your shop front, so we can match it
            to your address.
          </Text>
        </View>

        {/* Your Shop Photo */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your Shop Photo</Text>
          <FileUploadRow
            fileLabel={shopPhoto}
            placeholder="No photo selected"
            actionLabel="Replace"
            onPress={handleReplacePhoto}
          />
        </View>

        <View style={styles.bottomActions}>
          <Pressable
            style={({ pressed }) => [
              styles.submitButton,
              pressed && styles.pressed,
            ]}
            onPress={handleSendDetails}
          >
            <Text style={styles.submitButtonText}>Send updated details</Text>
          </Pressable>

          <ContactSupportButton />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primaryLight,
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.primaryLight,
  },
  container: {
    flexGrow: 1,
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
    padding: spacing.xl,
    gap: spacing.lg,
  },
  card: {
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: typography.fontSize.body,
    color: colors.textSecondary,
  },
  statusBanner: {
    width: "100%",
    backgroundColor: colors.warningLight,
    borderRadius: 12,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  statusLabel: {
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.medium,
    color: colors.warning,
  },
  statusValue: {
    fontSize: 22,
    fontWeight: typography.fontWeight.bold,
    color: colors.warning,
  },
  cardTitle: {
    fontSize: typography.fontSize.subtitle,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  cardBody: {
    fontSize: typography.fontSize.body,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  bottomActions: {
    width: "100%",
    marginTop: "auto",
    paddingTop: spacing.xl,
    gap: spacing.lg,
  },
  submitButton: {
    width: "100%",
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: spacing.xl,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    fontSize: typography.fontSize.subtitle,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.white,
  },
  pressed: {
    opacity: 0.85,
  },
});
