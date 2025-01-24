import { supabase } from "@/lib/supabase";
import { UpdateProfileType } from "@/types";

export const getUserData = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("id", userId)
      .single();
    if (error) {
      return { success: false, msg: error.message };
    }
    return { success: true, data };
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, msg: err.message };
    }
    return { success: false, msg: "An unknown error occurred" };
  }
};

export const updateUser = async (userId: string, data: UpdateProfileType) => {
  try {
    const { error } = await supabase
      .from("users")
      .update(data)
      .eq("id", userId);
    if (error) {
      return { success: false, msg: error.message };
    }
    return { success: true, data };
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, msg: err.message };
    }
    return { success: false, msg: "An unknown error occurred" };
  }
};
