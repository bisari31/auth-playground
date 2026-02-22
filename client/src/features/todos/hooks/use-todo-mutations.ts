import { todosApi } from "@/features/todos/api";
import { todoQueries } from "@/features/todos/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useTodoMutations() {
  const queryClient = useQueryClient();

  const invalidateTodos = () => {
    queryClient.invalidateQueries({ queryKey: todoQueries.list().queryKey });
  };

  const create = useMutation({
    mutationFn: todosApi.create,
    onSuccess: invalidateTodos,
  });

  const toggle = useMutation({
    mutationFn: todosApi.toggle,
    onSuccess: invalidateTodos,
  });

  const remove = useMutation({
    mutationFn: todosApi.delete,
    onSuccess: invalidateTodos,
  });

  return {
    create,
    toggle,
    remove,
  };
}
