import React, { useEffect, useMemo } from "react";
import { Alert, FlatList, Pressable, View } from "react-native";
import { useMenus } from "../../api/queries/useMenus";
import { textStyles } from "../../themes/textStyles";
import { colors } from "../../themes/colors";
import { AntDesign } from "@expo/vector-icons";
import { defaultStyles } from "../../themes/defaultStyles";
import { IconButton } from "../../components/Button/IconButton";
import { Text } from "../../components/Typography/Text";
import { useMenuStore } from "../../store/useMenuStore";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MenuNavigatorParamList } from "../../navigation/MenuNavigator";
import { useOrderStore } from "../../store/useOrderStore";
import { Menu } from "../../types/Menu";

export const MenusScreen = ({
  navigation,
}: NativeStackScreenProps<MenuNavigatorParamList, "Menus">) => {
  const { menus, setMenus, updateMenuQty } = useMenuStore();
  const { addItemToCurrentOrder } = useOrderStore();
  const { data, isLoading, error } = useMenus();

  useEffect(() => {
    if (data && data.length > 0) {
      setMenus(data);
    }
  }, [data, setMenus]);

  const sortedMenus = useMemo(
    () => [...menus].sort((a, b) => a.name.localeCompare(b.name)),
    [menus]
  );

  const handleAddToOrder = (menu: Menu) => {
    try {
      addItemToCurrentOrder(menu);
      updateMenuQty(menu.id, 1);

      Alert.alert(`${menu.name} is added to the order`);
    } catch (error) {
      Alert.alert(`Error in adding menu: \n ${error}}`);
    }
  };

  if (isLoading)
    return (
      <View style={defaultStyles.screenCenter}>
        <Text>Loading menu...</Text>
      </View>
    );

  if (error)
    return (
      <View style={defaultStyles.screenCenter}>
        <Text>Error: {error.message}</Text>
      </View>
    );

  if (!menus.length)
    return (
      <View style={defaultStyles.screenCenter}>
        <Text>No data</Text>
      </View>
    );

  return (
    <View style={[defaultStyles.screen, defaultStyles.p16]}>
      <FlatList
        data={sortedMenus}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={defaultStyles.h16} />}
        renderItem={({ item }) => {
          const { id, name, price, availableOrderQty } = item;

          return (
            <Pressable
              style={[defaultStyles.flexRow, defaultStyles.card]}
              onPress={() => navigation.navigate("EditMenu", { id })}
            >
              <View style={{ flex: 1 }}>
                <Text
                  color={availableOrderQty <= 0 ? colors.grey : undefined}
                  style={textStyles.text18}
                >
                  {name} ({availableOrderQty})
                </Text>

                <Text
                  color={availableOrderQty <= 0 ? colors.grey : undefined}
                  style={textStyles.textBold14}
                >
                  ₱ {price}
                </Text>
              </View>
              {availableOrderQty > 0 && (
                <IconButton
                  icon={
                    <AntDesign
                      name="plus"
                      size={16}
                      color={colors.white}
                      onPress={() => handleAddToOrder(item)}
                    />
                  }
                />
              )}
            </Pressable>
          );
        }}
      />
    </View>
  );
};
