import { Todo } from "@/features/todos/type";
import { formatDate } from "@/shared/utils/date";

interface TodoRow {
  todo: Todo;
  isMine: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

export default function TodoRow({ todo, isMine, onDelete, onToggle }: TodoRow) {
  return (
    <tr
      key={todo.id}
      className={`border-b border-gray-200 ${
        !isMine ? "bg-gray-700 opacity-50" : ""
      }`}
    >
      <td className="px-3 py-2">
        <input
          type="checkbox"
          checked={todo.completed}
          disabled={!isMine}
          onChange={onToggle}
          className="cursor-pointer disabled:cursor-default"
        />
      </td>
      <td
        className={`px-3 py-2 ${
          todo.completed ? "text-gray-400 line-through" : ""
        }`}
      >
        {todo.title}
      </td>
      <td className="px-3 py-2 text-sm text-gray-500">{todo.user.email}</td>
      <td className="px-3 py-2 text-sm text-gray-500">
        {formatDate(todo.createdAt)}
      </td>
      <td className="px-3 py-2">
        {isMine && (
          <button
            onClick={onDelete}
            className="text-sm text-red-400 hover:text-red-600"
          >
            삭제
          </button>
        )}
      </td>
    </tr>
  );
}
