import TextInputField from '@/components/form/TextInputField';
import { set, useForm } from 'react-hook-form';
import { StyleSheet, View, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button, Text } from 'react-native-paper';
import * as Yup from 'yup';
import { LoginPayload } from '@/services/auth';
import { useRouter } from 'expo-router';
import { setLoggedIn } from '@/storage/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLoginMutation } from '@/hooks/auth';

const schema = Yup.object().shape({
  email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email inválido")
    .email("Email inválido")
    .max(254)
    .required("Obrigatório")
    .trim(),
  password: Yup.string().min(6, "Mínimo de 6 caracteres").required("Obrigatório"),
});

export default function LoginScreen() {
  const router = useRouter();


  const { control, handleSubmit, setError } = useForm<LoginPayload>({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const loginMutation = useLoginMutation();

  const handleLogin = async (data: LoginPayload) => {
    loginMutation.mutate({
      ...data
    },
    {
      onSuccess: () => {
        setLoggedIn(true);
        router.replace('/(app)');
      },
      onError: (error) => {
        setError('password', { type: 'manual', message: 'Email ou senha inválidos' });
      }
    });
  };

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
    >
      <SafeAreaView
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.inner}>
            <View style={styles.titleContainer}>
              <Text variant="headlineMedium" style={styles.title}>
                Bem-vindo de volta 👋
              </Text>
              <Text variant="bodyMedium" style={styles.subtitle}>
                Faça login para continuar
              </Text>
            </View>
            <View style={styles.formContainer}>
              <TextInputField
                name="email"
                control={control}
                label="Email"
              />
              <TextInputField
                name="password"
                control={control}
                label="Senha"
                secureTextEntry
              />
              <Button mode="contained" onPress={handleSubmit(handleLogin)} style={styles.button} disabled={loginMutation.isPending}>
                {loginMutation.isPending ? 'Entrando...' : 'Entrar'}
              </Button>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
