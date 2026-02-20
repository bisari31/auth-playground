import prisma from "../prisma/client.js";
import bcrypt from "bcrypt";
import type { FastifyReply, FastifyRequest } from "fastify";

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

  req.session.userId = user.id;
  await req.session.save();
  return reply.send({ id: user.id, email: user.email });
};

export const me = async (req: FastifyRequest, reply: FastifyReply) => {
  if (!req.session.userId) {
    return reply.status(401).send({ error: "로그인이 필요합니다" });
  }
  const user = await prisma.user.findUnique({
    where: { id: req.session.userId },
  });
  if (!user) {
    return reply.status(401).send({ error: "로그인이 필요합니다" });
  }
  return reply.send({ id: user.id, email: user.email });
};

export const logout = async (req: FastifyRequest, reply: FastifyReply) => {
  req.session.destroy();
  reply.clearCookie("sessionId");
  return reply.send({ success: true });
};
