import { Text, Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { theme } from "@/constants/theme";
import { hp } from "@/helpers/dimensions";
import Spinner from "./spinner";

const Button = ({
  hasShadow = true,
  onPress = () => {},
  title = "",
  loading = false,
}) => {
  const shadowStyle = {
    shadowColor: theme.colors.dark,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  };

  if (loading) return <Spinner />;

  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, hasShadow && shadowStyle]}
    >
      <Text style={[styles.text]}>{title}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    height: hp(6),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.radius.xl,
  },
  text: {
    fontSize: hp(2.5),
    color: "white",
  },
});
