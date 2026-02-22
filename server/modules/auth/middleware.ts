import type { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "./constants.js";

export const authMiddleware = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const at = req.cookies.token;

  if (!at) {
    return reply.status(401).send({ error: "로그인이 필요합니다" });
  }

  try {
    const decodedToken = jwt.verify(at, JWT_SECRET) as { userId: number };
    req.userId = decodedToken.userId;
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return reply
        .status(401)
        .send({ error: "토큰이 만료되었습니다", code: "TOKEN_EXPIRED" });
    }
    return reply.status(401).send({ error: "로그인이 필요합니다" });
  }
};
