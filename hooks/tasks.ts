import { createTask, deleteTask, getTask, getTasks, updateTask } from "@/services/task";
import { queryClient } from "@/utils/QueryClient";
import { useMutation, useQuery } from "@tanstack/react-query";

const QueryKeys = {
  all: ['tasks'] as const,
  item: (id: string) => [...QueryKeys.all, id] as const,
}


export const useGetTasks = () => useQuery({
  queryKey: QueryKeys.all,
  queryFn: async () => (await getTasks()).data,
});

export const useGetTask = (id: string) => useQuery({
  queryKey: QueryKeys.item(id),
  queryFn: async () => (await getTask(id)).data,
});

export const useUpdateTaskMutation = () => useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: QueryKeys.all });
    },
});

export const useDeleteTaskMutation = () => useMutation({
    mutationFn: async (id: string) => {
        return (await deleteTask(id)).data;
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: QueryKeys.all });
    },
});

export const useCreateTaskMutation = () => useMutation({
    mutationFn: createTask,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: QueryKeys.all });
    },
});