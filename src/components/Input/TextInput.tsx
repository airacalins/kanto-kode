import React from "react";
import {
  View,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
} from "react-native";
import { Text } from "../Typography/Text";
import { colors } from "../../themes/colors";
import { defaultStyles } from "../../themes/defaultStyles";

interface TextInputProps extends RNTextInputProps {
  label: string;
}

export const TextInput: React.FC<TextInputProps> = ({ label, ...props }) => {
  return (
    <View style={defaultStyles.gap8}>
      <Text>{label}</Text>
      <RNTextInput style={styles.input} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 2,
    padding: 12,
  },
});
