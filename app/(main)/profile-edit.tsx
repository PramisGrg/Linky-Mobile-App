import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "@/layout/screen-wrapper";
import Avatar from "@/components/ui/avatar";
import BackButton from "@/components/ui/back-button";
import { hp, wp } from "@/helpers/dimensions";
import { theme } from "@/constants/theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import Input from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { UpdateProfileType } from "@/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Button from "@/components/ui/button";
import { updateUser } from "@/services/user-services";
import { useAuth } from "@/context/auth-context";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { uploadFile } from "@/services/image-service";

const ProfileEdit = () => {
  const { user, setUserData } = useAuth();
  const { control, handleSubmit } = useForm<UpdateProfileType>();
  const [loading, setLoading] = useState(false);
  const [imageUri, setImageUri] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets[0].uri) {
      setImageUri(result.assets[0].uri);
    }
  };

  const onSubmit = async (values: UpdateProfileType) => {
    const { address, bio, name, phoneNumber } = values;

    if (!name || !address || !bio || !phoneNumber) {
      Alert.alert("Please fill the form");
    }
    setLoading(true);
    //upload image
    const imageRes = await uploadFile("profiles", imageUri, true);
    if (imageRes.success) {
      console.log(imageRes.data);
      user.data.image = imageRes.data;
    } else {
      user.data.image = null;
    }

    const requiredValue = { ...values, image: user.data.image };
    const response = await updateUser(user?.data.id, requiredValue);
    setLoading(false);

    if (response.success) {
      //   //managing format of data
      const mergedUserData = {
        ...user,
        data: {
          ...user.data,
          ...response.data,
        },
      };
      setUserData(mergedUserData);
      router.push("/(main)/profile");
    }
  };

  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.backButton}>
            <BackButton />
          </View>
          <Text style={styles.title}>Edit Profile</Text>
        </View>

        <View style={styles.profileImage}>
          <Avatar
            uri={user.data.image || undefined}
            height={130}
            width={130}
            borderRadius={40}
          />
          <Pressable onPress={pickImage}>
            <View style={styles.editIcons}>
              <AntDesign name="camerao" size={24} color="black" />
            </View>
          </Pressable>
        </View>

        <View style={styles.form}>
          <Text style={styles.formText}>Please fill your profile details</Text>
          <Input
            control={control}
            placeholder="Wanna change name"
            name="name"
            icons={
              <Ionicons
                name="person-outline"
                size={24}
                color={theme.colors.text}
              />
            }
          />
          <Input
            control={control}
            placeholder="Enter phone number"
            name="phoneNumber"
            icons={
              <Feather name="phone-call" size={24} color={theme.colors.text} />
            }
          />
          <Input
            control={control}
            placeholder="Enter address"
            name="address"
            icons={
              <FontAwesome6
                name="address-card"
                size={24}
                color={theme.colors.text}
              />
            }
          />

          <Controller
            control={control}
            name="bio"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.bioInput}
                multiline={true}
                placeholder="Enter your bio"
                onBlur={onBlur}
                onChangeText={onChange}
                textAlignVertical="top"
                value={value}
              />
            )}
          />

          <Button
            loading={loading}
            onPress={handleSubmit(onSubmit)}
            title="Submit"
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default ProfileEdit;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(4),
    gap: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    flex: 0,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: hp(3),
    fontWeight: "bold",
    marginLeft: -30,
    color: theme.colors.text,
  },
  profileImage: {
    flexDirection: "row",
    justifyContent: "center",
    position: "relative",
  },
  editIcons: {
    position: "absolute",
    right: -10,
    bottom: 12,
    backgroundColor: theme.colors.darkLight,
    borderRadius: theme.radius.sm,
    padding: 6,
  },
  form: {
    flexDirection: "column",
    gap: 16,
  },
  formText: {
    fontSize: hp(1.8),
    color: theme.colors.text,
  },
  bioInput: {
    padding: hp(2),
    height: 130,
    borderColor: theme.colors.text,
    borderWidth: 0.4,
    borderRadius: theme.radius.xxl,
  },
});
