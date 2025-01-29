import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { createComment, fetchPostDetail } from "@/services/post-service";
import PostCards from "@/components/post-cards";
import { useAuth } from "@/context/auth-context";
import { router } from "expo-router";
import Spinner from "@/components/ui/spinner";
import Feather from "@expo/vector-icons/Feather";
import { theme } from "@/constants/theme";
import CommentItem from "@/components/comment-item";
import { ShowCommentType } from "@/types";
import { supabase } from "@/lib/supabase";
import { getUserData } from "@/services/user-services";

const PostDetails = () => {
  const searchParams = useLocalSearchParams();
  const postId = parseInt(searchParams.postId as string);

  const { user } = useAuth();

  const [posts, setPosts] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [sendLoading, setSendLoading] = useState(false);

  const handlePostComment = async (payload: any) => {
    if (payload.new) {
      const newComment = { ...payload.new };
      const response = await getUserData(newComment.userId);
      newComment.user = response.success ? response.data : {};
      setPosts((prevPosts: any) => {
        return {
          ...prevPosts,
          comments: [newComment, ...prevPosts.comments],
        };
      });
    }
  };

  useEffect(() => {
    const commentChannel = supabase
      .channel("comments")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "comments",

          filter: `postId=eq.${postId}`,
        },
        handlePostComment
      )
      .subscribe();

    getPostDetails();
    return () => {
      supabase.removeChannel(commentChannel);
    };
  }, []);

  const getPostDetails = async () => {
    const response = await fetchPostDetail(postId);
    if (response.success) setPosts(response.data);
    setLoading(false);
  };

  const handleSend = async () => {
    if (!comment) {
      Alert.alert("Fill the comment");
    }

    const commentData = {
      userId: user.data.id,
      postId,
      text: comment,
    };

    setSendLoading(false);
    const response = await createComment(commentData);
    if (response.success) {
      setComment("");
    } else {
      Alert.alert("Error while creating comment");
    }
  };

  if (loading) {
    return (
      <View style={styles.spinner}>
        <Spinner />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <PostCards
          showIcons={false}
          item={posts}
          currentUser={user}
          router={router}
        />

        <View style={styles.commentContainer}>
          <TextInput
            style={styles.commentContainerText}
            placeholder="Type comment ..."
            value={comment}
            onChangeText={(comment) => {
              setComment(comment);
            }}
          />
          {sendLoading ? (
            <View style={styles.sendIcons}>
              <Spinner size="small" />
            </View>
          ) : (
            <Pressable onPress={handleSend} style={styles.sendIcons}>
              <Feather name="send" size={24} color={theme.colors.primary} />
            </Pressable>
          )}
        </View>

        {/*Comment list*/}
        <View style={{ gap: 10, paddingVertical: 10 }}>
          {posts?.comments?.map((item: ShowCommentType) => (
            <CommentItem key={item?.id.toString()} item={item} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default PostDetails;

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 10,
    gap: 20,
  },
  commentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  commentContainerText: {
    flex: 1,
    borderColor: theme.colors.text,
    borderWidth: 0.4,
    padding: 10,
    borderRadius: theme.radius.md,
  },
  sendIcons: {
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderRadius: theme.radius.xs,
    padding: 10,
  },
});
