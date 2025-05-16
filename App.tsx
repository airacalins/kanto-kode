import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { MenusScreen } from "./src/screens/menu/MenusScreen";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./src/api/client";
import { colors } from "./src/themes/colors";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <QueryClientProvider client={queryClient}>
        <MenusScreen />
      </QueryClientProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingBottom: 64,
  },
});
