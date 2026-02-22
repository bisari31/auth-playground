"use client";

import TodoList from "@/features/todos/components/todo-list";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import useMe from "@/features/auth/hooks/use-me";
import useTodoMutations from "@/features/todos/hooks/use-todo-mutations";

export default function TodoContainer() {
  const [input, setInput] = useState("");
  const { data: me } = useMe();
  const { create } = useTodoMutations();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    create.mutate(input, { onSuccess: () => setInput("") });
  };

  return (
    <main className="mx-auto mt-10 max-w-md p-4">
      <h1 className="mb-6 text-2xl font-bold">Todo List</h1>

      <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="할 일 입력..."
          className="flex-1 rounded border px-3 py-2"
        />
        <button
          disabled={!me}
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
        >
          추가
        </button>
      </form>

      <ErrorBoundary
        fallback={<p className="text-red-500">데이터를 불러오지 못했습니다.</p>}
      >
        <Suspense fallback={<p>로딩 중...</p>}>
          <TodoList />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
