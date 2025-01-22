import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type WrapperProps = {
  children: React.ReactNode;
  bg: string;
};

const ScreenWrapper = ({ children, bg }: WrapperProps) => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 5 : 30;

  return (
    <View style={{ flex: 1, backgroundColor: bg, paddingTop }}>{children}</View>
  );
};

export default ScreenWrapper;
