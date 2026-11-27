import "react-native-gesture-handler";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider as ReduxProvider } from "react-redux";
import { DatabaseProvider } from "../src/db/database";
import { store } from "../src/store";
import { AuthProvider } from "../src/context/AuthContext";
import { LowDataProvider } from "../src/context/LowDataContext";
import { NetworkProvider } from "../src/context/NetworkContext";
import { ThemeProvider } from "../src/context/ThemeContext";

export default function RootLayout() {
  return (
    <ReduxProvider store={store}>
      <DatabaseProvider>
        <AuthProvider>
          <NetworkProvider>
            <LowDataProvider>
              <ThemeProvider>
                <StatusBar style="dark" />
                <Stack
                  screenOptions={{
                    headerShown: false,
                    animation: "slide_from_right",
                  }}
                />
              </ThemeProvider>
            </LowDataProvider>
          </NetworkProvider>
        </AuthProvider>
      </DatabaseProvider>
    </ReduxProvider>
  );
}
