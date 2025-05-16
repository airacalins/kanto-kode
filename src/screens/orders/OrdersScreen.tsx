import React from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useOrderStore } from "../../store/useOrderStore";
import { defaultStyles } from "../../themes/defaultStyles";
import { OrderedItem } from "../../types/Order";
import { textStyles } from "../../themes/textStyles";
import { TextInput } from "../../components/Input/TextInput";
import { colors } from "../../themes/colors";
import { Text } from "../../components/Typography/Text";
import { FilledButton } from "../../components/Button/FilledButton";
import { AntDesign } from "@expo/vector-icons";
import { useMenuStore } from "../../store/useMenuStore";
import { Menu } from "../../types/Menu";

export const OrdersScreen = () => {
  const { getMenu, addMenu, updateMenuQty } = useMenuStore();
  const { currentOrderItems, addItemToCurrentOrder } = useOrderStore();

  const totalAmount = currentOrderItems.reduce(
    (acc: number, item: OrderedItem) => acc + item.price * item.quantity,
    0
  );

  if (!currentOrderItems)
    return (
      <View style={defaultStyles.screenCenter}>
        <Text>No orders yet.</Text>
      </View>
    );

  const handleAddQuantity = (menuId: string) => {
    const menu = getMenu(menuId);

    if (!menu) {
      Alert.alert("Cannot find a menu");
      return;
    }

    try {
      addItemToCurrentOrder(menu);
      updateMenuQty(menuId, 1);
    } catch (error) {}
  };

  const handleMinusQuantity = () => {};

  return (
    <>
      <View style={[defaultStyles.screen, defaultStyles.p16]}>
        <View style={defaultStyles.gap24}>
          <View style={defaultStyles.gap4}>
            <TextInput label="Customer's Name" />
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
            <View style={[defaultStyles.flex1]}>
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
          data={currentOrderItems}
          keyExtractor={(item) => item.menuId}
          ItemSeparatorComponent={() => (
            <View style={defaultStyles.separator} />
          )}
          renderItem={({ item }) => {
            const { menuId, name, price, quantity } = item;

            return (
              <View style={[defaultStyles.flexRow, defaultStyles.p8]}>
                <View style={[defaultStyles.flex3]}>
                  <Text style={textStyles.text14}>{name}</Text>
                </View>
                <View
                  style={[defaultStyles.flex1, defaultStyles.flexRowCenter]}
                >
                  <View style={[defaultStyles.flex1]}>
                    <TouchableOpacity
                      style={[
                        styles.button,
                        { backgroundColor: colors.warning },
                      ]}
                      onPress={handleMinusQuantity}
                    >
                      <AntDesign name="minus" />
                    </TouchableOpacity>
                  </View>
                  <View style={[defaultStyles.flex3, defaultStyles.flexCenter]}>
                    <Text style={textStyles.text14}>{quantity}</Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: colors.success }]}
                    onPress={() => handleAddQuantity(menuId)}
                  >
                    <AntDesign name="plus" />
                  </TouchableOpacity>
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
      </View>
      <View style={[defaultStyles.footer, defaultStyles.gap24]}>
        <View style={defaultStyles.separator} />
        <View style={[defaultStyles.p8, defaultStyles.flexRowSpaceBetween]}>
          <Text style={textStyles.textBold18}>Total</Text>
          <Text style={textStyles.textBold18}>₱ {totalAmount}</Text>
        </View>
        <FilledButton text="Order" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    ...defaultStyles.flexCenter,
    height: 16,
    width: 16,
    borderRadius: 4,
  },
});
