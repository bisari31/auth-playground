import { queryOptions } from "@tanstack/react-query";
import { todosApi } from "@/features/todos/api";

const todoKeys = {
  all: () => ["todos"] as const,
  detail: (id: number) => ["todos", id] as const,
};

export const todoQueries = {
  list: (init?: RequestInit) =>
    queryOptions({
      queryKey: todoKeys.all(),
      queryFn: () => todosApi.getList(init),
    }),
  detail: (id: number) =>
    queryOptions({
      queryKey: todoKeys.detail(id),
      queryFn: () => todosApi.getOne(id),
    }),
};
