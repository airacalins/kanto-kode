import React from "react";
import { Alert, KeyboardAvoidingView, ScrollView, View } from "react-native";
import { defaultStyles } from "../../themes/defaultStyles";
import { FilledButton } from "../../components/Button/FilledButton";
import { TextInput } from "../../components/Input/TextInput";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMenuStore } from "../../store/useMenuStore";
import { v4 as uuidv4 } from "uuid";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MenuNavigatorParamList } from "../../navigation/MenuNavigator";

const addMenuSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .min(0, "Price must be at least 0")
    .required("Price is required"),
  availableOrderQty: Yup.number()
    .typeError("Available order quantity must be a number")
    .min(0, "Must be at least 0")
    .required("Quantity is required"),
});

type TAddMenuSchema = Yup.InferType<typeof addMenuSchema>;

const DEFAULT_VALUES = {
  name: "",
  price: 0,
  availableOrderQty: 0,
};

export const AddMenuScreen = ({
  navigation,
}: NativeStackScreenProps<MenuNavigatorParamList, "AddMenu">) => {
  const { addMenu } = useMenuStore();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TAddMenuSchema>({
    resolver: yupResolver(addMenuSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onChange",
  });

  const handleSave = (formValues: TAddMenuSchema) => {
    try {
      addMenu({ ...formValues });
      Alert.alert(`${formValues.name} created successfully`);
    } catch (error) {
      Alert.alert(`Error in adding menu: \n ${error}}`);
    }
    navigation.goBack();
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
              />
            )}
          />
        </View>
      </ScrollView>
      <View style={defaultStyles.footer}>
        <FilledButton
          text={"Save"}
          disabled={!isValid}
          onPress={handleSubmit(handleSave, (errors) =>
            console.log(JSON.stringify(errors, null, 2))
          )}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
