import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { searchResults } from "@/mocks/retailerCatalogue";
import { colors } from "@/theme/colors";
import { formatCurrency } from "@/utils/format";

type SortOption = "Lowest Price" | "Nearest" | "In Stock";

export default function SearchScreen() {
  const [selectedFilter, setSelectedFilter] =
    useState<SortOption>("Lowest Price");

  const sortedWholesalers = useMemo(() => {
    const results = [...searchResults];

    if (selectedFilter === "Lowest Price") {
      return results.sort((a, b) => a.price - b.price);
    }

    if (selectedFilter === "Nearest") {
      return results.sort((a, b) => a.distance - b.distance);
    }

    if (selectedFilter === "In Stock") {
      return results.sort((a, b) => {
        if (a.stock === b.stock) return a.price - b.price;
        return a.stock === "In Stock" ? -1 : 1;
      });
    }

    return results;
  }, [selectedFilter]);

  const filters: SortOption[] = ["Lowest Price", "Nearest", "In Stock"];

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>‹</Text>
          </Pressable>

          <Text style={styles.headerTitle}>Search</Text>
        </View>

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterList}
        >
          {filters.map((filter) => {
            const isSelected = selectedFilter === filter;

            return (
              <Pressable
                key={filter}
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
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Results information */}
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsText}>3 products</Text>
          <Text style={styles.locationText}>· within Jakande</Text>
        </View>

        {/* Product comparison cards */}
        <View style={styles.productList}>
          {sortedWholesalers.map((item, index) => (
            <View key={item.id} style={styles.productCard}>
              <View style={styles.productHeader}>
                <View style={styles.productIcon}>
                  <Image
                    source={item.image}
                    style={styles.productPhoto}
                    resizeMode="cover"
                  />
                </View>

                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{item.productName}</Text>

                  <Text style={styles.wholesalerCount}>3 Wholesalers</Text>

                  <Text style={styles.packText}>{item.pack}</Text>
                </View>
              </View>

              <View style={styles.priceSection}>
                <Text style={styles.fromText}>From</Text>

                <Text style={styles.priceText}>
                  {formatCurrency(item.price)}
                  <Text style={styles.unitText}> /carton</Text>
                </Text>
              </View>

              <View style={styles.cardFooter}>
                <View style={styles.storeInfo}>
                  {item.stock === "Low Stock" ? (
                    <View style={styles.lowStockBadge}>
                      <Text style={styles.lowStockText}>Low Stock</Text>
                    </View>
                  ) : (
                    <Text style={styles.bestPrice}>
                      Best price at {item.wholesaler}.
                    </Text>
                  )}

                  {item.stock === "Low Stock" && (
                    <Text style={styles.storeName}>{item.wholesaler}</Text>
                  )}

                  <Text style={styles.updatedText}>Updated {item.updated}</Text>
                </View>

                <Text style={styles.chevron}>›</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Request product */}
        <Pressable
          style={styles.requestCard}
          onPress={() => router.push("/(wholesaler)/request-product" as any)}
        >
          <View style={styles.requestIcon}>
            <Text style={styles.requestEmoji}>🔎</Text>
          </View>

          <View style={styles.requestInfo}>
            <Text style={styles.requestTitle}>Can't find it?</Text>
            <Text style={styles.requestSubtitle}>Tell us what you need</Text>
          </View>

          <Text style={styles.requestArrow}>›</Text>
        </Pressable>
      </ScrollView>
    </View>
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
    paddingBottom: 32,
    gap: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  backButton: {
    width: 36,
    height: 40,
    justifyContent: "center",
  },

  backText: {
    fontSize: 32,
    color: colors.text,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
  },

  filterList: {
    gap: 10,
  },

  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },

  selectedFilter: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textSecondary,
  },

  selectedFilterText: {
    color: colors.white,
  },

  resultsHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  resultsText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },

  locationText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 4,
  },

  productList: {
    gap: 16,
  },

  productCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14,
    backgroundColor: colors.white,
  },

  productHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  productIcon: {
    width: 64,
    height: 64,
    borderRadius: 10,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },

  productImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },

  productPhoto: {
    width: "85%",
    height: "85%",
  },

  productInfo: {
    flex: 1,
    gap: 4,
  },

  productName: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },

  wholesalerCount: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.primary,
  },

  packText: {
    fontSize: 13,
    color: colors.textSecondary,
  },

  priceSection: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  fromText: {
    fontSize: 13,
    color: colors.textSecondary,
  },

  priceText: {
    fontSize: 21,
    fontWeight: "700",
    color: colors.primary,
    marginTop: 3,
  },

  unitText: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.textSecondary,
  },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },

  storeInfo: {
    flex: 1,
    gap: 5,
  },

  bestPrice: {
    fontSize: 12,
    color: colors.textSecondary,
  },

  lowStockBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#FCEAEA",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 6,
  },

  lowStockText: {
    color: colors.error,
    fontSize: 11,
    fontWeight: "700",
  },

  storeName: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.text,
  },

  updatedText: {
    fontSize: 11,
    color: colors.textLight,
  },

  chevron: {
    fontSize: 28,
    color: colors.textSecondary,
    paddingHorizontal: 6,
  },

  requestCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14,
    gap: 12,
    marginTop: 4,
  },

  requestIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },

  requestEmoji: {
    fontSize: 22,
  },

  requestInfo: {
    flex: 1,
    gap: 4,
  },

  requestTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
  },

  requestSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
  },

  requestArrow: {
    fontSize: 25,
    color: colors.primary,
  },
});
