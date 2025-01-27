import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "@/layout/screen-wrapper";
import BackButton from "@/components/ui/back-button";
import { hp, wp } from "@/helpers/dimensions";
import { useAuth } from "@/context/auth-context";
import Avatar from "@/components/ui/avatar";
import { theme } from "@/constants/theme";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import Button from "@/components/ui/button";
import { createOrUpdatePost } from "@/services/post-service";
import { router } from "expo-router";

const Post = () => {
  const { user } = useAuth();
  const [status, setStatus] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async () => {
    if (!status || !imageUri) {
      Alert.alert("Incomplete", "Plese fill the fields");
    }

    const value = {
      status,
      imageUri,
      userId: user?.data?.id,
    };
    setLoading(true);

    const response = await createOrUpdatePost(value);
    if (response.success) {
      setImageUri(null);
      setStatus("");
      router.push("/(main)/home");
    } else {
      Alert.alert("Posting", response?.msg);
    }
    setLoading(false);
  };

  return (
    <ScreenWrapper bg="white">
      <ScrollView contentContainerStyle={{ gap: 20 }} style={styles.container}>
        <View style={styles.header}>
          <BackButton />
          <Text style={styles.headerText}>Create Post</Text>
        </View>

        <View style={styles.infoContainer}>
          <Avatar
            uri={user?.data?.image || ""}
            height={60}
            width={60}
            borderRadius={30}
          />
          <Text
            style={{
              fontSize: hp(2),
              fontWeight: 700,
              color: theme.colors.text,
            }}
          >
            {user?.data?.name}
          </Text>
        </View>

        <View>
          <TextInput
            style={styles.statusInput}
            placeholder="What's is on your mind ? "
            multiline
            value={status}
            textAlignVertical="top"
            onChangeText={(text: string) => setStatus(text)}
          />
        </View>

        {imageUri ? (
          <View style={styles.imagePreviewContainer}>
            <Pressable
              style={styles.deleteButton}
              onPress={() => setImageUri(null)}
            >
              <AntDesign name="delete" size={24} color="white" />
            </Pressable>
            <Image source={{ uri: imageUri }} style={styles.imagePreview} />
          </View>
        ) : null}

        <View style={styles.postContainer}>
          <Text>Add to your post</Text>
          <Pressable onPress={pickImage}>
            <Entypo name="image" size={24} color={theme.colors.text} />
          </Pressable>
        </View>

        <Button loading={loading} onPress={handleSubmit} title="Post" />
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(4),
    gap: 30,
  },
  header: {
    flexDirection: "row",
  },
  headerText: {
    fontSize: hp(3),
    fontWeight: 700,
    marginLeft: wp(18),
  },
  infoContainer: {
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
  },
  statusInput: {
    height: 150,
    borderColor: theme.colors.text,
    borderWidth: 0.4,
    borderRadius: theme.radius.md,
    padding: 14,
  },
  postContainer: {
    flexDirection: "row",
    borderColor: theme.colors.text,
    borderWidth: 0.4,
    borderRadius: theme.radius.md,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
  },
  imagePreviewContainer: {
    borderWidth: 0.4,
    borderRadius: theme.radius.md,
    overflow: "hidden",
    position: "relative",
  },
  deleteButton: {
    position: "absolute",
    backgroundColor: theme.colors.rose,
    padding: 8,
    borderRadius: theme.radius.sm,
    zIndex: 999,
    right: 10,
    top: 10,
  },
  imagePreview: {
    width: "100%",
    height: hp(45),
  },
});
