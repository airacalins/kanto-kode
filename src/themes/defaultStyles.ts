import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const defaultStyles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  screenCenter: {
    alignItems: "center",
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "center",
  },
  flex1: {
    flex: 1,
  },
  flex3: {
    flex: 3,
  },
  flexRow: {
    flexDirection: "row",
  },
  flexCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  flexRowCenter: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  flexRowSpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flexAlignItemsEnd: {
    alignItems: "flex-end",
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
  gap24: {
    gap: 24,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
  },
  p8: {
    padding: 8,
  },
  p16: {
    padding: 16,
  },
  p24: {
    padding: 24,
  },
  pl8: {
    paddingLeft: 12,
  },
  pl16: {
    paddingLeft: 16,
  },
  tableHeader: {
    backgroundColor: colors.dark,
    borderTopStartRadius: 16,
    borderTopRightRadius: 16,
    flexDirection: "row",
    height: 32,
    alignItems: "center",
  },
  footer: {
    bottom: 0,
    padding: 16,
    position: "absolute",
    width: "100%",
  },
});
