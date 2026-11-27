import {
  Ionicons,
  type IoniconsIconName,
} from "@react-native-vector-icons/ionicons/static";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "@/theme/colors";

function renderTabIcon(
  activeName: IoniconsIconName,
  inactiveName: IoniconsIconName,
) {
  return ({ focused }: { focused: boolean }) => (
    <Ionicons
      name={focused ? activeName : inactiveName}
      size={22}
      color={focused ? colors.primary : colors.textSecondary}
    />
  );
}

/**
 * Retailer bottom tab navigator .
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
          tabBarIcon: renderTabIcon("home", "home-outline"),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: renderTabIcon("search", "search-outline"),
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarIcon: renderTabIcon("bag", "bag-outline"),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: renderTabIcon("person", "person-outline"),
        }}
      />
    </Tabs>
  );
}
