import type { FastifyRequest, FastifyReply } from "fastify";

export const authMiddleware = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  if (!req.session.userId)
    return reply.status(401).send({ error: "로그인이 필요합니다" });
};
