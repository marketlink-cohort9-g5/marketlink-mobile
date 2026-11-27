import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ContactSupportButton } from "@/components/wholesaler/ContactSupportButton";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

/**
 * Wholesaler verification status screen matching Figma Wholesaler Pending Verification.
 */
export default function WholesalerPendingVerificationScreen() {
  const { businessName, marketArea } = useLocalSearchParams<{
    businessName?: string;
    marketArea?: string;
  }>();

  const resolvedBusiness = businessName || "Ade Provision Store";
  const resolvedMarket = marketArea || "Jakande Market";

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Application Header Card */}
        <View style={styles.headerCard}>
          <View style={styles.statusBar} />
          <Text style={styles.headerTitle}>Application Received</Text>
          <Text style={styles.headerSubtitle}>
            {resolvedBusiness}. {resolvedMarket}
          </Text>
        </View>

        {/* Under Review Status Banner */}
        <View style={styles.statusBanner}>
          <Text style={styles.statusLabel}>Status</Text>
          <Text style={styles.statusValue}>Under Review</Text>
          <Text style={styles.statusDescription}>
            Your store is not visible to retailers yet. We will notify you when
            it is approved.
          </Text>
        </View>

        {/* Verification Progress Checklist */}
        <View style={styles.card}>
          <View style={styles.stepRow}>
            <View style={styles.stepDoneCircle}>
              <Text style={styles.stepCheckmark}>✓</Text>
            </View>
            <Text style={styles.stepDoneText}>Details Submitted</Text>
          </View>

          <View style={styles.stepRow}>
            <View style={styles.stepActiveCircle} />
            <Text style={styles.stepActiveText}>Review by MarketLink</Text>
          </View>

          <View style={styles.stepRow}>
            <View style={styles.stepPendingCircle} />
            <Text style={styles.stepPendingText}>Store goes live</Text>
          </View>
        </View>

        {/* While You Wait Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>While you wait</Text>
          <Text style={styles.cardBody}>
            Add your products and prices now, so your store is ready the moment
            it is approved.
          </Text>
          <Pressable
            style={({ pressed }) => [
              styles.addProductsButton,
              pressed && styles.pressed,
            ]}
            onPress={() => router.push("/(wholesaler)/add-product")}
          >
            <Text style={styles.addProductsText}>Add Products</Text>
          </Pressable>
        </View>

        {/* More Information Notice (tappable to view More Info Needed state) */}
        <Pressable
          style={({ pressed }) => [styles.card, pressed && styles.pressed]}
          onPress={() =>
            router.push({
              pathname: "/(wholesaler)/more-info",
              params: { businessName: resolvedBusiness },
            })
          }
        >
          <Text style={styles.infoNoticeText}>
            If we need more information, we will message you here. For example:
            a clearer photo of your shop.
          </Text>
        </Pressable>

        <ContactSupportButton />
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
  headerCard: {
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  statusBar: {
    width: "100%",
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginBottom: spacing.xs,
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
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.bold,
    color: colors.warning,
  },
  statusDescription: {
    fontSize: typography.fontSize.caption,
    lineHeight: 20,
    color: colors.text,
  },
  card: {
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    gap: spacing.md,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
  },
  stepDoneCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  stepCheckmark: {
    color: colors.white,
    fontSize: 16,
    fontWeight: typography.fontWeight.bold,
  },
  stepDoneText: {
    fontSize: 18,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.text,
  },
  stepActiveCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.warning,
    backgroundColor: colors.white,
  },
  stepActiveText: {
    fontSize: 18,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.warning,
  },
  stepPendingCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  stepPendingText: {
    fontSize: 18,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textLight,
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
  addProductsButton: {
    width: "100%",
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.xs,
  },
  addProductsText: {
    fontSize: typography.fontSize.subtitle,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.white,
  },
  infoNoticeText: {
    fontSize: typography.fontSize.body,
    lineHeight: 22,
    color: colors.text,
  },
  pressed: {
    opacity: 0.85,
  },
});
