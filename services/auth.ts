import request from "@/utils/request";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface User extends LoginPayload {
  id: string;
  name: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export const login = (payload: LoginPayload) =>
  request.post<LoginResponse>("/auth/login/", payload);