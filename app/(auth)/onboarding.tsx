import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors } from "../../src/theme/colors";

type AccountType = "retailer" | "wholesaler";

export default function OnboardingScreen() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<AccountType | null>(null);

  const handleContinue = () => {
    if (!selectedRole) return;

    router.push({
      pathname: "/(auth)/signup",
      params: { role: selectedRole },
    });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>‹ Back</Text>
      </Pressable>

      <View style={styles.headingContainer}>
        <Text style={styles.heading}>How will you use MarketLink?</Text>
        <Text style={styles.description}>
          Choose your account type to get started.
        </Text>
      </View>

      <Pressable
        style={[
          styles.roleCard,
          selectedRole === "retailer" && styles.selectedCard,
        ]}
        onPress={() => setSelectedRole("retailer")}
      >
        <Image
          source={require("../../assets/images/marketlink/retailer.png")}
          style={styles.roleImage}
          resizeMode="cover"
        />

        <View style={styles.roleTextContainer}>
          <Text style={styles.roleTitle}>Retailer</Text>
          <Text style={styles.roleDescription}>
            Buy products from trusted wholesalers at competitive prices.
          </Text>
        </View>

        <View style={styles.radioOuter}>
          {selectedRole === "retailer" && <View style={styles.radioInner} />}
        </View>
      </Pressable>

      <Pressable
        style={[
          styles.roleCard,
          selectedRole === "wholesaler" && styles.selectedCard,
        ]}
        onPress={() => setSelectedRole("wholesaler")}
      >
        <Image
          source={require("../../assets/images/marketlink/wholesaler.png")}
          style={styles.roleImage}
          resizeMode="cover"
        />

        <View style={styles.roleTextContainer}>
          <Text style={styles.roleTitle}>Wholesaler</Text>
          <Text style={styles.roleDescription}>
            Sell your products and receive orders from retailers.
          </Text>
        </View>

        <View style={styles.radioOuter}>
          {selectedRole === "wholesaler" && <View style={styles.radioInner} />}
        </View>
      </Pressable>

      <Pressable
        style={[styles.continueButton, !selectedRole && styles.disabledButton]}
        disabled={!selectedRole}
        onPress={handleContinue}
      >
        <Text style={styles.continueText}>Continue</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: 24,
    gap: 16,
  },
  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 8,
  },
  backText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "600",
  },
  headingContainer: {
    gap: 8,
    marginBottom: 8,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  roleCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 12,
    gap: 12,
    minHeight: 150,
  },
  selectedCard: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
    borderWidth: 2,
  },
  roleImage: {
    width: 100,
    height: 110,
    borderRadius: 10,
    backgroundColor: colors.surface,
  },
  roleTextContainer: {
    flex: 1,
    gap: 8,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },
  roleDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  continueButton: {
    backgroundColor: colors.primary,
    height: 54,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
  },
  disabledButton: {
    opacity: 0.5,
  },
  continueText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
});
