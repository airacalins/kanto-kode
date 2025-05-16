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
import { textStyles } from "../../themes/textStyles";

interface TextInputProps extends RNTextInputProps {
  label: string;
  errorMessage?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  errorMessage,
  ...props
}) => {
  return (
    <View style={defaultStyles.gap8}>
      <Text>{label}</Text>
      <View style={defaultStyles.gap4}>
        <RNTextInput style={styles.input} {...props} />
        {errorMessage && (
          <View style={defaultStyles.pl8}>
            <Text color={colors.danger} style={textStyles.text12}>
              {errorMessage}
            </Text>
          </View>
        )}
      </View>
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
