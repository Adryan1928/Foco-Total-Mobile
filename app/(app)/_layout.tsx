import { useAuthStatus } from '@/hooks/useAuthStatus';
import { clearLoggedIn } from '@/storage/auth';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import 'react-native-reanimated';
import { IconButton } from 'react-native-paper';


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

  async function handleLogout() {
    await clearLoggedIn();
    router.replace('/auth/login');
  }
  
  if (isLoggedIn === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
        <Stack screenOptions={{
            headerRight: () => (
                isLoggedIn && (
                  <View style={{ justifyContent: 'center', alignItems: 'center', height: 32,}}>
                    <IconButton
                        onPress={handleLogout}
                        icon="logout"
                        iconColor='#d03737'
                        size={24}
                        style={{ backgroundColor: "white" }}
                    />
                  </View>
                )
            )
        }}>
            <Stack.Screen name="index" options={{
              title: "Home"
            }}/>
            <Stack.Screen name="create-task" options={{
                title: "Criar tarefa"
            }} />
            <Stack.Screen name="task/[id]/index" options={{
                title: "Tarefa"
            }} />
        </Stack>
    </>
  );
}
