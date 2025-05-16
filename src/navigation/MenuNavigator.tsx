import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AddMenuScreen } from "../screens/AddMenuScreen";
import { MenusScreen } from "../screens/MenusScreen";
import { colors } from "../themes/colors";
import { FilledButton } from "../components/Button/FilledButton";

export type MenuNavigatorParamList = {
  Menus: undefined;
  AddMenu: undefined;
};

const Stack = createNativeStackNavigator<MenuNavigatorParamList>();

export const MenuNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Menus"
      screenOptions={{
        headerTintColor: colors.dark,
        headerStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen
        name="Menus"
        component={MenusScreen}
        options={({ navigation }) => ({
          title: "Menus",
          headerRight: () => (
            <FilledButton
              text="Add Menu"
              size="small"
              onPress={() => navigation.navigate("AddMenu")}
            />
          ),
        })}
      />
      <Stack.Screen
        name="AddMenu"
        component={AddMenuScreen}
        options={{ title: "Add Menu" }}
      />
    </Stack.Navigator>
  );
};
