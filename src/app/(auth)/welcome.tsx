import { router } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";


export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* MarketLink Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/images/marketlink/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Welcome Illustration */}
        <View style={styles.illustrationContainer}>
          <Image
            source={require("../../../assets/images/marketlink/welcome.png")}
            style={styles.welcomeImage}
            resizeMode="cover"
          />
        </View>

        {/* Headline & Supporting Copy */}
        <Text style={styles.heading}>{"Your Marketplace,\nJust A Tap Away"}</Text>

        <Text style={styles.description}>
          Buy and sell everyday products with ease.
        </Text>

        <Text style={styles.description}>
          Connect with trusted wholesalers and retailers on MarketLink.
        </Text>

        {/* Primary Action */}
        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.pressed,
          ]}
          onPress={() => router.push("/(auth)/onboarding")}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </Pressable>

        {/* Sign In Section */}
        <Text style={styles.accountText}>Already have an account?</Text>

        <Pressable
          style={({ pressed }) => [
            styles.secondaryButton,
            pressed && styles.pressed,
          ]}
          onPress={() => router.push("/(auth)/login")}
        >
          <Text style={styles.secondaryButtonText}>Sign In</Text>
        </Pressable>
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

  logoContainer: {
    width: "100%",
    alignItems: "center",
  },

  logo: {
    width: "100%",
    height: 115,
  },

  illustrationContainer: {
    width: "100%",
    aspectRatio: 1,
    maxHeight: 360,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: colors.primaryLight,
  },

  welcomeImage: {
    width: "100%",
    height: "100%",
  },

  heading: {
    fontSize: typography.fontSize.heading,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    letterSpacing: 1.6,
    textAlign: "left",
    width: "100%",
  },

  description: {
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.regular,
    color: colors.textSecondary,
    textAlign: "center",
    width: "100%",
  },

  primaryButton: {
    width: "100%",
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: spacing.xl,
    justifyContent: "center",
    alignItems: "center",
  },

  primaryButtonText: {
    color: colors.white,
    fontSize: typography.fontSize.subtitle,
    fontWeight: typography.fontWeight.semiBold,
  },

  accountText: {
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.regular,
    color: colors.text,
    textAlign: "left",
  },

  secondaryButton: {
    width: "100%",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: spacing.xl,
    justifyContent: "center",
    alignItems: "center",
  },

  secondaryButtonText: {
    color: colors.primary,
    fontSize: typography.fontSize.subtitle,
    fontWeight: typography.fontWeight.semiBold,
  },

  pressed: {
    opacity: 0.85,
  },
});
