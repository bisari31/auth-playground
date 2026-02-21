import type { FastifyPluginAsync } from "fastify";
import { login, logout, me, register } from "./controller.js";

const authRouter: FastifyPluginAsync = async (app) => {
  app.post("/register", register);
  app.post("/login", login);
  app.get("/me", me);
  app.post("/logout", logout);
};

export default authRouter;
