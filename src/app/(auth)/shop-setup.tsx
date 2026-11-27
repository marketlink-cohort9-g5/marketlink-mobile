import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { OnboardingHeader } from "@/components/auth/OnboardingHeader";
import { AppButton } from "@/components/ui/AppButton";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

const SHOP_TYPES = ["Provision Store", "Supermarket", "Mini-Mart", "Kiosk"] as const;

/**
 * Retailer shop onboarding screen matching Figma Retailer Shop Details frames.
 */
export default function ShopSetupScreen() {
  const [shopName, setShopName] = useState("");
  const [shopType, setShopType] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [showShopTypes, setShowShopTypes] = useState(false);

  const handleSave = () => {
    if (!shopName.trim() || !shopType || !shopAddress.trim()) {
      Alert.alert(
        "Missing Details",
        "Please complete all shop details before continuing.",
      );
      return;
    }

    router.replace("/(auth)/login");
  };

  const handleSkip = () => {
    router.replace("/(auth)/login");
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
          <OnboardingHeader showBack logoHeight={100} />

          <Text style={styles.title}>Set Up Your Shop</Text>

          <Text style={styles.description}>
            Tell us a little about your shop so wholesalers can serve you better.
          </Text>

          <View style={styles.field}>
            <Text style={styles.label}>Shop Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your shop name"
              placeholderTextColor={colors.textSecondary}
              value={shopName}
              onChangeText={setShopName}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Shop Type</Text>

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.dropdown}
              onPress={() => setShowShopTypes((prev) => !prev)}
            >
              <Text
                style={[
                  styles.dropdownText,
                  !shopType && styles.dropdownPlaceholder,
                ]}
              >
                {shopType || "Select your shop type"}
              </Text>

              <View
                style={[
                  styles.chevron,
                  showShopTypes && styles.chevronOpen,
                ]}
              />
            </TouchableOpacity>

            {showShopTypes && (
              <View style={styles.dropdownOptions}>
                {SHOP_TYPES.map((type, index) => (
                  <TouchableOpacity
                    key={type}
                    activeOpacity={0.75}
                    style={[
                      styles.dropdownOption,
                      index === SHOP_TYPES.length - 1 && styles.dropdownOptionLast,
                    ]}
                    onPress={() => {
                      setShopType(type);
                      setShowShopTypes(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.dropdownOptionText,
                        shopType === type && styles.dropdownOptionSelected,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Shop Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your shop address"
              placeholderTextColor={colors.textLight}
              value={shopAddress}
              onChangeText={setShopAddress}
            />
          </View>

          <Text style={styles.note}>
            You can complete this later from your profile.
          </Text>

          <AppButton title="Save & Continue" onPress={handleSave} />

          <TouchableOpacity
            activeOpacity={0.75}
            style={styles.skipButton}
            onPress={handleSkip}
          >
            <Text style={styles.skipButtonText}>Skip for now.</Text>
          </TouchableOpacity>
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
  title: {
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  description: {
    fontSize: typography.fontSize.body,
    lineHeight: 22,
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
  dropdown: {
    width: "100%",
    height: 52,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownText: {
    fontSize: typography.fontSize.body,
    color: colors.text,
  },
  dropdownPlaceholder: {
    color: colors.textLight,
  },
  chevron: {
    width: 11,
    height: 11,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: colors.text,
    transform: [{ rotate: "45deg" }, { translateY: -2 }],
    marginRight: spacing.xs,
  },
  chevronOpen: {
    transform: [{ rotate: "-135deg" }, { translateY: -2 }],
  },
  dropdownOptions: {
    width: "100%",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    overflow: "hidden",
  },
  dropdownOption: {
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dropdownOptionLast: {
    borderBottomWidth: 0,
  },
  dropdownOptionText: {
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.text,
  },
  dropdownOptionSelected: {
    color: colors.primary,
  },
  note: {
    fontSize: typography.fontSize.body,
    color: colors.textLight,
  },
  skipButton: {
    paddingVertical: spacing.xs,
  },
  skipButtonText: {
    fontSize: typography.fontSize.subtitle,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.primary,
  },
});
