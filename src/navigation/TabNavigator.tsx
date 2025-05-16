import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MenuNavigator } from "./MenuNavigator"; // your stack navigator
import { AntDesign } from "@expo/vector-icons";
import { OrderNavigator } from "./OrderNavigator";
import { colors } from "../themes/colors";

const Tab = createBottomTabNavigator();

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
          } else if (route.name === "OtherTab") {
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
        name="OtherTab"
        component={OrderNavigator}
        options={{ tabBarLabel: "Orders" }}
      />
    </Tab.Navigator>
  );
};
