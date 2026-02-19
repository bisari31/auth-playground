import { queryOptions } from "@tanstack/react-query";
import { authApi } from "@/features/auth/api";

const authKeys = {
  me: () => ["me"] as const,
};

export const authQueries = {
  me: (init?: RequestInit) =>
    queryOptions({
      queryKey: authKeys.me(),
      queryFn: () => authApi.me(init),
    }),
};
