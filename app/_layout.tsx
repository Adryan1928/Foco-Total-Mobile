import { Slot } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import 'react-native-reanimated';
import { DefaultTheme, ThemeProvider } from 'react-native-paper';
import { DarkTheme } from '@react-navigation/native';
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Slot />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
