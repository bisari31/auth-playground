import prisma from "../prisma/client.js";
import type { Request, Response } from "express";

export const getTodos = async (req: Request, res: Response) => {
  const todos = await prisma.todo.findMany({
    include: { user: { select: { email: true, createdAt: true } } },
    orderBy: { createdAt: "desc" },
  });
  return res.json(todos);
};

export const getTodo = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const todo = await prisma.todo.findUnique({ where: { id } });
  if (todo) {
    return res.json(todo);
  } else {
    return res.status(404).json({ error: "Todo not found" });
  }
};
export const createTodo = async (req: Request, res: Response) => {
  const title = req.body.title;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  const newTodo = await prisma.todo.create({
    data: { title, userId: req.session.userId },
  });
  return res.json(newTodo);
};

export const toggleTodo = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const todo = await prisma.todo.findUnique({ where: { id } });
  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  if (req.session.userId !== todo.userId) {
    return res.status(403).json({ error: "권한이 없어요" });
  }

  const result = await prisma.todo.update({
    where: { id },
    data: { completed: !todo.completed },
  });

  return res.json(result);
};

export const deleteTodo = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const todo = await prisma.todo.findUnique({ where: { id } });

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  if (req.session.userId !== todo.userId) {
    return res.status(403).json({ error: "권한이 없어요" });
  }

  const result = await prisma.todo.delete({ where: { id } });
  return res.json(result);
};
