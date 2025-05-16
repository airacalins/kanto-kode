import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const defaultStyles = StyleSheet.create({
  flexRowSpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
  },
});
