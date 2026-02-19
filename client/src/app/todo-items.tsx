"use client";

import { todosApi } from "@/features/todos/api";
import { todoQueries } from "@/features/todos/queries";
import { authQueries } from "@/features/auth/queries";
import {
  useMutation,
  useSuspenseQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export default function TodoItems() {
  const queryClient = useQueryClient();
  const { data: todos } = useSuspenseQuery(todoQueries.list());
  const { data: me } = useQuery(authQueries.me());

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
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b-2 border-gray-800 text-sm">
          <th className="py-2 px-3 text-left w-20">완료</th>
          <th className="py-2 px-3 text-left">제목</th>
          <th className="py-2 px-3 text-left w-32">작성자</th>
          <th className="py-2 px-3 text-left w-28">작성일</th>
          <th className="py-2 px-3 w-16"></th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => {
          const isMine = me?.id === todo.userId;

          return (
            <tr
              key={todo.id}
              className={`border-b border-gray-200 ${
                !isMine ? "opacity-50 bg-gray-700" : ""
              }`}
            >
              <td className="py-2 px-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  disabled={!isMine}
                  onChange={() => toggleMutation.mutate(todo.id)}
                  className="cursor-pointer disabled:cursor-default"
                />
              </td>
              <td
                className={`py-2 px-3 ${
                  todo.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {todo.title}
              </td>
              <td className="py-2 px-3 text-sm text-gray-500">
                {todo.user.email}
              </td>
              <td className="py-2 px-3 text-sm text-gray-500">
                {new Date(todo.createdAt).toLocaleDateString()}
              </td>
              <td className="py-2 px-3">
                {isMine && (
                  <button
                    onClick={() => deleteMutation.mutate(todo.id)}
                    className="text-sm text-red-400 hover:text-red-600"
                  >
                    삭제
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
