import React from "react";
import { Text } from "../../components/Typography/Text";
import { FlatList, ScrollView, View } from "react-native";
import { defaultStyles } from "../../themes/defaultStyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { OrderNavigatorParamList } from "../../navigation/OrderNavigator";
import { useOrderStore } from "../../store/useOrderStore";
import { textStyles } from "../../themes/textStyles";
import { colors } from "../../themes/colors";
import { formatTimestamp } from "../../utils/dateUtils";
import { OrderedItem } from "../../types/Order";

export const OrderHistoryDetailsScreen = ({
  route,
}: NativeStackScreenProps<OrderNavigatorParamList, "OrderHistoryDetails">) => {
  const id = route.params.id;
  const { getOrder } = useOrderStore();

  const order = getOrder(id);

  if (!order)
    return (
      <View style={defaultStyles.screenCenter}>
        <Text>Cannot retrieve the data</Text>
      </View>
    );

  const { customerName, items, timestamp } = order;
  const totalAmount = items.reduce(
    (acc: number, item: OrderedItem) => acc + item.price * item.quantity,
    0
  );

  return (
    <View style={[defaultStyles.screen, defaultStyles.p16]}>
      <View style={defaultStyles.gap24}>
        <View style={defaultStyles.gap4}>
          <Text style={textStyles.text14}>Order For:</Text>
          <Text style={textStyles.text16}>{customerName}</Text>
        </View>
        <View style={defaultStyles.gap4}>
          <Text style={textStyles.text14}>Date:</Text>
          <Text style={textStyles.text16}> {formatTimestamp(timestamp)}</Text>
        </View>
        <View
          style={[
            defaultStyles.flexRow,
            {
              backgroundColor: colors.dark,
              borderTopStartRadius: 16,
              borderTopRightRadius: 16,
              height: 32,
              alignItems: "center",
            },
          ]}
        >
          <View style={[defaultStyles.flex3, defaultStyles.pl16]}>
            <Text color={colors.white} style={textStyles.text14}>
              Order Name
            </Text>
          </View>
          <View style={[defaultStyles.flex1, defaultStyles.flexCenter]}>
            <Text color={colors.white} style={textStyles.text14}>
              Quantity
            </Text>
          </View>
          <View style={[defaultStyles.flex1, defaultStyles.flexCenter]}>
            <Text color={colors.white} style={textStyles.text14}>
              Price
            </Text>
          </View>
        </View>
      </View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.menuId}
        ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
        renderItem={({ item }) => {
          const { name, price, quantity } = item;

          return (
            <View style={[defaultStyles.flexRow, defaultStyles.p8]}>
              <View style={[defaultStyles.flex3]}>
                <Text style={textStyles.text14}>{name}</Text>
              </View>
              <View
                style={[defaultStyles.flex1, defaultStyles.flexAlignItemsEnd]}
              >
                <Text style={textStyles.text14}>{quantity}</Text>
              </View>
              <View
                style={[defaultStyles.flex1, defaultStyles.flexAlignItemsEnd]}
              >
                <Text style={textStyles.text14}>{price}</Text>
              </View>
            </View>
          );
        }}
      />
      <View style={defaultStyles.separator} />
      <View style={[defaultStyles.p8, defaultStyles.flexRowSpaceBetween]}>
        <Text style={textStyles.textBold18}>Total</Text>
        <Text style={textStyles.textBold18}>₱ {totalAmount}</Text>
      </View>
    </View>
  );
};
