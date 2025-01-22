import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { theme } from "@/constants/theme";

type SpinnerProps = {
  size?: "small" | "large" | number;
  color?: string;
};

const Spinner = ({
  size = "large",
  color = theme.colors.primary,
}: SpinnerProps) => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default Spinner;
