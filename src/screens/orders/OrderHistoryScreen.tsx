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

export const OrderHistoryScreen = ({
  navigation,
}: NativeStackScreenProps<OrderNavigatorParamList, "OrderHistory">) => {
  const { orders, setOrders } = useOrderStore();
  const { data, isLoading, error } = useOrders();

  useEffect(() => {
    if (data && data.length > 0) {
      setOrders(data);
    }
  }, [data, setOrders]);

  const sortedOrders = useMemo(
    () =>
      [...orders].sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ),
    [orders]
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

  if (!orders.length)
    return (
      <View style={defaultStyles.screenCenter}>
        <Text>No data</Text>
      </View>
    );

  return (
    <View style={defaultStyles.screen}>
      <FlatList
        data={sortedOrders}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
        renderItem={({ item }) => {
          const { id, customerName, items, timestamp } = item;
          const totalAmount = items.reduce((acc, item) => acc + item.price, 0);

          return (
            <Pressable
              style={[
                defaultStyles.flexRow,
                defaultStyles.gap8,
                defaultStyles.p24,
              ]}
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
