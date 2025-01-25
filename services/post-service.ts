import { supabase } from "@/lib/supabase";
import { uploadFile } from "./image-service";

interface CreatOrUpdatePostProps {
  imageUri: string;
  status: string;
  userId: string;
}

export const createOrUpdatePost = async (post: CreatOrUpdatePostProps) => {
  try {
    //upload posts
    const fileResult = await uploadFile("postImages", post.imageUri);
    if (fileResult.success) {
      post.imageUri = fileResult.data || "";
    } else {
      return fileResult;
    }

    const value = {
      userId: post.userId,
      file: fileResult.data,
      body: post.status,
    };

    const { data, error } = await supabase
      .from("posts")
      .upsert(value)
      .select()
      .single();

    if (error) {
      console.log(error, "Error updating posts");
      return { success: false, msg: "Could not create your posts" };
    }
    return { success: true, data: data };
  } catch (error) {
    return { success: false, msg: "Could not upload image" };
  }
};
