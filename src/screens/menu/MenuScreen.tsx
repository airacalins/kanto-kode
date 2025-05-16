import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useMenus } from "../../api/queries/useMenus";

export const MenuScreen: React.FC = () => {
  const { data: menus, isLoading, isError, error } = useMenus();

  if (isLoading) return <Text>Loading menu...</Text>;

  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View>
      <FlatList
        data={menus}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>₱{item.price}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  menuItem: {
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 4,
  },
  description: {
    fontStyle: "italic",
    color: "#555",
  },
});
