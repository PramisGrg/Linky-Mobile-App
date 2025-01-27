import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Image } from "expo-image";

const Avatar = ({
  uri,
  height,
  width,
  borderRadius,
}: {
  uri?: string;
  height: number;
  width: number;
  borderRadius: number;
}) => {
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  const getFileUri = (uri: string) => {
    if (uri.startsWith("file")) {
      return uri;
    } else {
      return `https://aowaaheuovghsrpbhkqk.supabase.co/storage/v1/object/public/uploads/${uri}`;
    }
  };

  return (
    <Image
      style={{
        height,
        width,
        borderRadius,
      }}
      source={
        uri
          ? { uri: getFileUri(uri) }
          : require("../../assets/images/avatar.jpeg")
      }
      contentFit="cover"
      transition={1000}
      placeholder={{ blurhash }}
    />
  );
};

export default Avatar;
