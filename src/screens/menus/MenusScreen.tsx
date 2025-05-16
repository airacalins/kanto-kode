import React, { useEffect, useMemo } from "react";
import { FlatList, Pressable, View } from "react-native";
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
import { FilledButton } from "../../components/Button/FilledButton";

export const MenusScreen = ({
  navigation,
}: NativeStackScreenProps<MenuNavigatorParamList, "Menus">) => {
  const { menus, setMenus } = useMenuStore();
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
    <View style={defaultStyles.screen}>
      <FlatList
        data={sortedMenus}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
        renderItem={({ item }) => {
          const { id, name, price, availableOrderQty } = item;

          return (
            <View style={[defaultStyles.flexRow, { padding: 24, gap: 8 }]}>
              <Pressable
                style={{ flex: 1 }}
                onPress={() => navigation.navigate("EditMenu", { id })}
              >
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
              </Pressable>
              {availableOrderQty > 0 && (
                <IconButton
                  icon={
                    <AntDesign name="plus" size={16} color={colors.white} />
                  }
                />
              )}
            </View>
          );
        }}
      />
    </View>
  );
};
