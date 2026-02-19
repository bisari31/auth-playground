import { Router } from "express";
import { login, logout, me, register } from "../controllers/auth.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me", me);
authRouter.post("/logout", logout);

export default authRouter;
