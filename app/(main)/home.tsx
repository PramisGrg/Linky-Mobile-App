import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "@/layout/screen-wrapper";
import AntDesign from "@expo/vector-icons/AntDesign";
import { wp } from "@/helpers/dimensions";
import { theme } from "@/constants/theme";
import { router } from "expo-router";
import { supabase } from "@/lib/supabase";
import Avatar from "@/components/ui/avatar";
import { useAuth } from "@/context/auth-context";
import { fetchPosts } from "@/services/post-service";
import PostCards from "@/components/post-cards";
import { GetPostsType } from "@/types";
import { getUserData } from "@/services/user-services";
import Spinner from "@/components/ui/spinner";

//for fetching posts
var limit = 0;
const Home = () => {
  const { user } = useAuth();

  const [posts, setPosts] = useState<GetPostsType[]>([]);

  const handlePostEvent = async (payload: any) => {
    if (payload.eventType == "INSERT" && payload.new.id) {
      const newPost = { ...payload.new };
      const response = await getUserData(newPost.userId);
      newPost.user = response.success ? response.data : {};
      setPosts((prevPost) => [newPost, ...prevPost]);
    }
  };

  useEffect(() => {
    const postChannel = supabase
      .channel("posts")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        handlePostEvent
      )
      .subscribe();

    return () => {
      supabase.removeChannel(postChannel);
    };
  }, []);

  const getPosts = async () => {
    limit = limit + 4;

    console.log("fetching posts", limit);
    const response = await fetchPosts(limit);
    if (response.success) {
      setPosts(response.data || []);
    }
  };

  const onLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <ScreenWrapper bg="white">
      <View style={styles.header}>
        <Text style={styles.headerText}>Linky</Text>
        <View style={styles.icons}>
          <Pressable onPress={() => router.push("/(main)/notification")}>
            <AntDesign name="hearto" size={26} color={theme.colors.text} />
          </Pressable>
          <Pressable onPress={() => router.push("/(main)/post")}>
            <AntDesign name="plussquareo" size={26} color={theme.colors.text} />
          </Pressable>
          <Pressable onPress={() => router.push("/(main)/profile")}>
            <Avatar
              uri={user?.data?.image || ""}
              height={40}
              width={40}
              borderRadius={20}
            />
          </Pressable>
        </View>
      </View>

      <FlatList
        data={posts}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listStyles}
        renderItem={({ item }) => (
          <PostCards item={item} currentUser={user} router={router} />
        )}
        onEndReached={() => {
          console.log("end is reached");
          getPosts();
        }}
        ListFooterComponent={
          <View style={{ marginVertical: posts.length == 0 ? 200 : 30 }}>
            <Spinner />
          </View>
        }
      />
      <Button onPress={onLogout} title="logout" />
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: wp(5),
    alignItems: "center",
  },
  headerText: {
    fontSize: wp(6.5),
    fontWeight: 700,
    color: theme.colors.text,
  },
  icons: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },
  listStyles: {
    marginHorizontal: wp(4),
    paddingVertical: 20,
  },
});
