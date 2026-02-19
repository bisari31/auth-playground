import type { Request, Response } from "express";
import prisma from "../prisma/client.js";
import bcrypt from "bcrypt";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "이메일과 비밀번호를 입력해주세요" });
  }
  const result = await prisma.user.findUnique({ where: { email } });

  if (result) {
    return res.status(409).json({ error: "이미 존재하는 이메일입니다" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: { email, password: hashedPassword },
  });

  return res.json({ id: newUser.id, email: newUser.email });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "이메일과 비밀번호를 입력해주세요" });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res
      .status(401)
      .json({ error: "이메일 또는 비밀번호가 올바르지 않습니다" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res
      .status(401)
      .json({ error: "이메일 또는 비밀번호가 올바르지 않습니다" });
  }

  req.session.userId = user.id;
  return res.json({ id: user.id, email: user.email });
};

export const me = async (req: Request, res: Response) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "로그인이 필요합니다" });
  }
  const user = await prisma.user.findUnique({
    where: { id: req.session.userId },
  });
  if (!user) {
    return res.status(401).json({ error: "로그인이 필요합니다" });
  }
  return res.json({ id: user.id, email: user.email });
};

export const logout = async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "로그아웃 중 에러가 발생했습니다" });
    }
    res.clearCookie("sessionId");
    return res.json({ success: true });
  });
};
