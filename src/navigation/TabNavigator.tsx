import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MenuNavigator, MenuNavigatorParamList } from "./MenuNavigator";
import { AntDesign } from "@expo/vector-icons";
import { OrderNavigator, OrderNavigatorParamList } from "./OrderNavigator";
import { colors } from "../themes/colors";

const Tab = createBottomTabNavigator();

export type TabParamList = {
  MenusTab: { screen?: keyof MenuNavigatorParamList } | undefined;
  OrderTab: { screen?: keyof OrderNavigatorParamList } | undefined;
};

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.dark,
        tabBarInactiveTintColor: colors.grey,
        tabBarIcon: ({ color, size }) => {
          let iconName: React.ComponentProps<typeof AntDesign>["name"];

          if (route.name === "MenusTab") {
            iconName = "menuunfold";
          } else if (route.name === "OrderTab") {
            iconName = "profile";
          } else {
            iconName = "question";
          }

          return <AntDesign name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          backgroundColor: colors.background,
        },
      })}
    >
      <Tab.Screen
        name="MenusTab"
        component={MenuNavigator}
        options={{ tabBarLabel: "Menus" }}
      />
      <Tab.Screen
        name="OrderTab"
        component={OrderNavigator}
        options={{ tabBarLabel: "Orders" }}
      />
    </Tab.Navigator>
  );
};
