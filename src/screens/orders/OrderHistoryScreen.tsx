import React, { useEffect, useMemo } from "react";
import { FlatList, Pressable, View } from "react-native";
import { defaultStyles } from "../../themes/defaultStyles";
import { useOrderStore } from "../../store/useOrderStore";
import { useOrders } from "../../api/queries/useOrders";
import { Text } from "../../components/Typography/Text";
import { textStyles } from "../../themes/textStyles";
import { formatTimestamp } from "../../utils/dateUtils";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { OrderNavigatorParamList } from "../../navigation/OrderNavigator";
import { OrderedItem } from "../../types/Order";

export const OrderHistoryScreen = ({
  navigation,
}: NativeStackScreenProps<OrderNavigatorParamList, "OrderHistory">) => {
  const { orderHistory, setOrderHistory } = useOrderStore();
  const { data, isLoading, error } = useOrders();

  useEffect(() => {
    if (!orderHistory.length && data && data.length > 0) {
      setOrderHistory(data);
    }
  }, [data, setOrderHistory, orderHistory.length]);

  const sortedOrders = useMemo(
    () =>
      [...orderHistory].sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ),
    []
  );

  if (isLoading)
    return (
      <View style={defaultStyles.screenCenter}>
        <Text>Loading order history...</Text>
      </View>
    );

  if (error)
    return (
      <View style={defaultStyles.screenCenter}>
        <Text>Error: {error.message}</Text>
      </View>
    );

  if (!orderHistory.length)
    return (
      <View style={defaultStyles.screenCenter}>
        <Text>No data</Text>
      </View>
    );

  return (
    <View style={[defaultStyles.screen, defaultStyles.p16]}>
      <FlatList
        data={sortedOrders}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={defaultStyles.h16} />}
        renderItem={({ item }) => {
          const { id, customerName, items, timestamp } = item;
          const totalAmount = items.reduce(
            (acc: number, item: OrderedItem) =>
              acc + item.price * item.quantity,
            0
          );

          return (
            <Pressable
              style={[defaultStyles.flexRow, defaultStyles.card]}
              onPress={() => navigation.navigate("OrderHistoryDetails", { id })}
            >
              <View style={[defaultStyles.gap4, defaultStyles.flex1]}>
                <Text style={textStyles.text18}>{customerName}</Text>
                <Text style={textStyles.text14}>
                  {formatTimestamp(timestamp)}
                </Text>
              </View>
              <Text style={textStyles.text18}>₱ {totalAmount}</Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
};
