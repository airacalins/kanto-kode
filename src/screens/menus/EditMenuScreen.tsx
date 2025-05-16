import React, { useEffect } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  Alert,
} from "react-native";
import { defaultStyles } from "../../themes/defaultStyles";
import { FilledButton } from "../../components/Button/FilledButton";
import { TextInput } from "../../components/Input/TextInput";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMenuStore } from "../../store/useMenuStore";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MenuNavigatorParamList } from "../../navigation/MenuNavigator";
import { colors } from "../../themes/colors";

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

type TEditMenuSchema = Yup.InferType<typeof addMenuSchema>;

export const EditMenuScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<MenuNavigatorParamList, "EditMenu">) => {
  const { getMenu, editMenu, deleteMenu } = useMenuStore();
  const menuId = route.params.id;
  const menu = getMenu(menuId);

  if (!menu) {
    return <Text>Menu not found</Text>;
  }

  const defaultValues: TEditMenuSchema = {
    name: menu.name,
    price: menu.price,
    availableOrderQty: menu.availableOrderQty,
  };

  const handleSave = (formValues: TEditMenuSchema) => {
    try {
      editMenu({ id: menu.id, ...formValues });
      Alert.alert(`${formValues.name} updated successfully`);
    } catch (error) {
      Alert.alert(`Error in updating menu: \n ${error}}`);
    }
    navigation.goBack();
  };

  const handleDeleteMenu = () => {
    try {
      deleteMenu(menuId);
      Alert.alert(`${menu.name} deleted successfully`);
    } catch (error) {
      Alert.alert(`Error in deleting menu: \n ${error}}`);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TEditMenuSchema>({
    resolver: yupResolver(addMenuSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <FilledButton
          text="Delete"
          size="small"
          color={colors.danger}
          onPress={() => {
            Alert.alert(
              "Confirm Delete",
              "Are you sure you want to delete this menu?",
              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Delete",
                  style: "destructive",
                  onPress: () => {
                    handleDeleteMenu();
                    navigation.goBack();
                  },
                },
              ]
            );
          }}
        />
      ),
    });
  }, [navigation, deleteMenu, route.params.id]);

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
                onChangeText={field.onChange}
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
                label="Quantity"
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
          text="Save"
          disabled={!isValid}
          onPress={handleSubmit(handleSave, (errors) =>
            console.log(JSON.stringify(errors, null, 2))
          )}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
