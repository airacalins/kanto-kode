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
  gap4: {
    gap: 4,
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
  pl8: {
    paddingLeft: 12,
  },
  p16: {
    padding: 16,
  },
  footer: {
    bottom: 0,
    padding: 16,
    position: "absolute",
    width: "100%",
  },
});
