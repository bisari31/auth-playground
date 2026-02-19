import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  toggleTodo,
} from "../controllers/todos.js";
import { authMiddleware } from "../middlewares/auth.js";

const todosRouter = Router();

// todosRouter.use(authMiddleware);

todosRouter.get("/", getTodos);
todosRouter.get("/:id", getTodo);
todosRouter.post("/", authMiddleware, createTodo);
todosRouter.patch("/:id", authMiddleware, toggleTodo);
todosRouter.delete("/:id", authMiddleware, deleteTodo);

export default todosRouter;
