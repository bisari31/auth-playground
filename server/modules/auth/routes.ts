import type { FastifyPluginAsync } from "fastify";
import { login, logout, me, refresh, register } from "./controller.js";
import { authMiddleware } from "./middleware.js";

const authRouter: FastifyPluginAsync = async (app) => {
  app.post("/register", register);
  app.post("/login", login);
  app.get("/me", { preHandler: authMiddleware }, me);
  app.post("/logout", { preHandler: authMiddleware }, logout);
  app.post("/refresh", refresh);
};

export default authRouter;
