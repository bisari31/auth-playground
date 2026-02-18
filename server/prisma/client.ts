import { Prisma } from "@prisma/client";
import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

export default prisma;
