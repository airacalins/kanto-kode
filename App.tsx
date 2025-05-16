import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./src/api/client";
import { colors } from "./src/themes/colors";
import { MenusScreen } from "./src/screens/MenusScreen";
import { NavigationContainer } from "@react-navigation/native";
import { MenuNavigator } from "./src/navigation/MenuNavigator";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <MenuNavigator />
        </NavigationContainer>{" "}
      </QueryClientProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingBottom: 64,
  },
});
