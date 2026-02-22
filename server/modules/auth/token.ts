import jwt from "jsonwebtoken";
import crypto from "crypto";
import prisma from "../../prisma/client.js";
import type { FastifyReply } from "fastify";

type CookieName = "token" | "refreshToken";

import {
  JWT_SECRET,
  JWT_REFRESH_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} from "./constants.js";

export const generateAccessToken = (userId: number): string => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
};

export const generateRefreshToken = async (userId: number): Promise<string> => {
  const refreshToken = jwt.sign(
    { userId, jti: crypto.randomUUID() },
    JWT_REFRESH_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
  );

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId,
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRES_IN * 1000),
    },
  });

  return refreshToken;
};

export const setCookie = (
  reply: FastifyReply,
  name: CookieName,
  value: string
) => {
  reply.setCookie(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    // path: name === "refreshToken" ? "/api/auth" : "/",
    maxAge:
      name === "refreshToken"
        ? REFRESH_TOKEN_EXPIRES_IN
        : ACCESS_TOKEN_EXPIRES_IN,
  });
};

export const clearCookie = (reply: FastifyReply, name: CookieName) => {
  reply.clearCookie(name, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    // path: name === "refreshToken" ? "/api/auth" : "/",
  });
};
