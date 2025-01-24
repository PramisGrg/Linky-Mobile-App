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
  name: string;
  phoneNumber: string;
  address: string;
  bio: string;
  image?: null;
}

export interface UserType {
  address: string;
  bio: string;
  email: string;
  id: string;
  image?: null;
  name: string;
  phoneNumber: string;
}
