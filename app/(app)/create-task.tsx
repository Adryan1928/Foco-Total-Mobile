import { StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { clearLoggedIn } from '@/storage/auth';

export default function CreateTaskScreen() {
  const router = useRouter();

  async function handleLogout() {
    await clearLoggedIn();
    router.replace('/auth/login');
    }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.inner}>
          
            <Text variant="headlineMedium" style={styles.title}>
                Foco Total
            </Text>
            <Button mode="outlined" onPress={handleLogout} style={styles.button}>
              Sair
            </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  titleContainer: {
    marginBottom: 48,
  },
  title: {
    fontWeight: '600',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: '#6b6b6b',
    marginTop: 4,
  },
  formContainer: {
    gap: 24,
  },
  button: {
    marginTop: 16,
    borderRadius: 8,
    paddingVertical: 8,
  },
});
