import express from "express";
import todosRouter from "./routes/todos.js";
import cors from "cors";
import authRouter from "./routes/auth.js";
import session from "express-session";

const app = express();
const PORT = 4000;
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET ?? "dev-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true },
    name: "sessionId",
  })
);
app.use((req, res, next) => {
  console.log(new Date(), req.method, req.url);
  next();
});

app.use("/api/todos", todosRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: "서버 에러가 발생했습니다" });
});
// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
