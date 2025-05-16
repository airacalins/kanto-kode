import React from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useMenus } from "../../api/queries/useMenus";
import { textStyles } from "../../themes/textStyles";
import { colors } from "../../themes/colors";
import { AntDesign } from "@expo/vector-icons";
import { defaultStyles } from "../../themes/defaultStyles";
import { IconButton } from "../../components/buttons/IconButton";

export const MenusScreen: React.FC = () => {
  const { data: menus, isLoading, error } = useMenus();

  if (isLoading) return <Text>Loading menu...</Text>;

  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <SafeAreaView>
      <View style={{ padding: 24 }}>
        <Text style={textStyles.textBold18}>Menus</Text>
      </View>
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
    </SafeAreaView>
  );
};
