import { useLocalSearchParams, useRouter } from "expo-router";
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
import { colors } from "../../src/theme/colors";
import {
  doPinsMatch,
  isRequired,
  isValidEmail,
  isValidPhone,
  isValidPin,
} from "../../src/utils/validators";

export default function SignupScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ role?: string }>();

  const accountType = params.role === "wholesaler" ? "Wholesaler" : "Retailer";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleCreateAccount = () => {
    if (
      !isRequired(fullName) ||
      !isRequired(email) ||
      !isRequired(phone) ||
      !isRequired(pin) ||
      !isRequired(confirmPin)
    ) {
      Alert.alert("Missing Details", "Please complete all fields.");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    if (!isValidPhone(phone)) {
      Alert.alert(
        "Invalid Phone",
        "Please enter a valid Nigerian phone number.",
      );
      return;
    }

    if (!isValidPin(pin)) {
      Alert.alert("Invalid PIN", "Your PIN must contain exactly 4 digits.");
      return;
    }

    if (!doPinsMatch(pin, confirmPin)) {
      Alert.alert("PIN Mismatch", "Your PINs do not match.");
      return;
    }

    if (!agreed) {
      Alert.alert(
        "Agreement Required",
        "Please accept the Terms and Privacy Policy.",
      );
      return;
    }

    router.push({
      pathname: "/(auth)/verify-method",
      params: {
        role: params.role,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        pin,
      },
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>‹ Back</Text>
        </Pressable>

        <View style={styles.progressContainer}>
          <Text style={styles.stepText}>Step 1 of 3</Text>
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>
        </View>

        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Create Your Account</Text>
          <Text style={styles.description}>
            Join MarketLink to connect with trusted wholesalers and retailers.
          </Text>
        </View>

        <View style={styles.accountType}>
          <Text style={styles.accountLabel}>Account type:</Text>
          <Text style={styles.accountValue}>{accountType}</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Name"
              placeholderTextColor={colors.textLight}
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Email Address"
              placeholderTextColor={colors.textLight}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Phone Number"
              placeholderTextColor={colors.textLight}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Create a Pin</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Your 4-digit Pin"
              placeholderTextColor={colors.textLight}
              value={pin}
              onChangeText={(value) =>
                setPin(value.replace(/\D/g, "").slice(0, 4))
              }
              keyboardType="number-pad"
              secureTextEntry
              maxLength={4}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Your Pin</Text>
            <TextInput
              style={styles.input}
              placeholder="Re-enter Your 4-digit Pin"
              placeholderTextColor={colors.textLight}
              value={confirmPin}
              onChangeText={(value) =>
                setConfirmPin(value.replace(/\D/g, "").slice(0, 4))
              }
              keyboardType="number-pad"
              secureTextEntry
              maxLength={4}
            />
          </View>
        </View>

        <Pressable
          style={styles.agreementRow}
          onPress={() => setAgreed(!agreed)}
        >
          <View style={[styles.checkbox, agreed && styles.checkedBox]}>
            {agreed && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.agreementText}>
            I agree to the Terms and Privacy Policy
          </Text>
        </Pressable>

        <Pressable
          style={[styles.createButton, !agreed && styles.disabledButton]}
          onPress={handleCreateAccount}
          disabled={!agreed}
        >
          <Text style={styles.createButtonText}>Create Account</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flexGrow: 1,
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 16,
  },
  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 4,
  },
  backText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "600",
  },
  progressContainer: {
    gap: 8,
  },
  stepText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
  },
  progressTrack: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 10,
    overflow: "hidden",
  },
  progressFill: {
    width: "33.33%",
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  headingContainer: {
    gap: 8,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text,
  },
  description: {
    fontSize: 16,
    lineHeight: 23,
    color: colors.textSecondary,
  },
  accountType: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: colors.primaryLight,
    padding: 12,
    borderRadius: 10,
  },
  accountLabel: {
    fontSize: 15,
    color: colors.text,
  },
  accountValue: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.primary,
  },
  form: {
    gap: 14,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.white,
  },
  agreementRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 4,
    minHeight: 44,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  checkedBox: {
    backgroundColor: colors.primary,
  },
  checkmark: {
    color: colors.white,
    fontWeight: "700",
  },
  agreementText: {
    fontSize: 14,
    color: colors.textSecondary,
    flex: 1,
  },
  createButton: {
    height: 54,
    backgroundColor: colors.primary,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  disabledButton: {
    opacity: 0.5,
  },
  createButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
});
