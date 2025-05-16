import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const defaultStyles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  flexRowSpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  gap8: {
    gap: 8,
  },
  gap16: {
    gap: 16,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
  },
  p16: {
    padding: 16,
  },
});
