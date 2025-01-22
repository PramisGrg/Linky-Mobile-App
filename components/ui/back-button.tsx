import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { StyleSheet } from "react-native";
import React from "react";
import { theme } from "@/constants/theme";

const BackButton = () => {
  return (
    <Ionicons
      onPress={() => router.back()}
      style={styles.backButton}
      name="chevron-back"
      size={28}
      color="black"
    />
  );
};

export default BackButton;

const styles = StyleSheet.create({
  backButton: {
    alignSelf: "flex-start",
    padding: 4,
    borderRadius: theme.radius.sm,
    backgroundColor: "rgba(0,0,0, 0.07)",
  },
});
