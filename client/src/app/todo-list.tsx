"use client";

import { todosApi } from "@/features/todos/api";
import { todoQueries } from "@/features/todos/queries";
import TodoItems from "@/app/todo-items";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { authQueries } from "@/features/auth/queries";

export default function TodoList() {
  const queryClient = useQueryClient();
  const [input, setInput] = useState("");

  const { data: me } = useQuery(authQueries.me());

  const createMutation = useMutation({
    mutationFn: todosApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoQueries.list().queryKey });
      setInput("");
    },
  });

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    try {
      createMutation.mutate(input);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="max-w-md mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6">Todo List</h1>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="할 일 입력..."
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          disabled={!me}
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          추가
        </button>
      </form>

      <ErrorBoundary
        fallback={<p className="text-red-500">데이터를 불러오지 못했습니다.</p>}
      >
        <Suspense fallback={<p>로딩 중...</p>}>
          <TodoItems />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
