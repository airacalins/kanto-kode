import React from "react";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { colors } from "../../themes/colors";
import { Text } from "../Typography/Text";
import { textStyles } from "../../themes/textStyles";

interface FilledButtonProps extends TouchableOpacityProps {
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
    <TouchableOpacity {...props}>
      <View
        style={[
          styles.button,
          {
            height: isLarge ? 48 : 32,
            backgroundColor: props.disabled ? colors.grey : colors.dark,
          },
        ]}
      >
        <Text
          style={isLarge ? textStyles.text16 : textStyles.text12}
          color={colors.white}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
