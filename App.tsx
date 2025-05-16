import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { MenuScreen } from "./src/screens/menu/MenuScreen";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./src/api/client";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <QueryClientProvider client={queryClient}>
        <MenuScreen />
      </QueryClientProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
