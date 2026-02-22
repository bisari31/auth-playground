import type { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../prisma/client.js";

export const getTodos = async (req: FastifyRequest, reply: FastifyReply) => {
  const todos = await prisma.todo.findMany({
    include: { user: { select: { email: true, createdAt: true } } },
    orderBy: { createdAt: "desc" },
  });
  return reply.send(todos);
};

export const getTodo = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const id = Number(req.params.id);
  const todo = await prisma.todo.findUnique({ where: { id } });
  if (todo) {
    return reply.send(todo);
  } else {
    return reply.status(404).send({ error: "할 일을 찾을 수 없습니다" });
  }
};
export const createTodo = async (
  req: FastifyRequest<{ Body: { title: string } }>,
  reply: FastifyReply
) => {
  const title = req.body.title;

  if (!title) {
    return reply.status(400).send({ error: "제목을 입력해주세요" });
  }
  const newTodo = await prisma.todo.create({
    data: { title, userId: req.userId as number },
  });
  return reply.send(newTodo);
};

export const toggleTodo = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const id = Number(req.params.id);

  const todo = await prisma.todo.findUnique({ where: { id } });
  if (!todo) {
    return reply.status(404).send({ error: "할 일을 찾을 수 없습니다" });
  }

  if (req.userId !== todo.userId) {
    return reply.status(403).send({ error: "권한이 없어요" });
  }

  const result = await prisma.todo.update({
    where: { id },
    data: { completed: !todo.completed },
  });

  return reply.send(result);
};

export const deleteTodo = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const id = Number(req.params.id);
  const todo = await prisma.todo.findUnique({ where: { id } });

  if (!todo) {
    return reply.status(404).send({ error: "할 일을 찾을 수 없습니다" });
  }

  if (req.userId !== todo.userId) {
    return reply.status(403).send({ error: "권한이 없어요" });
  }

  const result = await prisma.todo.delete({ where: { id } });
  return reply.send(result);
};
