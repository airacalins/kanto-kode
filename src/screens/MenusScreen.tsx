import React from "react";
import { FlatList, View } from "react-native";
import { useMenus } from "../api/queries/useMenus";
import { textStyles } from "../themes/textStyles";
import { colors } from "../themes/colors";
import { AntDesign } from "@expo/vector-icons";
import { defaultStyles } from "../themes/defaultStyles";
import { IconButton } from "../components/buttons/IconButton";
import { FilledButton } from "../components/buttons/FilledButton";
import { Text } from "../components/typography/Text";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MenuNavigatorParamList } from "../navigation/MenuNavigator";

type MenusScreenProps = NativeStackScreenProps<MenuNavigatorParamList, "Menus">;

export const MenusScreen = ({ navigation }: MenusScreenProps) => {
  const { data: menus, isLoading, error } = useMenus();

  if (isLoading) return <Text>Loading menu...</Text>;

  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={{ backgroundColor: colors.background }}>
      <FlatList
        data={menus}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
        renderItem={({ item }) => (
          <View style={{ padding: 24, gap: 8 }}>
            <Text style={textStyles.text18}>{item.name}</Text>
            <Text style={textStyles.text14}>{item.description}</Text>
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
