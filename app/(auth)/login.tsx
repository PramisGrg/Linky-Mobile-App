import { View, Text } from "react-native";
import React from "react";
import ScreenWrapper from "@/layout/screen-wrapper";
import BackButton from "@/components/ui/back-button";
import { router } from "expo-router";

const Login = () => {
  return (
    <ScreenWrapper bg="white">
      <BackButton />
      <Text>Login</Text>
    </ScreenWrapper>
  );
};

export default Login;
