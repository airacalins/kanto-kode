import React, { useEffect } from "react";
import { FlatList, View } from "react-native";
import { useMenus } from "../api/queries/useMenus";
import { textStyles } from "../themes/textStyles";
import { colors } from "../themes/colors";
import { AntDesign } from "@expo/vector-icons";
import { defaultStyles } from "../themes/defaultStyles";
import { IconButton } from "../components/Button/IconButton";
import { Text } from "../components/Typography/Text";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MenuNavigatorParamList } from "../navigation/MenuNavigator";
import { useMenuStore } from "../store/useMenuStore";

type MenusScreenProps = NativeStackScreenProps<MenuNavigatorParamList, "Menus">;

export const MenusScreen = () => {
  const { menus, setMenus } = useMenuStore();
  const { data, isLoading, error } = useMenus();

  useEffect(() => {
    if (data && data.length > 0) {
      setMenus(data);
    }
  }, [data, setMenus]);

  const sortedMenus = [...menus].sort((a, b) => a.name.localeCompare(b.name));

  if (isLoading) return <Text>Loading menu...</Text>;

  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={defaultStyles.screen}>
      <FlatList
        data={sortedMenus}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
        renderItem={({ item }) => (
          <View style={{ padding: 24, gap: 8 }}>
            <Text style={textStyles.text18}>{item.name}</Text>
            <View style={defaultStyles.flexRowSpaceBetween}>
              <Text style={textStyles.textBold14}>₱ {item.price}</Text>
              <IconButton
                icon={<AntDesign name="plus" size={16} color={colors.white} />}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};
