import { Slot } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import 'react-native-reanimated';
import { DefaultTheme, ThemeProvider } from 'react-native-paper';
import { DarkTheme } from '@react-navigation/native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { queryClient } from '@/utils/QueryClient';
import { QueryClientProvider } from '@tanstack/react-query';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Slot />
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
