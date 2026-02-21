import fastify from "fastify";
import todosRouter from "./modules/todos/routes.js";
import cors from "@fastify/cors";
import authRouter from "./modules/auth/routes.js";
import cookie from "@fastify/cookie";

const app = fastify({ logger: true });
const PORT = 4000;
app.register(cors, {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE"],
});
app.register(cookie);

app.register(todosRouter, { prefix: "/api/todos" });
app.register(authRouter, { prefix: "/api/auth" });

// 서버 시작
app.listen({ port: PORT }).then(() => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
