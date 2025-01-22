import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ScreenWrapper from "@/layout/screen-wrapper";
import BackButton from "@/components/ui/back-button";
import { hp } from "@/helpers/dimensions";
import { theme } from "@/constants/theme";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Fontisto from "@expo/vector-icons/Fontisto";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useForm } from "react-hook-form";

const Login = () => {
  const { control, handleSubmit, reset } = useForm();

  const onSubmit = (values) => {
    console.log(values, "I am clicked");
  };
  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        <BackButton />

        <View>
          <Text style={styles.welcomeText}>Hey</Text>
          <Text style={styles.welcomeText}>Welcome Back 👋,</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputContainerText}>
            Please Login to continue
          </Text>
          <Input
            icons={
              <Fontisto name="email" size={24} color={theme.colors.textLight} />
            }
            name="email"
            control={control}
            placeholder="Enter a emai"
          />
          <Input
            icons={
              <AntDesign name="lock" size={24} color={theme.colors.textLight} />
            }
            secure={true}
            name="password"
            control={control}
            placeholder="Enter a password"
          />
        </View>

        <Button onPress={handleSubmit(onSubmit)} title="Login" />
      </View>
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    gap: hp(6),
  },
  welcomeText: {
    fontSize: hp(4),
    color: theme.colors.text,
    fontWeight: 700,
  },
  inputContainerText: {
    fontSize: hp(1.7),
    fontWeight: 600,
    color: theme.colors.textLight,
  },
  inputContainer: {
    gap: 30,
  },
});
