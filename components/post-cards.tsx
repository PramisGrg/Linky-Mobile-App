import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { GetPostsType } from "@/types";
import { Router } from "expo-router";
import { theme } from "@/constants/theme";
import Avatar from "./ui/avatar";
import moment from "moment";
import { hp } from "@/helpers/dimensions";
import { Image } from "expo-image";
import { getSupaBaseFileUri } from "@/services/image-service";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import PostDetails from "@/app/(main)/post-details";

interface PostCardsProps {
  item: GetPostsType;
  currentUser: any;
  router: Router;
  showIcons?: boolean;
}

const PostCards = ({
  item,
  currentUser,
  router,
  showIcons = true,
}: PostCardsProps) => {
  const createdAt = moment(item.created_at).format("MMM D");
  const [like, setLike] = useState(false);

  const openPostDetails = () => {
    console.log(item.id);
    router.push({
      pathname: "/post-details",
      params: { postId: item?.id },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar
          uri={item.user.image}
          height={40}
          width={40}
          borderRadius={20}
        />
        <View style={{ gap: 2 }}>
          <Text style={styles.postName}>{item.user.name}</Text>
          <Text style={{ fontSize: hp(1.5), color: theme.colors.textLight }}>
            {createdAt}
          </Text>
        </View>
      </View>

      <View>
        <Text style={{ fontSize: hp(1.8) }}>{item.body}</Text>
      </View>

      {item.file && (
        <View>
          <Image
            source={getSupaBaseFileUri(item.file)}
            transition={100}
            style={styles.postImage}
            contentFit="cover"
          />
        </View>
      )}

      {showIcons && (
        <View style={[styles.likeCommentShare]}>
          <Pressable onPress={() => setLike(true)}>
            <AntDesign
              name="like2"
              size={24}
              color={like ? theme.colors.rose : theme.colors.textLight}
            />
          </Pressable>
          <Pressable onPress={openPostDetails}>
            <FontAwesome5
              name="comment"
              size={24}
              color={theme.colors.textLight}
            />
          </Pressable>
          {/* <Pressable>
            <AntDesign
              name="sharealt"
              size={24}
              color={theme.colors.textLight}
            />
          </Pressable> */}
        </View>
      )}
    </View>
  );
};

export default PostCards;

const styles = StyleSheet.create({
  container: {
    gap: 14,
    marginVertical: 10,
    padding: 10,
    borderColor: theme.colors.gray,
    borderWidth: 0.5,
    borderRadius: theme.radius.xl,
  },
  header: {
    flexDirection: "row",
    gap: 20,
  },
  postName: {
    fontSize: hp(1.9),
    fontWeight: 600,
    color: theme.colors.text,
  },
  postImage: {
    height: hp(30),
    width: "100%",
    overflow: "hidden",
    borderRadius: theme.radius.md,
    borderCurve: "continuous",
  },
  likeCommentShare: {
    flexDirection: "row",
    gap: 20,
  },
});
