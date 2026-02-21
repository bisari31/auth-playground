import { Todo } from "@/features/todos/type";
import { api } from "@/utils/fetch";

export const todosApi = {
  getList: (init?: RequestInit): Promise<Todo[]> => api("/todos", init),

  getOne: (id: number): Promise<Todo> => api(`/todos/${id}`),

  create: (title: string): Promise<Todo> =>
    api("/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    }),

  toggle: (id: number): Promise<Todo> =>
    api(`/todos/${id}`, { method: "PATCH" }),
  delete: (id: number): Promise<Todo> =>
    api(`/todos/${id}`, { method: "DELETE" }),
};
