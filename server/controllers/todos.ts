import prisma from "../prisma/client.js";
import type { Request, Response } from "express";

export const getTodos = async (req: Request, res: Response) => {
  const todos = await prisma.todo.findMany();
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
  const newTodo = await prisma.todo.create({ data: { title } });
  return res.json(newTodo);
};

export const toggleTodo = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const todo = await prisma.todo.findUnique({ where: { id } });

  if (todo) {
    const newTodo = { ...todo, completed: !todo.completed };
    const result = await prisma.todo.update({ where: { id }, data: newTodo });

    return res.json(result);
  } else {
    return res.status(404).json({ error: "Todo not found" });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const result = await prisma.todo.delete({ where: { id } });
    return res.json(result);
  } catch (err) {
    return res.status(404).json({ error: "Todo not found" });
  }
};
