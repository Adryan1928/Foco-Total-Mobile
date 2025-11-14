import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_KEY = '@user:isLoggedIn';

export async function setLoggedIn(value: boolean) {
  try {
    await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(value));
  } catch (error) {
    console.error('Erro ao salvar login:', error);
  }
}

export async function getLoggedIn(): Promise<boolean> {
  try {
    const value = await AsyncStorage.getItem(AUTH_KEY);
    return value ? JSON.parse(value) : false;
  } catch (error) {
    console.error('Erro ao ler login:', error);
    return false;
  }
}

export async function clearLoggedIn() {
  try {
    await AsyncStorage.removeItem(AUTH_KEY);
  } catch (error) {
    console.error('Erro ao limpar login:', error);
  }
}
