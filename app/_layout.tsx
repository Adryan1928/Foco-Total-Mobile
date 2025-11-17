import { Slot } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import 'react-native-reanimated';
import { DefaultTheme } from 'react-native-paper'
import { SafeAreaProvider } from "react-native-safe-area-context";
import { queryClient } from '@/utils/QueryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <PaperProvider theme={DefaultTheme}>
          <Slot />
        </PaperProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
