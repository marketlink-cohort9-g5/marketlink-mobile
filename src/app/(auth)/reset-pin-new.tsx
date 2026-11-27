import React, { useState } from "react";
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
import { router } from "expo-router";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { isValidPin, doPinsMatch } from "@/utils/validators";

export default function ResetPinNewScreen() {
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [showNewPin, setShowNewPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);

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

    // PIN reset API integration will be added here.
    Alert.alert(
      "PIN Ready",
      "Your new PIN has passed validation. You can now return to Login.",
      [
        {
          text: "Continue",
          onPress: () => router.replace("/(auth)/login" as any),
        },
      ],
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>‹ Back</Text>
        </Pressable>

        {/* Heading */}
        <View style={styles.header}>
          <Text style={styles.title}>Choose a new pin</Text>
        </View>

        {/* New PIN */}
        <View style={styles.field}>
          <Text style={styles.label}>New Pin</Text>

          <View style={styles.pinContainer}>
            <TextInput
              style={styles.pinInput}
              value={newPin}
              onChangeText={(value) =>
                setNewPin(value.replace(/[^0-9]/g, "").slice(0, 4))
              }
              keyboardType="number-pad"
              maxLength={4}
              secureTextEntry={!showNewPin}
              placeholder="Enter your new PIN"
              placeholderTextColor={colors.textLight}
            />

            <Pressable onPress={() => setShowNewPin(!showNewPin)}>
              <Text style={styles.showText}>
                {showNewPin ? "Hide" : "Show"}
              </Text>
            </Pressable>
          </View>

          <Text style={styles.helperText}>4 characters</Text>
        </View>

        {/* Confirm PIN */}
        <View style={styles.field}>
          <Text style={styles.label}>Confirm new pin</Text>

          <View style={styles.pinContainer}>
            <TextInput
              style={styles.pinInput}
              value={confirmPin}
              onChangeText={(value) =>
                setConfirmPin(value.replace(/[^0-9]/g, "").slice(0, 4))
              }
              keyboardType="number-pad"
              maxLength={4}
              secureTextEntry={!showConfirmPin}
              placeholder="Confirm your new PIN"
              placeholderTextColor={colors.textLight}
            />

            <Pressable onPress={() => setShowConfirmPin(!showConfirmPin)}>
              <Text style={styles.showText}>
                {showConfirmPin ? "Hide" : "Show"}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Save Button */}
        <Pressable style={styles.saveButton} onPress={handleSavePassword}>
          <Text style={styles.saveButtonText}>Save Password</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  content: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 32,
    gap: 24,
  },

  backButton: {
    minHeight: 48,
    justifyContent: "center",
    alignSelf: "flex-start",
  },

  backText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
  },

  header: {
    marginTop: spacing.xl,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text,
  },

  field: {
    gap: spacing.sm,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },

  pinContainer: {
    height: 56,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
  },

  pinInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },

  showText: {
    fontSize: 14,
  },

  helperText: {
    fontSize: 13,
    color: colors.textSecondary,
  },

  saveButton: {
    height: 54,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.xl,
  },

  saveButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.white,
  },
});
