import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./src/api/client";
import { NavigationContainer } from "@react-navigation/native";
import { MenuNavigator } from "./src/navigation/MenuNavigator";
import { defaultStyles } from "./src/themes/defaultStyles";

export default function App() {
  return (
    <SafeAreaView style={defaultStyles.screen}>
      <StatusBar style="auto" />
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <MenuNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaView>
  );
}
