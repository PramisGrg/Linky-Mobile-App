import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "@/layout/screen-wrapper";
import BackButton from "@/components/ui/back-button";
import { hp } from "@/helpers/dimensions";
import { theme } from "@/constants/theme";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Fontisto from "@expo/vector-icons/Fontisto";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useForm } from "react-hook-form";
import { RegisterType } from "@/types";
import { router } from "expo-router";
import { supabase } from "@/lib/supabase";

const Register = () => {
  const { control, handleSubmit, reset } = useForm<RegisterType>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: RegisterType) => {
    setLoading(true);

    const {
      data: { session },
      error,
    } = await supabase.auth.signUp(values);

    setLoading(false);
    if (error) Alert.alert(error.message);
    if (!session) Alert.alert("Error!", error?.message);
    reset();
  };

  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        <BackButton />

        <View>
          <Text style={styles.welcomeText}>Let's</Text>
          <Text style={styles.welcomeText}>Get Started 🚀,</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputContainerText}>
            Please register to continue
          </Text>
          <Input
            icons={
              <Ionicons
                name="person-outline"
                size={24}
                color={theme.colors.textLight}
              />
            }
            name="name"
            control={control}
            placeholder="Enter a name"
          />
          <Input
            icons={
              <Fontisto name="email" size={24} color={theme.colors.textLight} />
            }
            name="email"
            control={control}
            placeholder="Enter an emai"
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

        <Button
          loading={loading}
          onPress={handleSubmit(onSubmit)}
          title="Register"
        />

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Already have an account ?</Text>
          <Pressable onPress={() => router.push("/(auth)/login")}>
            <Text style={styles.registerButtonText}>Login</Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Register;

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
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  registerText: {
    fontSize: hp(1.7),
    fontWeight: 600,
    color: theme.colors.textLight,
  },
  registerButtonText: {
    color: theme.colors.primary,
    fontWeight: 700,
  },
});
