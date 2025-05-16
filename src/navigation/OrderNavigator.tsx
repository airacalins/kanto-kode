import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../themes/colors";
import { OrdersScreen } from "../screens/orders/OrdersScreen";

export type OrderNavigatorParamList = {
  Orders: undefined;
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
      <Stack.Screen name="Orders" component={OrdersScreen} />
    </Stack.Navigator>
  );
};
