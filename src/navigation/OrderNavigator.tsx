import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../themes/colors";
import { OrdersScreen } from "../screens/orders/OrdersScreen";
import { OrderHistoryScreen } from "../screens/orders/OrderHistoryScreen";
import { FilledButton } from "../components/Button/FilledButton";

export type OrderNavigatorParamList = {
  Orders: undefined;
  OrderHistory: undefined;
};

const Stack = createNativeStackNavigator<OrderNavigatorParamList>();

export const OrderNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Orders"
      screenOptions={{
        headerTintColor: colors.dark,
        headerStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen
        name="Orders"
        component={OrdersScreen}
        options={({ navigation }) => ({
          title: "Menus",
          headerRight: () => (
            <FilledButton
              text="Order History"
              size="small"
              onPress={() => navigation.navigate("OrderHistory")}
            />
          ),
        })}
      />
      <Stack.Screen
        name="OrderHistory"
        component={OrderHistoryScreen}
        options={{
          title: "Order History",
        }}
      />
    </Stack.Navigator>
  );
};
