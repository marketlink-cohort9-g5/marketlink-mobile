import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Redirect } from "expo-router";
import { useAuth } from "../src/context/AuthContext";
import { colors } from "../src/theme/colors";

export default function Index() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!isAuthenticated || !user) {
    return <Redirect href={"/(auth)/welcome" as any} />;
  }

  if (user.role === "retailer") {
    return <Redirect href={"/(retailer)/(tabs)/home" as any} />;
  }

  if (user.role === "wholesaler") {
    return <Redirect href={"/(wholesaler)/(tabs)/orders" as any} />;
  }

  return <Redirect href={"/(auth)/welcome" as any} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
});
