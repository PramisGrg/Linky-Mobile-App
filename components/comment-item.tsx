import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ShowCommentType } from "@/types";
import { theme } from "@/constants/theme";
import Avatar from "./ui/avatar";
import moment from "moment";
import { hp } from "@/helpers/dimensions";
import { useAuth } from "@/context/auth-context";

const CommentItem = ({ item }: { item: ShowCommentType }) => {
  const { user } = useAuth();
  const createdAt = moment(item.created_at).format("MMM DD");
  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      <Avatar uri={item.user.image} height={40} width={40} borderRadius={20} />
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={{ fontWeight: 500, fontSize: hp(1.8) }}>
            {item.user.name}
          </Text>
          <Text style={{ fontWeight: 300, color: theme.colors.textLight }}>
            {createdAt}
          </Text>
        </View>
        <Text style={{ fontSize: hp(1.8) }}>{item.text}</Text>
      </View>
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  container: {
    borderColor: theme.colors.textLight,
    borderWidth: 0.2,
    padding: 10,
    flex: 1,
    borderRadius: theme.radius.xl,
    gap: 5,
    backgroundColor: theme.colors.gray,
  },
  subContainer: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
});
