import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  toggleTodo,
} from "../controllers/todos.js";
import { authMiddleware } from "../middlewares/auth.js";
import type { FastifyPluginAsync } from "fastify";

const todosRouter: FastifyPluginAsync = async (app) => {
  app.get("/", getTodos);
  app.get("/:id", getTodo);
  app.post("/", { preHandler: authMiddleware }, createTodo);
  app.patch("/:id", { preHandler: authMiddleware }, toggleTodo);
  app.delete("/:id", { preHandler: authMiddleware }, deleteTodo);
};

export default todosRouter;
