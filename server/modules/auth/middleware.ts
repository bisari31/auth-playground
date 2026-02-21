import type { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return reply.status(401).send({ error: "로그인이 필요합니다" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: number };
    req.userId = decodedToken.userId;
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return reply.status(401).send({ error: "토큰이 만료되었습니다", code: "TOKEN_EXPIRED" });
    }
    return reply.status(401).send({ error: "로그인이 필요합니다" });
  }
};
