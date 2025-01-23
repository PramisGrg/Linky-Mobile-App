import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

type User = any;

type AuthContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  setAuth: (authUser: User) => void;
  setUserData: (userData: User) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const setAuth = (authUser: User) => {
    setUser(authUser);
  };

  const setUserData = (userData: User) => {
    setUser({ ...userData });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, setAuth, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
