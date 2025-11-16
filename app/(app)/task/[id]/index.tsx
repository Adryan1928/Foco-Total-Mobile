import { 
  ScrollView, 
  StyleSheet, 
  View, 
  TouchableWithoutFeedback, 
  Keyboard 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import TextInputField from "@/components/form/TextInputField";
import { useForm } from "react-hook-form";
import { TaskPayload } from "@/services/task";
import { IconButton, Text, useTheme, Divider, Surface } from "react-native-paper";
import DatePickerField from "@/components/form/DatePickerField";
import CheckBoxField from "@/components/form/CheckBoxField";

export default function EditViewTaskScreen () {
  const router = useRouter();
  const theme = useTheme();

  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const { id } = useLocalSearchParams<{ id: string }>();

  const task = { 
    id: "1", 
    title: 'Estudar React Native', 
    status: true, 
    dueDate: new Date(), 
    description: 'asdbashdvashdvasdvsagdvasgdvasvsagdvsagdvashgdvas' 
  };

  const { control } = useForm<TaskPayload>({
    mode: "onSubmit",
    defaultValues: { ...task }
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeArea}>
        <Stack.Screen 
          options={{ 
            title: mode === 'view' ? "Tarefa" : "Editar tarefa",
          }} 
        />

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          
          <View style={styles.header}>
            <TextInputField
              name="title"
              control={control}
              label=""
              editable={mode === 'edit'}
              style={[
                styles.titleInput,
                mode === 'view' && styles.titleReadOnly
              ]}
            />
          </View>

          <Surface style={styles.card} elevation={2}>
            <View style={styles.row}>
              <Text style={[styles.label, {color: theme.colors.primary}]}>
                Data de vencimento
              </Text>
              <DatePickerField
                name="dueDate"
                control={control}
                editable={mode === 'edit'}
                style={mode === 'view' && styles.fieldReadOnly}
              />
            </View>

            <Divider style={{ marginVertical: 12 }} />

            <View style={styles.row}>
              <Text style={[styles.label, {color: theme.colors.primary}]}>
                Concluída
              </Text>
              <CheckBoxField
                name="status"
                control={control}
                disabled={mode === 'view'}
              />
            </View>

            <Divider style={{ marginVertical: 12 }} />

            <View>
              <Text style={[styles.label, {color: theme.colors.primary}]}>
                Descrição
              </Text>
              <TextInputField
                name="description"
                control={control}
                multiline
                editable={mode === 'edit'}
                style={[
                  styles.descriptionInput,
                  mode === 'view' && styles.fieldReadOnly
                ]}
              />
            </View>
          </Surface>
        </ScrollView>

        <View style={[styles.fab, { backgroundColor: theme.colors.primary }]}>
          <IconButton
            icon={mode === 'view' ? "note-edit" : "check"}
            size={28}
            onPress={() => {
              setMode(mode === 'view' ? 'edit' : 'view');
              Keyboard.dismiss();
            }}
            iconColor="white"
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 120,
  },
  header: {
    marginBottom: 24,
  },
  titleInput: {
    fontSize: 28,
    fontWeight: "700",
    paddingHorizontal: 0,
  },
  titleReadOnly: {
    backgroundColor: "transparent",
  },
  card: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#fafafa",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  fieldReadOnly: {
    backgroundColor: "transparent",
  },
  descriptionInput: {
    marginTop: 8,
    minHeight: 80,
    textAlignVertical: "top",
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    borderRadius: 40,
  },
});
