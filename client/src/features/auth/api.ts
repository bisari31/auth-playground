import { User } from "@/features/auth/type";
import { SERVER_URL, api } from "@/shared/utils/fetch";

export const authApi = {
  me: (init?: RequestInit): Promise<User | null> =>
    api("/auth/me", init).catch(() => null),

  register: (email: string, password: string): Promise<User> =>
    api("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  login: (email: string, password: string): Promise<User> =>
    api("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  logout: (): Promise<{ success: boolean }> =>
    api("/auth/logout", {
      method: "POST",
    }),
  refresh: () =>
    fetch(`${SERVER_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    }),
};
