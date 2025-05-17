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
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { MenuNavigatorParamList } from "../../navigation/MenuNavigator";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabParamList } from "../../navigation/TabNavigator";

const addOrderSchema = Yup.object({
  customerName: Yup.string().required("Customer's name is required"),
});

type TAddOrderSchema = Yup.InferType<typeof addOrderSchema>;

const DEFAULT_VALUES = {
  customerName: "",
};

export const AddOrderScreen = () => {
  const navigation =
    useNavigation<
      CompositeNavigationProp<
        BottomTabNavigationProp<TabParamList, "MenusTab">,
        NativeStackNavigationProp<MenuNavigatorParamList>
      >
    >();

  const { getMenu, updateMenuQty } = useMenuStore();
  const {
    currentOrderItems,
    addOrderToHistory,
    addItemQuantityToCurrentOrder,
    subtractItemQuantityFromCurrentOrder,
    removeItemFromCurrentOrder,
  } = useOrderStore();

  const totalAmount = currentOrderItems.reduce(
    (acc: number, item: OrderedItem) => acc + item.price * item.quantity,
    0
  );

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<TAddOrderSchema>({
    resolver: yupResolver(addOrderSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onChange",
  });

  const handleAddQuantity = (menuId: string) => {
    const menu = getMenu(menuId);

    if (!menu) {
      Alert.alert("Cannot find a menu");
      return;
    }

    try {
      addItemQuantityToCurrentOrder(menu);
      updateMenuQty(menuId, -1);
    } catch (error) {
      Alert.alert(`Error updatibg quantity: \n ${error}}`);
    }
  };

  const handleMinusQuantity = (menuId: string) => {
    const menu = getMenu(menuId);

    if (!menu) {
      Alert.alert("Cannot find a menu");
      return;
    }

    const currentItem = currentOrderItems.find(
      (item) => item.menuId === menuId
    );

    if (!currentItem) return;

    if (currentItem.quantity <= 1) {
      Alert.alert(
        "Remove item?",
        "Are you sure you want to remove this item from the order?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Remove",
            style: "destructive",
            onPress: () => {
              try {
                removeItemFromCurrentOrder(menu.id);
                updateMenuQty(menuId, currentItem.quantity);
              } catch (error) {
                Alert.alert(`Error updating quantity:\n${error}`);
              }
            },
          },
        ]
      );
    } else {
      try {
        subtractItemQuantityFromCurrentOrder(menu);
        updateMenuQty(menuId, 1);
      } catch (error) {
        Alert.alert(`Error updating quantity:\n${error}`);
      }
    }
  };

  const handleSubmitOrder = (formValues: TAddOrderSchema) => {
    try {
      addOrderToHistory({ ...formValues, items: currentOrderItems });
      reset();
      Alert.alert(`Order created successfully`);
    } catch (error) {
      Alert.alert(`Error in adding order: \n ${error}`);
    }
  };

  if (!currentOrderItems.length)
    return (
      <View style={[defaultStyles.screenCenter, defaultStyles.gap8]}>
        <Text>No orders yet.</Text>
        <FilledButton
          size="small"
          text="Add Order"
          onPress={() => navigation.navigate("MenusTab", { screen: "Menus" })}
        />
      </View>
    );

  return (
    <>
      <View style={[defaultStyles.screen, defaultStyles.p16]}>
        <View style={defaultStyles.gap24}>
          <View style={defaultStyles.gap4}>
            <Controller
              control={control}
              name="customerName"
              render={({ field }) => (
                <TextInput
                  label="Name"
                  errorMessage={errors?.customerName?.message}
                  placeholder="Enter your customer's name"
                  {...field}
                  onChangeText={(text) => field.onChange(text)}
                />
              )}
            />
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
            const menu = getMenu(menuId);
            const soldoutMenu = (menu?.availableOrderQty || 0) <= 0;

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
                        {
                          backgroundColor:
                            quantity <= 0 ? colors.grey : colors.warning,
                        },
                      ]}
                      disabled={quantity <= 0}
                      onPress={() => handleMinusQuantity(menuId)}
                    >
                      <AntDesign
                        name="minus"
                        color={quantity <= 0 ? colors.white : colors.dark}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={[defaultStyles.flex3, defaultStyles.flexCenter]}>
                    <Text style={textStyles.text14}>{quantity}</Text>
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      soldoutMenu
                        ? defaultStyles.bgGrey
                        : defaultStyles.bgSuccess,
                    ]}
                    disabled={soldoutMenu}
                    onPress={() => handleAddQuantity(menuId)}
                  >
                    <AntDesign
                      name="plus"
                      color={soldoutMenu ? colors.white : colors.dark}
                    />
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
        <FilledButton
          disabled={!currentOrderItems.length || !isValid}
          text="Order"
          onPress={handleSubmit(handleSubmitOrder)}
        />
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
