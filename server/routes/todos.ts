import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  toggleTodo,
} from "../controllers/todos.js";

const todosRouter = Router();

todosRouter.get("/", getTodos);
todosRouter.get("/:id", getTodo);
todosRouter.post("/", createTodo);
todosRouter.patch("/:id", toggleTodo);
todosRouter.delete("/:id", deleteTodo);

export default todosRouter;
