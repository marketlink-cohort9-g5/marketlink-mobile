import { Image as ExpoImage } from "expo-image";
import { router } from "expo-router";
import { useMemo, useState } from "react";
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

import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

const CATALOGUE_TEMPLATES = [
  {
    id: "indomie-chicken",
    name: "Indomie Chicken 70g",
    pack: "Carton of 40 packs",
  },
  {
    id: "indomie-onion",
    name: "Indomie Onion Chicken 70g",
    pack: "Carton of 40 packs",
  },
] as const;

/**
 * Wholesaler catalogue product addition screen matching Figma Wholesaler Add a Product.
 */
export default function WholesalerAddProductScreen() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string>(CATALOGUE_TEMPLATES[0].id);
  const [price, setPrice] = useState("40,500");
  const [stock, setStock] = useState("120");
  const [minOrder, setMinOrder] = useState("5");

  const filteredTemplates = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return CATALOGUE_TEMPLATES;
    return CATALOGUE_TEMPLATES.filter((item) =>
      item.name.toLowerCase().includes(normalized),
    );
  }, [query]);

  const handleSaveProduct = () => {
    if (!price.trim() || !stock.trim() || !minOrder.trim()) {
      Alert.alert(
        "Missing Details",
        "Please enter price, stock quantity, and minimum order.",
      );
      return;
    }

    const picked = CATALOGUE_TEMPLATES.find((item) => item.id === selectedId);
    Alert.alert(
      "Product Saved",
      `${picked?.name || "Product"} has been saved to your store catalogue.`,
      [
        {
          text: "Done",
          onPress: () => router.back(),
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
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
            hitSlop={8}
          >
            <ExpoImage
              source={require("../../../assets/images/marketlink/arrow-left.svg")}
              style={styles.backArrow}
              contentFit="contain"
            />
            <Text style={styles.backText}>Back</Text>
          </Pressable>

          <View style={styles.card}>
            <Text style={styles.heading}>Add a Product</Text>
            <Text style={styles.subtitle}>
              Pick it from the MarketLink catalogue.
            </Text>
          </View>

          <View style={styles.searchContainer}>
            <ExpoImage
              source={require("../../../assets/images/marketlink/search-icon.svg")}
              style={styles.searchIcon}
              contentFit="contain"
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor={colors.textSecondary}
              value={query}
              onChangeText={setQuery}
            />
          </View>

          {filteredTemplates.map((item) => {
            const isSelected = item.id === selectedId;
            return (
              <Pressable
                key={item.id}
                onPress={() => setSelectedId(item.id)}
                style={[styles.card, isSelected && styles.cardSelected]}
              >
                <Text style={styles.productTitle}>{item.name}</Text>
                <Text style={styles.productPack}>{item.pack}</Text>
              </Pressable>
            );
          })}

          <Pressable
            onPress={() =>
              Alert.alert(
                "Request Product",
                "Catalogue additions can be requested via MarketLink Support.",
              )
            }
          >
            <Text style={styles.requestText}>
              Cannot find it? <Text style={styles.requestLink}>Request a new product</Text>
            </Text>
          </Pressable>

          <View style={styles.card}>
            <Text style={styles.pricingTitle}>Your price and stock</Text>

            <View style={styles.rowFields}>
              <View style={styles.halfField}>
                <Text style={styles.fieldLabel}>Price per carton (₦)</Text>
                <TextInput
                  style={styles.fieldInput}
                  value={price}
                  onChangeText={setPrice}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.halfField}>
                <Text style={styles.fieldLabel}>Stock (cartons)</Text>
                <TextInput
                  style={styles.fieldInput}
                  value={stock}
                  onChangeText={setStock}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.fullField}>
              <Text style={styles.fieldLabel}>Minimum order (cartons)</Text>
              <TextInput
                style={styles.fieldInput}
                value={minOrder}
                onChangeText={setMinOrder}
                keyboardType="numeric"
              />
            </View>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.saveButton,
              pressed && styles.pressed,
            ]}
            onPress={handleSaveProduct}
          >
            <Text style={styles.saveButtonText}>Save Product</Text>
          </Pressable>
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
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: spacing.sm,
    minHeight: 32,
  },
  backArrow: {
    width: 17.25,
    height: 16.69,
  },
  backText: {
    fontSize: typography.fontSize.subtitle,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.text,
  },
  card: {
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  cardSelected: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  heading: {
    fontSize: 22,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  subtitle: {
    fontSize: typography.fontSize.body,
    color: colors.textSecondary,
  },
  searchContainer: {
    width: "100%",
    height: 44,
    borderWidth: 1,
    borderColor: "#d9e1dc",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.white,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.fontSize.body,
    color: colors.text,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.text,
  },
  productPack: {
    fontSize: typography.fontSize.caption,
    color: colors.textSecondary,
  },
  requestText: {
    fontSize: typography.fontSize.caption,
    color: colors.textSecondary,
  },
  requestLink: {
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
  },
  pricingTitle: {
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  rowFields: {
    flexDirection: "row",
    gap: spacing.md,
  },
  halfField: {
    flex: 1,
    gap: spacing.xs,
  },
  fullField: {
    width: "100%",
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  fieldLabel: {
    fontSize: typography.fontSize.caption,
    fontWeight: typography.fontWeight.medium,
    color: colors.textSecondary,
  },
  fieldInput: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    fontSize: typography.fontSize.body,
    color: colors.text,
    backgroundColor: colors.white,
  },
  saveButton: {
    width: "100%",
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
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
