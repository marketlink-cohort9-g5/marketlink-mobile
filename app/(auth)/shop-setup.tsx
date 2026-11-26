import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { colors } from "../../src/theme/colors";
import { spacing } from "../../src/theme/spacing";

const shopTypes = ["Provision Store", "Supermarket", "Mini-Mart", "Kiosk"];

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

    router.replace("/(auth)/login" as any);
  };

  const handleSkip = () => {
    router.replace("/(auth)/login" as any);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>‹ Back</Text>
      </Pressable>

      <View style={styles.header}>
        <Text style={styles.title}>Set Up Your Shop</Text>
        <Text style={styles.description}>
          Tell us a little about your shop so wholesalers can serve you better.
        </Text>
      </View>

      {/* Shop Name */}
      <View style={styles.field}>
        <Text style={styles.label}>Shop Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your shop name"
          placeholderTextColor={colors.textLight}
          value={shopName}
          onChangeText={setShopName}
        />
      </View>

      {/* Shop Type Dropdown */}
      <View style={styles.field}>
        <Text style={styles.label}>Shop Type</Text>

        <Pressable
          style={styles.dropdown}
          onPress={() => setShowShopTypes(!showShopTypes)}
        >
          <Text style={[styles.dropdownText, !shopType && styles.placeholder]}>
            {shopType || "Select your shop type"}
          </Text>

          <Text style={styles.dropdownArrow}>{showShopTypes ? "▲" : "▼"}</Text>
        </Pressable>

        {showShopTypes && (
          <View style={styles.dropdownOptions}>
            {shopTypes.map((type) => (
              <Pressable
                key={type}
                style={styles.dropdownOption}
                onPress={() => {
                  setShopType(type);
                  setShowShopTypes(false);
                }}
              >
                <Text style={styles.dropdownOptionText}>{type}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>

      {/* Shop Address */}
      <View style={styles.field}>
        <Text style={styles.label}>Shop Address</Text>
        <TextInput
          style={[styles.input, styles.addressInput]}
          placeholder="Enter your shop address"
          placeholderTextColor={colors.textLight}
          value={shopAddress}
          onChangeText={setShopAddress}
          multiline
          textAlignVertical="top"
        />
      </View>

      <Text style={styles.note}>
        You can complete this later from your profile.
      </Text>

      <Pressable style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save & Continue</Text>
      </Pressable>

      <Pressable style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipButtonText}>Skip for now</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 40,
    gap: spacing.lg,
  },
  backButton: {
    alignSelf: "flex-start",
    minHeight: 48,
    justifyContent: "center",
  },
  backText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "600",
  },
  header: {
    gap: spacing.sm,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textSecondary,
  },
  field: {
    gap: spacing.sm,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.white,
  },
  addressInput: {
    height: 100,
    paddingTop: 14,
  },
  dropdown: {
    height: 52,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
  },
  dropdownText: {
    fontSize: 16,
    color: colors.text,
  },
  placeholder: {
    color: colors.textLight,
  },
  dropdownArrow: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  dropdownOptions: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    marginTop: 6,
    overflow: "hidden",
    backgroundColor: colors.white,
  },
  dropdownOption: {
    minHeight: 48,
    justifyContent: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dropdownOptionText: {
    fontSize: 16,
    color: colors.text,
  },
  note: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
  },
  saveButton: {
    height: 54,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.sm,
  },
  saveButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
  skipButton: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  skipButtonText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "600",
  },
});
