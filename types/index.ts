export interface LoginType {
  email: string;
  password: string;
}

export interface RegisterType {
  name: string;
  email: string;
  password: string;
}

export interface UpdateProfileType {
  phoneNumber: string;
  address: string;
  bio: string;
}

// export interface UserType {
//   address: string;
//   bio: string;
//   email: string;
//   id: string;
//   image?: null;
//   name: string;
//   phoneNumber: string;
// }

type Comment = {
  count: number;
};
export interface GetPostsType {
  body: string;
  created_at: string;
  comments: Comment[];
  file: string;
  id: number;
  user: {
    email: string;
    id: string;
    name: string;
    image: string;
  };
  userId: string;
}

export interface CommentType {
  postId: number;
  text: string;
  userId: string;
}

export interface ShowCommentType {
  created_at: string;
  id: number;
  postId: number;
  text: string;
  user: {
    id: string;
    image: string;
    name: string;
  };
  userId: string;
}
