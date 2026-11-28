import { Redirect } from "expo-router";

/**
 * Entry route redirecting directly to the Welcome screen.
 */
export default function Index() {
  return <Redirect href="/(auth)/welcome" />;
}
