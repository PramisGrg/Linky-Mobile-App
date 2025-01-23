import { View, Text, Button, Alert } from "react-native";
import React from "react";
import ScreenWrapper from "@/layout/screen-wrapper";
import { useAuth } from "@/context/auth-context";
import { supabase } from "@/lib/supabase";

const Home = () => {
  const onLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <ScreenWrapper bg="white">
      <Text>Home</Text>
      <Button onPress={onLogout} title="logout" />
    </ScreenWrapper>
  );
};

export default Home;
