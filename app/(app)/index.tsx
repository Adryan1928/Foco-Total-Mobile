import { StyleSheet, View, ScrollView } from 'react-native';
import { Card, ProgressBar, Text, IconButton, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { Task } from '@/components/task';
import { Task as TaskType } from '@/services/task';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetTasks } from '@/hooks/tasks';

export default function HomeScreen() {
  const router = useRouter();
  const theme = useTheme();

  const today = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
  const { data: tasks } = useGetTasks();

  if (tasks == undefined) {
    return null;
  }


  const todayTasks = tasks?.filter(t => new Date(t.dueDate).toDateString() === new Date().toDateString());
  const doneTasks = tasks?.filter(t => t.status).length;
  const progress = doneTasks / tasks.length;

  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView
            contentContainerStyle={styles.container}
        >
            <Card style={styles.headerCard}>
                <Card.Content>
                <Text variant="titleMedium">Hoje é {today}</Text>
                <Text variant="bodyMedium" style={styles.subtitle}>
                    {doneTasks} de {tasks.length} tarefas concluídas
                </Text>
                <ProgressBar progress={progress} style={styles.progressBar} />
                </Card.Content>
            </Card>
            <View style={styles.taskList}>
                <Text variant='titleMedium'>Tarefas</Text>
                <View style={styles.containerTasks}>
                    {tasks.map(task => (
                        <Task
                            key={task.id}
                            {...task}
                        />
                    ))}
                </View>
            </View>

            
        </ScrollView>
        <View style={[styles.containerCreateTask, {backgroundColor: theme.colors.primary}]}>
            <IconButton
                icon="plus"
                size={32}
                onPress={() => router.push('/(app)/create-task')}
                iconColor='white'
            />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    minHeight: '100%',
  },
  headerCard: {
    marginBottom: 16,
    paddingVertical: 8,
  },
  subtitle: {
    marginTop: 4,
    color: '#666',
  },
  progressBar: {
    marginTop: 8,
    height: 6,
    borderRadius: 4,
  },
  taskList: {
    marginTop: 16,
    gap: 12,
  },
  containerTasks: {
    gap: 12,
    padding: 8,
  },
  containerCreateTask: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    backgroundColor: '#2680b2',
    borderRadius: 32,
  },
});
