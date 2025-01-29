import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import React from "react";
import ScreenWrapper from "@/layout/screen-wrapper";
import Avatar from "@/components/ui/avatar";
import BackButton from "@/components/ui/back-button";
import { hp, wp } from "@/helpers/dimensions";
import AntDesign from "@expo/vector-icons/AntDesign";
import { theme } from "@/constants/theme";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import { useAuth } from "@/context/auth-context";
import Fontisto from "@expo/vector-icons/Fontisto";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const Profile = () => {
  const { user } = useAuth();

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert(error.message);
    }
  };

  const onLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout", [
      {
        text: "Cancel",
        onPress: () => {
          console.log("Modal cancelled");
        },
        style: "cancel",
      },
      {
        text: "Ok",
        onPress: () => logout(),
        style: "destructive",
      },
    ]);
    // const { error } = await supabase.auth.signOut();
    // if (error) {
    //   Alert.alert(error.message);
    // }
  };

  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton />
          <Text style={styles.headerText}>Profile</Text>
          <Pressable onPress={onLogout}>
            <AntDesign name="logout" size={24} color={theme.colors.rose} />
          </Pressable>
        </View>

        <View style={styles.profileImage}>
          <Pressable onPress={() => router.push("/(main)/profile-edit")}>
            <Avatar
              uri={user?.data?.image || ""}
              height={130}
              width={130}
              borderRadius={40}
            />
            <View style={styles.editIcons}>
              <AntDesign name="edit" size={24} color="gray" />
            </View>
          </Pressable>
        </View>

        <View style={styles.subCaontainer}>
          <Text style={styles.nameText}>{user?.data?.name}</Text>
          <Text style={{ textAlign: "center", color: theme.colors.text }}>
            {user?.data?.bio}
          </Text>
        </View>

        {/*Information Section*/}
        <View style={styles.infoContainer}>
          <View style={styles.infoSubContainer}>
            <Fontisto name="email" size={30} color={theme.colors.text} />
            <Text style={styles.infoSubContainerText}>{user?.data?.email}</Text>
          </View>
          <View style={styles.infoSubContainer}>
            <Feather name="phone-call" size={30} color={theme.colors.text} />
            <Text style={styles.infoSubContainerText}>
              {user?.data?.phoneNumber || "Add phone number"}
            </Text>
          </View>
          <View style={styles.infoSubContainer}>
            <FontAwesome6
              name="address-card"
              size={30}
              color={theme.colors.text}
            />
            <Text style={styles.infoSubContainerText}>
              {user?.data?.address || "Add address"}
            </Text>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 30,
  },
  subCaontainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    marginHorizontal: wp(4),
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: wp(8),
    fontWeight: 700,
    color: theme.colors.text,
  },
  profileImage: {
    flexDirection: "row",
    justifyContent: "center",
    position: "relative",
  },
  editIcons: {
    position: "absolute",
    right: -6,
    bottom: 14,
    backgroundColor: theme.colors.darkLight,
    borderRadius: theme.radius.sm,
    padding: 3,
  },
  nameText: {
    textAlign: "center",
    fontSize: hp(3),
    color: theme.colors.text,
    fontWeight: 600,
  },
  infoContainer: {
    marginHorizontal: wp(4),
    gap: hp(3),
  },
  infoSubContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  infoSubContainerText: {
    color: theme.colors.text,
    fontSize: hp(2),
    fontWeight: 300,
  },
});
