import { StatusBar } from "expo-status-bar";
import { SafeAreaView, View } from "react-native";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./src/api/client";
import { NavigationContainer } from "@react-navigation/native";
import { defaultStyles } from "./src/themes/defaultStyles";
import { TabNavigator } from "./src/navigation/TabNavigator";

export default function App() {
  return (
    <View style={defaultStyles.screen}>
      <StatusBar style="auto" />
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </View>
  );
}
