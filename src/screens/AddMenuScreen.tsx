import React from "react";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { defaultStyles } from "../themes/defaultStyles";
import { FilledButton } from "../components/Button/FilledButton";
import { TextInput } from "../components/Input/TextInput";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { Menu } from "../types/Menu";
import { yupResolver } from "@hookform/resolvers/yup";

const addMenuSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .min(0, "Price must be at least 0")
    .required("Price is required"),
  availableOrderQty: Yup.number()
    .typeError("Available order quantity must be a number")
    .min(1, "Must be at least 1")
    .required("Quantity is required"),
});

export type TAddMenuSchema = Yup.InferType<typeof addMenuSchema>;

export const AddMenuScreen: React.FC = () => {
  const defaultValues: TAddMenuSchema = {
    name: "",
    price: 0,
    availableOrderQty: 0,
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TAddMenuSchema>({
    resolver: yupResolver(addMenuSchema),
    defaultValues,
    mode: "onChange",
  });

  const handleSave = (formValues: TAddMenuSchema) => {
    console.log(JSON.stringify(formValues, null, 2));
  };

  return (
    <KeyboardAvoidingView style={defaultStyles.screen}>
      <ScrollView style={defaultStyles.p16}>
        <View style={defaultStyles.gap16}>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <TextInput
                label="Name"
                errorMessage={errors?.name?.message}
                placeholder="ex: Sinigang"
                {...field}
                onChangeText={(text) => field.onChange(text)}
                onBlur={field.onBlur}
              />
            )}
          />
          <Controller
            control={control}
            name="price"
            render={({ field }) => (
              <TextInput
                label="Price"
                errorMessage={errors?.price?.message}
                placeholder="100"
                keyboardType="numeric"
                value={String(field.value)}
                onChangeText={(text) => field.onChange(Number(text))}
                onBlur={field.onBlur}
              />
            )}
          />
          <Controller
            control={control}
            name="availableOrderQty"
            render={({ field }) => (
              <TextInput
                label="Quanity"
                errorMessage={errors?.availableOrderQty?.message}
                placeholder="100"
                keyboardType="numeric"
                value={String(field.value)}
                onChangeText={(text) => field.onChange(Number(text))}
                onBlur={field.onBlur}
              />
            )}
          />
        </View>
      </ScrollView>
      <View style={defaultStyles.footer}>
        <FilledButton text={"Save"} onPress={handleSubmit(handleSave)} />
      </View>
    </KeyboardAvoidingView>
  );
};
