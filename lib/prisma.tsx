import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // Prevent multiple instances of Prisma Client in development
  if (!(global as { prisma?: PrismaClient }).prisma) {
    (global as { prisma?: PrismaClient }).prisma = new PrismaClient();
  }
  prisma = (global as { prisma?: PrismaClient }).prisma as PrismaClient;
}

export default prisma;