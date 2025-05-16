import React from "react";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { defaultStyles } from "../themes/defaultStyles";
import { FilledButton } from "../components/Button/FilledButton";
import { TextInput } from "../components/Input/TextInput";

export const AddMenuScreen: React.FC = () => {
  return (
    <KeyboardAvoidingView style={defaultStyles.screen}>
      <ScrollView style={defaultStyles.p16}>
        <View style={defaultStyles.gap16}>
          <TextInput label="Name" />
          <TextInput label="Description" />
          <TextInput label="Price" keyboardType="numeric" />
          <TextInput label="Quantity" keyboardType="numeric" />
        </View>
      </ScrollView>
      <View
        style={{ position: "absolute", bottom: 0, width: "100%", padding: 16 }}
      >
        <FilledButton text={"Save"} />
      </View>
    </KeyboardAvoidingView>
  );
};
