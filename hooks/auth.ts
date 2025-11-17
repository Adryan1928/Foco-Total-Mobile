import { login, LoginPayload } from "@/services/auth";
import { setAuthToken } from "@/utils/authToken";
import { queryClient } from "@/utils/QueryClient";
import { useMutation } from "@tanstack/react-query";

export const QueryKeys = {
    user: ['user'] as const,
}

export const useLoginMutation = () =>useMutation({
  mutationKey: QueryKeys.user,
  mutationFn: async (payload: LoginPayload) => {
    return (await login(payload)).data;
  },
  onSuccess: (value) => {
     setAuthToken(value.token);
    queryClient.invalidateQueries({ queryKey: QueryKeys.user });
  },
});