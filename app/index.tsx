import ScreenWrapper from "@/layout/screen-wrapper";
import { Image, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { hp, wp } from "@/helpers/dimensions";
import { theme } from "@/constants/theme";
import Button from "@/components/ui/button";

export default function Index() {
  return (
    <ScreenWrapper bg="white">
      <StatusBar style="dark" />
      <View style={style.container}>
        <Image
          style={style.welcomeImage}
          resizeMode="contain"
          source={require("../assets/images/linky.png")}
        />

        <View style={{ gap: 20 }}>
          <Text style={style.title}>Linky</Text>
          <Text style={style.subTitle}>
            Where every thought finds a home and every image tells a story
          </Text>
        </View>

        <View style={style.footer}>
          <Button
            onPress={() => {
              console.log("I am Pressed");
            }}
            title="Getting Started"
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  welcomeImage: {
    height: hp(30),
    width: wp(100),
    alignSelf: "center",
  },
  title: {
    fontSize: hp(4),
    color: theme.colors.text,
    textAlign: "center",
    fontWeight: 700,
  },
  subTitle: {
    textAlign: "center",
    paddingHorizontal: wp(8),
    fontSize: hp(1.8),
    color: theme.colors.text,
    fontWeight: 500,
  },
  footer: {
    width: wp(80),
  },
});
