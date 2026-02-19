import type { Request, Response, NextFunction } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session.userId)
    return res.status(401).json({ error: "로그인이 필요합니다" });
  next();
};
