import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { ReactNode } from "react";
import { theme } from "@/constants/theme";
import { hp } from "@/helpers/dimensions";
import { Control, Controller } from "react-hook-form";

interface inputfieldProps {
  placeholder: string;
  icons: ReactNode;
  secure?: boolean;
  name: string;
  control: Control<any>;
}

const Input = ({
  placeholder,
  icons,
  secure = false,
  name,
  control,
}: inputfieldProps) => {
  return (
    <View style={styles.inputContainer}>
      <Text>{icons}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <TextInput
            autoCapitalize={"none"}
            secureTextEntry={secure}
            placeholder={placeholder}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    height: hp(7),
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderColor: theme.colors.text,
    borderWidth: 0.4,
    borderRadius: theme.radius.xxl,
  },
});
