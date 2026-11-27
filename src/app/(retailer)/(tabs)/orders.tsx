import { router } from "expo-router";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppButton } from "@/components/ui/AppButton";
import { useAppDispatch, useCartItems } from "@/store/hooks";
import { clearCart, removeFromCart } from "@/store/slices/cartSlice";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import { formatCurrency } from "@/utils/format";

/**
 * Retailer Orders & Cart summary tab showing items added from the catalogue.
 */
export default function RetailerOrdersScreen() {
  const items = useCartItems();
  const dispatch = useAppDispatch();

  const totalAmount = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );

  const handleCheckout = () => {
    if (items.length === 0) return;

    Alert.alert(
      "Order Submitted",
      `Your order totaling ${formatCurrency(totalAmount)} has been queued for confirmation.`,
      [
        {
          text: "OK",
          onPress: () => dispatch(clearCart()),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Orders</Text>

        {items.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No items in your cart yet</Text>
            <Text style={styles.emptySubtitle}>
              Browse products from wholesalers on the Home or Search tabs to
              start an order.
            </Text>
            <AppButton
              title="Browse Products"
              size="sm"
              fullWidth={false}
              onPress={() => router.push("/(retailer)/(tabs)/home")}
            />
          </View>
        ) : (
          <>
            <View style={styles.list}>
              {items.map((item) => (
                <View key={item.id} style={styles.itemCard}>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.productName}</Text>
                    <Text style={styles.itemMeta}>
                      {item.packLabel} × {item.quantity}
                    </Text>
                    <Text style={styles.itemPrice}>
                      {formatCurrency(item.unitPrice * item.quantity)}
                    </Text>
                  </View>

                  <TouchableOpacity
                    activeOpacity={0.75}
                    onPress={() => dispatch(removeFromCart(item.id))}
                    style={styles.removeButton}
                  >
                    <Text style={styles.removeText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <View style={styles.summaryCard}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>{formatCurrency(totalAmount)}</Text>
              </View>

              <AppButton title="Place Order" onPress={handleCheckout} />
            </View>
          </>
        )}
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
    flexGrow: 1,
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
    padding: spacing.xl,
    gap: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  emptyCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.xl,
    gap: spacing.md,
    alignItems: "flex-start",
  },
  emptyTitle: {
    fontSize: typography.fontSize.subtitle,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.text,
  },
  emptySubtitle: {
    fontSize: typography.fontSize.body,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  list: {
    gap: spacing.md,
  },
  itemCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  itemInfo: {
    flex: 1,
    gap: spacing.xs,
  },
  itemName: {
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.text,
  },
  itemMeta: {
    fontSize: typography.fontSize.caption,
    color: colors.textSecondary,
  },
  itemPrice: {
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  removeButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  removeText: {
    fontSize: typography.fontSize.caption,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.error,
  },
  summaryCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    gap: spacing.md,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: typography.fontSize.subtitle,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.text,
  },
  totalValue: {
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
});
