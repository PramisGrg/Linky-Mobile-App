import { AuthProvider, useAuth } from "@/context/auth-context";
import { supabase } from "@/lib/supabase";
import { getUserData } from "@/services/user-services";
import { router, Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}

function MainLayout() {
  const { setAuth, setUserData } = useAuth();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        //set auth and move to home screen
        setAuth(session?.user);
        updateUserData(session?.user);
        router.replace("/(main)/home");
      } else {
        //set auth null and move to index screen
        setAuth(null);
        router.replace("/");
      }
    });
  }, []);

  const updateUserData = async (user: any) => {
    const response = await getUserData(user?.id);
    setUserData(response);
  };

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
