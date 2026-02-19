import { User } from "@/features/auth/type";
import { fetcher } from "@/utils/fetch";

const API = "http://localhost:4000/api/auth";

export const authApi = {
  me: (init?: RequestInit): Promise<User> =>
    fetch(`${API}/me`, {
      credentials: "include",
      ...init,
    }).then((res) => {
      if (!res.ok) {
        return null;
      }
      return res.json();
    }),

  register: (email: string, password: string): Promise<User> =>
    fetcher(`${API}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }),

  login: (email: string, password: string): Promise<User> =>
    fetcher(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }),

  logout: (): Promise<{ success: boolean }> =>
    fetcher(`${API}/logout`, {
      method: "POST",
    }),
};
