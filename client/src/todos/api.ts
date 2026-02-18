const API = "http://localhost:4000/api/todos";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
};

export const todosApi = {
  getList: (): Promise<Todo[]> =>
    fetch(API).then((res) => res.json()),

  getOne: (id: number): Promise<Todo> =>
    fetch(`${API}/${id}`).then((res) => res.json()),

  create: (title: string): Promise<Todo> =>
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    }).then((res) => res.json()),

  toggle: (id: number): Promise<Todo> =>
    fetch(`${API}/${id}`, { method: "PATCH" }).then((res) => res.json()),

  delete: (id: number): Promise<Todo> =>
    fetch(`${API}/${id}`, { method: "DELETE" }).then((res) => res.json()),
};
