import TodoRow from "@/features/todos/components/todo-row";
import { Todo } from "@/features/todos/type";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const todo: Todo = {
  completed: false,
  createdAt: new Date().toISOString(),
  id: 1,
  title: "123",
  user: {
    createdAt: new Date().toISOString(),
    email: "1",
  },
  userId: 1,
};

const renderTodoRow = (isMine = true) => {
  const onToggle = vi.fn();
  const onDelete = vi.fn();
  render(
    <table>
      <tbody>
        <TodoRow
          isMine={isMine}
          onDelete={onDelete}
          onToggle={onToggle}
          todo={todo}
        />
      </tbody>
    </table>,
  );
  return { onToggle, onDelete };
};

describe("TodoRow", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("내 todo인 경우 삭제 버튼이 보인다", async () => {
    renderTodoRow();
    screen.getByRole("button", { name: "삭제" });
  });
  it("삭제 버튼 클릭 시 onDelete가 호출된다", async () => {
    const user = userEvent.setup();
    const { onDelete } = renderTodoRow();
    const button = screen.getByRole("button", { name: "삭제" });
    await user.click(button);
    expect(onDelete).toBeCalledTimes(1);
  });
  it("내 todo가 아닌 경우 삭제 버튼이 안 보인다", () => {
    renderTodoRow(false);
    const button = screen.queryByRole("button", { name: "삭제" });
    expect(button).not.toBeInTheDocument();
  });
});
