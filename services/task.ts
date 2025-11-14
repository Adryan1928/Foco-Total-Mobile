import request from "@/utils/request";

export interface TaskPayload {
  title: string;
  description?: string;
  status: boolean;
  dueDate: Date;
}

export interface Task extends TaskPayload {
  id: string;
}


export const createTask = (task: TaskPayload) => 
  request.post<Task>("/tasks/", task);

export const getTask = (id: string) => 
  request.get<Task>(`/tasks/${id}/`);

export const updateTask = (id: string, task: TaskPayload) => 
  request.patch<Task>(`/tasks/${id}/`, task);

export const deleteTask = (id: string) => 
  request.delete<void>(`/tasks/${id}/`);

export const getTasks = () => 
  request.get<Task[]>("/tasks/");
  