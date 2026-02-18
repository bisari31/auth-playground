"use client";

import { todosApi } from "@/todos/api";
import { todoQueries } from "@/todos/queries";
import {
  useMutation,
  useSuspenseQuery,
  useQueryClient,
} from "@tanstack/react-query";

export default function TodoItems() {
  const queryClient = useQueryClient();
  const { data: todos } = useSuspenseQuery(todoQueries.list());

  const toggleMutation = useMutation({
    mutationFn: todosApi.toggle,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: todoQueries.list().queryKey }),
  });

  const deleteMutation = useMutation({
    mutationFn: todosApi.delete,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: todoQueries.list().queryKey }),
  });

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center justify-between border rounded px-3 py-2"
        >
          <span
            onClick={() => toggleMutation.mutate(todo.id)}
            className={`cursor-pointer flex-1 ${
              todo.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {todo.title}
          </span>
          <button
            onClick={() => deleteMutation.mutate(todo.id)}
            className="text-red-400 ml-2"
          >
            삭제
          </button>
        </li>
      ))}
    </ul>
  );
}
