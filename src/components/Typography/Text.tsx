import React from "react";
import { Text as RNText, TextProps as RNTextProps } from "react-native";

interface TextProps extends RNTextProps {
  color?: string;
}

export const Text: React.FC<TextProps> = ({
  color,
  children,
  style,
  ...props
}) => {
  return (
    <RNText style={[style, { color }]} {...props}>
      {children}
    </RNText>
  );
};
