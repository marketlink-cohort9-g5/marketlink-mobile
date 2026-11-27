import { Ionicons } from "@react-native-vector-icons/ionicons/static";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackButton } from "@/components/ui/BackButton";
import { searchResults } from "@/mocks/retailerCatalogue";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import { formatCurrency } from "@/utils/format";

type SortOption = "Lowest Price" | "Nearest" | "In Stock";

const FILTERS: SortOption[] = ["Lowest Price", "Nearest", "In Stock"];

/**
 * Retailer search and multi-wholesaler comparison screen matching Figma Search Results frame.
 */
export default function SearchScreen() {
  const { category } = useLocalSearchParams<{ category?: string }>();
  const [query, setQuery] = useState("");
  const [selectedFilter, setSelectedFilter] =
    useState<SortOption>("Lowest Price");

  const sortedWholesalers = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const filtered = normalized
      ? searchResults.filter(
          (item) =>
            item.productName.toLowerCase().includes(normalized) ||
            item.wholesaler.toLowerCase().includes(normalized),
        )
      : [...searchResults];

    if (selectedFilter === "Lowest Price") {
      return [...filtered].sort((a, b) => a.price - b.price);
    }

    if (selectedFilter === "Nearest") {
      return [...filtered].sort((a, b) => a.distance - b.distance);
    }

    return [...filtered].sort((a, b) => {
      if (a.stock === b.stock) return a.price - b.price;
      return a.stock === "In Stock" ? -1 : 1;
    });
  }, [query, selectedFilter]);

  const handleRequestProduct = () => {
    Alert.alert(
      "Product Request",
      "Tell us what product you need and nearby wholesalers will respond with quotes.",
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Back Row */}
        <BackButton
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace("/(retailer)/(tabs)/home");
            }
          }}
        />

        {/* Search Input */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={20}
            color={colors.textSecondary}
          />
          <TextInput
            style={styles.searchInput}
            placeholder={category ? `Search in ${category}` : "Search"}
            placeholderTextColor={colors.textSecondary}
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
          />
        </View>

        {/* Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterList}
        >
          {FILTERS.map((filter) => {
            const isSelected = selectedFilter === filter;

            return (
              <TouchableOpacity
                key={filter}
                activeOpacity={0.8}
                style={[
                  styles.filterButton,
                  isSelected && styles.selectedFilter,
                ]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text
                  style={[
                    styles.filterText,
                    isSelected && styles.selectedFilterText,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Results Meta */}
        <Text style={styles.resultsText}>
          {sortedWholesalers.length} products · within Jakande
        </Text>

        {/* Product Comparison Cards */}
        <View style={styles.productList}>
          {sortedWholesalers.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.85}
              style={styles.productCard}
              onPress={() =>
                Alert.alert(
                  item.wholesaler,
                  `${item.productName} — ${formatCurrency(item.price)} (${item.pack})`,
                )
              }
            >
              <View style={styles.cardTopRow}>
                <Text style={styles.productName}>{item.productName}</Text>

                <View style={styles.wholesalerBadge}>
                  <Text style={styles.wholesalerCount}>3 Wholesalers</Text>
                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color={colors.primary}
                  />
                </View>
              </View>

              <Text style={styles.packText}>{item.pack.toLowerCase()}</Text>

              <Text style={styles.fromText}>From</Text>

              <Text style={styles.priceText}>
                {formatCurrency(item.price)}
                <Text style={styles.unitText}> /carton</Text>
              </Text>

              {item.stock === "Low Stock" ? (
                <Text style={styles.statusText}>
                  <Text style={styles.lowStockText}>Low Stock</Text>
                  {`. ${item.wholesaler}.`}
                </Text>
              ) : (
                <Text style={styles.statusText}>
                  Best price at {item.wholesaler}. updated {item.updated}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Request Product Link */}
        <TouchableOpacity
          activeOpacity={0.75}
          style={styles.requestRow}
          onPress={handleRequestProduct}
        >
          <Text style={styles.requestPrefix}>Can&apos;t find it? </Text>
          <Text style={styles.requestLink}>Tell us what you need</Text>
        </TouchableOpacity>
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
  content: {
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
    gap: spacing.lg,
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
  searchInput: {
    flex: 1,
    fontSize: typography.fontSize.body,
    color: colors.text,
  },
  filterList: {
    gap: 10,
  },
  filterButton: {
    height: 42,
    paddingHorizontal: spacing.lg,
    borderRadius: 22,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedFilter: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textSecondary,
  },
  selectedFilterText: {
    color: colors.white,
  },
  resultsText: {
    fontSize: typography.fontSize.caption,
    color: colors.textSecondary,
  },
  productList: {
    gap: spacing.lg,
  },
  productCard: {
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  productName: {
    flex: 1,
    fontSize: typography.fontSize.subtitle,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.text,
  },
  wholesalerBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  wholesalerCount: {
    fontSize: typography.fontSize.caption,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  packText: {
    fontSize: typography.fontSize.caption,
    color: colors.textSecondary,
  },
  fromText: {
    fontSize: typography.fontSize.caption,
    color: colors.text,
    marginTop: spacing.xs,
  },
  priceText: {
    fontSize: typography.fontSize.subtitle,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.text,
  },
  unitText: {
    fontSize: typography.fontSize.subtitle,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textSecondary,
  },
  statusText: {
    fontSize: typography.fontSize.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  lowStockText: {
    fontWeight: typography.fontWeight.bold,
    color: colors.error,
  },
  requestRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xs,
  },
  requestPrefix: {
    fontSize: typography.fontSize.caption,
    color: colors.text,
  },
  requestLink: {
    fontSize: typography.fontSize.caption,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
});
