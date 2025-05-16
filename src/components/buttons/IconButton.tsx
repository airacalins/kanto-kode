import React from "react";
import { Pressable } from "react-native";
import { colors } from "../../themes/colors";

interface IconButtonProps {
  icon: React.ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = ({ icon }) => {
  return (
    <Pressable
      style={{
        height: 32,
        width: 32,
        backgroundColor: colors.success,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 32,
      }}
    >
      {icon}
    </Pressable>
  );
};
