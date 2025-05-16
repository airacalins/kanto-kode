import React from "react";
import { Pressable, PressableProps, StyleSheet } from "react-native";
import { colors } from "../../themes/colors";
import { Text } from "../Typography/Text";
import { textStyles } from "../../themes/textStyles";

interface FilledButtonProps extends PressableProps {
  text: string;
  size?: "small" | "large";
}

export const FilledButton: React.FC<FilledButtonProps> = ({
  text,
  size = "large",
  ...props
}) => {
  const isLarge = size === "large";

  return (
    <Pressable
      style={[styles.button, { height: isLarge ? 48 : 32 }]}
      {...props}
    >
      <Text
        style={isLarge ? textStyles.text16 : textStyles.text12}
        color={colors.white}
      >
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.dark,
    paddingHorizontal: 16,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
