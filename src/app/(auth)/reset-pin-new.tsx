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
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CodeBoxInput } from "@/components/auth/CodeBoxInput";
import { OnboardingHeader } from "@/components/auth/OnboardingHeader";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import { doPinsMatch, isValidPin } from "@/utils/validators";

/**
 * New PIN entry screen matching Figma Choose a New Password frame.
 */
export default function ResetPinNewScreen() {
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  const handleSavePassword = () => {
    if (!newPin || !confirmPin) {
      Alert.alert("Missing Details", "Please enter and confirm your new PIN.");
      return;
    }

    if (!isValidPin(newPin)) {
      Alert.alert("Invalid PIN", "Your PIN must contain exactly 4 digits.");
      return;
    }

    if (!doPinsMatch(newPin, confirmPin)) {
      Alert.alert("PIN Mismatch", "Your PINs do not match.");
      return;
    }

    Alert.alert(
      "PIN Ready",
      "Your new PIN has been saved. You can now return to Login.",
      [
        {
          text: "Continue",
          onPress: () => router.replace("/(auth)/login"),
        },
      ],
    );
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
          <OnboardingHeader showBack logoHeight={115} />

          <Text style={styles.title}>Choose a new pin</Text>

          <View style={styles.field}>
            <Text style={styles.label}>New Pin</Text>
            <CodeBoxInput length={4} value={newPin} onChangeText={setNewPin} />
            <Text style={styles.helperText}>4 characters</Text>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Confirm new pin</Text>
            <CodeBoxInput
              length={4}
              value={confirmPin}
              onChangeText={setConfirmPin}
            />
          </View>

          <View style={styles.bottomSection}>
            <Pressable
              style={({ pressed }) => [
                styles.saveButton,
                pressed && styles.pressed,
              ]}
              onPress={handleSavePassword}
            >
              <Text style={styles.saveButtonText}>Save Password</Text>
            </Pressable>
          </View>
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
    gap: spacing.xl,
    alignItems: "flex-start",
  },
  title: {
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  field: {
    width: "100%",
    gap: spacing.lg,
  },
  label: {
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  helperText: {
    fontSize: typography.fontSize.body,
    color: colors.textLight,
  },
  bottomSection: {
    width: "100%",
    marginTop: "auto",
    paddingTop: spacing.xl,
  },
  saveButton: {
    width: "100%",
    borderRadius: 8,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: spacing.xl,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    fontSize: typography.fontSize.subtitle,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.white,
  },
  pressed: {
    opacity: 0.85,
  },
});
