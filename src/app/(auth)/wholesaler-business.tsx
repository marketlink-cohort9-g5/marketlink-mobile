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
import {
  UploadSourceModal,
  type UploadSourceOption,
} from "@/components/ui/UploadSourceModal";
import { useShopPhotoCapture } from "@/hooks/useShopPhotoCapture";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import {
  formatFileLabel,
  pickIdDocument,
  requestAndOpenCamera,
  requestAndOpenPhotoLibrary,
  type PickedMediaFile,
} from "@/utils/mediaPicker";

/**
 * Wholesaler registration Step 3 screen for business details and KYC uploads.
 */
export default function WholesalerBusinessScreen() {
  const [businessName, setBusinessName] = useState("");
  const [marketArea, setMarketArea] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [cacNumber, setCacNumber] = useState("");
  const [validIdFile, setValidIdFile] = useState<PickedMediaFile | null>(null);
  const [idError, setIdError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isPickingId, setIsPickingId] = useState(false);
  const [showIdSourceModal, setShowIdSourceModal] = useState(false);

  const shopPhoto = useShopPhotoCapture("shop-exterior.jpg", () =>
    setFormError(null),
  );

  const handleSelectIdSource = async (source: UploadSourceOption) => {
    setIdError(null);
    setIsPickingId(true);
    try {
      const outcome =
        source === "files"
          ? await pickIdDocument()
          : source === "library"
            ? await requestAndOpenPhotoLibrary("valid-id.jpg")
            : await requestAndOpenCamera("valid-id.jpg");

      if (outcome.status === "success") {
        setValidIdFile(outcome.file);
        setIdError(null);
        setFormError(null);
      } else if (outcome.status !== "canceled") {
        setIdError(outcome.message);
      }
    } finally {
      setIsPickingId(false);
    }
  };

  const handleContinue = () => {
    if (!businessName.trim() || !marketArea.trim() || !shopAddress.trim()) {
      const message =
        "Please fill in your business name, market or area, and shop address.";
      setFormError(message);
      if (Platform.OS !== "web") {
        Alert.alert("Missing Details", message);
      }
      return;
    }

    if (!validIdFile || !shopPhoto.photoFile) {
      const message =
        "Please upload your valid ID document and snap a photo of your shop.";
      setFormError(message);
      if (!validIdFile) {
        setIdError("Please upload a clear valid ID document.");
      }
      if (!shopPhoto.photoFile) {
        shopPhoto.setPhotoError("Please snap a photo of your shop.");
      }
      if (Platform.OS !== "web") {
        Alert.alert("Documents Required", message);
      }
      return;
    }

    setFormError(null);
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
              onChangeText={(value) => {
                setBusinessName(value);
                setFormError(null);
              }}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Market or Area</Text>
            <TextInput
              style={styles.input}
              placeholder="Idumota"
              placeholderTextColor={colors.textLight}
              value={marketArea}
              onChangeText={(value) => {
                setMarketArea(value);
                setFormError(null);
              }}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Shop Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Shop Address"
              placeholderTextColor={colors.textLight}
              value={shopAddress}
              onChangeText={(value) => {
                setShopAddress(value);
                setFormError(null);
              }}
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
              Upload a clear photo or PDF of your government-issued ID (e.g.
              National ID, Voter&apos;s card, driver&apos;s licence or
              international passport)
            </Text>
            <FileUploadRow
              fileLabel={formatFileLabel(validIdFile)}
              previewUri={validIdFile?.isImage ? validIdFile.uri : undefined}
              isDocument={Boolean(validIdFile && !validIdFile.isImage)}
              emptyIcon="cloud-upload-outline"
              placeholder="No document selected"
              actionLabel={validIdFile ? "Replace" : "Upload"}
              loading={isPickingId}
              error={idError}
              onPress={() => {
                setIdError(null);
                setShowIdSourceModal(true);
              }}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Photo of Your Shop</Text>
            <FileUploadRow
              fileLabel={formatFileLabel(shopPhoto.photoFile)}
              previewUri={shopPhoto.photoFile?.uri}
              emptyIcon="camera-outline"
              placeholder="No photo yet"
              actionLabel={shopPhoto.photoFile ? "Replace" : "Take Photo"}
              loading={shopPhoto.isCapturing}
              error={shopPhoto.photoError}
              onPress={() => void shopPhoto.captureFromCamera()}
            />
            {shopPhoto.cameraUnavailable ? (
              <Pressable
                onPress={() => void shopPhoto.chooseFromLibrary()}
                style={({ pressed }) => pressed && styles.pressed}
              >
                <Text style={styles.fallbackLink}>
                  Choose shop photo from library instead
                </Text>
              </Pressable>
            ) : null}
            <Text style={styles.photoHint}>
              JPG or PNG (PDF allowed for ID), maximum 5MB.
            </Text>
          </View>

          {formError ? <Text style={styles.formError}>{formError}</Text> : null}

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

      <UploadSourceModal
        visible={showIdSourceModal}
        title="Upload Valid ID"
        subtitle="Select a file or photo of your valid ID. Your phone will ask permission before accessing your photos or camera."
        onSelect={(source) => void handleSelectIdSource(source)}
        onClose={() => setShowIdSourceModal(false)}
      />
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
  fallbackLink: {
    fontSize: typography.fontSize.caption,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.primary,
  },
  photoHint: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  formError: {
    width: "100%",
    fontSize: typography.fontSize.caption,
    color: colors.error,
    fontWeight: typography.fontWeight.medium,
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
