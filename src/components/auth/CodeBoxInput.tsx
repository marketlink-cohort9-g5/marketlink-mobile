import { useRef } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  type TextInputInstance,
  View,
} from "react-native";

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

interface CodeBoxInputProps {
  length: 4 | 6;
  value: string;
  onChangeText: (value: string) => void;
  masked?: boolean;
  spread?: boolean;
}

/**
 * Reusable numeric PIN / OTP code box input supporting 4- or 6-digit entries.
 */
export function CodeBoxInput({
  length,
  value,
  onChangeText,
  masked = false,
  spread = false,
}: CodeBoxInputProps) {
  const inputRef = useRef<TextInputInstance>(null);

  return (
    <Pressable
      style={[styles.container, spread && styles.containerSpread]}
      onPress={() => inputRef.current?.focus()}
    >
      {Array.from({ length }).map((_, index) => {
        const digit = value[index] || "";
        const isActive = value.length === index;

        return (
          <View
            key={index}
            style={[
              styles.box,
              length === 6 && styles.boxSix,
              isActive && styles.boxActive,
            ]}
          >
            {digit ? (
              masked ? (
                <View style={styles.maskedDot} />
              ) : (
                <Text style={styles.digit}>{digit}</Text>
              )
            ) : null}
          </View>
        );
      })}

      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={(text) =>
          onChangeText(text.replace(/[^0-9]/g, "").slice(0, length))
        }
        keyboardType="number-pad"
        maxLength={length}
        style={styles.hiddenInput}
        caretHidden
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
    position: "relative",
  },
  containerSpread: {
    width: "100%",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  box: {
    width: 44,
    height: 52,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  boxSix: {
    flex: 1,
    maxWidth: 48,
  },
  boxActive: {
    borderColor: colors.primary,
    borderWidth: 1.5,
  },
  digit: {
    fontSize: typography.fontSize.subtitle,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.text,
  },
  maskedDot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: colors.text,
  },
  hiddenInput: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0,
  },
});
