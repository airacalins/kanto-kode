import React from "react";
import { Pressable, PressableProps, StyleSheet } from "react-native";
import { colors } from "../../themes/colors";
import { Text } from "../typography/Text";

interface FilledButtonProps extends PressableProps {
  text: string;
}

export const FilledButton: React.FC<FilledButtonProps> = ({
  text,
  ...props
}) => {
  return (
    <Pressable style={styles.button} {...props}>
      <Text color={colors.white}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.dark,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 30,
  },
});
