import { StyleSheet, View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import TextInputField from '@/components/form/TextInputField';
import * as Yup from 'yup';
import DatePickerField from '@/components/form/DatePickerField';
import CheckBoxField from '@/components/form/CheckBoxField';
import { Button } from 'react-native-paper';


const Scheme = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  description: Yup.string(),
  dueDate: Yup.date().required('A data de vencimento é obrigatória'),
  status: Yup.boolean(),
});

export default function CreateTaskScreen() {
  const router = useRouter();

  const { control, handleSubmit } = useForm({
    mode: "onSubmit",
    defaultValues: {
      title: '',
      description: '',
      dueDate: new Date(),
      status: false,
    }
  });

  const handleCreateTask = (data: any) => {
    console.log("Creating task with data:", data);
    router.back();
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        contentContainerStyle={styles.container}
      >
        <View style={styles.form}>
          <TextInputField
            name="title"
            label="Título"
            placeholder="Digite o título da tarefa"
            control={control}
          />
          <TextInputField
            name="description"
            label="Descrição"
            placeholder="Digite a descrição da tarefa"
            control={control}
            multiline
            numberOfLines={4}
          />
          <DatePickerField
            name="dueDate"
            label="Data de Vencimento"
            placeholder="Selecione a data de vencimento"
            control={control}
          />
          <CheckBoxField
            name="status"
            label="Concluída"
            control={control}
          />
        </View>

        <Button onPress={handleSubmit(handleCreateTask)} mode="contained">
          Criar Tarefa
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    minHeight: '100%',
    gap: 32,
  },
  form: {
    gap: 24,
  },
});
