import { todosApi } from "@/features/todos/api";
import { todoQueries } from "@/features/todos/queries";
import { Todo } from "@/features/todos/type";
import useTodoMutations from "@/features/todos/hooks/use-todo-mutations";
import { act } from "@testing-library/react";
import { renderHookWithClient } from "@/test/test-utils";

const todo: Todo = {
  id: 1,
  title: "테스트 할일",
  completed: false,
  createdAt: "2026-02-23T00:00:00.000Z",
  userId: 1,
  user: { email: "test@test.com", createdAt: "2026-02-23T00:00:00.000Z" },
};

describe("useTodoMutations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("create 성공 시 todos 쿼리를 무효화한다", async () => {
    const { queryClient, result } = renderHookWithClient(useTodoMutations);
    vi.spyOn(todosApi, "create").mockResolvedValue(todo);
    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

    await act(async () => {
      await result.current.create.mutateAsync("테스트 할일");
    });
    expect(todosApi.create).toHaveBeenCalledWith("테스트 할일");
    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: todoQueries.list().queryKey,
    });
  });

  it("toggle 성공 시 todos 쿼리를 무효화한다", async () => {
    vi.spyOn(todosApi, "toggle").mockResolvedValue({
      ...todo,
      completed: true,
    });
    const { queryClient, result } = renderHookWithClient(useTodoMutations);
    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

    await act(async () => {
      await result.current.toggle.mutateAsync(1);
    });

    expect(todosApi.toggle).toHaveBeenCalledWith(1);
    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: todoQueries.list().queryKey,
    });
  });

  it("remove 성공 시 todos 쿼리를 무효화한다", async () => {
    vi.spyOn(todosApi, "delete").mockResolvedValue(todo);
    const { queryClient, result } = renderHookWithClient(useTodoMutations);
    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

    await act(async () => {
      await result.current.remove.mutateAsync(1);
    });

    expect(todosApi.delete).toHaveBeenCalledWith(1);
    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: todoQueries.list().queryKey,
    });
  });
});
