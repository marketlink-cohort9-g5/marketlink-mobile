import { Image as ExpoImage, type ImageProps } from "expo-image";
import { Tabs } from "expo-router";
import { type ImageStyle, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "@/theme/colors";

function renderTabIcon(source: ImageProps["source"], iconStyle: ImageStyle) {
  return ({ focused }: { focused: boolean }) => (
    <ExpoImage
      source={source}
      style={[iconStyle, !focused && styles.inactiveIcon]}
      tintColor={focused ? colors.primary : colors.textSecondary}
      contentFit="contain"
    />
  );
}

/**
 * Retailer bottom tab navigator matching Figma Navigation Bar (Home, Search, Orders, Profile).
 */
export default function RetailerTabsLayout() {
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, 8);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          height: 58 + bottomPadding,
          paddingBottom: bottomPadding,
          paddingTop: 6,
          backgroundColor: colors.white,
          borderTopColor: colors.border,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: renderTabIcon(
            require("../../../../assets/images/marketlink/tab-home.svg"),
            styles.homeIcon,
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: renderTabIcon(
            require("../../../../assets/images/marketlink/tab-search.svg"),
            styles.squareIcon,
          ),
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarIcon: renderTabIcon(
            require("../../../../assets/images/marketlink/tab-orders.svg"),
            styles.squareIcon,
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: renderTabIcon(
            require("../../../../assets/images/marketlink/tab-profile.svg"),
            styles.profileIcon,
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  homeIcon: {
    width: 20,
    height: 20.24,
  },
  squareIcon: {
    width: 22,
    height: 22,
  },
  profileIcon: {
    width: 16,
    height: 19,
  },
  inactiveIcon: {
    opacity: 0.75,
  },
});
