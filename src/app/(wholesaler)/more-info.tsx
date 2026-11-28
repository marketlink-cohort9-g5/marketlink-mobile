import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppButton } from "@/components/ui/AppButton";
import { BackButton } from "@/components/ui/BackButton";
import { FileUploadRow } from "@/components/ui/FileUploadRow";
import { ContactSupportButton } from "@/components/wholesaler/ContactSupportButton";
import { useShopPhotoCapture } from "@/hooks/useShopPhotoCapture";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import { formatFileLabel } from "@/utils/mediaPicker";

/**
 * Wholesaler verification follow-up screen matching Figma Wholesaler More Info Needed.
 */
export default function WholesalerMoreInfoScreen() {
  const { businessName } = useLocalSearchParams<{ businessName?: string }>();
  const resolvedBusiness = businessName || "Ade Provision Store";

  const [submitError, setSubmitError] = useState<string | null>(null);
  const shopPhoto = useShopPhotoCapture("shop-front-clear.jpg", () =>
    setSubmitError(null),
  );

  const handleSendDetails = () => {
    if (!shopPhoto.photoFile) {
      const message =
        "Please tap Replace to snap a clearer photo of your shop front.";
      setSubmitError(message);
      if (Platform.OS !== "web") {
        Alert.alert("Replace Photo Required", message);
      }
      return;
    }

    const navigateNext = () =>
      router.replace({
        pathname: "/(wholesaler)/pending-verification",
        params: { businessName: resolvedBusiness },
      });

    if (Platform.OS === "web") {
      navigateNext();
      return;
    }

    Alert.alert(
      "Details Updated",
      "Your updated shop photo has been submitted for review.",
      [{ text: "Continue", onPress: navigateNext }],
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
            fileLabel={
              shopPhoto.photoFile
                ? formatFileLabel(shopPhoto.photoFile)
                : "id-card.jpg · 210 KB_Unclear"
            }
            previewUri={shopPhoto.photoFile?.uri}
            emptyIcon={!shopPhoto.photoFile ? "camera-outline" : undefined}
            placeholder="No photo selected"
            actionLabel="Replace"
            loading={shopPhoto.isCapturing}
            error={shopPhoto.photoError}
            onPress={() => void shopPhoto.captureFromCamera()}
          />
          {shopPhoto.cameraUnavailable ? (
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => void shopPhoto.chooseFromLibrary()}
            >
              <Text style={styles.fallbackLink}>
                Choose shop photo from library instead
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.bottomActions}>
          {submitError ? (
            <Text style={styles.submitError}>{submitError}</Text>
          ) : null}

          <AppButton
            title="Send updated details"
            onPress={handleSendDetails}
          />

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
  fallbackLink: {
    fontSize: typography.fontSize.caption,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.primary,
  },
  bottomActions: {
    width: "100%",
    marginTop: "auto",
    paddingTop: spacing.xl,
    gap: spacing.lg,
  },
  submitError: {
    fontSize: typography.fontSize.caption,
    color: colors.error,
    fontWeight: typography.fontWeight.medium,
  },
});
