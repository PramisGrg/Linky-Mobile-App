import { supabase } from "@/lib/supabase";
import { uploadFile } from "./image-service";
import { CommentType, GetPostsType } from "@/types";

interface CreatOrUpdatePostProps {
  imageUri: string | null;
  status: string;
  userId: string;
}

export const createOrUpdatePost = async (post: CreatOrUpdatePostProps) => {
  try {
    //upload posts
    if (!post.imageUri) {
      return { success: false, msg: "Image URI is required to upload." };
    }
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

export const fetchPosts = async (limit = 10) => {
  try {
    //upload posts
    const { data, error } = await supabase
      .from("posts")
      .select(
        `*, 
       user:  users (id, email, name, image),
       comments(count)`
      )
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      return { success: false, msg: "Could not fetch the posts" };
    }

    return { success: true, data: data as GetPostsType[] };
  } catch (error) {
    return { success: false, msg: "Could not upload image" };
  }
};

export const fetchPostDetail = async (postId: number) => {
  try {
    //upload posts
    const { data, error } = await supabase
      .from("posts")
      .select(
        `*, 
         user:  users (id, email, name, image),
         comments (*, user: users(id, name)) `
      )
      .eq("id", postId)
      .order("created_at", { ascending: false })
      .single();

    if (error) {
      return { success: false, msg: "Could not fetch the posts details" };
    }

    return { success: true, data: data as GetPostsType[] };
  } catch (error) {
    return { success: false, msg: "Could not fetch the posts details" };
  }
};

export const createComment = async (comment: CommentType) => {
  try {
    const { data, error } = await supabase
      .from("comments")
      .insert(comment)
      .select()
      .single();

    if (error) {
      return { success: false, msg: "Could not create comment" };
    }

    return { success: true, data: data };
  } catch (error) {
    return { success: false, msg: "Could not create comment" };
  }
};
