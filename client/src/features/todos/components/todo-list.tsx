"use client";

import { todoQueries } from "@/features/todos/queries";
import { authQueries } from "@/features/auth/queries";
import { useSuspenseQuery, useQuery } from "@tanstack/react-query";
import useTodoMutations from "@/features/todos/hooks/use-todo-mutations";
import TodoRow from "@/features/todos/components/todo-row";
import { isOwner } from "@/features/todos/utils";

export default function TodoList() {
  const { data: todos } = useSuspenseQuery(todoQueries.list());
  const { data: me } = useQuery(authQueries.me());
  const { toggle, remove } = useTodoMutations();

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b-2 border-gray-800 text-sm">
          <th className="w-20 px-3 py-2 text-left">완료</th>
          <th className="px-3 py-2 text-left">제목</th>
          <th className="w-32 px-3 py-2 text-left">작성자</th>
          <th className="w-28 px-3 py-2 text-left">작성일</th>
          <th className="w-16 px-3 py-2"></th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => {
          return (
            <TodoRow
              isMine={isOwner(me?.id, todo.userId)}
              onDelete={() => remove.mutate(todo.id)}
              onToggle={() => toggle.mutate(todo.id)}
              todo={todo}
              key={todo.id}
            />
          );
        })}
      </tbody>
    </table>
  );
}
