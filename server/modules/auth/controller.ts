import prisma from "../../prisma/client.js";
import bcrypt from "bcrypt";
import type { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
  setRefreshTokenCookie,
  clearRefreshTokenCookie,
} from "./token.js";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

export const register = async (
  req: FastifyRequest<{ Body: { email: string; password: string } }>,
  reply: FastifyReply
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return reply
      .status(400)
      .send({ error: "이메일과 비밀번호를 입력해주세요" });
  }
  const result = await prisma.user.findUnique({ where: { email } });

  if (result) {
    return reply.status(409).send({ error: "이미 존재하는 이메일입니다" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: { email, password: hashedPassword },
  });

  return reply.send({ id: newUser.id, email: newUser.email });
};

export const login = async (
  req: FastifyRequest<{ Body: { email: string; password: string } }>,
  reply: FastifyReply
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return reply
      .status(400)
      .send({ error: "이메일과 비밀번호를 입력해주세요" });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return reply
      .status(401)
      .send({ error: "이메일 또는 비밀번호가 올바르지 않습니다" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return reply
      .status(401)
      .send({ error: "이메일 또는 비밀번호가 올바르지 않습니다" });
  }

  const token = generateAccessToken(user.id);
  const refreshToken = await generateRefreshToken(user.id);
  setRefreshTokenCookie(reply, refreshToken);

  return reply.send({ id: user.id, email: user.email, token });
};

export const me = async (req: FastifyRequest, reply: FastifyReply) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
  });

  if (!user) {
    return reply.status(401).send({ error: "로그인이 필요합니다" });
  }

  return reply.send({ id: user.id, email: user.email });
};

export const logout = async (req: FastifyRequest, reply: FastifyReply) => {
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
    await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
  }

  clearRefreshTokenCookie(reply);
  return reply.send({ success: true });
};

export const refresh = async (req: FastifyRequest, reply: FastifyReply) => {
  const oldToken = req.cookies.refreshToken;

  if (!oldToken) {
    return reply.status(401).send({ error: "Refresh token이 없습니다" });
  }

  let payload: { userId: number };
  try {
    payload = jwt.verify(oldToken, JWT_REFRESH_SECRET) as { userId: number };
  } catch {
    clearRefreshTokenCookie(reply);
    return reply
      .status(401)
      .send({ error: "유효하지 않은 refresh token입니다" });
  }

  const storedToken = await prisma.refreshToken.findUnique({
    where: { token: oldToken },
  });

  if (!storedToken) {
    await prisma.refreshToken.deleteMany({ where: { userId: payload.userId } });
    clearRefreshTokenCookie(reply);
    return reply
      .status(401)
      .send({ error: "Refresh token이 재사용되었습니다" });
  }

  if (storedToken.expiresAt < new Date()) {
    await prisma.refreshToken.delete({ where: { id: storedToken.id } });
    clearRefreshTokenCookie(reply);
    return reply.status(401).send({ error: "Refresh token이 만료되었습니다" });
  }

  await prisma.refreshToken.delete({ where: { id: storedToken.id } });

  const newAccessToken = generateAccessToken(payload.userId);
  const newRefreshToken = await generateRefreshToken(payload.userId);

  setRefreshTokenCookie(reply, newRefreshToken);
  return reply.send({ token: newAccessToken });
};
