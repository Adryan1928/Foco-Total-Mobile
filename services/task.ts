import request from "@/utils/request";

export interface TaskPayload {
  title: string;
  description?: string;
  status: string;
  dueDate: string;
}

export interface Task extends TaskPayload {
  id: string;
}


export const createTask = (task: TaskPayload) => 
  request.post<Task>("/tasks/", task);

export const getTask = (id: string) => 
  request.get<Task>(`/tasks/${id}/`);

export const updateTask = (task: TaskPayload & { id: string }) => 
  request.patch<Task>(`/tasks/${task.id}/`, task);

export const deleteTask = (id: string) => 
  request.delete<void>(`/tasks/${id}/`);

export const getTasks = () => 
  request.get<Task[]>("/tasks/");
  