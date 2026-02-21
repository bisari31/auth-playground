import { User } from "@/features/auth/type";
import { api } from "@/utils/fetch";

export const authApi = {
  me: (init?: RequestInit): Promise<User | null> =>
    api("/auth/me", init).catch(() => null),

  register: (email: string, password: string): Promise<User> =>
    api("/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }),

  login: (email: string, password: string): Promise<User & { token: string }> =>
    api("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }),

  logout: (): Promise<{ success: boolean }> =>
    api("/auth/logout", {
      method: "POST",
    }),
};
