import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { OnboardingHeader } from "@/components/auth/OnboardingHeader";
import { AppButton } from "@/components/ui/AppButton";
import { CheckboxRow } from "@/components/ui/CheckboxRow";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

const DELIVERY_AREAS = [
  "Lagos Island",
  "Yaba",
  "Oshodi",
  "Surulere",
  "Ikorodu",
  "Abule-Egba",
] as const;

/**
 * Wholesaler registration Step 4 screen for pickup, delivery areas, and fee rules.
 */
export default function WholesalerDeliveryScreen() {
  const { businessName, marketArea } = useLocalSearchParams<{
    businessName?: string;
    marketArea?: string;
  }>();

  const [pickupEnabled, setPickupEnabled] = useState(true);
  const [deliveryEnabled, setDeliveryEnabled] = useState(true);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([
    "Lagos Island",
    "Yaba",
  ]);
  const [feePerOrder, setFeePerOrder] = useState(true);
  const [freeAboveThreshold, setFreeAboveThreshold] = useState(false);

  const toggleArea = (area: string) => {
    setSelectedAreas((prev) =>
      prev.includes(area) ? prev.filter((item) => item !== area) : [...prev, area],
    );
  };

  const handleContinue = () => {
    if (!pickupEnabled && !deliveryEnabled) {
      Alert.alert(
        "Select Fulfillment Option",
        "Choose at least one way retailers can receive their orders.",
      );
      return;
    }

    if (deliveryEnabled && selectedAreas.length === 0) {
      Alert.alert(
        "Select Delivery Areas",
        "Choose at least one area you deliver to, or uncheck delivery.",
      );
      return;
    }

    if (deliveryEnabled && !feePerOrder && !freeAboveThreshold) {
      Alert.alert(
        "Select Delivery Fee Option",
        "Choose how delivery fees apply for your orders.",
      );
      return;
    }

    router.replace({
      pathname: "/(wholesaler)/pending-verification",
      params: {
        businessName: businessName || "Ade Provision Store",
        marketArea: marketArea || "Jakande Market",
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <OnboardingHeader showBack step={4} totalSteps={4} logoHeight={100} />

        <Text style={styles.heading}>Pickup &amp; Delivery</Text>

        <Text style={styles.subtitle}>
          Tell us how retailers can receive their orders from your business.
        </Text>

        <Text style={styles.sectionTitle}>How can retailers get orders?</Text>
        <View style={styles.card}>
          <CheckboxRow
            label="Pickup at my shop"
            checked={pickupEnabled}
            onToggle={() => setPickupEnabled((prev) => !prev)}
          />
          <CheckboxRow
            label="I deliver to retailers"
            checked={deliveryEnabled}
            onToggle={() => setDeliveryEnabled((prev) => !prev)}
          />
        </View>

        <Text style={styles.sectionTitle}>Areas you deliver to</Text>
        <View style={[styles.card, styles.areasCard]}>
          <ScrollView
            nestedScrollEnabled
            showsVerticalScrollIndicator
            contentContainerStyle={styles.areasList}
          >
            {DELIVERY_AREAS.map((area) => (
              <CheckboxRow
                key={area}
                label={area}
                checked={selectedAreas.includes(area)}
                onToggle={() => toggleArea(area)}
              />
            ))}
          </ScrollView>
        </View>

        <Text style={styles.sectionTitle}>Delivery Fee</Text>
        <View style={styles.card}>
          <CheckboxRow
            label="I set the fee for each order"
            checked={feePerOrder}
            onToggle={() => setFeePerOrder((prev) => !prev)}
            compactText
          />
          <CheckboxRow
            label="Free above a set order value"
            checked={freeAboveThreshold}
            onToggle={() => setFreeAboveThreshold((prev) => !prev)}
            compactText
          />
        </View>

        <AppButton
          title="Continue"
          style={styles.continueSpacing}
          onPress={handleContinue}
        />

        <Text style={styles.footerHint}>
          Next: add your first products. You can change this later.
        </Text>
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
    alignItems: "flex-start",
  },
  heading: {
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  subtitle: {
    fontSize: typography.fontSize.body,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: typography.fontSize.subtitle,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.text,
  },
  card: {
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
    gap: 22,
  },
  areasCard: {
    maxHeight: 215,
    paddingVertical: spacing.lg,
  },
  areasList: {
    gap: 22,
  },
  continueSpacing: {
    marginTop: spacing.xs,
  },
  footerHint: {
    fontSize: 13,
    color: colors.textSecondary,
  },
});
