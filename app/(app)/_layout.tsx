import { useAuthStatus } from '@/hooks/useAuthStatus';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import 'react-native-reanimated';


export default function RootLayout() {
  const { isLoggedIn } = useAuthStatus();
  const [isMounted, setIsMounted] = useState(false);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {

    if (!isLoggedIn == null || !isMounted) return;

    const inAuthGroup = segments[0] === 'auth';

    if (!isLoggedIn && !inAuthGroup) {
      console.log("Redirecting to /auth/login");
      router.replace('/auth/login');
    } else if (isLoggedIn && inAuthGroup) {
      console.log("Redirecting to /(app)");
      router.replace('/(app)');
    }
  }, [segments, isLoggedIn]);
  
  if (isLoggedIn === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
        <Stack>
            <Stack.Screen name="index" options={{headerShown:false}}/>
            <Stack.Screen name="create-task" options={{
                title: "Criar tarefa"
            }} />
        </Stack>
    </>
  );
}
