import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { OnboardingHeader } from "@/components/auth/OnboardingHeader";
import { FileUploadRow } from "@/components/ui/FileUploadRow";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

/**
 * Wholesaler registration Step 3 screen for business details and KYC uploads.
 */
export default function WholesalerBusinessScreen() {
  const [businessName, setBusinessName] = useState("");
  const [marketArea, setMarketArea] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [cacNumber, setCacNumber] = useState("");
  const [validIdFile, setValidIdFile] = useState("id-card.jpg · 210 KB");
  const [shopPhotoFile, setShopPhotoFile] = useState("");

  const handleSelectId = () => {
    setValidIdFile((prev) =>
      prev === "id-card.jpg · 210 KB"
        ? "national-id.jpg · 340 KB"
        : "id-card.jpg · 210 KB",
    );
  };

  const handleSelectShopPhoto = () => {
    setShopPhotoFile((prev) =>
      prev === "shop-front.jpg · 420 KB"
        ? "shop-exterior.jpg · 510 KB"
        : "shop-front.jpg · 420 KB",
    );
  };

  const handleContinue = () => {
    if (!businessName.trim() || !marketArea.trim() || !shopAddress.trim()) {
      Alert.alert(
        "Missing Details",
        "Please fill in your business name, market or area, and shop address.",
      );
      return;
    }

    if (!validIdFile || !shopPhotoFile) {
      Alert.alert(
        "Documents Required",
        "Please attach both a valid ID and a photo of your shop.",
      );
      return;
    }

    router.push({
      pathname: "/(auth)/wholesaler-delivery",
      params: {
        businessName: businessName.trim(),
        marketArea: marketArea.trim(),
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <OnboardingHeader
            showBack={false}
            step={3}
            totalSteps={4}
            logoHeight={100}
          />

          <Text style={styles.heading}>Tell us about your business</Text>

          <Text style={styles.subtitle}>
            We verify this before your store goes live.
          </Text>

          <View style={styles.field}>
            <Text style={styles.label}>Business Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Business Name"
              placeholderTextColor={colors.textSecondary}
              value={businessName}
              onChangeText={setBusinessName}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Market or Area</Text>
            <TextInput
              style={styles.input}
              placeholder="Idumota"
              placeholderTextColor={colors.textLight}
              value={marketArea}
              onChangeText={setMarketArea}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Shop Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Shop Address"
              placeholderTextColor={colors.textLight}
              value={shopAddress}
              onChangeText={setShopAddress}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>CAC Number(optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="For Example RC 1234567"
              placeholderTextColor={colors.textLight}
              value={cacNumber}
              onChangeText={setCacNumber}
              autoCapitalize="characters"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Upload a Valid ID</Text>
            <Text style={styles.helperText}>
              Upload a clear photo of your government-issued ID (e.g. National
              ID, Voter&apos;s card, driver&apos;s licence or international
              passport)
            </Text>
            <FileUploadRow
              fileLabel={validIdFile}
              placeholder="No ID selected"
              actionLabel={validIdFile ? "Replace" : "Upload"}
              onPress={handleSelectId}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Photo of Your Shop</Text>
            <FileUploadRow
              fileLabel={shopPhotoFile}
              placeholder="No photo yet"
              actionLabel={shopPhotoFile ? "Replace" : "Take Photo"}
              onPress={handleSelectShopPhoto}
            />
            <Text style={styles.photoHint}>JPG or PNG, maximum 5MB.</Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.continueButton,
              pressed && styles.pressed,
            ]}
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primaryLight,
  },
  flex: {
    flex: 1,
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
  },
  field: {
    width: "100%",
    gap: spacing.sm,
  },
  label: {
    fontSize: typography.fontSize.subtitle,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.text,
  },
  helperText: {
    fontSize: typography.fontSize.caption,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  input: {
    width: "100%",
    height: 52,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    fontSize: typography.fontSize.body,
    color: colors.text,
  },
  photoHint: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  continueButton: {
    width: "100%",
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: spacing.xl,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.xs,
  },
  continueButtonText: {
    color: colors.white,
    fontSize: typography.fontSize.subtitle,
    fontWeight: typography.fontWeight.semiBold,
  },
  pressed: {
    opacity: 0.85,
  },
});
