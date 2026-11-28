import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  type ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { OnboardingHeader } from "@/components/auth/OnboardingHeader";
import { AppButton } from "@/components/ui/AppButton";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

type AccountRole = "retailer" | "wholesaler";

interface AccountOption {
  id: AccountRole;
  title: string;
  description: string;
  image: ImageSourcePropType;
}

const ACCOUNT_OPTIONS: AccountOption[] = [
  {
    id: "retailer",
    title: "Retailer",
    description: "Buy products from trusted wholesalers at competitive prices.",
    image: require("../../../assets/images/marketlink/retailer-card.png"),
  },
  {
    id: "wholesaler",
    title: "Wholesaler",
    description: "Sell your products and receive orders from retailers.",
    image: require("../../../assets/images/marketlink/wholesaler-card.png"),
  },
];

/**
 * Account type selection screen matching Figma Account Type (Unselected / Selected) frames.
 */
export default function OnboardingAccountTypeScreen() {
  const [selectedRole, setSelectedRole] = useState<AccountRole | null>(null);

  const buttonLabel =
    selectedRole === "retailer"
      ? "Continue as a Retailer"
      : selectedRole === "wholesaler"
        ? "Continue as a Wholesaler"
        : "Continue";

  const handleContinue = () => {
    if (!selectedRole) {
      Alert.alert(
        "Select Account Type",
        "Please choose Retailer or Wholesaler to continue.",
      );
      return;
    }

    router.push({
      pathname: "/(auth)/create-account",
      params: { accountType: selectedRole },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <OnboardingHeader showBack logoHeight={100} />

        <Text style={styles.heading}>How will you use MarketLink?</Text>

        <Text style={styles.subtitle}>
          Choose your account type to get started.
        </Text>

        {ACCOUNT_OPTIONS.map((option) => {
          const isSelected = selectedRole === option.id;
          return (
            <TouchableOpacity
              key={option.id}
              activeOpacity={0.85}
              onPress={() => setSelectedRole(option.id)}
              style={styles.optionBlock}
            >
              <View
                style={[
                  styles.imageCard,
                  isSelected && styles.imageCardSelected,
                ]}
              >
                <Image
                  source={option.image}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
              </View>

              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.optionDescription}>{option.description}</Text>
            </TouchableOpacity>
          );
        })}

        <AppButton
          title={buttonLabel}
          style={styles.buttonSpacing}
          onPress={handleContinue}
        />
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
    width: "100%",
  },
  subtitle: {
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.regular,
    color: colors.textSecondary,
    textAlign: "center",
    width: "100%",
  },
  optionBlock: {
    width: "100%",
    gap: spacing.md,
  },
  imageCard: {
    width: "100%",
    height: 175,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  imageCardSelected: {
    borderWidth: 5,
    borderColor: colors.primary,
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  optionTitle: {
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  optionDescription: {
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.regular,
    color: colors.text,
    lineHeight: 22,
  },
  buttonSpacing: {
    marginTop: spacing.xs,
  },
});
