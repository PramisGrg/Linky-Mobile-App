import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";
import { supabase } from "@/lib/supabase";

export const uploadFile = async (
  folderName: string,
  fileUri: string,
  isImage = true
) => {
  try {
    let fileName = getFilePath(folderName, isImage);
    const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const imageData = decode(fileBase64);

    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(fileName, imageData, {
        contentType: isImage ? "image/*" : "video/*",
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.log("There is error while uploading image");
    }

    console.log(data, "This is data");
    return { success: true, data: data?.path };
  } catch (error) {
    console.log(error);
    return { success: false, msg: "Could not upload file" };
  }
};

const getFilePath = (folderName: string, isImage: boolean) => {
  return `/${folderName}/${new Date().getTime()}${isImage ? ".png" : ".mp4"}`;
};

export const getSupaBaseFileUri = (fileName: string) => {
  if (fileName) {
    return `https://aowaaheuovghsrpbhkqk.supabase.co/storage/v1/object/public/uploads/${fileName}`;
  } else {
    return null;
  }
};
