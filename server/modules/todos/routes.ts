import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  toggleTodo,
} from "./controller.js";
import { authMiddleware } from "../auth/middleware.js";
import type { FastifyPluginAsync } from "fastify";

const todosRouter: FastifyPluginAsync = async (app) => {
  app.get("/", getTodos);
  app.get("/:id", getTodo);
  app.post("/", { preHandler: authMiddleware }, createTodo);
  app.patch("/:id", { preHandler: authMiddleware }, toggleTodo);
  app.delete("/:id", { preHandler: authMiddleware }, deleteTodo);
};

export default todosRouter;
