import { Todo } from "@/features/todos/type";
import { fetcher } from "@/utils/fetch";

const API = "http://localhost:4000/api/todos";

export const todosApi = {
  getList: (init?: RequestInit): Promise<Todo[]> => fetcher(API, init),

  getOne: (id: number): Promise<Todo> => fetcher(`${API}/${id}`),

  create: (title: string): Promise<Todo> =>
    fetcher(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    }),

  toggle: (id: number): Promise<Todo> =>
    fetcher(`${API}/${id}`, { method: "PATCH" }),
  delete: (id: number): Promise<Todo> =>
    fetcher(`${API}/${id}`, { method: "DELETE" }),
};
