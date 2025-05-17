import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../themes/colors";
import { AddOrderScreen } from "../screens/orders/AddOrderScreen";
import { OrderHistoryScreen } from "../screens/orders/OrderHistoryScreen";
import { FilledButton } from "../components/Button/FilledButton";
import { OrderHistoryDetailsScreen } from "../screens/orders/OrderHistoryDetailsScreen";

export type OrderNavigatorParamList = {
  Orders: undefined;
  OrderHistory: undefined;
  OrderHistoryDetails: { id: string };
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
        component={AddOrderScreen}
        options={({ navigation }) => ({
          title: "Add Order",
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
      <Stack.Screen
        name="OrderHistoryDetails"
        component={OrderHistoryDetailsScreen}
        options={{
          title: "Order History Details",
        }}
      />
    </Stack.Navigator>
  );
};
