import { router } from "expo-router";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { categories } from "../../../src/mocks/categories";
import { popularProducts } from "../../../src/mocks/retailerCatalogue";
import { useAppDispatch } from "../../../src/store/hooks";
import { addToCart } from "../../../src/store/slices/cartSlice";
import { colors } from "../../../src/theme/colors";
import { spacing } from "../../../src/theme/spacing";
import { formatCurrency } from "../../../src/utils/format";

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
      `${product.name} has been added to your cart.`,
    );
  };

  const handleCategoryPress = (category: string) => {
    router.push({
      pathname: "/(retailer)/(tabs)/search",
      params: { category },
    } as any);
  };

  const handleSearch = () => {
    router.push("/(retailer)/(tabs)/search" as any);
  };
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Welcome Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.shopName}>Ade Provision Store</Text>
          </View>

          <Pressable
            style={styles.notificationButton}
            onPress={() => router.push("/(retailer)/notifications" as any)}
          >
            <Text style={styles.notificationIcon}>🔔</Text>
          </Pressable>
        </View>

        {/* Search Bar */}
        <Pressable style={styles.searchContainer} onPress={handleSearch}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            placeholder="Search"
            placeholderTextColor={colors.textLight}
            style={styles.searchInput}
            editable={true}
            pointerEvents="none"
          />
        </Pressable>

        {/* Popular Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Products</Text>

            <Pressable
              onPress={() => router.push("/(retailer)/(tabs)/search" as any)}
            >
              <Text style={styles.seeAll}>See all</Text>
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productList}
          >
            {popularProducts.map((product) => (
              <View key={product.id} style={styles.productCard}>
                <View style={styles.productImage}>
                  <Image
                    source={product.image}
                    style={styles.productPhoto}
                    resizeMode="contain"
                  />
                </View>

                <Text style={styles.productName} numberOfLines={2}>
                  {product.name}
                </Text>

                <Text style={styles.packLabel}>{product.packLabel}</Text>

                <Text style={styles.productPrice}>
                  {formatCurrency(product.price)}
                </Text>

                <Text style={styles.wholesaler} numberOfLines={1}>
                  Wholesaler: {product.wholesaler}
                </Text>

                <Pressable
                  style={styles.addButton}
                  onPress={() => handleAddToCart(product)}
                >
                  <Text style={styles.addButtonText}>Add to Cart</Text>
                </Pressable>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Browse Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse Categories</Text>

          <View style={styles.categoryGrid}>
            {categories.map((category) => (
              <Pressable
                key={category.name}
                style={styles.categoryCard}
                onPress={() => handleCategoryPress(category.name)}
              >
                <View style={styles.categoryIconContainer}>
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                </View>

                <Text style={styles.categoryName}>{category.name}</Text>
              </Pressable>
            ))}
          </View>
        </View>
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
    padding: 24,
    paddingBottom: 32,
    gap: spacing.xl,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  welcomeText: {
    fontSize: 16,
    color: colors.textSecondary,
  },

  shopName: {
    fontSize: 23,
    fontWeight: "700",
    color: colors.text,
    marginTop: 4,
  },

  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },

  notificationIcon: {
    fontSize: 21,
  },

  searchContainer: {
    height: 54,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: colors.surface,
  },

  searchIcon: {
    fontSize: 25,
    color: colors.textSecondary,
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },

  section: {
    gap: spacing.md,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
  },

  seeAll: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
  },

  productList: {
    gap: spacing.md,
    paddingRight: 8,
  },

  productCard: {
    width: 220,
    minHeight: 311,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 12,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "space-between",
  },

  productImage: {
    width: "100%",
    height: 125,
    borderRadius: 10,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },

  productPhoto: {
    width: "100%",
    height: "100%",
  },

  productEmoji: {
    fontSize: 55,
  },

  productName: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
    marginTop: 10,
  },

  packLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 4,
  },

  productPrice: {
    fontSize: 19,
    fontWeight: "700",
    color: colors.primary,
    textAlign: "center",
    marginTop: 8,
  },

  wholesaler: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 5,
  },

  addButton: {
    height: 42,
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },

  addButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "700",
  },

  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 14,
  },

  categoryCard: {
    width: "31%",
    alignItems: "center",
    gap: 8,
  },

  categoryIconContainer: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },

  categoryIcon: {
    fontSize: 32,
  },

  categoryName: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.text,
    textAlign: "center",
  },
});
