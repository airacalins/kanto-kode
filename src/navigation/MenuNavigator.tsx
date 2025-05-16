import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AddMenuScreen } from "../screens/menus/AddMenuScreen";
import { MenusScreen } from "../screens/menus/MenusScreen";
import { colors } from "../themes/colors";
import { FilledButton } from "../components/Button/FilledButton";
import { EditMenuScreen } from "../screens/menus/EditMenuScreen";

export type MenuNavigatorParamList = {
  Menus: undefined;
  AddMenu: undefined;
  EditMenu: { id: string };
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
      <Stack.Screen
        name="EditMenu"
        component={EditMenuScreen}
        options={{ title: "Edit Menu" }}
      />
    </Stack.Navigator>
  );
};
