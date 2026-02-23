import { todosApi } from "@/features/todos/api";
import { todoQueries } from "@/features/todos/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useTodoMutations() {
  const queryClient = useQueryClient();

  const invalidateTodos = () => {
    queryClient.invalidateQueries({ queryKey: todoQueries.list().queryKey });
  };

  const create = useMutation({
    mutationFn: (title: string) => todosApi.create(title),
    onSuccess: invalidateTodos,
  });

  const toggle = useMutation({
    mutationFn: (id: number) => todosApi.toggle(id),
    onSuccess: invalidateTodos,
  });

  const remove = useMutation({
    mutationFn: (id: number) => todosApi.delete(id),
    onSuccess: invalidateTodos,
  });

  return {
    create,
    toggle,
    remove,
  };
}
