// hooks/useAuthStatus.ts
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useAuthStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  // Carrega o estado inicial
  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem("@user:isLoggedIn");
      setIsLoggedIn(stored === "true");
    })();
  }, []);

  // Atualiza o AsyncStorage sempre que mudar
  const updateLoginStatus = async (value: boolean) => {
    await AsyncStorage.setItem("@user:isLoggedIn", value ? "true" : "false");
    setIsLoggedIn(value);
  };

  return { isLoggedIn, setIsLoggedIn: updateLoginStatus };
}
