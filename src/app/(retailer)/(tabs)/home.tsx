import { Ionicons } from "@react-native-vector-icons/ionicons/static";
import { router } from "expo-router";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { categories } from "@/mocks/categories";
import { popularProducts } from "@/mocks/retailerCatalogue";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import { formatCurrency } from "@/utils/format";

/**
 * Retailer home dashboard screen matching Figma Retailer Home frame.
 */
export default function RetailerHomeScreen() {
  const dispatch = useAppDispatch();

  const handleAddToCart = (product: (typeof popularProducts)[number]) => {
    dispatch(
      addToCart({
        id: product.storeProductId,
        wholesalerId: "wholesaler-mama-bisi",
        storeProductId: product.storeProductId,
        productName: product.name,
        packLabel: product.packLabel,
        quantity: 1,
        unitPrice: product.price,
      }),
    );

    Alert.alert(
      "Added to Cart",
      `${product.name} has been added to your orders cart.`,
    );
  };

  const handleCategoryPress = (category: string) => {
    router.push({
      pathname: "/(retailer)/(tabs)/search",
      params: { category },
    });
  };

  const handleSearch = () => {
    router.push("/(retailer)/(tabs)/search");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.shopName}>Ade Provision Store</Text>
        </View>

        {/* Search Bar */}
        <Pressable
          style={({ pressed }) => [
            styles.searchContainer,
            pressed && styles.pressed,
          ]}
          onPress={handleSearch}
        >
          <Ionicons
            name="search-outline"
            size={20}
            color={colors.textSecondary}
          />
          <Text style={styles.searchPlaceholder}>Search</Text>
        </Pressable>

        {/* Popular Products */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Products</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productList}
          >
            {popularProducts.map((product) => (
              <View key={product.id} style={styles.productCard}>
                <View style={styles.productImageWrapper}>
                  <Image
                    source={product.image}
                    style={styles.productPhoto}
                    resizeMode="cover"
                  />
                </View>

                <Text style={styles.productName} numberOfLines={2}>
                  {product.name}
                </Text>

                <Text style={styles.productPrice}>
                  {formatCurrency(product.price)}
                </Text>

                <Text style={styles.wholesaler} numberOfLines={2}>
                  Wholesaler: {product.wholesaler}
                </Text>

                <Pressable
                  style={({ pressed }) => [
                    styles.addButton,
                    pressed && styles.pressed,
                  ]}
                  onPress={() => handleAddToCart(product)}
                >
                  <Text style={styles.addButtonText}>Add to Cart</Text>
                </Pressable>
              </View>
            ))}
          </ScrollView>

          <Pressable
            style={styles.seeAllButton}
            onPress={() => router.push("/(retailer)/(tabs)/search")}
          >
            <Text style={styles.seeAll}>See all</Text>
          </Pressable>
        </View>

        {/* Browse Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse Categories</Text>

          <View style={styles.categoryGrid}>
            {categories.map((category) => (
              <Pressable
                key={category.name}
                style={({ pressed }) => [
                  styles.categoryCard,
                  pressed && styles.pressed,
                ]}
                onPress={() => handleCategoryPress(category.name)}
              >
                <Text style={styles.categoryName} numberOfLines={1}>
                  {category.name}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
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
    gap: spacing.md,
  },
  header: {
    gap: spacing.sm,
  },
  welcomeText: {
    fontSize: typography.fontSize.subtitle,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textSecondary,
  },
  shopName: {
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
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
  searchPlaceholder: {
    fontSize: typography.fontSize.body,
    color: colors.textSecondary,
  },
  section: {
    gap: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  productList: {
    gap: spacing.lg,
    paddingRight: spacing.sm,
  },
  productCard: {
    width: 168,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: "#e5eae6",
    borderRadius: 12,
    padding: spacing.md,
    gap: spacing.sm,
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  productImageWrapper: {
    width: "100%",
    height: 110,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: colors.surface,
    backgroundColor: colors.white,
    overflow: "hidden",
  },
  productPhoto: {
    width: "100%",
    height: "100%",
  },
  productName: {
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.regular,
    color: colors.text,
  },
  productPrice: {
    fontSize: typography.fontSize.subtitle,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.primary,
  },
  wholesaler: {
    fontSize: typography.fontSize.caption,
    color: colors.textSecondary,
  },
  addButton: {
    width: "100%",
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: spacing.md,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: colors.white,
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.semiBold,
  },
  seeAllButton: {
    alignSelf: "flex-start",
  },
  seeAll: {
    fontSize: typography.fontSize.subtitle,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.primary,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: spacing.md,
  },
  categoryCard: {
    width: "31%",
    height: 80,
    borderRadius: 12,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.xs,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryName: {
    fontSize: 16,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.text,
    textAlign: "center",
  },
  pressed: {
    opacity: 0.85,
  },
});
